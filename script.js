// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // Initialize quiz functionality
    initializeQuiz();
});

// Quiz Functionality
let quizData = {
    screenTime: '',
    concern: '',
    age: ''
};

function initializeQuiz() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const question = this.closest('.quiz-question');
            const questionNum = question.dataset.question;
            const value = this.dataset.value;
            
            // Remove selected class from all options in this question
            question.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Store the answer
            if (questionNum === '1') {
                quizData.screenTime = value;
            } else if (questionNum === '2') {
                quizData.concern = value;
            } else if (questionNum === '3') {
                quizData.age = value;
            }
            
            // Move to next question after a short delay
            setTimeout(() => {
                moveToNextQuestion(parseInt(questionNum));
            }, 500);
        });
    });
}

function moveToNextQuestion(currentQuestion) {
    const currentQuestionEl = document.querySelector(`[data-question="${currentQuestion}"]`);
    const nextQuestionEl = document.querySelector(`[data-question="${currentQuestion + 1}"]`);
    const resultsEl = document.querySelector('.quiz-results');
    
    if (currentQuestionEl) {
        currentQuestionEl.classList.add('hidden');
    }
    
    if (nextQuestionEl) {
        nextQuestionEl.classList.remove('hidden');
    } else {
        // Show results
        showQuizResults();
        if (resultsEl) {
            resultsEl.classList.remove('hidden');
        }
    }
}

function showQuizResults() {
    const resultsContent = document.querySelector('.results-content');
    if (!resultsContent) return;
    
    let recommendations = generateRecommendations();
    
    resultsContent.innerHTML = `
        <div class="recommendation-card">
            <h4>Your Personalized Action Plan</h4>
            ${recommendations.map(rec => `
                <div class="recommendation-item">
                    <h5>${rec.title}</h5>
                    <p>${rec.description}</p>
                    <a href="${rec.link}" class="rec-link">Learn More →</a>
                </div>
            `).join('')}
        </div>
    `;
}

function generateRecommendations() {
    let recommendations = [];
    
    // Screen time recommendations
    if (quizData.screenTime === 'high') {
        recommendations.push({
            title: 'Screen Time Reduction Plan',
            description: 'Your child may benefit from gradual screen time reduction. Start with our 7-day step-down plan.',
            link: 'screen-time-reduction.html'
        });
    } else if (quizData.screenTime === 'medium') {
        recommendations.push({
            title: 'Balanced Screen Schedule',
            description: 'Learn how to create a healthy balance between screen time and other activities.',
            link: 'balanced-schedule.html'
        });
    } else {
        recommendations.push({
            title: 'Maintaining Healthy Habits',
            description: 'Great job! Here are tips to maintain these healthy screen time habits.',
            link: 'maintaining-habits.html'
        });
    }
    
    // Concern-based recommendations
    if (quizData.concern === 'sleep') {
        recommendations.push({
            title: 'Screen Time & Sleep Guide',
            description: 'Discover how screens affect sleep and create a bedtime routine that works.',
            link: 'sleep-screens.html'
        });
    } else if (quizData.concern === 'social') {
        recommendations.push({
            title: 'Building Real-World Connections',
            description: 'Activities and strategies to help your child engage more with family and friends.',
            link: 'social-connections.html'
        });
    } else if (quizData.concern === 'safety') {
        recommendations.push({
            title: 'Online Safety Essentials',
            description: 'Protect your child online with our comprehensive safety guide and parental controls.',
            link: 'online-safety.html'
        });
    } else if (quizData.concern === 'behavior') {
        recommendations.push({
            title: 'Understanding Behavior Changes',
            description: 'Learn to identify concerning behaviors and positive intervention strategies.',
            link: 'behavior-guide.html'
        });
    }
    
    // Age-appropriate recommendations
    if (quizData.age === 'elementary') {
        recommendations.push({
            title: 'Elementary Age Resources',
            description: 'Age-appropriate activities and screen time guidelines for younger children.',
            link: 'elementary-resources.html'
        });
    } else if (quizData.age === 'middle') {
        recommendations.push({
            title: 'Middle School Navigation',
            description: 'Help your pre-teen develop healthy digital habits during this crucial time.',
            link: 'middle-school-guide.html'
        });
    } else if (quizData.age === 'high') {
        recommendations.push({
            title: 'Teen Digital Wellness',
            description: 'Support your teenager in making good digital choices and preparing for adulthood.',
            link: 'teen-wellness.html'
        });
    }
    
    return recommendations.slice(0, 3); // Return top 3 recommendations
}

function saveResults() {
    // Store results in localStorage
    const results = {
        timestamp: new Date().toISOString(),
        answers: quizData,
        recommendations: generateRecommendations()
    };
    
    localStorage.setItem('digitalWellnessResults', JSON.stringify(results));
    
    // Show confirmation
    alert('Your personalized plan has been saved! You can access it anytime from your dashboard.');
    
    // Redirect to dashboard or show next steps
    // window.location.href = 'dashboard.html';
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some CSS for the recommendation cards via JavaScript
const style = document.createElement('style');
style.textContent = `
    .recommendation-card {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 1rem;
    }
    
    .recommendation-item {
        padding: 1rem;
        border-left: 4px solid #28a745;
        margin-bottom: 1rem;
        background: #f8f9fa;
        border-radius: 0 8px 8px 0;
    }
    
    .recommendation-item h5 {
        color: #2c5aa0;
        margin-bottom: 0.5rem;
    }
    
    .recommendation-item p {
        margin-bottom: 1rem;
    }
    
    .rec-link {
        color: #28a745;
        text-decoration: none;
        font-weight: 600;
    }
    
    .rec-link:hover {
        text-decoration: underline;
    }
`;
document.head.appendChild(style);