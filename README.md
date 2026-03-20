# Zero - Personal Wealth Tracker

A modern, fully responsive wealth and expense tracking application built with React. Manage your income, expenses, and monitor spending patterns with beautiful data visualizations.

## Features

### Core Functionality
- ✅ Add income and expense transactions with detailed categorization
- ✅ Real-time balance calculation and financial summary
- ✅ Expense breakdown visualization with interactive charts (Donut & Bar)
- ✅ Advanced transaction history with search, filter, and sort
- ✅ Edit and delete transactions with instant updates
- ✅ Automatic data persistence using localStorage

### Responsive Design
- 📱 **Mobile First** (< 480px): Optimized single-column layouts with touch-friendly controls
- 📱 **Tablet** (480px - 1024px): Two-column layouts with adaptive spacing
- 💻 **Desktop** (> 1024px): Full multi-column layout with maximum content density
- 🎨 **Responsive Typography**: Font sizes scale intelligently across breakpoints
- 🎨 **Adaptive Spacing**: Padding and margins adjust for each device size
- 🎨 **Flexible Grids**: Components reflow dynamically based on screen width

### Visual Design
- Dark theme with carefully chosen color palette
- Smooth animations and transitions
- Color-coded transaction categories
- Real-time toast notifications
- Professional typography with Google Fonts (Outfit, DM Sans, DM Mono)

## Project Structure

```
nn/
├── config.js                          # Responsive breakpoints & spacing
├── constants.js                       # Categories, colors, constants
├── utils.js                           # Utility functions (format, parse, etc)
├── storage.js                         # localStorage API layer
├── styles.js                          # CSS-in-JS styles with media queries
├──
├── hooks/
│   └── useResponsive.js              # Custom hooks for media queries
├── 
├── styles/
│   └── responsive.js                  # Responsive style helpers
├── 
├── components/
│   ├── Charts.jsx                    # DonutChart & BarChart components
│   ├── TransactionForm.jsx           # Add/Edit transaction form
│   ├── TxItem.jsx                    # Individual transaction item
│   ├── SummaryCards.jsx              # Income/Expense/Balance summary
│   ├── ChartSection.jsx              # Expense breakdown with charts
│   └── HistoryLog.jsx                # Transaction history view
├── 
├── App.jsx                            # Main app entry point
├── WealthTracker_Main.jsx             # Core component with state logic
├── WealthTracker.jsx                  # Original single-file version
├── index.html                         # HTML entry point
├── package.json                       # Project dependencies
└── README.md                          # This file
```

## Responsive Breakpoints

The application uses configurable breakpoints for responsive design:

```javascript
// config.js
BREAKPOINTS = {
  mobile:  480,    // Mobile phones
  tablet:  768,    // Tablets & small laptops
  desktop: 1024,   // Desktop computers
  wide:    1440    // Large desktop screens
}

SPACING = {
  xs: 4,    // Extra small
  sm: 8,    // Small
  md: 12,   // Medium
  lg: 16,   // Large
  xl: 20,   // Extra large
  xxl: 24   // 2X large
}
```

### Mobile (< 480px)
- Single-column layouts
- Full-width inputs and buttons
- Compact card designs
- Reduced padding/margins
- Optimized touch targets (44×44px minimum)
- Simplified navigation

### Tablet (480px - 1024px)
- Two-column main layout (sidebar + content)
- Grid-based card arrangements
- Balanced spacing
- Flexible component sizing

### Desktop (> 1024px)
- Three-column summary cards
- Full-width content area
- Maximum information density
- Premium spacing and typography

## Responsive Features

### Adaptive Typography
All text sizes scale based on breakpoints:
- Headers: 18px (mobile) → 22px (desktop)
- Body text: 12px (mobile) → 13px (desktop)
- Monospace: 10px (mobile) → 13px (desktop)

### Flexible Layouts
- **Main Container**: Adapts max-width and padding
- **Cards Row**: Stacks 1 column (mobile) → 3 columns (desktop)
- **Two-Column**: Stacks vertically (mobile) → side-by-side (tablet/desktop)
- **Form Controls**: Full-width (mobile) → inline (tablet/desktop)
- **Charts**: Height scales: 200px (mobile) → 280px (desktop)

### Touch-Friendly Design
- Minimum tap target: 44×44px (WCAG 2.1 AAA)
- Adequate spacing between interactive elements
- Simplified menus on mobile
- Large, easy-to-tap input fields

### Performance Optimized
- Lazy-loaded Chart.js library via CDN
- Efficient state management with React hooks
- Optimized re-renders with useMemo and useCallback
- Minimal CSS with CSS-in-JS inline styles

## Installation & Setup

### Option 1: Direct Browser (No Build Tools)
Simply open `index.html` in a modern web browser. The app loads React and dependencies from CDN.

### Option 2: Using Vite (Recommended)
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Option 3: Python HTTP Server
```bash
python -m http.server 5173
# Open http://localhost:5173 in browser
```

## Usage

1. **Add Transaction**: Click "Add Transaction" and fill in details
2. **View Summary**: See income, expenses, and balance at the top
3. **Analyze Spending**: View expense breakdown with interactive charts
4. **Search History**: Use search bar to find transactions
5. **Filter & Sort**: Filter by transaction type and sort by date or amount
6. **Edit/Delete**: Hover over transaction and use edit/delete buttons
7. **Data Persistence**: All data is automatically saved to browser localStorage

## Technology Stack

- **Frontend**: React 18 (Hooks-based)
- **Styling**: CSS-in-JS with responsive media queries
- **Data Visualization**: Chart.js 4.4.1
- **Storage**: Browser localStorage API
- **Typography**: Google Fonts (Outfit, DM Sans, DM Mono)
- **Build Tool**: Vite (optional)

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Code Organization

### Clean Architecture Pattern
- **Configuration** (`config.js`): Centralized settings for breakpoints and spacing
- **Constants** (`constants.js`): Immutable application constants
- **Utilities** (`utils.js`): Pure functions for recurring operations
- **Storage** (`storage.js`): Data persistence abstraction layer
- **Styles** (`styles.js`): Centralized responsive styles with media queries
- **Components**: Modular, single-responsibility React components
- **Hooks** (`hooks/`): Custom React hooks for shared logic

### Media Query Implementation
All responsive styles use standard CSS media queries in JavaScript objects:

```javascript
// Example from styles.js
header: {
  padding: "12px 16px",
  [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
    padding: "16px 24px",
  },
  [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
    padding: "24px 32px",
  },
}
```

## Colors & Theme

```css
--green:  #22c55e    /* Income, positive */
--red:    #f43f5e    /* Expense, negative */
--blue:   #38bdf8    /* Highlights, balance */
--amber:  #f59e0b    /* Warnings */
--bg:     #0a0d14    /* Primary background */
--bg2:    #111827    /* Secondary background */
--bg3:    #1a2332    /* Tertiary background */
--bg4:    #243044    /* Quaternary background */
--border: rgba(255,255,255,0.07)
--t1:     #f1f5f9    /* Primary text */
--t2:     #64748b    /* Secondary text */
--t3:     #334155    /* Tertiary text */
```

## Best Practices Implemented

✅ **Mobile-First Development**: Start with mobile, enhance for larger screens
✅ **Responsive Type Scale**: Font sizes adjust per breakpoint
✅ **Flexible Spacing**: Margins/padding use SPACING constants
✅ **Touch Optimization**: Minimum 44×44px tap targets
✅ **Performance**: Memoization, lazy loading, efficient re-renders
✅ **Accessibility**: Semantic HTML, keyboard navigation support
✅ **Clean Code**: Modular, well-organized, documented
✅ **Separation of Concerns**: Config, utils, storage, components

## Development Workflow

1. Components use centralized `styles.js` with responsive design
2. `config.js` defines breakpoints and spacing constants
3. All layouts use responsive grid/flex with media queries
4. Custom hooks in `hooks/` manage responsive logic
5. Test on mobile, tablet, and desktop devices

## Tips for Mobile-Friendly Testing

```bash
# Chrome DevTools: Ctrl+Shift+M (Windows/Linux) or Cmd+Shift+M (Mac)
# Test breakpoints: 375px (mobile), 768px (tablet), 1024px (desktop)

# Or use:
# iPhone 12: 390×844
# iPad: 768×1024
# Desktop: 1440×900
```

## Future Enhancements

- 📊 Advanced reporting and analytics
- 📈 Monthly/yearly financial trends
- 🎯 Budget goals and tracking
- 💾 Export to CSV/PDF
- 🌙 Light/Dark theme toggle
- 🔐 Cloud sync and backup
- 📱 Progressive Web App (PWA)

## License

MIT License - Feel free to use this project for personal or commercial purposes.

---

**Built with ❤️ for financial awareness and clean code principles**
