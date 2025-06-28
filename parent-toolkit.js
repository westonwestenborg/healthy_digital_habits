// Parent Toolkit JavaScript

// Download Functions
function downloadFamilyMediaPlan() {
    const content = `FAMILY MEDIA PLAN TEMPLATE
${'='.repeat(50)}

Family Name: _________________________
Date Created: _______________________

SECTION 1: FAMILY VALUES & GOALS
What are our family's core values regarding technology?
_________________________________________________
_________________________________________________

What do we hope to achieve with this media plan?
□ Better sleep for everyone
□ More family time together
□ Improved academic performance
□ Reduced conflicts about screen time
□ Safer online experiences
□ Other: ______________________________

SECTION 2: SCREEN TIME GUIDELINES

WEEKDAYS (School Days):
□ Ages 2-5: _____ minutes of high-quality content
□ Ages 6-12: _____ hours total screen time
□ Ages 13+: Focus on balance rather than strict limits

WEEKENDS:
□ Ages 2-5: _____ minutes of high-quality content  
□ Ages 6-12: _____ hours total screen time
□ Ages 13+: Focus on balance rather than strict limits

CONTENT GUIDELINES:
What types of content are appropriate for our family?
□ Educational apps and websites
□ Age-appropriate movies and shows
□ Creative apps for art/music/coding
□ Video calls with family and friends
□ Other: ______________________________

What content is not allowed?
□ Violent games or shows
□ Social media for children under _____ years
□ Apps with in-app purchases without permission
□ Websites with inappropriate content
□ Other: ______________________________

SECTION 3: DEVICE RULES

SCREEN-FREE ZONES:
□ Bedrooms
□ Dining room/kitchen during meals
□ Car (except long trips)
□ Study/homework areas
□ Other: ______________________________

SCREEN-FREE TIMES:
□ 30-60 minutes before bedtime
□ During family meals
□ First _____ minutes after waking up
□ During family activities/outings
□ Other: ______________________________

DEVICE STORAGE:
Where do devices "sleep" at night?
_________________________________________________

Who is responsible for charging devices?
_________________________________________________

SECTION 4: CONSEQUENCES & REWARDS

POSITIVE CONSEQUENCES (When rules are followed):
□ Extra screen time on weekends
□ Choice of family movie night
□ New app or game privilege
□ Later bedtime on weekends
□ Other: ______________________________

NATURAL CONSEQUENCES (When rules are broken):
□ Reduced screen time the next day
□ Earlier device bedtime
□ Loss of device privileges for _____ hours/days
□ Extra chores or responsibilities
□ Other: ______________________________

SECTION 5: ONLINE SAFETY

COMMUNICATION RULES:
□ Never share personal information online
□ Don't talk to strangers online
□ Tell a parent immediately if someone makes you uncomfortable
□ Ask permission before downloading new apps
□ Don't share passwords with friends

CYBERBULLYING RESPONSE:
If cyberbullying happens:
1. Don't respond to the bully
2. Take screenshots for evidence
3. Block the person
4. Tell a trusted adult immediately
5. Report to the platform/app

SECTION 6: FAMILY COMMITMENTS

PARENTS/CAREGIVERS AGREE TO:
□ Model healthy screen use
□ Follow family screen-free times and zones
□ Regularly check in about online experiences
□ Stay updated on apps and platforms kids use
□ Provide alternative activities and attention
□ Review and update this plan regularly

CHILDREN AGREE TO:
□ Follow screen time limits without arguing
□ Ask permission before new apps or accounts
□ Talk to parents about online problems
□ Help create fun non-screen family activities
□ Take breaks from screens every _____ minutes
□ Charge devices in the designated area

SECTION 7: ALTERNATIVE ACTIVITIES

When screens aren't available, we can:
□ _________________________________
□ _________________________________
□ _________________________________
□ _________________________________
□ _________________________________

SECTION 8: PLAN REVIEW

We will review this plan:
□ Monthly
□ Every 3 months
□ Twice per year
□ As needed when problems arise

Next review date: ____________________

SIGNATURES:
Parent/Caregiver: _____________________ Date: _______
Parent/Caregiver: _____________________ Date: _______
Child: ______________________________ Date: _______
Child: ______________________________ Date: _______
Child: ______________________________ Date: _______

NOTES & ADJUSTMENTS:
_________________________________________________
_________________________________________________
_________________________________________________

Remember: This is a living document! Adjust as your family grows and changes.`;

    downloadTextFile('family-media-plan.txt', content);
}

function downloadTrackingSheets() {
    const content = `SCREEN TIME & SLEEP TRACKING SHEETS
${'='.repeat(50)}

SCREEN TIME TRACKER - WEEKLY LOG

Week of: ____________________

           Work/  Enter-   Commun-   Personal    Total
Day        School  tain.   ication   Develop.   Hours
_______________________________________________________
Monday     ____    ____     ____      ____      ____
Tuesday    ____    ____     ____      ____      ____
Wednesday  ____    ____     ____      ____      ____
Thursday   ____    ____     ____      ____      ____
Friday     ____    ____     ____      ____      ____
Saturday   ____    ____     ____      ____      ____
Sunday     ____    ____     ____      ____      ____
_______________________________________________________
WEEKLY     ____    ____     ____      ____      ____
TOTALS

CATEGORIES:
• Work/School: Time on devices for homework or learning
• Entertainment: Games, videos, social media, casual browsing
• Communication: Texting, video calls, emails
• Personal Development: Learning apps, reading, creative apps

REFLECTION QUESTIONS:
1. Which category took the most time this week?
   _____________________________________________

2. How did you feel about your screen use this week?
   □ Just right  □ Too much  □ Could use more balance

3. What would you like to change next week?
   _____________________________________________

GUIDELINES: Ages 6-18 aim for 1-2 hours recreational screen time daily

${'='.repeat(50)}

SLEEP TRACKER - WEEKLY LOG

Week of: ____________________

           Bed-    Wake-    Total   Sleep   Energy
Day        time    time     Sleep   Quality  Level    Notes
____________________________________________________________
Monday     ____    ____     ____    ____    ____    _______
Tuesday    ____    ____     ____    ____    ____    _______
Wednesday  ____    ____     ____    ____    ____    _______
Thursday   ____    ____     ____    ____    ____    _______
Friday     ____    ____     ____    ____    ____    _______
Saturday   ____    ____     ____    ____    ____    _______
Sunday     ____    ____     ____    ____    ____    _______
____________________________________________________________
WEEKLY AVERAGE:    ____    ____    ____

SLEEP QUALITY SCALE: 1 = Very Poor, 2 = Poor, 3 = Fair, 4 = Good, 5 = Excellent
ENERGY LEVEL SCALE: 1 = Very Low, 2 = Low, 3 = Moderate, 4 = High, 5 = Very High

SLEEP GUIDELINES:
• Ages 6-12: 9-12 hours per night
• Ages 13-18: 8-10 hours per night

REFLECTION QUESTIONS:
1. What was your average sleep this week? _____ hours

2. Which nights had the best sleep quality?
   _____________________________________________

3. What patterns do you notice?
   _____________________________________________

4. What changes could improve your sleep?
   _____________________________________________

SLEEP TIPS:
□ Avoid screens 30-60 minutes before bedtime
□ Keep consistent bedtime/wake time
□ Create relaxing bedtime routine
□ Keep bedroom cool and dark`;

    downloadTextFile('tracking-sheets.txt', content);
}

function downloadScreenTimeTracker() {
    const content = `SCREEN TIME TRACKER
${'='.repeat(30)}

DAILY TRACKING:
Date: ___________

Work/School Hours: _____
Entertainment Hours: _____
Communication Hours: _____
Personal Development Hours: _____

TOTAL SCREEN TIME: _____ hours

How I felt about my screen use today:
□ Just right  □ Too much  □ Need better balance

What I want to change tomorrow:
_________________________________

WEEKLY SUMMARY:
                Daily Hours
Monday         _____
Tuesday        _____
Wednesday      _____
Thursday       _____
Friday         _____
Saturday       _____
Sunday         _____
WEEKLY TOTAL   _____

Average daily: _____ hours

Guidelines: Ages 6-18 aim for 1-2 hours recreational screen time`;

    downloadTextFile('screen-time-tracker.txt', content);
}

function downloadSafetyChecklist() {
    // Reuse the safety checklist from online-safety.js
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

Print Date: ${new Date().toLocaleDateString()}
Family: _________________________`;

    downloadTextFile('online-safety-checklist.txt', checklist);
}

function downloadMindfulCards() {
    const content = `MINDFUL MOMENT CARDS - PRINT & FOLD
${'='.repeat(50)}

Instructions: Print, cut out each card, and fold in half to create standing "tent" cards.
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

CREATIVE PAUSE
-------------
1. Grab paper and pen
2. Draw or write for 2 minutes
3. Don't worry about it being perfect

MINDFUL EATING
-------------
1. If you have a snack nearby
2. Eat it slowly and notice the taste
3. Put the device away while you eat

LOVING KINDNESS
--------------
1. Think of someone you care about
2. Send them good thoughts
3. Include yourself in those good thoughts

RESET MOMENT
-----------
1. Close your eyes for 30 seconds
2. Take 5 deep breaths
3. Ask: "What do I really need right now?"

TIP: Rotate cards weekly to keep them fresh and effective!
Create your own cards with prompts that work for your family!`;

    downloadTextFile('mindful-moment-cards.txt', content);
}

function downloadControlsGuide() {
    const content = `PARENTAL CONTROLS QUICK SETUP GUIDE
${'='.repeat(50)}

iOS (iPhone/iPad) SETUP:

1. ADD CHILD TO FAMILY SHARING
   • Settings > Family > Add Member
   • Follow prompts to finish setup

2. TURN ON SCREEN TIME
   • Settings > Screen Time > (child)
   • Choose "This is My Child's iPhone"
   • Create 4-digit Screen Time passcode

3. SCHEDULE DOWNTIME
   • Screen Time > Downtime > Scheduled
   • Set start/end times (e.g., 9 PM–7 AM)
   • Toggle "Block at Downtime"

4. SET APP LIMITS
   • Screen Time > App Limits > Add Limit
   • Select categories or apps
   • Set daily limit (e.g., 1 hour)

5. CONFIGURE COMMUNICATION LIMITS
   • Screen Time > Communication Limits
   • Set who child can contact during/outside screen time

6. CONTENT & PRIVACY RESTRICTIONS
   • Screen Time > Content & Privacy Restrictions > On
   • Web Content > Limit Adult Websites
   • App Store Purchases > In-App = Don't Allow

7. ENABLE "ASK TO BUY"
   • Settings > Family > (child) > Ask to Buy
   • Toggle "Require Purchase Approval"

${'='.repeat(30)}

ANDROID SETUP:

1. INSTALL GOOGLE FAMILY LINK
   • Parent phone: Install Family Link app
   • Child phone: Sign in with child Google Account

2. SET DAILY SCREEN LIMITS
   • Family Link app > child > Screen time
   • Tap "Daily Limit" > set hours

3. SET BEDTIME
   • Screen time menu > Bedtime
   • Choose start/end times

4. LOCK GOOGLE PLAY
   • Family Link > child > Controls > Google Play
   • Set age ratings for apps, movies, books

5. REQUIRE PURCHASE APPROVAL
   • Controls > Google Play > Purchase approvals
   • Set "All content"

6. ENABLE SAFESEARCH
   • Controls > Google Search
   • Ensure SafeSearch = Filter

TIPS:
• Review settings monthly
• Adjust as children mature
• Explain rules to children
• Model healthy device use yourself
• Check for app-specific parental controls`;

    downloadTextFile('parental-controls-guide.txt', content);
}

function downloadActivitiesList() {
    const content = `50 SCREEN-FREE FAMILY ACTIVITIES
${'='.repeat(50)}

QUICK ACTIVITIES (5 minutes or less):
1. Gratitude circle - share one thing you're grateful for
2. Dance party to one song
3. Group hug marathon
4. Quick breathing exercise together
5. 5-minute tidy game with timer
6. Call grandparents or extended family
7. Look out window and describe what you see
8. Do 10 jumping jacks together
9. Practice making silly faces
10. Share your favorite part of the day

SHORT ACTIVITIES (15-30 minutes):
11. Board game or card game
12. Read together - same book or different books in same room
13. Family yoga or stretching
14. Cook a simple snack together
15. Art time with whatever supplies you have
16. Charades or acting games
17. Build something with blocks, LEGOs, or household items
18. Nature walk around neighborhood
19. Backyard games (catch, frisbee, tag)
20. Write or tell stories together

MEDIUM ACTIVITIES (30-60 minutes):
21. Baking or cooking project
22. Garden together (indoor or outdoor)
23. Scavenger hunt in house or yard
24. Craft project or DIY activity
25. Bike ride or longer walk
26. Board game tournament
27. Rearrange/redecorate a room together
28. Photo scavenger hunt (with camera, not phone)
29. Plan and prep for upcoming family events
30. Learn something new together (origami, magic tricks)

LONGER ACTIVITIES (1+ hours):
31. Visit local park or nature area
32. Plan and cook entire meal together
33. Major art or craft project
34. Organize family photos or memories
35. Deep clean and organize space together
36. Plan future family adventures
37. Create family newsletter or scrapbook
38. Learn new skill together (instrument, language)
39. Volunteer together in community
40. Explore new part of town or county

SEASONAL ACTIVITIES:
41. WINTER: Build snowman, make hot cocoa, indoor fort
42. SPRING: Plant garden, clean house, nature collection
43. SUMMER: Water games, camping in backyard, stargazing
44. FALL: Rake leaves, harvest garden, prepare for winter

HARNEY COUNTY SPECIFIC:
45. Visit Malheur National Wildlife Refuge
46. Explore local history at Harney County Museum
47. Attend community events in Burns or Hines
48. Fish at local lakes or streams
49. Hike local trails and explore high desert
50. Support local businesses and farmers markets

TIPS FOR SUCCESS:
• Rotate activities to keep them fresh
• Let kids help choose and plan activities
• Keep supplies handy for spontaneous fun
• Make activities regular family traditions
• Adjust for weather and seasons
• Include extended family when possible
• Focus on connection, not perfection

Remember: The goal is family connection and fun, not perfect execution!`;

    downloadTextFile('50-screen-free-activities.txt', content);
}

// Video Functions
function playVideo(videoId) {
    // In a real implementation, this would open a video player
    // For now, show a placeholder message
    const videoTitles = {
        'ios-setup': 'Setting Up iPhone Screen Time',
        'android-setup': 'Android Family Link Setup',
        'conversation-tips': 'Having the Screen Time Conversation',
        'media-plan': 'Creating a Family Media Plan',
        'cyberbullying-signs': 'Recognizing Cyberbullying Signs',
        'mindful-cards': 'Making Mindful Moment Cards'
    };
    
    alert(`Video: "${videoTitles[videoId]}"\n\nVideo content coming soon! For now, please check our written guides and step-by-step instructions on the relevant pages.`);
}

// Community Functions
function openStoryForm() {
    const storyForm = `
    <div class="story-form-overlay">
        <div class="story-form-modal">
            <h3>Share Your Success Story</h3>
            <form id="success-story-form">
                <div class="form-group">
                    <label>What was your family's main digital wellness challenge?</label>
                    <textarea placeholder="Describe the challenge you were facing..."></textarea>
                </div>
                <div class="form-group">
                    <label>What strategies or tools did you use?</label>
                    <textarea placeholder="What from this toolkit helped most..."></textarea>
                </div>
                <div class="form-group">
                    <label>What positive changes have you seen?</label>
                    <textarea placeholder="How has your family benefited..."></textarea>
                </div>
                <div class="form-group">
                    <label>Would you like to include your name/location? (optional)</label>
                    <input type="text" placeholder="First name & general location (e.g., Sarah M., Burns area)">
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" required>
                        I give permission to share my story anonymously to help other families
                    </label>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Share Story</button>
                    <button type="button" class="btn btn-outline" onclick="closeStoryForm()">Cancel</button>
                </div>
            </form>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', storyForm);
    
    // Add event listener for form submission
    document.getElementById('success-story-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for sharing your story! We\'ll review it and may include it (anonymously) in future updates to help other families.');
        closeStoryForm();
    });
}

function closeStoryForm() {
    const overlay = document.querySelector('.story-form-overlay');
    if (overlay) {
        overlay.remove();
    }
}

function joinCommunity() {
    alert('Community forum coming soon! For now, connect with other parents through our newsletter and local school events. Check with Harney County School District for current parent group information.');
}

function viewForumGuidelines() {
    const guidelines = `COMMUNITY FORUM GUIDELINES

Our parent community is built on mutual respect and support. To maintain a safe, helpful environment for all families:

BE RESPECTFUL
• Treat all parents with kindness and understanding
• Remember that every family situation is different
• No judgment about parenting choices or family circumstances

STAY FOCUSED
• Keep discussions related to digital wellness and family support
• Share experiences, ask questions, and offer encouragement
• Avoid political, religious, or controversial off-topic discussions

PROTECT PRIVACY
• Don't share personal information about other families
• Use first names only or post anonymously
• Don't share photos of other people's children

BE HELPFUL
• Share what's worked for your family
• Ask questions - no question is too basic
• Offer support and encouragement to struggling parents

REPORT CONCERNS
• Let moderators know about inappropriate posts
• Report any concerning content about child safety
• Help maintain a positive community atmosphere

REMEMBER
• We're all learning and doing our best
• What works for one family may not work for another
• Support and encouragement go a long way

Questions? Contact: community@harneycountydigitalwellness.org`;

    alert(guidelines);
}

// Newsletter Functions
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const weeklyTips = document.getElementById('weekly-tips').checked;
            const newResources = document.getElementById('new-resources').checked;
            const communityEvents = document.getElementById('community-events').checked;
            
            // Store subscription preferences
            const subscription = {
                email: email,
                weeklyTips: weeklyTips,
                newResources: newResources,
                communityEvents: communityEvents,
                subscribed: new Date().toISOString()
            };
            
            localStorage.setItem('newsletterSubscription', JSON.stringify(subscription));
            
            // Show success message
            const form = e.target;
            form.innerHTML = `
                <div class="subscription-success">
                    <h3>✅ You're subscribed!</h3>
                    <p>Welcome to the Harney County Digital Wellness community. Your first weekly tip will arrive soon!</p>
                    <p>Check your email for a confirmation message.</p>
                </div>
            `;
        });
    }
});

// Helper function for downloads
function downloadTextFile(filename, content) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}