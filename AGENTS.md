# AGENTS.md

## Static Website

This is a **static HTML/CSS/JS website** — no build system, no tests, no package manager.

## Project Structure

- `/index.html` - Root entry (auto-redirects to `/en/` or `/it/` based on browser language)
- `/en/`, `/it/`, `/hi/` - Language-specific subdirectories
- `/styles.css` - Main stylesheet with CSS variables
- `/scripts.js` - Main JavaScript file

## Developer Commands

None required. This is a static site — edit files directly and deploy.

## Brand Colors

Primary: `#00A1A1` (defined in `--color-primary` in `styles.css`)

## Existing AI-Readable Docs

- `/llms.txt` - AI-friendly site summary
- `/robots.txt` - Crawler directives
- `/.well-known/agent-skills/` - OpenCode agent skills