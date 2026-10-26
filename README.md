# ORBIT — personal productivity command center
Local-first, single-user, dark-only. React + TypeScript + Vite + Tailwind + Dexie (IndexedDB) + date-fns + Lucide.

## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build && npm run preview

## Structure
- `src/db.ts`  – data layer (Dexie schema, export/import)
- `src/ui.tsx` – shared components & date helpers (useToday, MonthGrid)
- `src/App.tsx` – layout and views

## Notes
- Routine completion is stored per (routineId, localDate); "today" is recomputed every second and on tab focus, so the reset is correct after overnight sleep/closed tabs. History is never deleted.
- Tasks have one record; calendar reads the same `tasks` table by `dueDate`.
- Not implemented: reminders/notifications, PWA/offline service worker.
