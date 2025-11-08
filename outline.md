# Smoothie Bike Experience - Project Outline

## File Structure
```
/mnt/okcomputer/output/
├── index.html              # Main website file
├── resources/              # Local assets folder
│   ├── hero-smoothie-bike.png    # Generated hero image
│   ├── smoothie-bike-1.jpg       # Stationary bike with blender
│   ├── fruit-ingredients.jpg     # Colorful fruit ingredients
│   ├── customer-1.jpg            # Testimonial customer photo
│   ├── customer-2.jpg            # Testimonial customer photo
│   ├── customer-3.jpg            # Testimonial customer photo
│   └── fruit-icons/              # Generated fruit illustrations
└── design.md               # Design style guide
└── interaction.md          # Interaction specifications
└── outline.md              # This project outline
```

## Website Sections

### 1. Hero Section
**Purpose**: Immediate engagement and clear value proposition
**Content**:
- Generated hero image of smoothie bike
- Bold heading: "Pedal Your Way to Fresh Smoothies!"
- Interactive flavor selector wheel (8 fruit combinations)
- Typewriter tagline: "Blend a fresh drink using your own energy"
- Primary WhatsApp CTA button
- Floating fruit particle animations

**Interactive Elements**:
- Flavor wheel with smooth rotation
- Color transitions on selection
- Animated ingredient reveals

### 2. How It Works Section
**Purpose**: Simple, clear process explanation
**Content**:
- Three-step visual process
- Pedal power counter demonstration
- Step 1: Choose your fruits
- Step 2: Pedal to blend
- Step 3: Enjoy your creation

**Interactive Elements**:
- Animated pedal power counter
- Progress visualization
- Step-by-step reveal animations

### 3. Benefits Section
**Purpose**: Highlight health and experience advantages
**Content**:
- Four benefit cards with flip animations
- Energy Boost, Fresh Nutrition, Fun Exercise, Memorable Experience
- Health-focused copy with nutritional highlights
- Color-coded benefit categories

**Interactive Elements**:
- 3D card flip animations
- Hover-activated detailed information
- Smooth color transitions

### 4. Reviews Section
**Purpose**: Social proof and credibility
**Content**:
- 4 fictional customer testimonials
- Star ratings and customer photos
- Experience highlights and recommendations
- Auto-playing carousel with manual controls

**Interactive Elements**:
- Smooth carousel transitions
- Pause on hover functionality
- Star rating animations

### 5. Contact Section
**Purpose**: Clear call-to-action for enquiries
**Content**:
- Enquiry form invitation
- Secondary WhatsApp CTA button
- Pricing enquiry messaging
- Contact information display

**Interactive Elements**:
- WhatsApp button hover effects
- Smooth scroll-to-contact functionality

## Technical Implementation

### Libraries Used
1. **Anime.js** - Smooth animations and transitions
2. **Typed.js** - Typewriter effects for dynamic text
3. **Splide.js** - Testimonial carousel functionality
4. **Custom CSS** - Scroll animations and hover effects

### Animation Timeline
1. **Page Load**: Hero section fade-in with staggered elements
2. **Scroll Triggers**: Section reveals at 60% viewport
3. **Hover States**: Immediate response with 200-300ms transitions
4. **Auto-play**: Review carousel with 4-second intervals

### Responsive Breakpoints
- **Mobile (320-768px)**: Single column, simplified interactions
- **Tablet (768-1024px)**: Two-column layout, touch-optimized
- **Desktop (1024px+)**: Full interactive experience

### Performance Optimizations
- Lazy loading for images
- Optimized animation performance
- Mobile-first responsive design
- Compressed assets for fast loading

## Content Strategy

### Tone & Voice
- **Energetic**: Exclamation points, action words
- **Health-focused**: Nutritional benefits, fresh ingredients
- **Inclusive**: "Everyone can enjoy", "all fitness levels"
- **Experience-driven**: Focus on fun and memories

### Key Messages
1. "Transform your energy into delicious nutrition"
2. "Fun fitness meets fresh flavors"
3. "Create memorable experiences while getting healthy"
4. "Pedal, blend, enjoy - it's that simple!"

### Call-to-Actions
- Primary: "Enquire for Pricing" (WhatsApp)
- Secondary: "Learn More" (scroll to sections)
- Engagement: Interactive elements throughout

## Success Metrics
- **Engagement**: Time spent on interactive elements
- **Conversion**: WhatsApp enquiry clicks
- **Experience**: Smooth animations and responsive design
- **Accessibility**: Clear typography and color contrast