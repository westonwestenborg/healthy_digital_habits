// Mindful Breaks JavaScript

// Daily challenges database
const dailyChallenges = [
    {
        title: "5-Minute Nature Connection",
        description: "Step outside or look out a window. Find one thing in nature (tree, cloud, bird) and watch it mindfully for 5 minutes without any judgment or need to do anything else."
    },
    {
        title: "Gratitude Breathing",
        description: "Take 5 deep breaths. With each exhale, think of something you're grateful for. Let the feeling of gratitude fill your body with each breath."
    },
    {
        title: "Body Scan Check-in",
        description: "Close your eyes and slowly scan your body from head to toe. Notice any tension, then gently stretch or massage those areas. End with three deep breaths."
    },
    {
        title: "Family Connection Moment",
        description: "Put all devices away and spend 5 minutes giving someone in your family your complete attention. Ask them how they're feeling and really listen."
    },
    {
        title: "Mindful Movement",
        description: "Do 5 minutes of gentle movement - stretching, walking, or simple yoga poses. Focus on how your body feels as you move."
    },
    {
        title: "Present Moment Awareness",
        description: "Sit quietly and notice 5 things you can see, 4 things you can hear, 3 things you can touch, 2 things you can smell, and 1 thing you can taste."
    },
    {
        title: "Creative Expression",
        description: "Spend 5 minutes drawing, writing, or humming. Don't worry about making it perfect - just let your creativity flow freely."
    }
];

// Activity database for randomizer
const activities = {
    quick: [
        { title: "Gratitude Circle", description: "Each person shares one thing they're grateful for" },
        { title: "Dance Break", description: "Put on one song and dance together" },
        { title: "Breathing Exercise", description: "Practice deep breathing together" },
        { title: "Hug Marathon", description: "See who can give the longest, warmest hug" },
        { title: "Quick Tidy Game", description: "Set a timer and see how much you can clean together" }
    ],
    short: [
        { title: "Board Game Round", description: "Play one quick round of a favorite card or board game" },
        { title: "Cooking Together", description: "Make a simple snack or drink together" },
        { title: "Art Time", description: "Draw or craft for 15 minutes with whatever supplies you have" },
        { title: "Charades", description: "Act out movies, books, or family memories" },
        { title: "Family Yoga", description: "Follow a simple routine or make up your own poses" }
    ],
    medium: [
        { title: "Nature Walk", description: "Explore your neighborhood or local trails" },
        { title: "Garden Together", description: "Plant flowers, vegetables, or herbs" },
        { title: "Backyard Games", description: "Play catch, frisbee, or create an obstacle course" },
        { title: "Scavenger Hunt", description: "Create lists of things to find in your yard or neighborhood" },
        { title: "Puzzle Time", description: "Work together on a jigsaw puzzle" }
    ],
    long: [
        { title: "Board Game Tournament", description: "Set up a family tournament with different games" },
        { title: "Cooking Project", description: "Try a new recipe or bake something special as a team" },
        { title: "Art Projects", description: "Create something together - painting, crafting, building" },
        { title: "Family Story Time", description: "Read together or create stories as a group" },
        { title: "Outdoor Adventure", description: "Go on a longer hike, visit a park, or explore nature" }
    ]
};

let challengeTimer = null;
let selectedTemplates = new Set();

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadDailyChallenge();
    loadSavedPlaylist();
});

// Daily Challenge Functions
function loadDailyChallenge() {
    // Use date to ensure same challenge all day
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const challengeIndex = dayOfYear % dailyChallenges.length;
    
    const challenge = dailyChallenges[challengeIndex];
    document.getElementById('challenge-title').textContent = challenge.title;
    document.getElementById('challenge-description').textContent = challenge.description;
}

function startChallenge() {
    const timerDisplay = document.getElementById('timer-display');
    const startButton = event.target;
    
    timerDisplay.classList.remove('hidden');
    startButton.style.display = 'none';
    
    let timeLeft = 5 * 60; // 5 minutes in seconds
    
    challengeTimer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('time-remaining').textContent = 
            `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        timeLeft--;
        
        if (timeLeft < 0) {
            completeChallenge();
        }
    }, 1000);
}

function completeChallenge() {
    if (challengeTimer) {
        clearInterval(challengeTimer);
        challengeTimer = null;
    }
    
    // Track completion
    const today = new Date().toISOString().split('T')[0];
    let completedChallenges = JSON.parse(localStorage.getItem('completedChallenges')) || [];
    
    if (!completedChallenges.includes(today)) {
        completedChallenges.push(today);
        localStorage.setItem('completedChallenges', JSON.stringify(completedChallenges));
    }
    
    // Show completion message
    const challengeCard = document.getElementById('daily-challenge');
    challengeCard.innerHTML = `
        <div class="challenge-complete">
            <h3>🎉 Challenge Complete!</h3>
            <p>Great job taking a mindful break today. How do you feel?</p>
            <button class="btn btn-primary" onclick="location.reload()">Try Another Challenge</button>
            <button class="btn btn-outline" onclick="shareSuccess()">Share Your Success</button>
        </div>
    `;
}

function getNewChallenge() {
    const randomIndex = Math.floor(Math.random() * dailyChallenges.length);
    const challenge = dailyChallenges[randomIndex];
    
    document.getElementById('challenge-title').textContent = challenge.title;
    document.getElementById('challenge-description').textContent = challenge.description;
    
    // Reset timer if running
    if (challengeTimer) {
        clearInterval(challengeTimer);
        challengeTimer = null;
    }
    
    // Reset UI
    document.getElementById('timer-display').classList.add('hidden');
    document.querySelector('#daily-challenge button').style.display = 'inline-block';
}

function shareChallenge() {
    const title = document.getElementById('challenge-title').textContent;
    const description = document.getElementById('challenge-description').textContent;
    
    if (navigator.share) {
        navigator.share({
            title: `Mindful Moment: ${title}`,
            text: description,
            url: window.location.href
        });
    } else {
        // Fallback - copy to clipboard
        const shareText = `Try this mindful moment: ${title}\n\n${description}\n\nFrom Harney County Digital Wellness: ${window.location.href}`;
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Challenge copied to clipboard! Share it with your family.');
        });
    }
}

// Template Selection Functions
function selectTemplate(element, templateId) {
    if (selectedTemplates.has(templateId)) {
        selectedTemplates.delete(templateId);
        element.classList.remove('selected');
    } else {
        selectedTemplates.add(templateId);
        element.classList.add('selected');
    }
    
    // Update download button
    const downloadBtn = document.querySelector('[onclick="downloadSelectedTemplates()"]');
    if (selectedTemplates.size > 0) {
        downloadBtn.textContent = `Download ${selectedTemplates.size} Template${selectedTemplates.size > 1 ? 's' : ''}`;
    } else {
        downloadBtn.textContent = 'Download Selected Templates';
    }
}

function downloadSelectedTemplates() {
    if (selectedTemplates.size === 0) {
        alert('Please select at least one template first!');
        return;
    }
    
    let content = 'MINDFUL MOMENT CARDS - PRINT AND CUT\n';
    content += '=' .repeat(50) + '\n\n';
    
    const templates = {
        'pause-breathe': {
            title: 'PAUSE & BREATHE',
            steps: ['Stop what you\'re doing', 'Take 3 deep breaths', 'Ask: "How am I feeling right now?"']
        },
        'gratitude': {
            title: 'GRATITUDE PAUSE',
            steps: ['Look around you', 'Name 3 things you\'re grateful for', 'Smile and take a deep breath']
        },
        'body-check': {
            title: 'BODY CHECK',
            steps: ['Notice how your body feels', 'Stretch your neck and shoulders', 'Blink slowly 5 times']
        },
        'connection': {
            title: 'CONNECT',
            steps: ['Put the device down', 'Look for a family member or pet', 'Give them your full attention for 1 minute']
        },
        'movement': {
            title: 'MOVE YOUR BODY',
            steps: ['Stand up and stretch tall', 'Do 10 jumping jacks or push-ups', 'Notice how your energy feels now']
        },
        'nature': {
            title: 'NATURE MOMENT',
            steps: ['Look out a window', 'Find something in nature (tree, cloud, bird)', 'Watch it for 30 seconds without judgment']
        }
    };
    
    selectedTemplates.forEach(templateId => {
        const template = templates[templateId];
        content += `FRONT: ${template.title}\n`;
        content += '-'.repeat(25) + '\n';
        content += 'BACK:\n';
        template.steps.forEach((step, index) => {
            content += `${index + 1}. ${step}\n`;
        });
        content += '\n' + '='.repeat(50) + '\n\n';
    });
    
    content += 'INSTRUCTIONS:\n';
    content += '1. Print this page\n';
    content += '2. Cut along the lines to separate each card\n';
    content += '3. Fold each card in half to create a "tent"\n';
    content += '4. Place near devices as mindful reminders\n';
    content += '5. Rotate weekly to keep them fresh\n';
    
    downloadTextFile('mindful-moment-cards.txt', content);
}

function createCustomTemplate() {
    const title = prompt('Enter a title for your mindful moment card (e.g., "FOCUS TIME"):');
    if (!title) return;
    
    const steps = [];
    for (let i = 1; i <= 3; i++) {
        const step = prompt(`Enter step ${i} of your mindful moment:`);
        if (!step) return;
        steps.push(step);
    }
    
    let content = `CUSTOM MINDFUL MOMENT CARD\n`;
    content += '=' .repeat(30) + '\n\n';
    content += `FRONT: ${title.toUpperCase()}\n`;
    content += '-'.repeat(20) + '\n';
    content += 'BACK:\n';
    steps.forEach((step, index) => {
        content += `${index + 1}. ${step}\n`;
    });
    content += '\nFold in half and place near your device!\n';
    
    downloadTextFile(`custom-mindful-card-${title.toLowerCase().replace(/\s+/g, '-')}.txt`, content);
}

function printAllTemplates() {
    const content = `COMPLETE MINDFUL MOMENT CARDS SET
${'='.repeat(50)}

Print this page, cut out each card, and fold in half to create standing "tent" cards.
Place near devices as gentle reminders to pause mindfully.

PAUSE & BREATHE
--------------
1. Stop what you're doing
2. Take 3 deep breaths  
3. Ask: "How am I feeling right now?"

GRATITUDE PAUSE
--------------
1. Look around you
2. Name 3 things you're grateful for
3. Smile and take a deep breath

BODY CHECK
---------
1. Notice how your body feels
2. Stretch your neck and shoulders
3. Blink slowly 5 times

CONNECT
-------
1. Put the device down
2. Look for a family member or pet
3. Give them your full attention for 1 minute

MOVE YOUR BODY
-------------
1. Stand up and stretch tall
2. Do 10 jumping jacks or push-ups
3. Notice how your energy feels now

NATURE MOMENT
------------
1. Look out a window
2. Find something in nature (tree, cloud, bird)
3. Watch it for 30 seconds without judgment

TIP: Rotate cards weekly to keep them fresh and effective!`;

    downloadTextFile('all-mindful-moment-cards.txt', content);
}

// Activity Functions
function showActivityCategory(category) {
    // Hide all categories
    document.querySelectorAll('.activity-category').forEach(cat => {
        cat.classList.add('hidden');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.category-tabs .tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected category
    document.getElementById(category + '-activities').classList.remove('hidden');
    
    // Activate clicked button
    event.target.classList.add('active');
}

function getRandomActivity() {
    const timeAvailable = document.getElementById('time-available').value;
    const availableActivities = activities[timeAvailable];
    
    if (!availableActivities || availableActivities.length === 0) {
        return;
    }
    
    const randomActivity = availableActivities[Math.floor(Math.random() * availableActivities.length)];
    
    document.getElementById('random-activity-title').textContent = randomActivity.title;
    document.getElementById('random-activity-description').textContent = randomActivity.description;
    document.getElementById('random-activity-result').classList.remove('hidden');
}

// Playlist Functions
function savePlaylist() {
    const songs = [];
    document.querySelectorAll('.song-input').forEach(input => {
        if (input.value.trim()) {
            songs.push(input.value.trim());
        }
    });
    
    if (songs.length === 0) {
        alert('Please add at least one song to your playlist!');
        return;
    }
    
    const playlist = {
        songs: songs,
        created: new Date().toISOString(),
        name: `My Safe Playlist - ${new Date().toLocaleDateString()}`
    };
    
    localStorage.setItem('safePlaylist', JSON.stringify(playlist));
    
    alert(`Playlist saved with ${songs.length} songs! You can access it anytime from this page.`);
}

function loadSavedPlaylist() {
    const savedPlaylist = localStorage.getItem('safePlaylist');
    if (savedPlaylist) {
        const playlist = JSON.parse(savedPlaylist);
        const inputs = document.querySelectorAll('.song-input');
        
        playlist.songs.forEach((song, index) => {
            if (inputs[index]) {
                inputs[index].value = song;
            }
        });
    }
}

// Helper Functions
function downloadTextFile(filename, content) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function shareSuccess() {
    const message = "I just completed a mindful moment challenge! Taking breaks from screens to focus on wellbeing. 🧘‍♀️ #MindfulMoments #DigitalWellness";
    
    if (navigator.share) {
        navigator.share({
            title: 'Mindful Moment Complete!',
            text: message,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(message).then(() => {
            alert('Success message copied to clipboard!');
        });
    }
}