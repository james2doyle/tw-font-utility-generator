# CRUSH.md - Tailwind v4 Font Utility Generator

## Project Overview
This is a React + Vite + TypeScript web application that generates custom Tailwind CSS v4 font utilities. Users can create font families with different styles and export CSS using the new `@utility` directive.

## Essential Commands

### Development
- `npm run dev` - Start development server on port 3000 (host 0.0.0.0)
- `npm run build` - Build for production to `docs/` directory
- `npm run preview` - Preview production build

### No Testing
There are no test scripts or testing framework configured.

## Code Organization
- `App.tsx` - Main application component with state management
- `components/` - React components (FontFamilyGroup, FontStyleRow, OutputPanel, icons)
- `types.ts` - TypeScript interfaces (FontStyle, FontFamily)
- `constants.ts` - Default font families configuration
- `vite.config.ts` - Vite configuration with alias `@/` pointing to root
- `tsconfig.json` - TypeScript configuration with path aliases and JSX react-jsx

## Naming Conventions
- **Components**: PascalCase (FontFamilyGroup, OutputPanel)
- **Interfaces**: PascalCase (FontStyle, FontFamily)
- **Properties**: camelCase (fontSize, fontWeight, letterSpacing)
- **Functions**: camelCase with descriptive names (handleAddFamily, handleUpdateStyle)
- **Files**: PascalCase for components, camelCase for utilities

## Code Patterns

### Component Structure
- Use functional components with `React.FC<Props>`
- Define props interfaces for each component
- Use `useCallback` for event handlers to prevent unnecessary re-renders
- Import types from relative paths (`../types`)

### State Management
- Local state with `useState` in App component
- State persisted in URL hash using `btoa()`/`atob()` for base64 encoding
- Unique IDs generated with `crypto.randomUUID()`

### Styling
- Tailwind CSS classes throughout
- Responsive design with `md:` prefixes
- Utility-first approach with custom color scheme (slate)

### CSS Generation
- Generates Tailwind v4 `@utility` directives
- CSS variables for font families (`--font-${prefix}`)
- Utility names follow pattern: `type-${prefix}-${fontSize}${fontWeight/10}`

## Linting and Diagnostics
- Uses Biome linter
- Common issues:
  - Buttons missing `type="button"` (a11y error)
  - Import statements not sorted
  - Type-only imports should use `import type` syntax
  - Node.js builtins should use `node:` protocol

## Build Configuration
- Builds to `docs/` directory for GitHub Pages deployment
- Base path: `/tw-font-utility-generator/`
- Alias `@/` resolves to project root

## Gotchas and Non-Obvious Patterns
- State is serialized to URL hash for persistence - handles malformed data gracefully
- CSS generation skips invalid styles (fontSize <= 0, fontWeight <= 0, empty prefix)
- Components use `aria-label` for accessibility
- Table structure for font style editing with responsive overflow
- No form submission - all interactions are immediate state updates</content>
<parameter name="file_path">CRUSH.md