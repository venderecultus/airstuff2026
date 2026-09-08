## Context: Week parity and teacher links
Date: 2026-09-08
Agent: OpenCode

## Goal
Fix schedule week parity switching and synchronize teacher meeting links/access data.

## Artifacts Created
- `src/components/Schedule.tsx` - dynamic parity based on Monday anchor `2026-09-07`; refreshes every minute.
- No teacher link changes were needed; provided URLs already match `src/data.ts`.
- `.context/CONTEXT.md` - compact session context.

## Key Decisions
- Treat Monday `2026-09-07` as even week.
- Toggle parity every seven days from that Monday.
- Existing teacher URLs matched provided table; Prysyazhniuk's extra access code was not added because it is not a link and current model would change link-click behavior.
- Commit `077f3bd` pushed to `origin/main` before current link update.

## Files Touched
- `src/components/Schedule.tsx`: replaced hardcoded odd week with date-based parity and live refresh.
- `src/data.ts`: verified teacher URLs; no changes needed.
- `.context/CONTEXT.md`: this summary.
