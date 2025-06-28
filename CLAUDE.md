# Harney County Digital Wellness Website

## Project Overview
Modern, comprehensive static website for Harney County, Oregon parents providing evidence-based digital wellness tools and resources. Built with a professional healthcare aesthetic and deployed on GitHub Pages with full mobile-first responsive design.

## Technical Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Hosting**: GitHub Pages with Jekyll processing
- **Design System**: Advanced CSS custom properties with modern healthcare/parenting aesthetic
- **Icons**: Professional SVG icon library (inline data URIs)
- **Fonts**: Inter (headings), Source Sans Pro (body text) via Google Fonts
- **Storage**: localStorage for offline functionality and data persistence

## Key Features
### Interactive Tools
- **Digital Wellness Quiz**: 3-question assessment with personalized recommendations
- **Risk Assessment**: 30-second evaluation with 8 warning signs checklist
- **Screen Time Tracker**: Interactive logging with weekly averages and insights
- **Sleep Quality Tracker**: Monitor sleep patterns and energy correlation
- **Family Media Plan Generator**: Customizable templates and agreements
- **Safe Playlist Builder**: Curated music recommendations for students
- **Mindful Moment Cards**: Screen-free activities and breathing exercises

### Comprehensive Content
- **Evidence-Based Guidelines**: AAP and Common Sense Media recommendations
- **Cyberbullying Prevention**: Step-by-step reporting and intervention guides
- **Parental Controls**: iOS and Android setup with screenshots
- **Crisis Support**: 24/7 helplines and local Harney County resources
- **Professional Directory**: Local mental health and family support services

## Modern Design System v3.0
### Enhanced Color Palette
- **Primary**: Deep Sage Green (#4A6741) with variants
  - Light: #6B8A5C, Dark: #3A5233, Subtle: #E8F0E6
- **Secondary**: Warm Navy (#2C3E50) with variants
  - Light: #4A6572, Dark: #1E2D3A, Subtle: #E8EDF2
- **Background**: Warm Cream (#FEFCFA)
- **Surface**: Pure White (#FFFFFF) for cards
- **Accent**: Gentle Coral (#E8A87C) with variants
  - Light: #F2C4A0, Dark: #D48B5C, Subtle: #FDF6F2
- **Text**: Rich Charcoal (#2D3748) with semantic variants
  - Secondary: #4A5568, Tertiary: #718096, Inverse: #FFFFFF

### Professional Typography System
- **Headings**: Inter (300, 400, 500, 600, 700) - Modern, accessible
- **Body**: Source Sans Pro (400, 600) - Highly readable, professional
- **Monospace**: SF Mono, Monaco, Cascadia Code - For code examples
- **Font Scale**: 12px to 48px with proper line heights
- **Letter Spacing**: Refined spacing for better readability

### Component Library
- **Buttons**: Primary, secondary, outline variants with hover states
- **Cards**: Modern design with gradient borders and hover effects
- **Icons**: Professional SVG library with consistent styling
- **Navigation**: Glassmorphism with pill-style active states
- **Forms**: Enhanced validation states and accessibility

## File Structure
```
/
├── index.html              # Homepage with hero, quiz, quick access
├── quick-start.html        # 30-second assessment & action plans
├── digital-wellness.html   # Screen time guidelines & tracking
├── online-safety.html      # Cyberbullying prevention & controls
├── mindful-breaks.html     # Activities & mindful moments
├── parent-toolkit.html     # Downloads & community resources
├── get-help.html          # Crisis support & local contacts
├── survey.html            # Pre/post evaluation survey
├── styles-new.css         # Main stylesheet with design system
├── script.js              # Navigation & homepage interactions
├── quick-start.js         # Risk assessment & action plans
├── tracking-tools.js      # Screen time & sleep trackers
├── survey.js              # Survey functionality & validation
└── _config.yml            # Jekyll configuration for GitHub Pages
```

## Local Context - Harney County, Oregon
### School District
- **Harney County School District #3**
- Phone: (541) 573-6461
- Schools: Burns Elementary, Burns Middle, Burns High, Hines Middle

### Key Local Resources
- **Mental Health**: (541) 573-9686
- **Health District**: (541) 573-6661
- **Library**: (541) 573-6670
- **Crisis Support**: 988, 911, text HOME to 741741

## Interactive Components
### Quiz System (index.html + script.js)
- 3-question wellness assessment
- Personalized recommendations based on responses
- Results stored in localStorage
- Smooth transitions and accessibility features

### Risk Assessment (quick-start.html + quick-start.js)
- 8-point warning signs checklist
- Automatic risk scoring (0-8 scale)
- Conditional recommendations based on score
- Action plan generator with local resources

### Tracking Tools (digital-wellness.html + tracking-tools.js)
- Interactive screen time logger with weekly averages
- Sleep quality tracker with energy correlation
- Data visualization with Chart.js-style displays
- Export functionality for family discussions

### Survey System (survey.html + survey.js)
- 6-section evaluation matching toolkit requirements
- Real-time validation and progress tracking
- Anonymous data collection with localStorage
- Export functionality for program evaluation

## Content Guidelines
### Tone & Voice
- Supportive, non-judgmental, empowering
- Evidence-based recommendations (AAP, Common Sense Media)
- Local community focus
- Practical, actionable advice

### Accessibility
- WCAG 2.1 AA compliance
- 44px minimum touch targets
- Proper heading hierarchy
- Focus management for interactive elements
- Reduced motion support

## Development Notes
### Modern CSS Architecture
- **Design System**: Comprehensive CSS custom properties with semantic naming
- **Component-Based**: Modular, reusable components with consistent API
- **Mobile-First**: Responsive breakpoints at 768px, 1024px with container queries
- **Performance**: Efficient selectors, minimal specificity, optimized rendering
- **Accessibility**: WCAG 2.1 AA compliant with proper focus management

### Advanced JavaScript Patterns
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Event Delegation**: Efficient handling for dynamic content
- **Error Boundaries**: Graceful degradation with user feedback
- **State Management**: localStorage with fallbacks and data validation
- **Performance**: Debounced events, lazy loading, minimal DOM manipulation

### Design System Implementation
- **Spacing Scale**: 4px base unit with consistent multipliers
- **Typography**: Fluid scaling with clamp() for responsive text
- **Color System**: Semantic color tokens with light/dark variants
- **Icon Library**: SVG data URIs for performance and consistency
- **Animation**: Purposeful micro-interactions with reduced motion support

### Performance Optimizations
- **Bundle Size**: <300KB total including fonts and icons
- **Critical Path**: Inline critical CSS, defer non-essential resources
- **Image Strategy**: Modern formats with WebP fallbacks
- **Caching**: Efficient cache headers for static assets
- **Core Web Vitals**: Optimized for LCP, FID, and CLS metrics

## Testing Commands
```bash
# Lint and validate (when available)
npm run lint
npm run typecheck

# Local development server
python -m http.server 8000
# or
npx live-server
```

## Deployment
- **Platform**: GitHub Pages
- **Build**: Automatic Jekyll processing
- **Domain**: Configure in repository settings
- **SSL**: Automatic via GitHub Pages

## Future Enhancements
- [ ] Add Google Analytics for usage tracking
- [ ] Implement proper backend for survey data
- [ ] Add print-friendly CSS for offline resources
- [ ] Create video tutorials for complex features
- [ ] Add Spanish language translations
- [ ] Integrate with school district systems

## Contact Information
- **Email**: info@harneycountydigitalwellness.org
- **Feedback**: GitHub Issues or survey responses

## Design System Phases Completed

### **Phase 1: Visual Foundation** ✅
- Enhanced color palette with semantic variants
- Professional typography system with proper scale
- Comprehensive SVG icon library replacing emojis
- Modern CSS custom properties architecture

### **Phase 2: Layout Overhaul** ✅
- Glassmorphism navigation with pill-style active states
- Modern hero section with gradient overlays
- Advanced card components with hover effects
- Enhanced mobile navigation and responsive design

### **Phase 3: Polish & Performance** ✅
- Professional icon implementation across all pages
- Smooth micro-interactions and animations
- Optimized mobile experience with touch-friendly UI
- Performance optimization and accessibility compliance

## Version History
- **v1.0**: Basic site structure and content (March 2024)
- **v2.0**: Interactive tools and tracking features (May 2024)
- **v3.0**: Modern design system implementation (June 2024)
  - Professional SVG icon library
  - Enhanced color and typography systems
  - Advanced component library
  - Improved mobile experience
  - Performance optimizations

## Browser Testing
### Tested Configurations
- **Chrome 126+**: Full compatibility with modern features
- **Firefox 127+**: Complete feature support
- **Safari 17+**: iOS and macOS compatibility verified
- **Edge 126+**: Modern Chromium-based features
- **Mobile**: iOS Safari 17+, Android Chrome 126+

### Accessibility Testing
- **Screen Readers**: NVDA, JAWS, VoiceOver compatibility
- **Keyboard Navigation**: Full functionality without mouse
- **Color Contrast**: WCAG AA compliance verified
- **Focus Management**: Proper tab order and visual indicators

---
*Last updated: June 2024*
*Total project scope: 10,503 lines of code across 8 HTML pages, modern CSS design system, and 4 JavaScript modules*
*Design system: 3 phases complete with professional healthcare aesthetic*