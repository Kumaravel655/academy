# Sunshine Academy Animations - Quick Reference

## All 10 Animations at a Glance

### 1️⃣ animate-sun-rise
```jsx
<div className="animate-sun-rise">Content</div>
```
- **Duration**: 0.8s
- **Effect**: Fade-in + move up (50px → 0px)
- **Loop**: No (single animation)
- **Best for**: Page sections, hero elements, headings
- **Delay usage**: `style={{ animationDelay: '0.2s' }}`

---

### 2️⃣ animate-sun-glow
```jsx
<div className="animate-sun-glow">Glowing element</div>
```
- **Duration**: 3s
- **Effect**: Pulsing box-shadow with color transitions (golden ↔ orange)
- **Loop**: Infinite
- **Best for**: Badges, logos, accent elements
- **Shadow colors**: Golden yellow to warm orange (3 layers)

---

### 3️⃣ animate-sun-float
```jsx
<div className="animate-sun-float">Floating card</div>
```
- **Duration**: 4s
- **Effect**: Gentle vertical movement (±15px)
- **Loop**: Infinite
- **Best for**: Cards, decorative elements, highlights
- **Feel**: Peaceful, weightless, playful

---

### 4️⃣ animate-sun-spin
```jsx
<div className="animate-sun-spin">☀️</div>
```
- **Duration**: 10s
- **Effect**: 360° continuous rotation
- **Loop**: Infinite
- **Best for**: Sun emoji, circular badges, icons
- **Smoothness**: Linear (constant speed)

---

### 5️⃣ animate-light-beam
```jsx
<div className="animate-light-beam">Light</div>
```
- **Duration**: 2s
- **Effect**: Opacity fade (0 → 0.5 → 0) + scale + upward movement
- **Loop**: Infinite
- **Best for**: Light ray effects, decorative beams
- **Pro tip**: Use multiple with staggered delays

---

### 6️⃣ animate-shimmer
```jsx
<div className="animate-shimmer">Shimmering text</div>
```
- **Duration**: 3s
- **Effect**: Opacity pulsing (1 → 0.6 → 1)
- **Loop**: Infinite
- **Best for**: Subtle effects, status indicators
- **Feeling**: Elegant, gentle, understated

---

### 7️⃣ animate-sun-rays **(NEW)**
```jsx
<div className="animate-sun-rays">Rotating rays</div>
```
- **Duration**: 20s
- **Effect**: Slow rotation (360°) with scale and opacity changes
- **Loop**: Infinite
- **Best for**: Background ray effects, sun decorations
- **Effect**: Creates rotating sunshine rays effect

---

### 8️⃣ animate-sun-pulse **(NEW)**
```jsx
<div className="animate-sun-pulse">Pulsing sun</div>
```
- **Duration**: 4s
- **Effect**: Scale pulsing (1 → 1.1 → 1) with opacity (0.2 → 0.3 → 0.2)
- **Loop**: Infinite
- **Best for**: Central sun core, radial gradients
- **Feel**: Breathing, living sunshine

---

### 9️⃣ animate-sun-wave **(NEW)**
```jsx
<div className="animate-sun-wave">Waving element</div>
```
- **Duration**: 6s
- **Effect**: Figure-8 movement pattern (circular wave motion)
- **Loop**: Infinite
- **Best for**: Background elements, ambient effects
- **Feel**: Gentle, flowing, organic

---

### 🔟 animate-particle-float **(NEW)**
```jsx
<div className="animate-particle-float">Particle</div>
```
- **Duration**: 8s
- **Effect**: Float upward with fade in/out (0 → 0.3 → 0) and slight scale
- **Loop**: Infinite
- **Best for**: Light particles, ambient sparkles
- **Pro tip**: Use with staggered delays for cascading effect

---

## Practical Examples

### Hero Section with Multiple Animations
```jsx
<section className="animate-sun-rise">
  <h1 className="animate-sun-rise" style={{ animationDelay: '0.1s' }}>
    Brighten Your Future
  </h1>
  <div className="animate-sun-glow">
    Featured Content
  </div>
</section>
```

### Animated Cards
```jsx
<div className="animate-sun-float" style={{ animationDelay: '0s' }}>
  Card 1
</div>
<div className="animate-sun-float" style={{ animationDelay: '0.5s' }}>
  Card 2
</div>
<div className="animate-sun-float" style={{ animationDelay: '1s' }}>
  Card 3
</div>
```

### Advanced Sunshine Effect with Rays
```jsx
<div className="relative w-96 h-96">
  {/* Central sun */}
  <div className="absolute inset-0 bg-primary rounded-full opacity-20 animate-sun-pulse"></div>
  
  {/* Rotating rays */}
  <div className="absolute inset-0 animate-sun-rays">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="absolute top-1/2 left-1/2 w-1 h-20 bg-primary opacity-20"
        style={{ transform: `rotate(${i * 30}deg) translateY(-50%)` }}
      />
    ))}
  </div>
</div>
```

### Floating Particles Effect
```jsx
<div className="relative h-screen">
  {[...Array(10)].map((_, i) => (
    <div
      key={i}
      className="absolute w-2 h-2 bg-primary rounded-full animate-particle-float"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${i * 0.5}s`,
      }}
    />
  ))}
</div>
```

### Waving Background Element
```jsx
<div className="absolute inset-0">
  <div className="w-64 h-64 bg-secondary rounded-full blur-3xl opacity-10 animate-sun-wave"></div>
</div>
```

### Spinning Sun Icon
```jsx
<div className="w-16 h-16 rounded-full bg-primary animate-sun-glow animate-sun-spin flex items-center justify-center">
  <span className="text-3xl">☀️</span>
</div>
```

### Light Ray Effect
```jsx
<div className="absolute inset-0">
  {[0, 1, 2].map((i) => (
    <div
      key={i}
      className="animate-light-beam absolute top-0 left-1/2"
      style={{ animationDelay: `${i * 0.5}s` }}
    />
  ))}
</div>
```

### Shimmering Badge
```jsx
<span className="animate-shimmer px-3 py-1 bg-primary text-white rounded-full">
  Featured ✨
</span>
```

---

## Combining Animations

You can layer multiple animations on one element:

```jsx
// Glowing + Spinning
<div className="animate-sun-glow animate-sun-spin">
  ☀️
</div>

// Rising + Glowing (sequential)
<div className="animate-sun-rise animate-sun-glow" style={{ animationDelay: '0.2s' }}>
  Important content
</div>

// Floating + Shimmering
<div className="animate-sun-float animate-shimmer">
  Soft, moving element
</div>
```

---

## Animation Timing Chart

| Animation | Duration | Loop | Use Case |
|-----------|----------|------|----------|
| sun-rise | 0.8s | No | Entrance effects |
| sun-glow | 3s | ✓ | Focus elements |
| sun-float | 4s | ✓ | Playful movement |
| sun-spin | 10s | ✓ | Rotating icons |
| light-beam | 2s | ✓ | Light effects |
| shimmer | 3s | ✓ | Subtle effects |
| sun-rays | 20s | ✓ | Background rays |
| sun-pulse | 4s | ✓ | Breathing glow |
| sun-wave | 6s | ✓ | Flowing motion |
| particle-float | 8s | ✓ | Floating particles |

---

## Color Reference

The animations work with these Sunshine Academy colors:

```css
--primary: 38 100% 52%;     /* Golden Yellow #FFC452 */
--secondary: 20 95% 50%;    /* Warm Orange #FF8032 */
--background: 45 100% 95%;  /* Soft Cream #FCF5EE */
--foreground: 25 80% 15%;   /* Dark Brown #442815 */
```

---

## Performance Tips

✅ **Best Practices:**
- Animations use `transform` and `opacity` (GPU accelerated)
- No layout thrashing
- Smooth 60fps performance
- Works on all modern browsers

⚠️ **Avoid:**
- Animating width/height (causes reflow)
- Animating large elements constantly
- Too many simultaneous animations
- Animations on low-end devices

---

## Browser Support

All animations use standard CSS3:
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Customization

Want to adjust animation speeds? Edit `/app/globals.css`:

```css
.animate-sun-rise {
  animation: sunRise 0.8s ease-out;  /* Change 0.8s to your value */
}

.animate-sun-glow {
  animation: sunGlow 3s ease-in-out infinite;  /* Change 3s */
}
```

---

## Quick Copy-Paste Templates

### Animated Button
```jsx
<button className="animate-sun-glow hover:animate-sun-spin bg-primary px-6 py-2 rounded">
  Click Me
</button>
```

### Animated Heading
```jsx
<h1 className="animate-sun-rise text-4xl font-bold">
  Welcome to Sunshine Academy ☀️
</h1>
```

### Animated Section
```jsx
<section className="animate-sun-rise py-20">
  Your content here
</section>
```

### Floating Featured Box
```jsx
<div className="animate-sun-float bg-card p-6 rounded-lg border-2 border-primary">
  ⭐ Featured Course
</div>
```

---

Enjoy creating with Sunshine Academy animations! ☀️✨
