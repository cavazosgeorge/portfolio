# Implementation Plan: Draft Projects Feature

## Summary
Add a "draft" boolean field to projects that:
1. Can be toggled via checkbox in admin panel
2. Makes project cards non-clickable on the public site
3. Shows "⏳ COMING SOON" badge above title on draft cards

## User Decisions
- **Featured + Draft**: Allowed - projects can be both featured and draft
- **Display style**: Badge above title (like "★ FEATURED" badge)

---

## Phase 1: Database Migration

**File**: `server/db/migrations/002_add_draft_column.sql` (NEW)

Create migration to add draft column:
```sql
ALTER TABLE projects ADD COLUMN draft INTEGER DEFAULT 0;
```

---

## Phase 2: TypeScript Interface

**File**: `src/hooks/useContent.ts`

Add `draft: boolean` to the Project interface (after `featured`):
```typescript
export interface Project {
  // ... existing fields
  featured: boolean;
  draft: boolean;  // ADD THIS
  sort_order: number;
}
```

---

## Phase 3: API Routes

**File**: `server/routes/projects.ts`

### 3.1 Update ProjectRow interface
Add `draft: number` to the interface.

### 3.2 Update GET all projects (line ~27)
Add draft boolean conversion:
```typescript
draft: Boolean(row.draft),
```

### 3.3 Update GET single project (line ~45)
Add draft boolean conversion.

### 3.4 Update POST create (lines ~50-71)
- Add `draft` to destructured body
- Add `draft` to INSERT column list
- Add `draft ?? 0 ? 1 : 0` to values array

### 3.5 Update PUT update (lines ~74-101)
- Add `draft` to destructured body
- Add `draft = ?` to UPDATE SET clause
- Add `draft ?? 0 ? 1 : 0` to values array

**CRITICAL**: Use `??` (nullish coalescing) for draft field, not `||`

---

## Phase 4: Admin Panel

**File**: `src/admin/components/ProjectsEditor.tsx`

### 4.1 Update startNew() function (line ~156-168)
Add `draft: false` to initial formData:
```typescript
setFormData({
  // ... existing fields
  featured: false,
  draft: false,  // ADD THIS
  sort_order: projects.length,
});
```

### 4.2 Add DRAFT badge in SortableProjectItem (after line ~94)
Add badge display for draft projects (styled in warm coral):
```tsx
{project.draft && (
  <Text fontSize="xs" color="var(--warm-coral)">
    DRAFT
  </Text>
)}
```

### 4.3 Add draft checkbox in edit form (after line ~379)
Add checkbox next to featured checkbox:
```tsx
<Flex align="center" gap={2}>
  <input
    type="checkbox"
    checked={formData.draft || false}
    onChange={(e) => setFormData({ ...formData, draft: e.target.checked })}
    style={{ accentColor: "var(--warm-coral)" }}
  />
  <Text color="var(--text-secondary)" fontSize="sm">
    Draft
  </Text>
</Flex>
```

---

## Phase 5: Public Display

**File**: `src/components/sections/Projects.tsx`

### 5.1 Update ProjectCardProps interface (line ~7-14)
Add `draft?: boolean` prop.

### 5.2 Update ProjectCard function signature (line ~16)
Add `draft` to destructured props.

### 5.3 Add COMING SOON badge (after featured badge, lines ~29-39)
```tsx
{draft && (
  <Text
    fontSize="xs"
    fontFamily="var(--font-mono)"
    color="var(--text-secondary)"
    letterSpacing="0.1em"
    mb={3}
  >
    ⏳ COMING SOON
  </Text>
)}
```

### 5.4 Update link wrapping logic (lines ~103-113)
Change condition to disable link for drafts:
```tsx
{link && !draft ? (
  <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
    <TiltCard>...</TiltCard>
  </a>
) : (
  <TiltCard>...</TiltCard>
)}
```

### 5.5 Hide "View Project →" for drafts (lines ~79-91)
Wrap in condition: `{link && !draft && (...)}`

### 5.6 Pass draft prop in renders (lines ~161-170, ~188-197)
Add `draft={project.draft}` to both featured and other project renders.

---

## Implementation Order

1. Database migration (foundation)
2. TypeScript interface (type safety)
3. API routes (data layer)
4. Admin panel (content management)
5. Public display (user-facing)

---

## Testing Checklist

- [ ] Run migration - existing projects get `draft = 0`
- [ ] Create new project as draft in admin
- [ ] Toggle existing project to draft
- [ ] Toggle draft project back to published
- [ ] Verify draft cards show "⏳ COMING SOON" badge
- [ ] Verify draft cards are NOT clickable
- [ ] Verify featured + draft shows both badges
- [ ] Verify non-draft projects work normally
- [ ] Build passes with no TypeScript errors
