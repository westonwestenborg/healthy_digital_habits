// Quick Start Page Functionality

// Risk Assessment
function assessRisk() {
    const checkedItems = document.querySelectorAll('input[name="risk-factor"]:checked');
    const riskLevel = checkedItems.length;
    const resultsDiv = document.getElementById('risk-results');
    const resultsContent = resultsDiv.querySelector('.results-content');
    
    let resultHTML = '';
    let recommendations = [];
    
    if (riskLevel === 0) {
        resultHTML = `
            <div class="result-low-risk">
                <h4>✅ Low Risk - You're Doing Great!</h4>
                <p>Based on your responses, your child appears to have healthy digital habits. Keep up the great work!</p>
                <h5>Preventive Steps:</h5>
                <ul>
                    <li>Continue monitoring their digital wellness</li>
                    <li>Maintain open communication about online experiences</li>
                    <li>Review and update family media agreements annually</li>
                </ul>
            </div>
        `;
        recommendations = [
            { title: 'Family Media Plan Template', link: 'family-media-plan.html' },
            { title: 'Monthly Check-in Guide', link: 'monthly-checkins.html' }
        ];
    } else if (riskLevel <= 2) {
        resultHTML = `
            <div class="result-moderate-risk">
                <h4>⚠️ Some Concerns - Time for Small Changes</h4>
                <p>You've identified ${riskLevel} area${riskLevel > 1 ? 's' : ''} that could benefit from attention. These are common challenges that can often be addressed with small adjustments.</p>
                <h5>Immediate Actions:</h5>
                <ul>
                    <li>Start tracking screen time for one week</li>
                    <li>Create one screen-free zone in your home</li>
                    <li>Establish a 30-minute wind-down before bedtime</li>
                    <li>Schedule one daily screen-free family activity</li>
                </ul>
            </div>
        `;
        recommendations = [
            { title: 'Screen Time Tracking Tools', link: 'tracking-tools.html' },
            { title: '7-Day Family Challenge', link: 'family-challenges.html' },
            { title: 'Gradual Change Strategies', link: 'gradual-changes.html' }
        ];
    } else if (riskLevel <= 4) {
        resultHTML = `
            <div class="result-high-risk">
                <h4>🔴 Multiple Concerns - Action Needed</h4>
                <p>You've identified ${riskLevel} areas of concern. While this may feel overwhelming, many families face these challenges. The good news is that targeted interventions can make a significant difference.</p>
                <h5>Priority Actions (Start This Week):</h5>
                <ul>
                    <li>Remove screens from bedrooms immediately</li>
                    <li>Establish device-free meal times</li>
                    <li>Create a written family media agreement</li>
                    <li>Plan alternative activities your child enjoys</li>
                    <li>Consider involving school counselors or teachers</li>
                </ul>
            </div>
        `;
        recommendations = [
            { title: 'Crisis Intervention Plan', link: 'crisis-plan.html' },
            { title: 'School Partnership Guide', link: 'school-partnership.html' },
            { title: 'Professional Resources', link: 'professional-help.html' }
        ];
    } else {
        resultHTML = `
            <div class="result-urgent">
                <h4>🚨 Urgent - Consider Professional Support</h4>
                <p>You've identified ${riskLevel} significant concerns. This suggests your child may benefit from additional support beyond family interventions.</p>
                <h5>Immediate Steps:</h5>
                <ul>
                    <li><strong>Contact your child's school counselor</strong></li>
                    <li><strong>Consider professional counseling</strong></li>
                    <li>Implement emergency screen time limits</li>
                    <li>Increase family supervision and support</li>
                    <li>Connect with other parents facing similar challenges</li>
                </ul>
                <div class="urgent-contacts">
                    <h5>Get Help Now:</h5>
                    <p><strong>Harney County School District:</strong> (541) 573-6461</p>
                    <p><strong>Crisis Support:</strong> <a href="get-help.html">Local Resources →</a></p>
                </div>
            </div>
        `;
        recommendations = [
            { title: 'Emergency Resources', link: 'emergency-resources.html' },
            { title: 'Professional Help Guide', link: 'professional-help.html' },
            { title: 'Crisis Support', link: 'crisis-support.html' }
        ];
    }
    
    // Add recommendations
    if (recommendations.length > 0) {
        resultHTML += `
            <div class="risk-recommendations">
                <h5>Recommended Resources:</h5>
                <div class="rec-links">
                    ${recommendations.map(rec => `
                        <a href="${rec.link}" class="rec-button">${rec.title}</a>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    resultsContent.innerHTML = resultHTML;
    resultsDiv.classList.remove('hidden');
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Store results for tracking
    localStorage.setItem('riskAssessmentResults', JSON.stringify({
        timestamp: new Date().toISOString(),
        riskLevel: riskLevel,
        checkedItems: Array.from(checkedItems).map(item => item.value)
    }));
}

// Action Plan Generator
let planData = {
    goal: '',
    timeAvailable: '',
    childType: ''
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize plan generator
    const planOptions = document.querySelectorAll('.plan-option');
    
    planOptions.forEach(option => {
        option.addEventListener('click', function() {
            const step = this.closest('.plan-step');
            const stepNumber = parseInt(step.dataset.step);
            const value = this.dataset.value;
            
            // Store the selection
            if (stepNumber === 1) planData.goal = value;
            if (stepNumber === 2) planData.timeAvailable = value;
            if (stepNumber === 3) planData.childType = value;
            
            // Highlight selected option
            step.querySelectorAll('.plan-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            // Move to next step
            setTimeout(() => {
                moveToNextPlanStep(stepNumber);
            }, 500);
        });
    });
});

function moveToNextPlanStep(currentStep) {
    const currentStepEl = document.querySelector(`[data-step="${currentStep}"]`);
    const nextStepEl = document.querySelector(`[data-step="${currentStep + 1}"]`);
    const resultsEl = document.querySelector('.plan-results');
    
    if (currentStepEl) {
        currentStepEl.classList.remove('active');
        currentStepEl.classList.add('hidden');
    }
    
    if (nextStepEl) {
        nextStepEl.classList.remove('hidden');
        nextStepEl.classList.add('active');
    } else {
        // Show results
        generateActionPlan();
        resultsEl.classList.remove('hidden');
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function generateActionPlan() {
    const planContent = document.querySelector('.plan-content');
    let plan = generatePlanContent();
    
    planContent.innerHTML = `
        <div class="generated-plan">
            <div class="plan-header">
                <h4>Your Personalized Plan: ${getPlanTitle()}</h4>
                <p class="plan-meta">Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            <div class="plan-body">
                ${plan.immediate}
                ${plan.thisWeek}
                ${plan.ongoing}
                ${plan.resources}
            </div>
        </div>
    `;
}

function getPlanTitle() {
    const goalTitles = {
        'reduce-time': 'Screen Time Reduction',
        'improve-content': 'Content Quality Improvement',
        'family-time': 'Family Connection Building',
        'bedtime': 'Healthy Sleep Routines'
    };
    return goalTitles[planData.goal] || 'Digital Wellness Plan';
}

function generatePlanContent() {
    let plan = {
        immediate: '',
        thisWeek: '',
        ongoing: '',
        resources: ''
    };
    
    // Immediate actions based on time available
    if (planData.timeAvailable === '5-min') {
        plan.immediate = `
            <div class="plan-section">
                <h5>🚀 Right Now (5 minutes):</h5>
                <ul>
                    <li>Turn on screen time tracking on your child's device</li>
                    <li>Set one screen-free zone (start with bedrooms)</li>
                    <li>Schedule a 15-minute family walk for tonight</li>
                </ul>
            </div>
        `;
    } else if (planData.timeAvailable === '30-min') {
        plan.immediate = `
            <div class="plan-section">
                <h5>🎯 Tonight (30 minutes):</h5>
                <ul>
                    <li>Have a family meeting about digital wellness goals</li>
                    <li>Set up parental controls on one device</li>
                    <li>Create a family charging station outside bedrooms</li>
                    <li>Plan tomorrow's screen-free family activity</li>
                </ul>
            </div>
        `;
    }
    
    // Goal-specific actions
    if (planData.goal === 'reduce-time') {
        plan.thisWeek = `
            <div class="plan-section">
                <h5>📅 This Week:</h5>
                <ul>
                    <li>Track current screen time for 3 days</li>
                    <li>Reduce daily screen time by 30 minutes</li>
                    <li>Replace one screen activity with a physical activity</li>
                    <li>Implement 1-hour screen-free time before bed</li>
                </ul>
            </div>
        `;
    } else if (planData.goal === 'family-time') {
        plan.thisWeek = `
            <div class="plan-section">
                <h5>👨‍👩‍👧‍👦 This Week:</h5>
                <ul>
                    <li>Plan one 30-minute family activity each day</li>
                    <li>Start device-free family meals</li>
                    <li>Create a family game night tradition</li>
                    <li>Take a nature walk together 3 times this week</li>
                </ul>
            </div>
        `;
    }
    
    // Child-type specific strategies
    if (planData.childType === 'resistant') {
        plan.ongoing = `
            <div class="plan-section">
                <h5>🎯 Ongoing Strategies (For Resistant Children):</h5>
                <ul>
                    <li>Use positive incentives rather than punishments</li>
                    <li>Let them help create family rules</li>
                    <li>Offer choices within boundaries</li>
                    <li>Celebrate small wins and improvements</li>
                    <li>Model the behavior you want to see</li>
                </ul>
            </div>
        `;
    } else if (planData.childType === 'teen') {
        plan.ongoing = `
            <div class="plan-section">
                <h5>🎯 Ongoing Strategies (For Teens):</h5>
                <ul>
                    <li>Focus on collaboration rather than control</li>
                    <li>Discuss digital citizenship and online safety</li>
                    <li>Help them self-monitor their usage</li>
                    <li>Encourage them to set their own healthy limits</li>
                    <li>Respect their need for digital social connections</li>
                </ul>
            </div>
        `;
    }
    
    plan.resources = `
        <div class="plan-section">
            <h5>📚 Helpful Resources:</h5>
            <div class="resource-links">
                <a href="family-media-plan.html" class="resource-link">Family Media Plan Template</a>
                <a href="tracking-tools.html" class="resource-link">Screen Time Tracking Tools</a>
                <a href="alternative-activities.html" class="resource-link">50 Screen-Free Activities</a>
                <a href="parent-toolkit.html" class="resource-link">Parent Support Community</a>
            </div>
        </div>
    `;
    
    return plan;
}

function downloadPlan() {
    // In a real implementation, this would generate a PDF
    // For now, we'll save the plan data and provide instructions
    
    const planData = {
        title: getPlanTitle(),
        generated: new Date().toLocaleDateString(),
        content: document.querySelector('.plan-content').innerHTML
    };
    
    localStorage.setItem('familyActionPlan', JSON.stringify(planData));
    
    alert('Your action plan has been saved! You can access it anytime from your browser. PDF download functionality will be available soon.');
}

function emailPlan() {
    const email = prompt('Enter your email address to receive your plan:');
    if (email && email.includes('@')) {
        // In a real implementation, this would send an email
        alert(`Your personalized action plan will be sent to ${email} within 5 minutes. Check your spam folder if you don't see it.`);
        
        // Store email for future communications
        localStorage.setItem('userEmail', email);
    } else if (email) {
        alert('Please enter a valid email address.');
    }
}