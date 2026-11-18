# AI

## Mission
Create implementation-ready, token-driven UI guidance for AI that is optimized for consistency, accessibility, and fast delivery across content site.

## Brand
- Product/brand: AI
- URL: https://wpwebinfotech.com/
- Audience: developers and technical teams
- Product surface: content site

## Style Foundations
- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=Poppins`, `font.family.stack=Poppins, Poppins Fallback, sans-serif, Arial, Helvetica`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=30px`
- Typography scale: `font.size.xs=0px`, `font.size.sm=13px`, `font.size.md=13.33px`, `font.size.lg=14px`, `font.size.xl=15px`, `font.size.2xl=16px`, `font.size.3xl=18px`, `font.size.4xl=20px`
- Color palette: `color.border.default=#000000`, `color.text.secondary=#ffffff`, `color.text.tertiary=#0095d8`, `color.text.inverse=#517584`, `color.surface.strong=#f0faff`
- Spacing scale: `space.1=1px`, `space.2=4px`, `space.3=5px`, `space.4=6px`, `space.5=8px`, `space.6=9px`, `space.7=10px`, `space.8=11px`
- Radius/shadow/motion tokens: `radius.xs=3px`, `radius.sm=8px`, `radius.md=10px`, `radius.lg=18px`, `radius.xl=20px`, `radius.2xl=30px`, `radius.step7=50px`, `radius.step8=100px` | `shadow.1=rgba(3, 47, 49, 0.08) 0px 11px 18px 0px`, `shadow.2=rgb(0, 103, 153) 0px 1px 0px 0px`, `shadow.3=rgba(0, 149, 216, 0.25) 0px 4px 4px 0px` | `motion.duration.instant=200ms`, `motion.duration.fast=250ms`, `motion.duration.normal=300ms`, `motion.duration.slow=400ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: links (300), buttons (63), lists (59), cards (45), inputs (2), navigation (2).

- Extraction diagnostics: Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
