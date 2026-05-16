# Theme (Light / Dark Mode) Spec

## Overview

DevStash supports light and dark themes. Dark is the default. Users can toggle between themes at runtime. The theme system is already wired up via shadcn/ui CSS variables — no additional CSS is needed.

## How It Works

shadcn/ui generates two sets of CSS variables in `src/app/globals.css`:

- `:root { ... }` — light theme values
- `.dark { ... }` — dark theme overrides

Adding the `dark` class to the `<html>` element activates dark mode. Removing it falls back to light mode.

## Requirements

- Dark mode is the default on first load
- User can toggle between light and dark
- Preference is persisted to `localStorage`
- No flash of wrong theme on page load (use `next-themes`)
- Toggle button in the top bar

## Implementation Plan

### 1. Install next-themes

```bash
pnpm add next-themes
```

### 2. Wrap the app in ThemeProvider

In `src/app/layout.tsx`, wrap children with `ThemeProvider`:

```tsx
import { ThemeProvider } from 'next-themes'

<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
  {children}
</ThemeProvider>
```

- `attribute="class"` — adds/removes the `dark` class on `<html>`
- `defaultTheme="dark"` — dark on first load
- `enableSystem={false}` — ignore OS preference (we control the default)

### 3. Remove the hardcoded `dark` class

In `src/app/layout.tsx`, remove `dark` from the `<html>` className — `next-themes` will manage it:

```tsx
// Before
<html className="... dark h-full antialiased">

// After
<html className="... h-full antialiased">
```

### 4. Add a theme toggle button to the top bar

In `src/components/layout/top-bar.tsx`, use the `useTheme` hook from `next-themes`:

```tsx
'use client'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}
```

## References

- `src/app/layout.tsx` — ThemeProvider goes here
- `src/app/globals.css` — CSS variables for both themes already defined
- `src/components/layout/top-bar.tsx` — toggle button goes here
- [next-themes docs](https://github.com/pacocoursey/next-themes)
