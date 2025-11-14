# API Documentation

Comprehensive documentation for all public APIs, functions, and components in the Anima Project.

## Table of Contents

1. [Components](#components)
   - [ImageSelectionDialog](#imageselectiondialog)
   - [Button](#button)
   - [Card](#card)
   - [Dialog](#dialog)
   - [Input](#input)
   - [Separator](#separator)
   - [Ai](#ai)
   - [CreativeEditor](#creativeeditor)
2. [Utilities](#utilities)
   - [cn](#cn)
3. [Types & Interfaces](#types--interfaces)

---

## Components

### ImageSelectionDialog

A modal dialog component for selecting images from a project with filtering capabilities.

**Location:** `src/components/ImageSelectionDialog.tsx`

**Props:**

```typescript
interface ImageSelectionDialogProps {
  open: boolean;              // Controls dialog visibility
  onClose: () => void;        // Callback when dialog is closed
  onSelect: (imageUrl: string) => void;  // Callback when an image is selected
}
```

**Features:**
- Image type filtering (全部, 人物, 风景, 产品)
- Search by filename
- Starred images filter
- Grid layout with hover effects
- Responsive design

**Usage Example:**

```tsx
import { ImageSelectionDialog } from './components/ImageSelectionDialog';
import { useState } from 'react';

function MyComponent() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    console.log('Selected image:', imageUrl);
  };

  return (
    <>
      <button onClick={() => setDialogOpen(true)}>
        Select Image
      </button>
      
      <ImageSelectionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSelect={handleImageSelect}
      />
    </>
  );
}
```

**Internal Data Structure:**

The component uses a predefined list of project images:

```typescript
interface ProjectImage {
  id: number;
  url: string;
  name: string;
  type: string;      // '人物', '风景', '产品'
  starred: boolean;
}
```

---

### Button

A versatile button component built on Radix UI with multiple variants and sizes.

**Location:** `src/components/ui/button.tsx`

**Props:**

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;  // Render as child component using Radix Slot
  className?: string;
}
```

**Variants:**
- `default`: Primary button with background color
- `destructive`: Red/destructive action button
- `outline`: Outlined button with border
- `secondary`: Secondary action button
- `ghost`: Transparent button with hover effect
- `link`: Text button styled as a link

**Sizes:**
- `default`: Standard size (h-9 px-4 py-2)
- `sm`: Small size (h-8 px-3)
- `lg`: Large size (h-10 px-8)
- `icon`: Square icon button (h-9 w-9)

**Usage Examples:**

```tsx
import { Button } from './components/ui/button';

// Default button
<Button>Click Me</Button>

// Variants
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link">Link Button</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>

// With icons (using lucide-react)
import { Search } from 'lucide-react';
<Button>
  <Search />
  Search
</Button>

// As child component
<Button asChild>
  <a href="/link">Link Button</a>
</Button>

// Disabled state
<Button disabled>Disabled</Button>
```

**Exported:**
- `Button`: The main component
- `buttonVariants`: CVA function for custom styling
- `ButtonProps`: TypeScript interface

---

### Card

A flexible card component with header, content, and footer sections.

**Location:** `src/components/ui/card.tsx`

**Components:**

- `Card`: Main container component
- `CardHeader`: Header section with spacing
- `CardTitle`: Title text component
- `CardDescription`: Description text component
- `CardContent`: Main content area
- `CardFooter`: Footer section

**Props:**

All components accept standard React HTML attributes and `className` for custom styling.

**Usage Example:**

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './components/ui/card';
import { Button } from './components/ui/button';

function ProductCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Name</CardTitle>
        <CardDescription>Product description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content area</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  );
}
```

**Styling:**

Cards use Tailwind CSS classes:
- `rounded-xl`: Rounded corners
- `border`: Border styling
- `bg-card`: Background color
- `text-card-foreground`: Text color
- `shadow`: Box shadow

---

### Dialog

A modal dialog component built on Radix UI Dialog primitives.

**Location:** `src/components/ui/dialog.tsx`

**Components:**

- `Dialog`: Root component (Radix Dialog.Root)
- `DialogTrigger`: Button/component that opens the dialog
- `DialogContent`: Main dialog content container
- `DialogHeader`: Header section container
- `DialogTitle`: Dialog title component
- `DialogDescription`: Dialog description component
- `DialogFooter`: Footer section container
- `DialogClose`: Close button component
- `DialogOverlay`: Backdrop overlay
- `DialogPortal`: Portal wrapper

**Usage Example:**

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './components/ui/dialog';
import { Button } from './components/ui/button';

function ConfirmationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
            Are you sure you want to proceed with this action?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

**Controlled Usage:**

```tsx
import { useState } from 'react';

function ControlledDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controlled Dialog</DialogTitle>
        </DialogHeader>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogContent>
    </Dialog>
  );
}
```

**Features:**
- Accessible (ARIA attributes)
- Keyboard navigation support
- Focus management
- Animation support
- Portal rendering
- Click outside to close
- ESC key to close

---

### Input

A styled input component with consistent design.

**Location:** `src/components/ui/input.tsx`

**Props:**

Extends standard HTML input attributes:

```typescript
React.ComponentProps<"input">
```

**Usage Examples:**

```tsx
import { Input } from './components/ui/input';

// Basic input
<Input type="text" placeholder="Enter text..." />

// With label
<div>
  <label htmlFor="email">Email</label>
  <Input id="email" type="email" placeholder="email@example.com" />
</div>

// Password input
<Input type="password" placeholder="Password" />

// Number input
<Input type="number" min="0" max="100" />

// File input
<Input type="file" accept="image/*" />

// Disabled state
<Input disabled placeholder="Disabled input" />

// With custom className
<Input className="w-full max-w-md" placeholder="Custom styled" />
```

**Styling:**
- Responsive text sizing (base on mobile, sm on desktop)
- Focus ring styling
- Disabled state styling
- File input styling support

---

### Separator

A visual separator component (horizontal or vertical line).

**Location:** `src/components/ui/separator.tsx`

**Props:**

```typescript
{
  orientation?: 'horizontal' | 'vertical';  // Default: 'horizontal'
  decorative?: boolean;                       // Default: true
  className?: string;
}
```

**Usage Examples:**

```tsx
import { Separator } from './components/ui/separator';

// Horizontal separator (default)
<div>
  <p>Content above</p>
  <Separator />
  <p>Content below</p>
</div>

// Vertical separator
<div className="flex">
  <div>Left content</div>
  <Separator orientation="vertical" />
  <div>Right content</div>
</div>

// Decorative separator (semantic, not announced by screen readers)
<Separator decorative />

// Non-decorative separator (announced by screen readers)
<Separator decorative={false} />
```

**Styling:**
- Horizontal: `h-[1px] w-full`
- Vertical: `h-full w-[1px]`
- Uses `bg-border` color

---

### Ai

Main AI tools marketplace screen component.

**Location:** `src/screens/Ai/Ai.tsx`

**Props:**

None (root component)

**Exports:**

```typescript
export const Ai = (): JSX.Element
```

**Features:**
- Author profiles with tool packages
- Tool package browsing and filtering
- Tool version management
- Supabase integration for data persistence
- Purchase and favorite functionality
- Integration with CreativeEditor

**Usage:**

```tsx
import { Ai } from './screens/Ai';

function App() {
  return <Ai />;
}
```

**Dependencies:**
- Supabase client (requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`)
- React Router DOM
- Lucide React icons
- Shadcn UI components

**Key Functionality:**

1. **Author Management:**
   - Display author profiles
   - Show tool counts and social media links
   - Browse author tool packages

2. **Tool Packages:**
   - View available tool packages
   - Filter by category
   - Purchase tools
   - View purchased tools

3. **Tool Versions:**
   - Manage individual tool versions
   - View version history
   - Switch between versions

4. **Integration:**
   - Opens CreativeEditor for tool usage
   - Manages tool state

**Environment Variables Required:**

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

### CreativeEditor

Full-featured creative editing interface with canvas, tools, and image management.

**Location:** `src/screens/CreativeEditor/CreativeEditor.tsx`

**Props:**

```typescript
interface CreativeEditorProps {
  onClose: () => void;  // Callback when editor is closed
}
```

**Features:**
- Canvas with zoom and pan
- Tool showcase panel (draggable)
- Image upload and selection
- Toolbox with categorized tools
- Layer management
- Thumbnail gallery
- Version selection
- Purchase dialogs
- Info dialogs

**Usage Example:**

```tsx
import { CreativeEditor } from './screens/CreativeEditor';
import { useState } from 'react';

function App() {
  const [editorOpen, setEditorOpen] = useState(false);

  return (
    <>
      <button onClick={() => setEditorOpen(true)}>
        Open Editor
      </button>
      
      {editorOpen && (
        <CreativeEditor onClose={() => setEditorOpen(false)} />
      )}
    </>
  );
}
```

**Key Features:**

1. **Canvas Controls:**
   - Zoom (mouse wheel)
   - Pan (drag)
   - Tool selection (hand, pan, zoom)
   - Fit to screen

2. **Tool Showcase:**
   - Draggable tool panel
   - Model image upload
   - Cloth image upload
   - Version selection
   - Generate button

3. **Toolbox:**
   - Categorized tools (推荐, 收藏, 已购买)
   - Tool filtering
   - Tool browsing

4. **Image Management:**
   - Thumbnail gallery
   - Image selection
   - Image filtering
   - Starred images

5. **Layer Management:**
   - Layer list
   - Opacity control
   - Blend modes
   - Layer visibility

**Internal State Management:**

The component manages extensive state including:
- Selected tabs and categories
- Toolbox open/closed state
- Image selection
- Canvas transformations (scale, position)
- Dialog states
- Upload states

**Integration:**

- Uses `ImageSelectionDialog` for image selection
- Integrates with tool data from Ai screen
- Supports tool purchase flow

---

## Utilities

### cn

Utility function for merging Tailwind CSS classes with conflict resolution.

**Location:** `src/lib/utils.ts`

**Signature:**

```typescript
export function cn(...inputs: ClassValue[]): string
```

**Parameters:**
- `inputs`: Variable number of `ClassValue` arguments (string, object, array, etc.)

**Returns:**
- `string`: Merged and deduplicated class string

**Usage Examples:**

```tsx
import { cn } from './lib/utils';

// Basic usage
const className = cn('text-red-500', 'font-bold');
// Result: 'text-red-500 font-bold'

// Conditional classes
const className = cn(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class'
);

// With object syntax
const className = cn({
  'text-red-500': isError,
  'text-green-500': isSuccess,
  'font-bold': isImportant,
});

// Combining multiple sources
const className = cn(
  'default-class',
  props.className,
  {
    'conditional-class': condition,
  }
);

// In components
function Button({ className, variant, ...props }) {
  return (
    <button
      className={cn(
        'base-button-styles',
        variant === 'primary' && 'primary-styles',
        className
      )}
      {...props}
    />
  );
}
```

**How it works:**
1. Uses `clsx` to process conditional classes and objects
2. Uses `tailwind-merge` to resolve Tailwind class conflicts
3. Ensures only the last conflicting class is kept

**Example of conflict resolution:**

```tsx
cn('p-4', 'p-6')  // Result: 'p-6' (last one wins)
cn('text-red-500', 'text-blue-500')  // Result: 'text-blue-500'
```

---

## Types & Interfaces

### ImageSelectionDialogProps

```typescript
interface ImageSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
}
```

### ProjectImage

```typescript
interface ProjectImage {
  id: number;
  url: string;
  name: string;
  type: string;      // '人物' | '风景' | '产品'
  starred: boolean;
}
```

### ButtonProps

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
```

### CreativeEditorProps

```typescript
interface CreativeEditorProps {
  onClose: () => void;
}
```

### Feature

```typescript
interface Feature {
  title: string;
  gradient: string;
  author: string;
  avatar: string;
}
```

### ToolCard

```typescript
interface ToolCard {
  title: string;
  gradient: string;
  thumbnail: string;
  author: string;
  likes: number;
  category: string;
}
```

---

## Project Setup

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build

```bash
npm run build
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Dependencies

### Core
- **React** ^18.2.0
- **React DOM** ^18.2.0
- **React Router DOM** ^6.8.1

### UI Components
- **@radix-ui/react-dialog** ^1.1.15
- **@radix-ui/react-separator** ^1.1.0
- **@radix-ui/react-slot** ^1.1.0
- **lucide-react** ^0.453.0

### Styling
- **tailwindcss** 3.4.16
- **tailwind-merge** 2.5.4
- **tailwindcss-animate** 1.0.7
- **clsx** 2.1.1
- **class-variance-authority** ^0.7.0

### Backend
- **@supabase/supabase-js** ^2.39.0

### Build Tools
- **Vite** 6.0.4
- **@vitejs/plugin-react** 4.3.4
- **esbuild** 0.24.0

---

## Best Practices

### Component Usage

1. **Always use TypeScript types** when importing components
2. **Handle callbacks properly** - ensure parent components handle state updates
3. **Use controlled components** for dialogs and modals when possible
4. **Leverage the `cn` utility** for conditional styling

### Styling

1. **Use Tailwind CSS classes** for styling
2. **Use `cn` utility** for merging classes
3. **Follow component variant patterns** for consistent UI
4. **Use semantic HTML** for accessibility

### State Management

1. **Lift state up** when multiple components need access
2. **Use React hooks** (useState, useEffect) appropriately
3. **Handle async operations** properly (Supabase queries)

### Accessibility

1. **Use semantic HTML elements**
2. **Provide proper ARIA labels** where needed
3. **Ensure keyboard navigation** works
4. **Test with screen readers**

---

## Examples

### Complete Example: Image Selection Flow

```tsx
import { useState } from 'react';
import { Button } from './components/ui/button';
import { ImageSelectionDialog } from './components/ImageSelectionDialog';

function ImageSelector() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImages(prev => [...prev, imageUrl]);
  };

  return (
    <div>
      <Button onClick={() => setDialogOpen(true)}>
        Select Images ({selectedImages.length})
      </Button>
      
      <ImageSelectionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSelect={handleImageSelect}
      />
      
      <div className="mt-4">
        {selectedImages.map((url, idx) => (
          <img key={idx} src={url} alt={`Selected ${idx}`} />
        ))}
      </div>
    </div>
  );
}
```

### Complete Example: Dialog with Form

```tsx
import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './components/ui/dialog';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

function UserFormDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = () => {
    console.log('Submitted:', name);
    setOpen(false);
    setName('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Enter the user's name below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="User name"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name}>
            Add User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

---

## Troubleshooting

### Common Issues

1. **Dialog not opening:**
   - Ensure `open` state is properly managed
   - Check that `DialogTrigger` is properly configured

2. **Styling conflicts:**
   - Use `cn` utility to merge classes
   - Check Tailwind configuration

3. **Supabase connection issues:**
   - Verify environment variables are set
   - Check Supabase project settings

4. **Component not rendering:**
   - Check import paths
   - Verify component exports

---

## License

This project is generated by Anima using the Shadcn UI library.

---

## Support

For issues and questions, please refer to:
- [React Documentation](https://react.dev)
- [Radix UI Documentation](https://www.radix-ui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Supabase Documentation](https://supabase.com/docs)
