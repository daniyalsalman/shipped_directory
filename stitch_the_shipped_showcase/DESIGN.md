---
name: Lumina Paper
colors:
  surface: '#fef7ff'
  surface-dim: '#dfd7e5'
  surface-bright: '#fef7ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f9f1ff'
  surface-container: '#f3ebf9'
  surface-container-high: '#ede5f3'
  surface-container-highest: '#e7e0ed'
  on-surface: '#1d1a24'
  on-surface-variant: '#4a4454'
  inverse-surface: '#332f39'
  inverse-on-surface: '#f6eefc'
  outline: '#7b7485'
  outline-variant: '#ccc3d6'
  surface-tint: '#6e3dd0'
  primary: '#6c3acd'
  on-primary: '#ffffff'
  primary-container: '#8557e8'
  on-primary-container: '#fffbff'
  inverse-primary: '#d1bcff'
  secondary: '#684ab5'
  on-secondary: '#ffffff'
  secondary-container: '#ac8efe'
  on-secondary-container: '#401d8b'
  tertiary: '#7c5400'
  on-tertiary: '#ffffff'
  tertiary-container: '#9d6b00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d1bcff'
  on-primary-fixed: '#24005b'
  on-primary-fixed-variant: '#561cb7'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cfbcff'
  on-secondary-fixed: '#22005d'
  on-secondary-fixed-variant: '#50309c'
  tertiary-fixed: '#ffddaf'
  tertiary-fixed-dim: '#feba47'
  on-tertiary-fixed: '#281800'
  on-tertiary-fixed-variant: '#614000'
  background: '#fef7ff'
  on-background: '#1d1a24'
  surface-variant: '#e7e0ed'
  paper: '#FFFFFF'
  soft-surface: '#FAF8F4'
  purple-soft: '#F5F0FF'
  purple-light: '#EDE6FF'
  ink-secondary: '#2A2533'
  mute: '#6B6677'
  border-rule: '#E8E5EE'
typography:
  display-lg:
    fontFamily: Instrument Serif
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-md:
    fontFamily: Instrument Serif
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.1'
  headline-lg:
    fontFamily: Instrument Serif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Instrument Serif
    fontSize: 28px
    fontWeight: '400'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-safe: 32px
  container-max: 1200px
---

## Brand & Style

This design system embodies a sophisticated "paper" aesthetic, blending the tactile quality of high-end stationery with modern digital precision. The brand personality is intellectual, clean, and premium, targeting developers and creators who value clarity and understated elegance.

The design style is a hybrid of **Minimalism** and **Tactile Modernism**. It utilizes expansive white space, crisp borders, and a restricted but vibrant accent palette to create a high-contrast, legible environment. The "paper" feel is achieved through subtle off-white backgrounds and a deliberate focus on editorial-grade typography, while interactivity is signaled through soft "lifts" and tonal shifts rather than heavy shadows.

## Colors

The palette is anchored by "Paper" and "Soft" neutrals to establish a warm, tactile base. The primary purple (`#9B6DFF`) serves as the functional accent for actions and highlights, while its deeper variant (`#6B4DB8`) provides necessary contrast for text-on-accent scenarios.

**Ink** colors (`#0E0B14`) are used for primary text to ensure maximum legibility against the light surfaces, avoiding pure black for a more organic feel. The **Border Rule** (`#E8E5EE`) is a critical component of the system, used to define structure without adding visual weight.

## Typography

This design system uses a triple-font strategy to create a rich hierarchy:
- **Instrument Serif** is reserved for large display titles and headlines, providing a literary, high-end editorial feel. It should always be used with tight line-heights.
- **Inter** handles all body copy and UI text, ensuring high legibility and a contemporary functional feel.
- **JetBrains Mono** is utilized for metadata, tags, and small labels, injecting a "technical" or "utility" aesthetic that balances the elegance of the serif.

Maintain generous vertical rhythm by adhering strictly to the defined line heights.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop environments, centered with a maximum width of 1200px. It utilizes a 12-column structure with wide 24px gutters to allow the "paper" background to breathe.

- **Desktop:** 12 columns, 32px side margins.
- **Tablet:** 8 columns, 24px side margins.
- **Mobile:** 4 columns, 16px side margins.

Vertical rhythm is governed by a 4px base unit. Components and sections should prioritize "Negative Space" to reinforce the premium feel. Group related elements with tight spacing (8-12px) while separating major sections with large gaps (64-96px).

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Low-Contrast Outlines** rather than aggressive shadows. 

1.  **Base Layer:** The "Soft" surface (`#FAF8F4`) acts as the canvas.
2.  **Raised Layer:** "Paper" surfaces (`#FFFFFF`) are used for cards and primary containers.
3.  **Borders:** All interactive containers must use a 1px border (`#E8E5EE`).
4.  **Interaction (Hover):** When hovered, cards and buttons should exhibit a "Hover Lift"—a subtle translation of -2px to -4px on the Y-axis accompanied by a soft, low-opacity shadow (4% opacity black, 12px blur) to simulate physical movement.

## Shapes

The shape language is "Generously Rounded." While the system defaults to `rounded-md` (0.5rem) for smaller inputs, primary containers and large cards should utilize `rounded-lg` (1rem / 16px) or `rounded-xl` (1.5rem / 24px) to create a friendly, approachable silhouette. 

Buttons should feel substantial, often using the higher end of the corner radius scale (14px-22px) to contrast against the sharp, disciplined grid.

## Components

### Buttons
- **Primary:** Purple background (`#9B6DFF`), white text. 18px corner radius. Subtle 1px inner stroke in a lighter purple.
- **Secondary:** Paper background, 1px border (`#E8E5EE`), Ink text.
- **Interaction:** On hover, primary buttons darken slightly; secondary buttons lift and the border color shifts to primary purple.

### Cards
- Always white (`#FFFFFF`) with a 1px border (`#E8E5EE`).
- Use `rounded-xl` for large feature cards.
- Content inside should have generous padding (minimum 24px).

### Input Fields
- Soft background (`#FAF8F4`) with a 1px border. 
- Focus state: Border changes to primary purple with a 2px outer "glow" (0.1 opacity purple).
- Labels use **JetBrains Mono** (`label-md`).

### Chips & Tags
- Use `purple-soft` background with `secondary-purple` text. 
- Font: **JetBrains Mono** (`label-sm`).
- Fully pill-shaped (999px radius).

### Lists
- Separated by thin 1px horizontal rules (`#E8E5EE`).
- List items feature a subtle background hover state (`#F5F0FF`).