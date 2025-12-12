# Light Mode Implementation Plan

This plan outlines the steps to implement a system-aware Light/Dark mode toggle for your portfolio. We will leverage Chakra UI's built-in color mode capabilities and refactor your existing CSS variables to be theme-aware.

## Goal
Enable seamless switching between Light and Dark modes, honoring system preferences by default, with a manual toggle in the UI.

## User Review Required
> [!IMPORTANT]
> **Semantic Variable Strategy**: We will introduce semantic CSS variables (e.g., `--bg-primary`, `--tex-primary`) to replace hardcoded colors like `--void`.
> **Framer Motion**: Components using JavaScript-based color values (like the Header's scroll effect) will need tailored refactoring to react to mode changes.

## Proposed Changes

### 1. Style System Refactor (`src/styles/global.css`)
Refactor the CSS variables to support theming using data attributes.

- **Objective**: Create a single source of truth for colors that automatically switches based on `[data-theme="light"]` or `[data-theme="dark"]`.
- **Changes**:
    - Move concrete colors (e.g., `--void`, `--warm-coral`) to a `:root` scope.
    - Create semantic variables that map to these colors depending on the theme.
    - Example:
      ```css
      :root {
          --void: #0a0a0f;
          --white: #ffffff;
          /* ... other base colors ... */
      }
      
      [data-theme="dark"] {
          --bg-primary: var(--void);
          --text-primary: #f0f0ff;
      }
      
      [data-theme="light"] {
          /* Use a light color instead of void */
          --bg-primary: #f5f5f7; 
          --text-primary: var(--void);
      }
      ```
    - Update strict mappings in `body` and other global styles to use semantic variables.

### 2. Provider Setup (`src/components/ui/color-mode.tsx` & `src/main.tsx`)
Ensure the app is wrapped in the correct Chakra UI Color Mode Provider.

- **New Component**: Create a `ColorModeProvider` wrapper if one is not already provided by the `defaultSystem` or requires configuration.
- **Update**: `src/main.tsx` to include the provider.

### 3. Build Toggle Component (`src/components/layout/ColorModeToggle.tsx`)
Create a toggle button to switch modes.

- **Features**:
    - Sun/Moon icon transition.
    - Uses `useColorMode` hook from Chakra UI.
    - Accessible button design.

### 4. Component Updates
Update existing components to use the new semantic variables and hooks.

#### Layout (`src/components/layout/Header.tsx`)
- **Action**: Add `ColorModeToggle` to the navigation bar.
- **Refactor**: Update `framer-motion` background logic.
    - The `useTransform` hook currently hardcodes `rgba(10, 10, 15, ...)`.
    - Refactor to use current theme context or CSS variables if possible (though Framer Motion prefers numerical/color values).
    - **Approach**: Use `useColorModeValue` to switch the RGBA strings dynamically.

#### App Wrapper (`src/App.tsx`)
- **Action**: Ensure `<Box bg="var(--void)" ...>` is updated to `<Box bg="var(--bg-primary)" ...>`.

### 5. Mobile & System Preference
- Ensure the app defaults to `system` preference on first load.
- Verify `theme-color` meta tag updates (optional but recommended for mobile handling).

## Verification Plan

### Automated Tests
- N/A (Mainly visual changes).

### Manual Verification
1.  **Toggle Test**: Click the toggle; verify background, text, and accents invert correctly.
2.  **System Sync**: Change OS appearance to Light/Dark; verify app follows suit (if system mode is active).
3.  **Persistance**: Refresh page; verify the selected mode persists.
4.  **Mobile Header**: Scroll on mobile and desktop in Light mode; ensure the blur/background effect looks correct (not dark background with dark text).
