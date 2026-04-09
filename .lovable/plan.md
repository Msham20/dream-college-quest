

## TNEA College Finder — Implementation Plan

### Overview
A single-purpose tool with glassmorphism design: frosted glass panels, gradients, depth effects. Two pages: **Search/Filter** and **Priority List**.

### Page 1: Search & Filter (Home `/`)
- **Top bar**: App name "TNEA College Finder" with a link to Priority List page, showing count of saved colleges
- **Filter panel** (glassmorphic card with backdrop-blur):
  - **Cut-off**: Numeric input with stepper
  - **Branch**: Searchable dropdown (CSE, ECE, EEE, Mech, Civil, IT, etc.)
  - **Community**: Dropdown (OC, BC, BCM, MBC, SC, ST, SCA)
  - **District**: Searchable dropdown (Chennai, Coimbatore, Madurai, Salem, Trichy, etc.)
  - **College Type**: Toggle chips (Govt / Govt Aided / Self-Financing)
  - **Search button** + clear filters
- **Results table** (glassmorphic card):
  - Columns: S.No, College Name, Branch, District, Cut-off, Type
  - Sorted descending by cut-off from user's input downward
  - Each row has "Add to Priority" button with smooth animation
  - Empty state with illustration when no filters applied
  - Result count badge
- ~150 realistic mock TNEA college entries with varied cut-offs across branches/districts

### Page 2: Priority List (`/priorities`)
- Displays all selected colleges in priority order
- **Drag-and-drop reordering** using @dnd-kit
- Each card shows rank number, college name, branch, cut-off, district
- Remove button on each item
- Export/download priority list option
- Empty state when no colleges added

### Design System (Glassmorphism)
- Deep gradient background (purple-blue-indigo)
- Frosted glass cards: `bg-white/10 backdrop-blur-xl border border-white/20`
- Subtle shadows and rounded corners
- Smooth fade/scale animations on interactions
- Modern typography with clear hierarchy
- Mobile responsive: filters stack vertically, table becomes card list

### Data
- Hardcoded array of ~150 mock colleges covering all major engineering branches, districts, communities, and types with realistic cut-off ranges

