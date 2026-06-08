# Exact Pixel Styling Skill

## Rule: All measurements must be exact pixels

**NO percentages, NO CSS variables for spacing/typography, NO relative units (rem/em) for layout.**

### Mandatory Specifications

#### Spacing Scale (exact pixels)
- xs: 4px
- s: 8px
- m: 16px
- l: 24px
- xl: 32px
- xxl: 48px

#### Border Radius Scale
- s: 4px
- m: 8px
- l: 12px
- xl: 16px
- round: 50% (only for circular elements)

#### Typography Scale (exact pixels)
- xs: 11px
- sm: 12px
- body: 15px
- base: 16px
- lg: 18px
- xl: 20px
- 2xl: 24px
- 3xl: 28px
- 4xl: 32px
- 5xl: 40px
- 6xl: 48px

#### Font Weights
- normal: 400
- medium: 500
- semibold: 600
- bold: 700

#### Letter Spacing
- tight: 0.5px
- normal: 0
- wide: 1.5px (for uppercase labels)

#### Transitions
- fast: 0.15s ease
- base: 0.2s ease
- slow: 0.3s ease

#### Focus Ring
- width: 3px
- offset: 0

#### Z-Index Scale
- base: 1
- dropdown: 100
- modal: 200
- toast: 300
- tooltip: 400

### Breakpoints (exact pixels)
- mobile: ≤360px
- mobile-lg: 361-480px
- tablet: 481-768px
- desktop: 769-1024px
- desktop-lg: 1025-1440px
- xl: ≥1441px

### Component Specifications

#### Button
- height: 48px (default), 52px (tablet), 56px (mobile FAB)
- border-radius: 12px (default), 28px (mobile FAB), 24px (small FAB)
- padding: 14px 28px (default), 0 (FAB)
- font-size: 15px (default), 16px (tablet)
- icon size: 20px (default), 24px (mobile FAB), 20px (small FAB)

#### Input
- height: auto (min 44px for touch)
- border-radius: 8px
- padding: 12px 16px
- font-size: 15px
- label: 11px, uppercase, letter-spacing 1.5px, weight 600
- gap label-input: 8px
- error text: 12px, margin-top 4px

#### Card
- border-radius: 12px
- padding: 24px
- border: 1px solid var(--input-border)

#### Grid
- gap: 32px
- min-column: 320px

#### Container
- max-width: 1200px

### Enforcement Checklist
When writing CSS, verify:
- [ ] No `%` widths on components (except `width: 100%` on full-width inputs inside wrappers)
- [ ] No `var(--gap-*)` or `var(--padding-*)` or `var(--font-*)` for measurements
- [ ] No `rem`/`em` for layout (only for `font-size` if using relative scaling, but prefer px)
- [ ] All spacing uses exact pixel values from scale above
- [ ] All border-radius uses exact pixel values from scale above
- [ ] All font-sizes use exact pixel values from scale above
- [ ] Media queries use exact pixel breakpoints from above
- [ ] Touch targets minimum 44×44px (48×48px preferred)

### Example Usage
```css
/* ❌ Bad */
.gap { gap: var(--gap-l); }
.text { font-size: var(--font-body); }
.btn { padding: var(--padding-m) var(--padding-xl); }

/* ✅ Good */
.gap { gap: 24px; }
.text { font-size: 15px; }
.btn { padding: 14px 28px; height: 48px; border-radius: 12px; }
```

### Applies To
- All `.module.css` files
- All global styles
- All component styles
- Any new styling work