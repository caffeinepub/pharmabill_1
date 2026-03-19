# PharmaBill

## Current State
PharmaBill is a pharmacy billing app with a Motoko backend on the Internet Computer. All data (medicines, customers, bills, distributors, purchases) is stored on the IC backend and accessed via React Query hooks in `useQueries.ts`. The actor is created in `useActor.ts`. Pharmacy profile is the only data stored in localStorage. There is no offline support — if internet is unavailable, the app cannot load or save data.

## Requested Changes (Diff)

### Add
- `useOfflineStore.ts` hook: manages localStorage-based cache for medicines, customers, bills, distributors, purchases
- `useOnlineStatus.ts` hook: detects online/offline status using browser events
- `usePendingSync.ts` hook: queues mutations made while offline and replays them when back online
- Online/offline status indicator badge in Layout.tsx header (green = online, red = offline)
- On first load (online), populate localStorage cache from backend data
- When offline: all reads served from localStorage cache; all writes saved locally and queued
- When back online: pending queue is flushed to backend, then cache is refreshed
- Toast notification when going offline and when sync completes on reconnect

### Modify
- `useQueries.ts`: wrap all queries to fall back to localStorage cache when actor call fails or device is offline; wrap all mutations to queue locally when offline
- `Layout.tsx`: add online/offline indicator badge in the header

### Remove
- Nothing removed

## Implementation Plan
1. Create `useOnlineStatus.ts` — simple hook using `window.addEventListener('online'/'offline')`
2. Create `useOfflineStore.ts` — read/write each data type to localStorage with typed helpers
3. Modify `useQueries.ts` — detect offline state, serve from cache on reads, queue mutations on writes
4. Create sync logic — on reconnect, flush queued mutations to backend, then invalidate all queries
5. Modify `Layout.tsx` — add a small colored dot/badge showing Online/Offline status
6. Add toast notifications for offline mode entry and sync completion
