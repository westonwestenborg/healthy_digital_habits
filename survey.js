// Survey JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const surveyForm = document.getElementById('evaluation-survey');
    
    if (surveyForm) {
        surveyForm.addEventListener('submit', handleSurveySubmit);
    }
    
    // Add progress tracking
    addProgressIndicator();
    
    // Add form validation
    addFormValidation();
});

function handleSurveySubmit(event) {
    event.preventDefault();
    
    // Collect all form data
    const formData = new FormData(event.target);
    const surveyData = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        if (surveyData[key]) {
            // Handle multiple values (checkboxes)
            if (Array.isArray(surveyData[key])) {
                surveyData[key].push(value);
            } else {
                surveyData[key] = [surveyData[key], value];
            }
        } else {
            surveyData[key] = value;
        }
    }
    
    // Add timestamp and session info
    surveyData.submitted = new Date().toISOString();
    surveyData.sessionId = generateSessionId();
    surveyData.userAgent = navigator.userAgent;
    
    // Validate required fields
    if (!validateSurvey(surveyData)) {
        alert('Please complete all required fields before submitting.');
        return;
    }
    
    // Store locally (in real implementation, this would be sent to a server)
    storeSurveyData(surveyData);
    
    // Show thank you message
    showThankYouMessage();
    
    // Track completion
    trackSurveyCompletion(surveyData);
}

function validateSurvey(data) {
    // Check required consent fields
    if (!data['parent-guardian'] || !data['reviewed-toolkit'] || !data['consent']) {
        return false;
    }
    
    // Check that at least basic demographic info is provided
    if (!data['school-level'] || !data['internet']) {
        return false;
    }
    
    // Verify rating matrix questions have responses
    const requiredRatings = [
        'knowledge-limits-before', 'knowledge-limits-now',
        'knowledge-controls-before', 'knowledge-controls-now',
        'confidence-safety-before', 'confidence-safety-now',
        'confidence-mindfulness-before', 'confidence-mindfulness-now',
        'knowledge-resources-before', 'knowledge-resources-now',
        'behavior-screentime-before', 'behavior-screentime-now',
        'behavior-bedtime-before', 'behavior-bedtime-now',
        'behavior-mediaplan-before', 'behavior-mediaplan-now',
        'behavior-mindful-before', 'behavior-mindful-now',
        'behavior-tracking-before', 'behavior-tracking-now'
    ];
    
    for (let rating of requiredRatings) {
        if (!data[rating]) {
            return false;
        }
    }
    
    // Check helpfulness ratings
    const helpfulnessFields = [
        'helpful-mediaplan', 'helpful-trackers', 'helpful-mindful',
        'helpful-controls', 'helpful-playlist', 'helpful-safety'
    ];
    
    for (let field of helpfulnessFields) {
        if (!data[field]) {
            return false;
        }
    }
    
    // Check overall satisfaction
    if (!data['overall-useful'] || !data['recommend']) {
        return false;
    }
    
    return true;
}

function storeSurveyData(data) {
    // Store in localStorage for demo purposes
    // In real implementation, this would be sent to a secure server
    try {
        const existingSurveys = JSON.parse(localStorage.getItem('surveyResponses')) || [];
        existingSurveys.push(data);
        localStorage.setItem('surveyResponses', JSON.stringify(existingSurveys));
        
        // Also store individual response with unique ID
        localStorage.setItem(`survey_${data.sessionId}`, JSON.stringify(data));
        
        console.log('Survey data stored successfully');
    } catch (error) {
        console.error('Error storing survey data:', error);
    }
}

function showThankYouMessage() {
    // Hide the survey form
    document.querySelector('.survey-form').style.display = 'none';
    
    // Show thank you message
    document.getElementById('thank-you-message').classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function trackSurveyCompletion(data) {
    // Track completion for analytics
    const completion = {
        completed: true,
        timestamp: new Date().toISOString(),
        sessionId: data.sessionId,
        overallRating: data['overall-useful'],
        wouldRecommend: data['recommend']
    };
    
    localStorage.setItem('surveyCompleted', JSON.stringify(completion));
}

function generateSessionId() {
    return 'survey_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function addProgressIndicator() {
    const sections = document.querySelectorAll('.survey-section');
    const progressContainer = document.createElement('div');
    progressContainer.className = 'survey-progress';
    progressContainer.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill" style="width: 0%"></div>
        </div>
        <div class="progress-text">Section 1 of ${sections.length}</div>
    `;
    
    // Insert after the intro
    const introSection = document.querySelector('.survey-intro');
    introSection.insertAdjacentElement('afterend', progressContainer);
    
    // Add intersection observer to track progress
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionIndex = Array.from(sections).indexOf(entry.target);
                const progress = ((sectionIndex + 1) / sections.length) * 100;
                
                document.querySelector('.progress-fill').style.width = progress + '%';
                document.querySelector('.progress-text').textContent = 
                    `Section ${sectionIndex + 1} of ${sections.length}`;
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

function addFormValidation() {
    // Add real-time validation feedback
    const radioGroups = document.querySelectorAll('input[type="radio"]');
    const checkboxGroups = document.querySelectorAll('input[type="checkbox"]');
    
    // Add change listeners for immediate feedback
    radioGroups.forEach(radio => {
        radio.addEventListener('change', function() {
            const group = document.querySelectorAll(`input[name="${this.name}"]`);
            group.forEach(input => {
                input.closest('.question-group').classList.remove('error');
            });
            this.closest('.question-group').classList.add('completed');
        });
    });
    
    checkboxGroups.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.name === 'parent-guardian' || this.name === 'reviewed-toolkit' || this.name === 'consent') {
                if (this.checked) {
                    this.closest('.question-group').classList.add('completed');
                    this.closest('.question-group').classList.remove('error');
                } else {
                    this.closest('.question-group').classList.remove('completed');
                }
            }
        });
    });
}

// Utility function to export survey data (for admin use)
function exportSurveyData() {
    const surveys = JSON.parse(localStorage.getItem('surveyResponses')) || [];
    
    if (surveys.length === 0) {
        alert('No survey data found');
        return;
    }
    
    // Convert to CSV format
    const headers = Object.keys(surveys[0]);
    const csvContent = [
        headers.join(','),
        ...surveys.map(survey => 
            headers.map(header => {
                const value = survey[header];
                // Handle arrays and escape commas
                if (Array.isArray(value)) {
                    return '"' + value.join(';') + '"';
                }
                return typeof value === 'string' && value.includes(',') ? 
                    '"' + value + '"' : value;
            }).join(',')
        )
    ].join('\n');
    
    // Download as CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `digital-wellness-survey-data-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Generate summary statistics
function generateSummaryStats() {
    const surveys = JSON.parse(localStorage.getItem('surveyResponses')) || [];
    
    if (surveys.length === 0) {
        console.log('No survey data available');
        return;
    }
    
    const stats = {
        totalResponses: surveys.length,
        demographics: {
            schoolLevels: {},
            internetAccess: {},
            devices: {}
        },
        ratings: {
            overallUsefulness: {},
            wouldRecommend: {},
            toolkitHelpfulness: {}
        },
        improvements: [],
        successStories: []
    };
    
    surveys.forEach(survey => {
        // Demographics
        stats.demographics.schoolLevels[survey['school-level']] = 
            (stats.demographics.schoolLevels[survey['school-level']] || 0) + 1;
        
        stats.demographics.internetAccess[survey['internet']] = 
            (stats.demographics.internetAccess[survey['internet']] || 0) + 1;
        
        // Overall ratings
        stats.ratings.overallUsefulness[survey['overall-useful']] = 
            (stats.ratings.overallUsefulness[survey['overall-useful']] || 0) + 1;
        
        stats.ratings.wouldRecommend[survey['recommend']] = 
            (stats.ratings.wouldRecommend[survey['recommend']] || 0) + 1;
        
        // Collect text responses
        if (survey['improvement-suggestion']) {
            stats.improvements.push(survey['improvement-suggestion']);
        }
        
        if (survey['success-story']) {
            stats.successStories.push(survey['success-story']);
        }
    });
    
    console.log('Survey Summary Statistics:', stats);
    return stats;
}

// Add CSS for progress indicator and validation states
const style = document.createElement('style');
style.textContent = `
    .survey-progress {
        position: sticky;
        top: 80px;
        background: var(--color-white);
        padding: var(--space-md) 0;
        border-bottom: 1px solid rgba(74, 103, 65, 0.1);
        z-index: 100;
    }
    
    .progress-bar {
        width: 100%;
        height: 6px;
        background: rgba(74, 103, 65, 0.1);
        border-radius: var(--radius-sm);
        overflow: hidden;
        margin-bottom: var(--space-sm);
    }
    
    .progress-fill {
        height: 100%;
        background: var(--color-success);
        transition: width var(--transition-base);
    }
    
    .progress-text {
        text-align: center;
        font-size: var(--text-xs);
        color: var(--color-text);
    }
    
    .question-group.completed {
        border-left: 3px solid var(--color-success);
        padding-left: var(--space-md);
    }
    
    .question-group.error {
        border-left: 3px solid var(--color-error);
        padding-left: var(--space-md);
    }
    
    .rating-matrix {
        width: 100%;
        border-collapse: collapse;
        margin: var(--space-md) 0;
    }
    
    .rating-matrix th,
    .rating-matrix td {
        padding: var(--space-md);
        border: 1px solid rgba(74, 103, 65, 0.1);
        text-align: left;
        vertical-align: top;
    }
    
    .rating-matrix th {
        background: var(--color-background);
        font-weight: 600;
        font-family: var(--font-heading);
    }
    
    .rating-scale {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .rating-scale label {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.9rem;
        white-space: nowrap;
    }
    
    .survey-section {
        margin-bottom: var(--space-3xl);
        padding: var(--space-2xl);
        background: var(--color-white);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-md);
        border: 1px solid rgba(74, 103, 65, 0.1);
    }
    
    .survey-section h3 {
        color: var(--color-primary);
        margin-bottom: var(--space-lg);
        font-size: var(--text-xl);
        font-family: var(--font-heading);
    }
    
    .question-group {
        margin-bottom: 2rem;
    }
    
    .question-group label:first-child {
        display: block;
        margin-bottom: 1rem;
        font-weight: 600;
        color: #333;
    }
    
    .radio-group,
    .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .radio-group label,
    .checkbox-group label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: normal;
        margin-bottom: 0;
    }
    
    textarea {
        width: 100%;
        min-height: 100px;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-family: inherit;
        resize: vertical;
    }
    
    .survey-submit {
        text-align: center;
        padding: 2rem;
        background: #f8f9fa;
        border-radius: 8px;
        margin-top: 2rem;
    }
    
    .btn-large {
        padding: 1rem 2rem;
        font-size: 1.1rem;
    }
    
    .submit-note {
        margin-top: 1rem;
        color: #666;
        font-style: italic;
    }
    
    .thanks-card {
        text-align: center;
        padding: 3rem;
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        max-width: 600px;
        margin: 0 auto;
    }
    
    .thanks-card h2 {
        color: #28a745;
        margin-bottom: 1rem;
    }
    
    .next-steps,
    .continue-journey {
        margin-top: 2rem;
        text-align: left;
    }
    
    .action-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 1rem;
    }
    
    @media (max-width: 768px) {
        .rating-matrix {
            font-size: 0.8rem;
        }
        
        .rating-scale {
            flex-direction: column;
        }
        
        .radio-group,
        .checkbox-group {
            gap: 0.75rem;
        }
        
        .survey-section {
            padding: 1.5rem;
        }
        
        .action-buttons {
            flex-direction: column;
            align-items: center;
        }
    }
`;
document.head.appendChild(style);