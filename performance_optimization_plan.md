# Mobile Performance Optimization Plan

The goal is to eliminate lag, flickering, and slow performance on mobile devices (specifically iPhone).

## Problem Analysis
1.  **Review of `ParallaxBlobs.tsx` and `MorphingBlob.tsx`**:
    - Uses `filter: blur(60px)` on large active elements. This is extremely expensive on mobile GPUs.
    - Continuous CSS layout/morph animations (`border-radius`, `transform`).
    - Multiple layers of transparency and blending.
2.  **Review of `Header.tsx`**:
    - Animates `backdrop-filter` on scroll. This triggers constant repaints/compositing updates which causes flickering on iOS.

## Proposed Changes

### 1. Optimize `MorphingBlob`
Replace the expensive `filter: blur()` strategy with a performant `radial-gradient`. This achieves a similar visual softness without the heavy GPU cost of a real-time blur filter.

- **Current**: `background-color` + `filter: blur(60px)`
- **New**: `background: radial-gradient(circle at center, ${color}, transparent 70%)`

### 2. Disable/Reduce Animations on Mobile
We need a way to detect mobile or reduce motion preference.
- Add `useIsMobile` hook (or use Chakra's `useBreakpointValue`).
- In `ParallaxBlobs`, reduce the number of blobs or stop the `morph` animation on mobile.
- Alternatively, simplify the background entirely on mobile.

### 3. Optimize Header
- Remove `backdrop-filter` animation.
- Should use a static blur or solid background on scroll for mobile.

## Implementation Steps

### Step 1: Optimize MorphingBlob
Modify `src/components/animations/MorphingBlob.tsx`:
- Use `radial-gradient` instead of `filter: blur`.
- Conditionally apply the `morph` animation (limit it or remove it for mobile if possible, or use `will-change: transform`).

### Step 2: Simplify ParallaxBlobs for Mobile
Modify `src/components/animations/ParallaxBlobs.tsx`:
- Use media queries or `useBreakpointValue` to render fewer blobs or reduce their size/movement on small screens.

### Step 3: Fix Header Flickering
Modify `src/components/layout/Header.tsx`:
- Disable `backdrop-filter` animation. Use simple opacity fade for background.

## Verification Plan

### Manual Verification
- Run `vite preview` and access via local network on an actual iPhone (if available) or use Chrome DevTools Mobile Emulation with "CPU Throttling" set to 4x or 6x slowdown to simulate mobile capability.
- Check for 60fps scrolling and no flickering.
