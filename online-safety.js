// Online Safety JavaScript Functions

// Device Guide Tab Functionality
function showDeviceGuide(deviceType) {
    // Hide all guides
    document.querySelectorAll('.device-guide').forEach(guide => {
        guide.classList.add('hidden');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected guide
    document.getElementById(deviceType + '-guide').classList.remove('hidden');
    
    // Activate clicked button
    event.target.classList.add('active');
}

// Download Safety Checklist
function downloadSafetyChecklist() {
    const checklist = `ONLINE SAFETY CHECKLIST FOR FAMILIES

□ DEVICE SETUP
□ Set up parental controls on all devices
□ Create family charging station outside bedrooms
□ Enable content filtering on browsers
□ Set up screen time limits
□ Configure privacy settings on social media accounts

□ COMMUNICATION SAFETY
□ Talk with your child about cyberbullying
□ Establish rules for sharing personal information
□ Discuss appropriate online behavior
□ Create a plan for reporting problems
□ Review friend lists and contacts regularly

□ PASSWORDS & PRIVACY
□ Use strong, unique passwords for all accounts
□ Enable two-factor authentication where available
□ Don't share passwords with friends
□ Regularly review privacy settings
□ Be cautious about location sharing

□ CONTENT AWARENESS
□ Review apps and games before downloading
□ Check age ratings and content warnings
□ Monitor what your child watches and plays
□ Discuss the difference between real and fake information
□ Talk about appropriate vs inappropriate content

□ WARNING SIGNS TO WATCH
□ Sudden changes in device usage
□ Secretive behavior about online activities
□ Mood changes after using devices
□ Reluctance to go to school
□ Changes in sleep or eating patterns

□ EMERGENCY CONTACTS
□ Harney County School District: (541) 573-6461
□ Crisis Support: Call 988 or text HOME to 741741
□ Local Law Enforcement: 911
□ Cyberbullying Resource: stopbullying.gov

□ FAMILY AGREEMENTS
□ Create written family media plan
□ Post screen-free zones (bedrooms, dining room)
□ Establish consequences for inappropriate use
□ Regular family check-ins about online experiences
□ Model healthy digital behavior as adults

RESOURCES FOR HELP:
• Common Sense Media: commonsensemedia.org
• NetSmartz by NCMEC: missingkids.org/netsmartz
• StopBullying.gov: stopbullying.gov/cyberbullying
• ConnectSafely: connectsafely.org

Print Date: ${new Date().toLocaleDateString()}
Family Name: _________________________

Remember: Online safety is an ongoing conversation, not a one-time setup!`;

    downloadTextFile('online-safety-checklist.txt', checklist);
}

function downloadTextFile(filename, content) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Add smooth scrolling for step navigation
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to step cards for better mobile interaction
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle expanded state for mobile
            this.classList.toggle('expanded');
        });
    });
});

// Enhanced tracking for parental control setup
function trackControlSetup(platform, step) {
    // Track which steps families complete most/least
    let setupProgress = JSON.parse(localStorage.getItem('controlSetupProgress')) || {};
    
    if (!setupProgress[platform]) {
        setupProgress[platform] = {};
    }
    
    setupProgress[platform][step] = {
        completed: true,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('controlSetupProgress', JSON.stringify(setupProgress));
    
    // Visual feedback
    const stepElement = document.querySelector(`#${platform}-guide .step-card:nth-child(${step})`);
    if (stepElement) {
        stepElement.classList.add('completed');
    }
}

// Add completion tracking buttons to each step
document.addEventListener('DOMContentLoaded', function() {
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, index) => {
        const stepContent = card.querySelector('.step-content');
        const completeButton = document.createElement('button');
        completeButton.className = 'btn btn-small btn-outline';
        completeButton.textContent = 'Mark Complete';
        completeButton.onclick = () => {
            const platform = card.closest('.device-guide').id.replace('-guide', '');
            trackControlSetup(platform, index + 1);
            completeButton.textContent = '✓ Completed';
            completeButton.disabled = true;
            card.classList.add('completed');
        };
        stepContent.appendChild(completeButton);
    });
    
    // Load previous progress
    loadSetupProgress();
});

function loadSetupProgress() {
    const setupProgress = JSON.parse(localStorage.getItem('controlSetupProgress')) || {};
    
    Object.keys(setupProgress).forEach(platform => {
        Object.keys(setupProgress[platform]).forEach(step => {
            const stepElement = document.querySelector(`#${platform}-guide .step-card:nth-child(${step})`);
            if (stepElement) {
                stepElement.classList.add('completed');
                const button = stepElement.querySelector('button');
                if (button) {
                    button.textContent = '✓ Completed';
                    button.disabled = true;
                }
            }
        });
    });
}