# Rebranding & CSS Reorganization - TODO

## ✅ Completed

### Design System v2.0 - "Crimson Night"
- [x] tokens.css - Colors, typography, spacing, borders
- [x] animations.css - Keyframes + utility classes  
- [x] utilities.css - Responsive breakpoints, scrollbar, etc.
- [x] reset.css - Base normalization
- [x] global.css - Main entry point (imports all)

### Components Updated (v2.0 styling)
- [x] header.module.css
- [x] Footer.module.css
- [x] Button.module.css
- [x] Card.module.css
- [x] Input.module.css
- [x] Contact.module.css
- [x] section.module.css
- [x] HistorySection.module.css
- [x] EventsSection.module.css
- [x] ArtistSection.module.css
- [x] ArtistCard.module.css
- [x] InstagramCard.module.css
- [x] SuscribeBanner.module.css
- [x] GalleryModal.module.css
- [x] gallery.module.css

### Admin Updated
- [x] admin.module.css
- [x] login.module.css

## 📋 Pending

- [ ] Test build with `npm run build`
- [ ] Verify all components render correctly
- [ ] Check mobile responsiveness

## 📁 New Structure

```
src/
├── styles/                          ← NEW: Design System
│   ├── tokens.css                   ← Colors, fonts, spacing
│   ├── animations.css              ← @keyframes + classes
│   ├── utilities.css               ← Breakpoints, scrollbar
│   ├── reset.css                  ↑
│   └── global.css                 ← Entry point
│
├── components/                     ← Colocalized CSS (module.css)
│   ├── *.module.css              ← Section styles
│   └── ui/
│       └── *.module.css         ← UI component styles
│
├── shared/
│   └── styles/
│       └── global.css           ← OLD - Can delete
```

## 🎨 New Color Palette

| Token | Value |
|-------|-------|
| --color-bg-primary | #0a0a0a |
| --color-bg-secondary | #0f0f0f |
| --color-accent | #dc2626 |
| --color-accent-glow | rgba(220,38,38,0.4) |
| --color-text-muted | #a3a3a3 |
