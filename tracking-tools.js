// Tracking Tools JavaScript

// Initialize dates to today
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    const trackerDate = document.getElementById('tracker-date');
    const sleepDate = document.getElementById('sleep-date');
    
    if (trackerDate) trackerDate.value = today;
    if (sleepDate) sleepDate.value = today;
    
    // Add event listeners for real-time total calculation
    setupScreenTimeCalculator();
    setupSleepCalculator();
});

// Screen Time Tracker Functions
function openScreenTimeTracker() {
    const modal = document.getElementById('screen-time-tracker-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function openSleepTracker() {
    const modal = document.getElementById('sleep-tracker-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeTracker() {
    const modals = document.querySelectorAll('.tracker-modal');
    modals.forEach(modal => {
        modal.classList.add('hidden');
    });
    document.body.style.overflow = 'auto';
    
    // Hide history sections
    const historyElements = document.querySelectorAll('.history-section');
    historyElements.forEach(el => el.classList.add('hidden'));
}

function setupScreenTimeCalculator() {
    const inputs = ['work-school-time', 'entertainment-time', 'communication-time', 'personal-dev-time'];
    
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', calculateScreenTimeTotal);
        }
    });
}

function calculateScreenTimeTotal() {
    const workTime = parseFloat(document.getElementById('work-school-time').value) || 0;
    const entertainmentTime = parseFloat(document.getElementById('entertainment-time').value) || 0;
    const communicationTime = parseFloat(document.getElementById('communication-time').value) || 0;
    const personalDevTime = parseFloat(document.getElementById('personal-dev-time').value) || 0;
    
    const total = workTime + entertainmentTime + communicationTime + personalDevTime;
    document.getElementById('total-time').textContent = total.toFixed(1);
    
    // Add visual feedback for healthy vs concerning levels
    const totalDisplay = document.querySelector('.total-display');
    totalDisplay.className = 'total-display';
    
    if (total <= 2) {
        totalDisplay.classList.add('healthy');
    } else if (total <= 4) {
        totalDisplay.classList.add('moderate');
    } else {
        totalDisplay.classList.add('concerning');
    }
}

function saveScreenTime() {
    const date = document.getElementById('tracker-date').value;
    const workTime = parseFloat(document.getElementById('work-school-time').value) || 0;
    const entertainmentTime = parseFloat(document.getElementById('entertainment-time').value) || 0;
    const communicationTime = parseFloat(document.getElementById('communication-time').value) || 0;
    const personalDevTime = parseFloat(document.getElementById('personal-dev-time').value) || 0;
    
    if (!date) {
        alert('Please select a date');
        return;
    }
    
    const entry = {
        date: date,
        workSchool: workTime,
        entertainment: entertainmentTime,
        communication: communicationTime,
        personalDevelopment: personalDevTime,
        total: workTime + entertainmentTime + communicationTime + personalDevTime,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    let screenTimeData = JSON.parse(localStorage.getItem('screenTimeData')) || [];
    
    // Remove existing entry for this date
    screenTimeData = screenTimeData.filter(item => item.date !== date);
    
    // Add new entry
    screenTimeData.push(entry);
    screenTimeData.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    localStorage.setItem('screenTimeData', JSON.stringify(screenTimeData));
    
    // Show success message
    alert('Screen time entry saved successfully!');
    
    // Clear form
    document.getElementById('work-school-time').value = '';
    document.getElementById('entertainment-time').value = '';
    document.getElementById('communication-time').value = '';
    document.getElementById('personal-dev-time').value = '';
    calculateScreenTimeTotal();
}

function viewHistory() {
    const historySection = document.getElementById('screen-time-history');
    const screenTimeData = JSON.parse(localStorage.getItem('screenTimeData')) || [];
    
    if (screenTimeData.length === 0) {
        alert('No screen time data recorded yet. Start tracking to see your history!');
        return;
    }
    
    // Show history section
    historySection.classList.remove('hidden');
    
    // Generate table
    generateScreenTimeTable(screenTimeData);
    
    // Generate simple chart
    generateScreenTimeChart(screenTimeData);
}

function generateScreenTimeTable(data) {
    const tableContainer = document.getElementById('history-table');
    
    let tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Work/School</th>
                    <th>Entertainment</th>
                    <th>Communication</th>
                    <th>Personal Dev</th>
                    <th>Total</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    data.slice(0, 14).forEach(entry => { // Show last 14 days
        const status = entry.total <= 2 ? 'Healthy' : entry.total <= 4 ? 'Moderate' : 'High';
        const statusClass = entry.total <= 2 ? 'status-healthy' : entry.total <= 4 ? 'status-moderate' : 'status-high';
        
        tableHTML += `
            <tr>
                <td>${formatDate(entry.date)}</td>
                <td>${entry.workSchool}h</td>
                <td>${entry.entertainment}h</td>
                <td>${entry.communication}h</td>
                <td>${entry.personalDevelopment}h</td>
                <td><strong>${entry.total.toFixed(1)}h</strong></td>
                <td><span class="${statusClass}">${status}</span></td>
            </tr>
        `;
    });
    
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
}

function generateScreenTimeChart(data) {
    const chartContainer = document.getElementById('history-chart');
    
    if (data.length < 2) {
        chartContainer.innerHTML = '<p>Track for a few more days to see trends</p>';
        return;
    }
    
    // Create simple bar chart
    const recentData = data.slice(0, 7).reverse(); // Last 7 days
    const maxHours = Math.max(...recentData.map(d => d.total));
    const chartHeight = 200;
    
    let chartHTML = '<div class="simple-chart">';
    
    recentData.forEach(entry => {
        const barHeight = (entry.total / Math.max(maxHours, 8)) * chartHeight;
        const barClass = entry.total <= 2 ? 'bar-healthy' : entry.total <= 4 ? 'bar-moderate' : 'bar-high';
        
        chartHTML += `
            <div class="chart-bar">
                <div class="bar ${barClass}" style="height: ${barHeight}px;"></div>
                <div class="bar-label">${entry.total.toFixed(1)}h</div>
                <div class="bar-date">${formatDateShort(entry.date)}</div>
            </div>
        `;
    });
    
    chartHTML += '</div>';
    chartContainer.innerHTML = chartHTML;
}

// Sleep Tracker Functions
function setupSleepCalculator() {
    const bedtimeInput = document.getElementById('bedtime');
    const wakeTimeInput = document.getElementById('wake-time');
    
    if (bedtimeInput && wakeTimeInput) {
        bedtimeInput.addEventListener('change', calculateSleepTotal);
        wakeTimeInput.addEventListener('change', calculateSleepTotal);
    }
}

function calculateSleepTotal() {
    const bedtime = document.getElementById('bedtime').value;
    const wakeTime = document.getElementById('wake-time').value;
    
    if (!bedtime || !wakeTime) {
        document.getElementById('total-sleep').textContent = '0';
        return;
    }
    
    // Calculate sleep duration (accounting for crossing midnight)
    const bedDate = new Date(`2000-01-01 ${bedtime}`);
    let wakeDate = new Date(`2000-01-01 ${wakeTime}`);
    
    // If wake time is before bedtime, assume it's the next day
    if (wakeDate <= bedDate) {
        wakeDate.setDate(wakeDate.getDate() + 1);
    }
    
    const sleepHours = (wakeDate - bedDate) / (1000 * 60 * 60);
    document.getElementById('total-sleep').textContent = sleepHours.toFixed(1);
    
    // Add visual feedback
    const totalDisplay = document.querySelector('#sleep-tracker-modal .total-display');
    totalDisplay.className = 'total-display';
    
    if (sleepHours >= 8 && sleepHours <= 12) {
        totalDisplay.classList.add('healthy');
    } else if (sleepHours >= 6) {
        totalDisplay.classList.add('moderate');
    } else {
        totalDisplay.classList.add('concerning');
    }
}

function saveSleepEntry() {
    const date = document.getElementById('sleep-date').value;
    const bedtime = document.getElementById('bedtime').value;
    const wakeTime = document.getElementById('wake-time').value;
    const sleepQuality = document.getElementById('sleep-quality').value;
    const energyLevel = document.getElementById('energy-level').value;
    const notes = document.getElementById('sleep-notes').value;
    
    if (!date || !bedtime || !wakeTime) {
        alert('Please fill in date, bedtime, and wake time');
        return;
    }
    
    // Calculate total sleep
    const bedDate = new Date(`2000-01-01 ${bedtime}`);
    let wakeDate = new Date(`2000-01-01 ${wakeTime}`);
    if (wakeDate <= bedDate) {
        wakeDate.setDate(wakeDate.getDate() + 1);
    }
    const totalSleep = (wakeDate - bedDate) / (1000 * 60 * 60);
    
    const entry = {
        date: date,
        bedtime: bedtime,
        wakeTime: wakeTime,
        totalSleep: totalSleep,
        sleepQuality: parseInt(sleepQuality) || null,
        energyLevel: parseInt(energyLevel) || null,
        notes: notes,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    let sleepData = JSON.parse(localStorage.getItem('sleepData')) || [];
    
    // Remove existing entry for this date
    sleepData = sleepData.filter(item => item.date !== date);
    
    // Add new entry
    sleepData.push(entry);
    sleepData.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    localStorage.setItem('sleepData', JSON.stringify(sleepData));
    
    // Show success message
    alert('Sleep entry saved successfully!');
    
    // Clear form
    document.getElementById('bedtime').value = '';
    document.getElementById('wake-time').value = '';
    document.getElementById('sleep-quality').value = '';
    document.getElementById('energy-level').value = '';
    document.getElementById('sleep-notes').value = '';
    calculateSleepTotal();
}

function viewSleepHistory() {
    const historySection = document.getElementById('sleep-history');
    const sleepData = JSON.parse(localStorage.getItem('sleepData')) || [];
    
    if (sleepData.length === 0) {
        alert('No sleep data recorded yet. Start tracking to see your history!');
        return;
    }
    
    // Show history section
    historySection.classList.remove('hidden');
    
    // Generate table
    generateSleepTable(sleepData);
    
    // Generate simple chart
    generateSleepChart(sleepData);
}

function generateSleepTable(data) {
    const tableContainer = document.getElementById('sleep-table');
    
    let tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Bedtime</th>
                    <th>Wake Time</th>
                    <th>Total Sleep</th>
                    <th>Quality</th>
                    <th>Energy</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    data.slice(0, 14).forEach(entry => { // Show last 14 days
        const sleepStatus = getSleepStatus(entry.totalSleep);
        
        tableHTML += `
            <tr>
                <td>${formatDate(entry.date)}</td>
                <td>${formatTime(entry.bedtime)}</td>
                <td>${formatTime(entry.wakeTime)}</td>
                <td class="${sleepStatus.class}"><strong>${entry.totalSleep.toFixed(1)}h</strong></td>
                <td>${entry.sleepQuality ? '★'.repeat(entry.sleepQuality) : '-'}</td>
                <td>${entry.energyLevel ? '●'.repeat(entry.energyLevel) : '-'}</td>
                <td class="notes-cell">${entry.notes || '-'}</td>
            </tr>
        `;
    });
    
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
}

function generateSleepChart(data) {
    const chartContainer = document.getElementById('sleep-chart');
    
    if (data.length < 2) {
        chartContainer.innerHTML = '<p>Track for a few more days to see trends</p>';
        return;
    }
    
    // Create simple bar chart
    const recentData = data.slice(0, 7).reverse(); // Last 7 days
    const chartHeight = 200;
    
    let chartHTML = '<div class="simple-chart">';
    
    recentData.forEach(entry => {
        const barHeight = (entry.totalSleep / 12) * chartHeight;
        const sleepStatus = getSleepStatus(entry.totalSleep);
        
        chartHTML += `
            <div class="chart-bar">
                <div class="bar ${sleepStatus.class}" style="height: ${barHeight}px;"></div>
                <div class="bar-label">${entry.totalSleep.toFixed(1)}h</div>
                <div class="bar-date">${formatDateShort(entry.date)}</div>
            </div>
        `;
    });
    
    chartHTML += '</div>';
    chartContainer.innerHTML = chartHTML;
}

// Helper Functions
function getSleepStatus(hours) {
    if (hours >= 8 && hours <= 12) {
        return { class: 'bar-healthy', status: 'Healthy' };
    } else if (hours >= 6) {
        return { class: 'bar-moderate', status: 'Moderate' };
    } else {
        return { class: 'bar-high', status: 'Concerning' };
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
    });
}

function formatDateShort(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'numeric', 
        day: 'numeric' 
    });
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Download Templates
function downloadScreenTimeTemplate() {
    // In a real implementation, this would generate a PDF
    // For now, create a simple text version
    const template = `SCREEN TIME TRACKING TEMPLATE

Date: ________________

Work/School (hours): ________________
Entertainment (hours): ________________
Communication (hours): ________________
Personal Development (hours): ________________

Total Screen Time: ________________ hours

Notes: ________________________________
_____________________________________

Reflection Questions:
1. Which category took the most time?
2. How did you feel about your screen use today?
3. What would you like to change tomorrow?

Guidelines:
- Children & teens (6-18): aim for 1-2 hours recreational screen time
- Set screen-free zones (meals, bedrooms)
- Take breaks every 30 minutes
`;

    downloadTextFile('screen-time-tracker.txt', template);
}

function downloadSleepTemplate() {
    const template = `SLEEP TRACKING TEMPLATE

Date: ________________
Bedtime: ________________
Wake-up Time: ________________
Total Sleep Hours: ________________
Sleep Quality (1-5): ________________
Energy Level (1-5): ________________
Dreams Remembered (Yes/No): ________________

Notes (factors that affected sleep):
_____________________________________
_____________________________________

Sleep Guidelines:
- Ages 6-12: 9-12 hours per night
- Ages 13-18: 8-10 hours per night
- Avoid screens 30-60 minutes before bedtime
- Keep consistent sleep schedule

Weekly Review:
- Which nights had the best sleep quality?
- What patterns do you notice?
- What changes could improve your sleep?
`;

    downloadTextFile('sleep-tracker.txt', template);
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

// Family Media Plan
function startFamilyPlan() {
    // This would open a comprehensive family media plan wizard
    // For now, provide a placeholder
    alert('Family Media Plan wizard coming soon! For now, please download the PDF template or contact us for a personalized consultation.');
}