# Interface Finder Script

This script helps you find existing interfaces and types in the codebase before creating new ones, preventing duplication and promoting reuse.

## Usage

```bash
# Search for interfaces/types containing a term
npm run find:interfaces <search-term>

# Examples
npm run find:interfaces Artist
npm run find:interfaces Event
npm run find:interfaces Video
npm run find:interfaces Location
npm run find:interfaces Base
npm run find:interfaces Social
npm run find:interfaces Admin
```

## How It Works

The script searches through all `.ts` files in the `src/` directory for:
- `export interface <Name>`
- `export type <Name>`

It matches case-insensitively against your search term and shows:
- File path (relative to project root)
- Line number
- Interface/type name
- Full line content
- Suggested import statements using `@/` path aliases

## Integration with Component Creation Workflow

### Before creating a new component:

1. **Search for related interfaces:**
   ```bash
   npm run find:interfaces <component-name>
   ```

2. **Check base traits in `src/entities/shared/base.ts`:**
   - `Identifiable` - id field
   - `Named` - name field
   - `Imageable` - image/imagePosition fields
   - `Timestamped` - createdAt/updatedAt fields
   - `Socialable` - socials field
   - `Describable` - bio/description fields
   - `Locatable` - location fields
   - `Classifiable` - category/tags fields

3. **Check composed base types:**
   - `BaseEntity` = Identifiable & Named & Timestamped
   - `MediaEntity` = BaseEntity & Imageable
   - `SocialEntity` = BaseEntity & Socialable
   - `FullEntity` = MediaEntity & Socialable & Describable & Locatable & Classifiable
   - `VideoBase` = Identifiable & Named & Imageable

4. **Use barrel exports from `@/entities` or `@/features/admin`**

## Example: Creating a New Component

```bash
# 1. Search for existing interfaces
npm run find:interfaces Gallery

# 2. If none found, check base traits
npm run find:interfaces Imageable
npm run find:interfaces MediaEntity

# 3. Create component using existing types
# import { MediaEntity, Imageable } from '@/entities';
```

## VS Code Integration

Add to `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Find Interfaces",
      "type": "shell",
      "command": "npm run find:interfaces ${input:searchTerm}",
      "problemMatcher": [],
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    }
  ],
  "inputs": [
    {
      "id": "searchTerm",
      "type": "promptString",
      "description": "Search term for interfaces/types",
      "default": ""
    }
  ]
}
```

Then use `Ctrl+Shift+P` → "Tasks: Run Task" → "Find Interfaces"

## Adding to Pre-commit Hook (Optional)

To enforce checking for existing interfaces before committing:

```bash
# In .husky/pre-commit
npx tsx scripts/find-interfaces.ts "$(git diff --cached --name-only | head -1 | xargs basename | cut -d. -f1)" || true
```