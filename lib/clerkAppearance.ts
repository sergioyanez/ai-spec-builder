// Warm amber / terracotta palette shared with the landing page.
// Values mirror the design tokens defined in app/globals.css so the Clerk
// sign-in / sign-up forms and modals match the rest of the app.
export const clerkAppearance = {
  variables: {
    colorPrimary: "#c4622d", // accent — buttons / links (burnt orange)
    colorText: "#2b2118", // ink — primary text
    colorTextSecondary: "#8a7361", // muted — secondary text
    colorBackground: "#fdf8f3", // canvas — card background
    colorInputText: "#2b2118",
    colorInputBackground: "#ffffff",
    borderRadius: "0.75rem",
  },
  elements: {
    card: "shadow-card border border-card-border",
    headerTitle: "text-ink",
    headerSubtitle: "text-muted",
  },
} as const;
