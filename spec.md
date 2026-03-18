# PharmaBill

## Current State
- Backend requires #admin permission for addMedicine/updateMedicine/deleteMedicine (already fixed to #user)
- NewBill.tsx has inline add-customer dialog but no inline add-medicine
- Inventory.tsx allows adding medicine but only admins could save (now fixed)

## Requested Changes (Diff)

### Add
- Inline "Add New Medicine" quick-dialog in NewBill.tsx, triggered by a "+" button next to the medicine search field in each row. Dialog fields: Name, Generic Name, Batch, Expiry, HSN, Unit, Selling Price, Purchase Price, GST%, Stock Qty. After saving, auto-selects the new medicine in the row.
- useAddMedicine hook already exists in useQueries.ts

### Modify
- NewBill.tsx: add AddMedicineDialog component (similar to existing new-customer dialog) and wire it to the medicine search row
- Inventory.tsx: no changes needed — backend permission fix handles the save error

### Remove
- Nothing removed

## Implementation Plan
1. Add AddMedicineDialog state and UI to NewBill.tsx
2. Show a small "+" icon button next to medicine search in each row OR a single floating "Add New Medicine" link in the dropdown when no match found
3. On save, call useAddMedicine, then selectMedicine with the new medicine
4. Validate and show toast on success/error
