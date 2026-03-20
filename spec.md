# PharmaBill

## Current State
The Motoko backend uses `Map.empty<Nat, T>()` for all data (bills, medicines, customers, distributors, purchases) with non-stable variables. The `preupgrade()` hook is empty, so every canister upgrade (i.e., every app rebuild/deploy) wipes all stored data. This is why the user's previous bills are gone.

## Requested Changes (Diff)

### Add
- Stable arrays for all data collections: `stableMedicines`, `stableCustomers`, `stableBills`, `stableDistributors`, `stablePurchases`
- Stable vars for all ID counters
- `preupgrade` logic to serialize all in-memory Maps to stable arrays before upgrade
- `postupgrade` logic to restore all Maps from stable arrays after upgrade

### Modify
- `preupgrade()` -- populate stable arrays from Maps
- `postupgrade()` -- restore Maps from stable arrays, then run sample data init only if data is empty
- All `var nextXId` counters changed to `stable var`
- `initialized` changed to `stable var`

### Remove
- Empty `preupgrade()` body

## Implementation Plan
1. Declare stable arrays for each collection and stable ID counters
2. In `preupgrade`, copy each Map to its stable array
3. In `postupgrade`, copy stable arrays back into Maps; only init sample data if customers is empty
