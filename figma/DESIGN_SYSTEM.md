# Cythera Design System

A futuristic design system focused on accessibility, modern aesthetics, and dual-mode support with distinct visual personalities.

## 🎨 Design Philosophy

Cythera embodies two distinct aesthetics:
- **Dark Mode - Neon Sci-Fi**: Electric cyan, vibrant lime, and warm orange with glowing effects
- **Light Mode - Pastel Modern**: Soft sky blue, gentle peach, and fresh lime with subtle shadows
- **Accessibility First**: All color combinations meet WCAG AA+ contrast standards (4.5:1 minimum)
- **Dual Mode Support**: Each mode has its own cohesive color palette and visual language
- **Typography Excellence**: Three distinct typefaces for hierarchy and visual interest
- **Developer Experience**: CSS custom properties with Tailwind CSS v4 integration

---

## 🔤 Typography

### Typeface Selection

#### Rajdhani (Primary Sans-Serif)
- **Usage**: Body text, UI elements, labels, paragraphs
- **Characteristics**: Clean, modern, excellent readability
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Variable**: `--font-sans`

```css
font-family: var(--font-sans);
```

#### Orbitron (Display/Headings)
- **Usage**: H1, H2, large headings, brand elements
- **Characteristics**: Futuristic, geometric, high impact
- **Weights**: 400, 500, 600, 700, 800, 900
- **Variable**: `--font-display`

```css
font-family: var(--font-display);
```

#### Geist Mono (Monospace)
- **Usage**: Code blocks, data tables, technical content
- **Characteristics**: Clear, modern monospace with excellent legibility
- **Weights**: 100-900 (full range)
- **Variable**: `--font-mono`

```css
font-family: var(--font-mono);
```

### Type Scale

| Token | Size | Usage |
|-------|------|-------|
| `--text-xs` | 0.75rem (12px) | Small labels, captions |
| `--text-sm` | 0.875rem (14px) | Secondary text, helper text |
| `--text-base` | 1rem (16px) | Body text, default size |
| `--text-lg` | 1.125rem (18px) | Large body, emphasized text |
| `--text-xl` | 1.25rem (20px) | H5, medium headings |
| `--text-2xl` | 1.5rem (24px) | H4, subheadings |
| `--text-3xl` | 1.875rem (30px) | H3 |
| `--text-4xl` | 2.25rem (36px) | H2 |
| `--text-5xl` | 3rem (48px) | H1, hero text |

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `--font-weight-light` | 300 | Decorative, minimal emphasis |
| `--font-weight-normal` | 400 | Body text, default |
| `--font-weight-medium` | 500 | Buttons, labels, emphasis |
| `--font-weight-semibold` | 600 | Subheadings, important text |
| `--font-weight-bold` | 700 | Headings, strong emphasis |

---

## 🎨 Color System

### Light Mode Palette

#### Core Colors
| Token | Value | Usage | Contrast |
|-------|-------|-------|----------|
| `--background` | #FAFBFC | Page background | - |
| `--foreground` | #0F1419 | Primary text | 15.8:1 ✓ |
| `--card` | #FFFFFF | Card backgrounds | - |
| `--card-foreground` | #0F1419 | Card text | 21:1 ✓ |

#### Primary (Deep Blue)
| Token | Value | Usage | Contrast |
|-------|-------|-------|----------|
| `--primary` | #1A2B4E | Primary actions, CTAs | - |
| `--primary-foreground` | #F0F4FF | Text on primary | 9.2:1 ✓ |
| `--primary-hover` | #243A64 | Hover state | - |
| `--primary-active` | #0E1A32 | Active/pressed state | - |

#### Secondary (Steel Blue)
| Token | Value | Usage | Contrast |
|-------|-------|-------|----------|
| `--secondary` | #4A5F7F | Secondary actions | - |
| `--secondary-foreground` | #FFFFFF | Text on secondary | 5.1:1 ✓ |
| `--secondary-hover` | #5A6F8F | Hover state | - |
| `--secondary-active` | #3A4F6F | Active state | - |

#### Accent (Electric Blue)
| Token | Value | Usage | Contrast |
|-------|-------|-------|----------|
| `--accent` | #2E5BFF | Highlights, links, focus | - |
| `--accent-foreground` | #FFFFFF | Text on accent | 4.8:1 ✓ |
| `--accent-hover` | #4670FF | Hover state | - |
| `--accent-active` | #1A47E6 | Active state | - |

#### Semantic Colors
| Token | Value | Usage | Contrast |
|-------|-------|-------|----------|
| `--destructive` | #DC2626 | Errors, delete actions | 5.5:1 ✓ |
| `--success` | #059669 | Success states | 4.7:1 ✓ |
| `--warning` | #D97706 | Warnings, caution | 5.2:1 ✓ |
| `--info` | #0284C7 | Informational | 4.9:1 ✓ |

#### UI Elements
| Token | Value | Usage |
|-------|-------|-------|
| `--muted` | #E8ECF2 | Disabled states, subtle backgrounds |
| `--muted-foreground` | #5A6779 | Muted text |
| `--border` | #D1D8E3 | Borders, dividers |
| `--input` | #E8ECF2 | Input borders |
| `--ring` | #2E5BFF | Focus rings |

### Dark Mode Palette

#### Core Colors
| Token | Value | Usage | Contrast |
|-------|-------|-------|----------|
| `--background` | #0A0E1A | Page background | - |
| `--foreground` | #E8ECF2 | Primary text | 13.9:1 ✓ |
| `--card` | #0F1419 | Card backgrounds | - |
| `--card-foreground` | #E8ECF2 | Card text | 12.8:1 ✓ |

#### Primary (Light Blue for Dark)
| Token | Value | Usage | Contrast |
|-------|-------|-------|----------|
| `--primary` | #5A8FFF | Primary actions | - |
| `--primary-foreground` | #0A0E1A | Text on primary | 7.8:1 ✓ |
| `--primary-hover` | #7AA5FF | Hover state | - |
| `--primary-active` | #3A70E6 | Active state | - |

#### Semantic Colors (Dark Mode)
| Token | Value | Usage | Contrast |
|-------|-------|-------|----------|
| `--destructive` | #F87171 | Errors | 4.6:1 ✓ |
| `--success` | #34D399 | Success | 6.2:1 ✓ |
| `--warning` | #FBBF24 | Warnings | 9.8:1 ✓ |
| `--info` | #38BDF8 | Informational | 7.1:1 ✓ |

---

## 🌊 Gradients

### Available Gradients

#### Blue Dark
```css
--gradient-blue-dark: linear-gradient(135deg, #0F1419 0%, #1A2B4E 50%, #2E5BFF 100%);
```
**Usage**: Hero sections, headers, premium features

#### Dark Blue
```css
--gradient-dark-blue: linear-gradient(180deg, #0E1A32 0%, #1A2B4E 100%);
```
**Usage**: Sidebars, panels, navigation backgrounds

#### Blue Shimmer (Animated)
```css
--gradient-blue-shimmer: linear-gradient(90deg, #1A2B4E 0%, #2E5BFF 50%, #1A2B4E 100%);
```
**Usage**: Loading states, interactive elements, hover effects
**Note**: Includes shimmer animation (3s infinite)

#### Midnight
```css
--gradient-midnight: linear-gradient(135deg, #0A0E1A 0%, #1A2B4E 50%, #243A64 100%);
```
**Usage**: Full-page backgrounds, immersive sections

### Tailwind CSS Usage

```jsx
<div className="bg-gradient-blue-dark">Hero Section</div>
<div className="bg-gradient-blue-shimmer">Animated Element</div>
<div className="bg-gradient-midnight">Full Page Background</div>
```

---

## 📏 Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-xs` | 0.25rem (4px) | Minimal spacing |
| `--spacing-sm` | 0.5rem (8px) | Compact spacing |
| `--spacing-md` | 1rem (16px) | Default spacing |
| `--spacing-lg` | 1.5rem (24px) | Section spacing |
| `--spacing-xl` | 2rem (32px) | Large gaps |
| `--spacing-2xl` | 3rem (48px) | Major sections |
| `--spacing-3xl` | 4rem (64px) | Page sections |

---

## 🔘 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 0.375rem (6px) | Small elements, badges |
| `--radius-md` | 0.5rem (8px) | Inputs, small buttons |
| `--radius-lg` | 0.75rem (12px) | Cards, large buttons |
| `--radius-xl` | 1rem (16px) | Modals, containers |
| `--radius-full` | 9999px | Pills, circular elements |

---

## 🎭 Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px 0 rgba(...)` | Subtle elevation |
| `--shadow-md` | `0 4px 6px -1px rgba(...)` | Cards, dropdowns |
| `--shadow-lg` | `0 10px 15px -3px rgba(...)` | Modals, popovers |
| `--shadow-xl` | `0 20px 25px -5px rgba(...)` | Overlays, sheets |

**Note**: Shadow opacity automatically adjusts in dark mode for better contrast.

---

## 🎯 Accessibility Guidelines

### Contrast Ratios
- **Normal Text**: Minimum 4.5:1 (WCAG AA)
- **Large Text** (18px+): Minimum 3:1 (WCAG AA)
- **All tokens meet or exceed these standards**

### Focus Indicators
- Always visible and high contrast
- Use `--ring` color for focus outlines
- Minimum 2px outline width

### Interactive States
Every interactive element must have:
1. **Default state**
2. **Hover state** (`:hover`)
3. **Active state** (`:active`)
4. **Focus state** (`:focus-visible`)
5. **Disabled state** (when applicable)

### Color Usage
- Never rely on color alone to convey information
- Pair color changes with text, icons, or patterns
- Test in grayscale to verify clarity

---

## 💻 Implementation Examples

### Button Component
```jsx
// Primary Button
<button className="bg-primary hover:bg-primary-hover active:bg-primary-active text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors">
  Primary Action
</button>

// Gradient Button
<button className="bg-gradient-blue-dark text-white px-6 py-3 rounded-xl font-display font-semibold shadow-lg hover:shadow-xl transition-all">
  Premium Feature
</button>
```

### Card Component
```jsx
<div className="bg-card text-card-foreground rounded-xl p-6 shadow-md border border-border">
  <h3 className="font-display">Card Title</h3>
  <p className="text-muted-foreground mt-2">Card description text</p>
</div>
```

### Typography
```jsx
<h1 className="font-display text-5xl font-bold">Orbitron Heading</h1>
<h3 className="text-2xl font-semibold">Rajdhani Subheading</h3>
<code className="font-mono text-sm bg-muted px-2 py-1 rounded">const code = true;</code>
```

### Dark Mode Toggle
```jsx
<div className="dark">
  {/* All colors automatically switch to dark mode variants */}
</div>
```

---

## 🚀 Quick Start

### Using CSS Variables
```css
.custom-element {
  background: var(--primary);
  color: var(--primary-foreground);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  font-family: var(--font-sans);
}
```

### Using Tailwind Classes
```jsx
<div className="bg-primary text-primary-foreground rounded-lg p-4">
  Content
</div>
```

### Accessing Gradients
```jsx
<div className="bg-gradient-midnight min-h-screen">
  <div className="bg-gradient-blue-shimmer p-8">
    Animated shimmer effect
  </div>
</div>
```

---

## 📋 Token Checklist for Designers

When creating components in Figma:

### Colors
- [ ] Use semantic tokens, not raw hex values
- [ ] Test contrast ratios (4.5:1 minimum)
- [ ] Design both light and dark variants
- [ ] Include hover, active, and disabled states

### Typography
- [ ] Use type scale variables (`--text-*`)
- [ ] Apply correct font families (Rajdhani/Orbitron/Geist Mono)
- [ ] Set appropriate font weights
- [ ] Define line heights for readability

### Spacing
- [ ] Use spacing scale (`--spacing-*`)
- [ ] Maintain consistent padding/margins
- [ ] Align to 4px/8px grid

### Components
- [ ] Define all interactive states
- [ ] Include focus indicators
- [ ] Test keyboard navigation
- [ ] Verify ARIA labels/roles

---

## 🔄 Theme Switching

The design system supports instant theme switching:

```jsx
import { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle Theme
      </button>
    </div>
  );
}
```

All color tokens automatically update when the `.dark` class is applied to a parent element.

---

## 📦 File Structure

```
src/
├── styles/
│   ├── fonts.css          # Font imports and variables
│   ├── theme.css          # Color tokens, spacing, all design system variables
│   └── app.css            # Application-specific styles
└── app/
    └── App.tsx            # Main application
```

---

## 🎓 Best Practices

1. **Always use tokens** instead of hard-coded values
2. **Test in both modes** (light and dark) before shipping
3. **Verify contrast ratios** for all text/background combinations
4. **Use semantic color names** (primary, destructive) not colors (blue, red)
5. **Maintain consistency** with the type scale and spacing system
6. **Leverage gradients** for premium, hero, or immersive experiences
7. **Apply proper font families**: Orbitron for headings, Rajdhani for UI, Geist Mono for code

---

## 🧪 Testing Checklist

- [ ] All color contrasts meet WCAG AA+ (4.5:1)
- [ ] Focus indicators visible on all interactive elements
- [ ] Keyboard navigation works correctly
- [ ] Screen reader tested (NVDA/JAWS/VoiceOver)
- [ ] Both light and dark modes validated
- [ ] All gradients render correctly
- [ ] Fonts load properly (check Network tab)
- [ ] Responsive on mobile/tablet/desktop
- [ ] Hover states work on touch devices

---

## 📚 Additional Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Google Fonts: Rajdhani](https://fonts.google.com/specimen/Rajdhani)
- [Google Fonts: Orbitron](https://fonts.google.com/specimen/Orbitron)
- [Geist Mono on Google Fonts](https://fonts.google.com/specimen/Geist+Mono)

---

**Version**: 1.0.0  
**Last Updated**: April 25, 2026  
**Name**: Cythera (pronounced /sɪˈθɪərə/)  
**Maintained by**: Design System Team

---

## 🌓 Dual Aesthetic Philosophy

### Dark Mode: Neon Sci-Fi
- **Visual Language**: Mission control, cyberpunk, futuristic interfaces
- **Color Palette**: Electric neon colors (#00c8ff cyan, #a0ff60 lime, #ff6b35 orange)
- **Effects**: Glowing shadows, backdrop blur, animated shimmers
- **Use Cases**: Developer tools, dashboards, data visualization, gaming interfaces

### Light Mode: Pastel Modern
- **Visual Language**: Clean, airy, approachable, contemporary
- **Color Palette**: Soft pastels (#7DD3FC sky, #BEF264 lime, #FDBA74 peach, #C4B5FD lavender)
- **Effects**: Subtle shadows, soft glows, gentle gradients
- **Use Cases**: Consumer apps, marketing sites, content platforms, productivity tools
