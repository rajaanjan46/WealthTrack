import { BREAKPOINTS, SPACING, Z_INDEX, ANIMATION } from "../config.js";

const media = {
  mobile: `@media (max-width: ${BREAKPOINTS.tablet - 1}px)`,
  tablet: `@media (min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${BREAKPOINTS.desktop - 1}px)`,
  desktop: `@media (min-width: ${BREAKPOINTS.desktop}px)`,
  wide: `@media (min-width: ${BREAKPOINTS.wide}px)`,
};

export const responsiveStyles = `
  * { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; color: #f1f5f9; overflow-x: hidden; }
  
  ${media.mobile} {
    html { font-size: 14px; }
  }
  ${media.tablet} {
    html { font-size: 15px; }
  }
  ${media.desktop} {
    html { font-size: 16px; }
  }

  @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
  @keyframes slideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
  @keyframes toastIn { from { opacity:0; transform:translateY(20px) scale(0.9); } to { opacity:1; transform:translateY(0) scale(1); } }
`;

export const getResponsiveStyles = () => ({
  layoutGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: SPACING.md,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      gridTemplateColumns: "280px 1fr",
      gap: SPACING.lg,
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      gridTemplateColumns: "320px 1fr",
      gap: SPACING.xl,
    },
  },

  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: SPACING.md,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      gridTemplateColumns: "1fr 1fr",
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      gridTemplateColumns: "1fr 1fr 1.2fr",
    },
  },

  headerInner: {
    maxWidth: "100%",
    padding: `${SPACING.md}px ${SPACING.md}px`,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      padding: `${SPACING.lg}px ${SPACING.lg}px`,
      maxWidth: "100%",
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      maxWidth: 1400,
      margin: "0 auto",
      padding: `${SPACING.lg}px ${SPACING.xl}px`,
    },
  },

  main: {
    maxWidth: "100%",
    margin: "0 auto",
    padding: `${SPACING.md}px`,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      padding: `${SPACING.lg}px`,
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      maxWidth: 1400,
      padding: `${SPACING.xl}px`,
    },
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: SPACING.md,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      gridTemplateColumns: "1fr",
    },
  },

  controlsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: SPACING.sm,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
  },

  searchInput: {
    flex: 1,
    minWidth: "100%",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      minWidth: 200,
    },
  },

  buttonGroup: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: SPACING.sm,
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      gridTemplateColumns: "auto auto",
    },
  },

  responsiveText: {
    fontSize: "13px",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      fontSize: "14px",
    },
    [`@media (min-width: ${BREAKPOINTS.desktop}px)`]: {
      fontSize: "15px",
    },
  },

  responsiveButton: {
    padding: `${SPACING.sm}px ${SPACING.md}px`,
    fontSize: "12px",
    [`@media (min-width: ${BREAKPOINTS.tablet}px)`]: {
      padding: `${SPACING.md}px ${SPACING.lg}px`,
      fontSize: "13px",
    },
  },
});
