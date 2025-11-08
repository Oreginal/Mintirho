# Smoothie Bike Experience - Design Style Guide

## Design Philosophy

### Visual Language
**Playful Energy**: The design embodies the joy and excitement of pedaling to create fresh, healthy smoothies. Every element should feel dynamic, engaging, and full of life.

**Health-Focused Wellness**: Clean, fresh aesthetics that communicate nutrition, vitality, and wellbeing through bright colors and organic shapes.

**Interactive Engagement**: Design elements encourage user interaction and exploration, making the experience feel personal and memorable.

### Color Palette
**Primary Colors** (exactly as provided):
- `--primary-color: #3face4` (Vibrant Sky Blue) - Main brand color, used for CTAs and key elements
- `--accent-color: #c41010` (Energetic Red) - Accent for highlights and energy indicators
- `--bg-color: #f9f9ff` (Soft Lavender White) - Clean background that feels fresh
- `--text-light: #777777` (Medium Gray) - Secondary text and subtle elements
- `--text-dark: #000000` (Pure Black) - Primary text for maximum readability
- `--secondary-color: #4A7C59` (Fresh Green) - Natural, health-focused accent

### Typography
**Primary Font**: "Poppins" - Modern, friendly sans-serif for headings
**Secondary Font**: "Inter" - Clean, readable sans-serif for body text
**Font Hierarchy**:
- Hero Headings: 3.5rem, bold, with gradient effects
- Section Headings: 2.5rem, semi-bold
- Body Text: 1rem, regular
- Button Text: 1.1rem, medium weight

## Visual Effects & Styling

### Animation Library Usage
**Anime.js**: 
- Smooth scroll-triggered animations for section reveals
- Interactive hover effects on cards and buttons
- Pedal power counter animations
- Smooth color transitions for flavor selector

**Typed.js**:
- Dynamic typewriter effect for hero tagline
- Engaging text reveals in benefits section

**Splide.js**:
- Smooth testimonial carousel with auto-play
- Interactive customer review gallery

### Header Effects
**Aurora Gradient Flow Background**: 
- Subtle animated gradient using primary and secondary colors
- Creates dynamic, energetic atmosphere
- Smooth color transitions that never distract from content

### Interactive Elements
**Flavor Selector Wheel**:
- Circular design with 8 fruit combinations
- Smooth rotation animations
- Color-coded sections using palette colors
- Hover effects with 3D tilt

**Benefit Cards**:
- 3D flip animations on hover
- Color-coded borders matching health benefits
- Smooth shadow transitions

**Pedal Power Demo**:
- Animated progress bars
- Real-time energy visualization
- Color transitions from red (low energy) to green (high energy)

### Scroll Motion Effects
**Reveal Animations**:
- Sections fade in with subtle upward motion (16px)
- Staggered timing for card elements (50ms delays)
- Smooth easing curves for natural feel
- Trigger point: 60% viewport entry

**Parallax Elements**:
- Background fruit illustrations with subtle movement
- Hero image with gentle floating animation
- Decorative elements with depth layering

### Hover Effects
**WhatsApp Buttons**:
- Gentle scale transform (1.05x)
- Color shift from primary to darker blue
- Subtle shadow expansion
- Smooth 200ms transitions

**Interactive Cards**:
- 3D tilt effect (5-degree rotation)
- Elevated shadow
- Color accent reveal
- Smooth 300ms transitions

### Background Styling
**Consistent Theme**: Soft aurora gradient flow throughout all sections
**Decorative Elements**: 
- Floating fruit particles using CSS animations
- Subtle geometric patterns in corners
- Organic shapes that complement the health theme

### Mobile Responsiveness
**Breakpoints**:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px  
- Desktop: 1024px+

**Adaptive Design**:
- Touch-friendly interactive elements (44px minimum)
- Simplified animations for mobile performance
- Responsive typography scaling
- Optimized image loading