# Architecture & Design System

## Clean Architecture Overview

This project follows **Clean Architecture** principles with clear separation of concerns:

```
Presentation Layer (UI Components)
    ↓
Business Logic Layer (Hooks, Utils)
    ↓
Data Layer (Storage)
    ↓
External Services (localStorage, Chart.js)
```

## Directory Structure & Responsibility

### Core Configuration (`config.js`)
**Purpose**: Centralized configuration for responsive design and styling

```javascript
// Breakpoint definitions for responsive design
BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1440
}

// Spacing scale for consistent layout
SPACING = {
  xs: 4,    // Micro spacing
  sm: 8,    // Small spacing
  md: 12,   // Medium (default)
  lg: 16,   // Large
  xl: 20,   // Extra large
  xxl: 24   // 2X large
}

// Z-index layering
Z_INDEX = {
  header: 100,
  dropdown: 200,
  modal: 300,
  notification: 9999
}

// Animation timings
ANIMATION = {
  fast: "0.15s",
  normal: "0.3s",
  slow: "0.5s"
}
```

**Benefits**:
- Single source of truth for design tokens
- Easy theme/design system changes
- Consistent spacing throughout app
- Reduced magic numbers in styles

### Constants (`constants.js`)
**Purpose**: Immutable application-wide constants

```javascript
CATEGORIES = {
  income: ["Salary", "Freelance", "Investment", ...],
  expense: ["Food", "Travel", "Entertainment", ...]
}

CAT_COLORS = {
  "Salary": "#22c55e",
  "Food": "#f43f5e",
  ...
}

MAX_SAFE_AMOUNT = 999_999_999_999
STORAGE_KEY = "wealthTrackerTransactions"
```

**Benefits**:
- Centralized constant management
- Type consistency
- Easy to maintain category list
- Color palette in one place

### Utilities (`utils.js`)
**Purpose**: Pure utility functions for common operations

```javascript
// Format currency
formatINR(amount, compact) → "₹1.2L" or "₹1,234,567"

// Parse input amount
parseAmount(str) → 1234.56

// Generate unique ID
generateId() → "tx_1234567890"

// Date utilities
today() → "2024-01-15"
relativeDate(str) → "2 days ago"
```

**Benefits**:
- Reusable functions
- Easy testing
- No side effects
- Centralized business logic

### Storage Layer (`storage.js`)
**Purpose**: Abstract data persistence from components

```javascript
loadTransactions() → Array
saveTransactions(transactions) → void
```

**Benefits**:
- Components don't depend on localStorage directly
- Easy to swap implementation (localStorage → REST API)
- Single point of change for persistence
- Testing becomes simpler

### Styles System (`styles.js`)
**Purpose**: Centralized responsive CSS-in-JS styles

```javascript
export const styles = {
  app: {
    minHeight: "100vh",
    ["@media (min-width: 768px)"]: {
      // Tablet adjustments
    },
    ["@media (min-width: 1024px)"]: {
      // Desktop adjustments
    }
  },
  // More styles...
}
```

**Benefits**:
- Single stylesheet
- Responsive design in one place
- Easy to maintain and update
- Type-safe (IDE autocomplete)
- No CSS file parsing needed

### React Components (`components/`)
**Purpose**: Modular, presentational React components

Each component:
- Has clear responsibility
- Receives props for data
- Calls callbacks for actions
- Uses shared styles
- Is independent and testable

**Component Structure**:
```jsx
export function ComponentName({ prop1, prop2, onCallback }) {
  // State management
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => { }, [dependencies]);
  
  // Handlers
  const handleClick = useCallback(() => { }, []);
  
  // Render
  return <div style={styles.componentStyle}>...</div>;
}
```

## Responsive Design System

### Three-Tier Breakpoint Strategy

#### 1. Mobile First (< 480px)
- Single column
- Full-width elements
- Large touch targets
- Minimalist design
- Stacked navigation

```javascript
// Mobile: Start here
const mobileStyle = {
  flexDirection: "column",
  width: "100%",
  padding: "8px",
}

// Then enhance...
```

#### 2. Tablet Enhancement (480px - 1024px)
- Two-column layout
- Flexible grid (2 columns)
- Balanced spacing
- Sidebar support

```javascript
const tabletStyle = {
  [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
    gridTemplateColumns: "1fr 1fr",
    padding: "16px",
  }
}
```

#### 3. Desktop Optimization (> 1024px)
- Three-column layout
- Maximum content density
- Premium typography
- Enhanced visualizations

```javascript
const desktopStyle = {
  [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
    gridTemplateColumns: "1fr 1fr 1.2fr",
    padding: "24px",
    maxWidth: 1400,
  }
}
```

### Responsive Utilities

#### useResponsive Hook
```javascript
import { useResponsive } from "./hooks/useResponsive.js";

export function MyComponent() {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
  return isMobile ? <MobileView /> : <DesktopView />;
}
```

#### Media Query Patterns
```javascript
// Common pattern in styles.js
someStyle: {
  fontSize: 12,
  padding: "8px",
  ["@media (min-width: ${BREAKPOINTS.tablet}px)"]: {
    fontSize: 13,
    padding: "12px",
  },
  ["@media (min-width: ${BREAKPOINTS.desktop}px)"]: {
    fontSize: 14,
    padding: "16px",
  }
}
```

## Data Flow Architecture

```
User Interaction (Button click, Form input)
    ↓
Component Handler (onClick, onChange)
    ↓
State Update (setState)
    ↓
Effect Hook (useEffect)
    ↓
Storage Layer (saveTransactions)
    ↓
localStorage API
```

### Example: Adding a Transaction

```
1. User fills form → TransactionForm component
2. User clicks submit → handleSubmit callback
3. Form data validated → Utils validation
4. Transaction object created → generateId(), today()
5. State updated → setTransactions([newTx, ...prev])
6. Effect triggered → useEffect([transactions])
7. Storage layer called → saveTransactions(transactions)
8. Data persisted → localStorage.setItem()
```

## Component Hierarchy

```
App
└── WealthTracker_Main (Root Container)
    ├── Header (Title, Stats)
    ├── Main Content
    │   ├── SummaryCards
    │   │   ├── SummaryCard (Income)
    │   │   ├── SummaryCard (Expense)
    │   │   └── SummaryCard (Balance)
    │   │
    │   ├── LeftColumn
    │   │   └── TransactionForm
    │   │
    │   ├── RightColumn
    │   │   ├── ChartSection
    │   │   │   ├── DonutChart
    │   │   │   ├── BarChart
    │   │   │   └── Legend
    │   │   │
    │   │   └── HistoryLog
    │   │       └── TxItem[] (map)
    │   │           ├── TxItem (Edit button)
    │   │           └── TxItem (Delete button)
    │   │
    │   └── Toast (Notification)
    │
    └── Responsive Styles (Media queries applied at all levels)
```

## State Management Strategy

### Local Component State
- **TransactionForm**: Form input state, validation errors
- **HistoryLog**: Search, filter, sort state
- **ChartSection**: Chart type toggle

### Global-ish State (Lifted to Root)
- **WealthTracker_Main**: 
  - `transactions` - source of truth
  - `editTx` - current edited transaction
  - `toast` - notification state

### State Update Flow
```
transactions (derived from props)
    ↓
Custom hooks handle state
    ↓
useEffect triggers storage persistence
    ↓
localStorage updated
    ↓
Component re-renders
```

## Performance Optimizations

### 1. Memoization
```javascript
const expensesByCategory = useMemo(() => {
  // Expensive calculation
}, [transactions]);
```

### 2. Callback Memoization
```javascript
const handleSave = useCallback((tx) => {
  // Handler logic
}, [editTx, showToast]);
```

### 3. CSS-in-JS Benefits
- No unused CSS loading
- Styles scoped to component
- Bundle size reduced
- Dynamic styles possible

### 4. Lazy Loading
- Chart.js loaded via CDN
- React loaded via CDN (browser cached)
- Components imported on demand

## Testing Strategy

### Unit Tests
```javascript
// utils.test.js
test("formatINR formats currency correctly", () => {
  expect(formatINR(1234567)).toBe("₹12.3L");
});
```

### Component Tests
```javascript
// TransactionForm.test.js
test("form shows validation errors", () => {
  // Test validation logic
});
```

### Integration Tests
```javascript
// WealthTracker.integration.test.js
test("adding transaction updates UI and persists", () => {
  // Test full flow
});
```

## Accessibility (a11y)

Implemented features:
- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Color not only means (text + icon)
- Sufficient color contrast
- Touch targets ≥ 44×44px

## Best Practices Checklist

✅ Separation of Concerns
- ├── Configuration (config.js)
- ├── Constants (constants.js)
- ├── Business Logic (utils.js, hooks/)
- ├── Data Access (storage.js)
- ├── Presentation (styles.js, components/)
- └── Entry Point (App.jsx, WealthTracker_Main.jsx)

✅ DRY Principle
- ├── Reusable utility functions
- ├── Centralized styles
- ├── Shared constants
- └── Custom hooks for logic

✅ SOLID Principles
- ├── Single Responsibility: One component = one job
- ├── Open/Closed: Code open for extension
- ├── Liskov Substitution: Components are interchangeable
- ├── Interface Segregation: Props are specific
- └── Dependency Inversion: Depend on abstractions

✅ Code Quality
- ├── No comments (self-documenting code)
- ├── Meaningful variable names
- ├── Pure functions where possible
- ├── Error handling
- └── Consistent formatting

## Responsive Design Implementation

### How Responsive Styles Work

```javascript
// Example from styles.js
header: {
  // Mobile-first (default)
  fontSize: "18px",
  padding: "12px",
  
  // Tablet enhancement
  [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
    fontSize: "20px",  // Larger font on tablet
    padding: "16px",   // More space
  },
  
  // Desktop optimization
  [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
    fontSize: "22px",  // Even larger on desktop
    padding: "24px",   // Plenty of space
  }
}
```

### Key Features
1. **Mobile-First**: Styles start optimized for small screens
2. **Progressive Enhancement**: Add features for larger screens
3. **Configuration-Driven**: Breakpoints defined in config.js
4. **Reusable Patterns**: Same media query pattern throughout
5. **Type-Safe**: IDE autocomplete for all properties

## Future Extensibility

### Adding New Features
1. Create new file in `components/` for new feature
2. Import shared styles from `styles.js`
3. Use utilities from `utils.js`
4. Add constants to `constants.js` if needed
5. Follow established patterns and conventions

### Changing Design System
1. Update `config.js` breakpoints/spacing
2. Media queries automatically adjust
3. All components inherit new styling
4. No need to update individual components

### Switching Data Persistence
1. Update `storage.js` to use REST API instead of localStorage
2. Components don't know the difference
3. Same interface, different implementation
4. Easy to maintain and test

---

**Architecture designed for scalability, maintainability, and responsive excellence**
