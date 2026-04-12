# Design System Strategy: The Architectural Portfolio

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Architect"**

This design system is built to reflect the mind of a senior engineer: precise, structural, and quietly confident. We are moving away from the "standard developer portfolio" (flat grids and heavy borders) toward a high-end editorial experience. The system leverages **Asymmetric Structuralism**—using intentional white space and staggered content blocks to create a rhythm that feels curated rather than templated.

The aesthetic is "Refined Shadcn"—taking the utility of a functional component library and elevating it through tonal depth, obsessive attention to typography, and the total removal of decorative lines. Reliability is communicated through stability; expertise is shown through restraint.

---

## 2. Colors & Tonal Depth
The palette is rooted in a "Deep Space" philosophy. We use dark slates and zinc tones not as flat backgrounds, but as layered environments.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections or containers. 
- Boundaries must be achieved via **Background Shifting**. For example, a card using `surface-container-low` should sit on a `surface` background. 
- Use **Negative Space** as a separator. If two sections need to be distinct, increase the vertical margin to 128px or 160px rather than drawing a line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers of obsidian and frosted glass.
- **Base Layer:** `surface` (#060e20) – The infinite foundation.
- **Sectional Layer:** `surface-container-low` (#06122d) – Use for large secondary content blocks.
- **Interactive Layer:** `surface-container` (#05183c) – The standard for cards and navigation elements.
- **Prominence Layer:** `surface-container-highest` (#00225a) – Reserved for modal overlays or active states.

### The "Glass & Gradient" Rule
To inject "soul" into the technical aesthetic, use subtle radial gradients. A primary CTA or a Hero background should feature a soft glow transitioning from `primary` (#bdc2ff) to `primary-container` (#2f3aa3) at a low 10-15% opacity. This creates a "backlit" effect common in premium hardware interfaces.

---

## 3. Typography: Editorial Authority
We use a dual-typeface system to balance technical precision with high-end editorial design.

*   **Display & Headlines (Manrope):** Chosen for its geometric stability and wide stance. It communicates "The Expert." 
    *   *Usage:* Use `display-lg` for hero statements with tight letter-spacing (-0.02em) to create a high-impact, "locked-in" feel.
*   **Body & Labels (Inter):** The industry standard for readability. It communicates "The Reliable."
    *   *Usage:* Always use `body-md` (#dee5ff) for long-form text, ensuring a line-height of at least 1.6 to maintain the "Modern" feel.

**Hierarchy Note:** Use `on-surface-variant` (#91aaeb) for secondary metadata to create a natural visual recession, allowing the primary headlines to command the eye.

---

## 4. Elevation & Depth
In this system, elevation is a function of light and color, not physics.

*   **The Layering Principle:** Depth is achieved by "stacking" the surface-container tiers. Place a `surface-container-lowest` card on a `surface-container-low` section to create a soft, natural "recessed" look.
*   **Ambient Shadows:** For floating elements (like a navigation bar or dropdown), use a shadow with a blur radius of 40px and 4% opacity. The shadow color must be a tinted indigo derived from `on-surface` (#dee5ff) to ensure it feels like ambient light occlusion rather than a "drop shadow."
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, it must be a "Ghost Border": use `outline-variant` (#2b4680) at 15% opacity. 
*   **Glassmorphism:** Navigation menus and overlays should use `surface` at 70% opacity with a `20px` backdrop-blur. This integrates the component into the environment.

---

## 5. Components

### Buttons
- **Primary:** Background `primary` (#bdc2ff), text `on-primary` (#28329c). Radius: `md` (0.375rem). Use a subtle inner-glow (top white border at 10% opacity) to create a tactile, premium feel.
- **Secondary (Ghost):** No background. `outline` (#5b74b1) ghost border. Transitions to `surface-container` on hover.
- **Tertiary:** Text only, using `secondary` (#06b77f) for a "Modern/Emerald" accent.

### Cards & Lists
- **Rule:** Forbid divider lines. Use `surface-container-low` for the card body and `surface-container` for a subtle hover state.
- **Lists:** Separate list items with 24px of vertical space. Lead with a `secondary` (#06b77f) accent icon to denote "Action/Success."

### Inputs & Forms
- **Fields:** Use `surface-container-lowest` for the input field. The active state should not use a thick border, but a 1px `primary` glow and a slight increase in the `backdrop-blur`.
- **Labels:** Always use `label-md` in `on-surface-variant`.

### Signature Component: The "Code Snippet" Block
- Instead of a standard black box, use `surface-container-highest` with a `secondary_dim` (#00b47d) left-accent rail. This reinforces the "Senior Developer" persona through a specialized, high-contrast code environment.

---

## 6. Do’s and Don’ts

### Do:
- **Embrace Asymmetry:** Align a headline to the left and the body text to a 60% width column on the right.
- **Use Wide Gutters:** Give your content room to breathe. Use the `xl` (0.75rem) roundedness for large image containers to soften the technical edge.
- **Tint your Blacks:** Ensure your background is never pure `#000000` (unless in `surface-container-lowest`). Always use the slate-indigo `surface` base.

### Don’t:
- **Don’t use "Default" Shadows:** Avoid the standard black, high-opacity shadows found in basic UI kits.
- **Don’t use 100% Opaque Dividers:** They break the editorial flow. If you must divide, use a 20% opacity `outline-variant`.
- **Don’t Over-Accent:** The emerald (`secondary`) and indigo (`primary`) should be "subtle accents." They are the garnish, not the meal. Use them only for CTAs, status indicators, or focus states.

### Accessibility Note:
While we use low-contrast surface shifts for depth, all text must maintain a 4.5:1 ratio against its immediate background. Use the `on-surface` and `on-surface-variant` tokens strictly to ensure readability for all users.