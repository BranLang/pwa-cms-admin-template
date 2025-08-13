# M3 Refactor Notes

This document summarizes the changes made during the Material 3 (M3) refactor of the frontend application.

## High-Level Changes

-   **UI Framework:** Replaced Angular Material with Material Web Components (M3).
-   **Theming:** Implemented the M3 theming system with support for light/dark modes and color presets.
-   **Pages:** Refactored all existing pages to use M3 components and layouts.
-   **Components:** Created a reusable image gallery component with a lightbox.
-   **Dependencies:** Removed `@angular/material` and added `@material/web` and `@material/material-color-utilities`.

## Detailed Changes

### App Shell & Navigation

-   The main layout (`layout.component`) was refactored to use `md-top-app-bar`, `md-navigation-drawer`, and `md-menu`.
-   The navigation is now responsive, with a navigation drawer for mobile and a top app bar for desktop.

### Theming

-   The `ThemeService` was updated to generate and apply M3 themes using CSS custom properties.
-   The theme choice is persisted in `localStorage`.
-   The old Angular Material theming files were removed.

### Pages

-   **Home:** Replaced the Swiper carousel with a simpler hero section. Used `md-elevated-card` for the feature cards.
-   **About:** Created a tabbed interface using `md-tabs` to display the content.
-   **Products:** Created a page that displays a list of product categories using `md-elevated-card`.
-   **Projects:** Created a page that displays a gallery of projects using the new `ImageGalleryComponent`.
-   **Quote Request:** Created a form with client-side validation using Angular's reactive forms and M3 form components.
-   **Articles:** Created a page that displays a list of articles using `md-outlined-card`.
-   **Contact:** Created a page with contact information, a map placeholder, and a contact form.

### Reusable Components

-   Created a reusable `ImageGalleryComponent` with a lightbox feature.

### Known Issues

-   The unit tests and the build script are timing out, so the application has not been fully verified. This issue needs to be investigated.
