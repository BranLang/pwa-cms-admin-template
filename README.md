# PVA Promo Page Template

This project is a template for creating a bilingual promotional website, inspired by the Slovak company site JUST Eurookná. It is built using a modern tech stack featuring Angular 20 for the frontend and NestJS for the backend.

The project is configured with a strict set of development rules and guidelines, which are enforced to ensure code quality, maintainability, and security. These rules are defined in the `.cursor/rules` directory.

## Tech Stack

-   **Frontend:**
    -   Angular 20
    -   Angular Material
    -   TypeScript
    -   Signals for state management
    -   `NgOptimizedImage` for image optimization
    -   `ngx-translate` for internationalization (i18n)
-   **Backend:**
    -   NestJS
    -   Passport.js with Google SSO for authentication
    -   TypeORM or Prisma for database interaction
    -   Multer for file uploads
-   **Testing:**
    -   Jasmine and Karma for unit tests
    -   Cypress for end-to-end (E2E) tests
-   **Tooling:**
    -   Angular CLI
    -   Nest CLI
    *   ESLint

## Key Features

### Public-Facing Website

-   **Home Page:** A full-width hero carousel and product category highlights.
-   **Product Pages:** Detailed pages for products, organized by categories and subcategories.
-   **About Section:** Multiple subpages for company information, services, and more.
-   **Realizations/Portfolio:** A gallery of completed projects.
-   **Articles/Blog:** A section for articles, FAQs, and other content.
-   **Price Request Form:** A form for customers to request a quote.
-   **Contact Page:** Company contact information, an embedded map, and a contact form.
-   **Internationalization:** Support for English (en) and Slovak (sk) languages, with a language switcher.
-   **GDPR Compliance:** A cookie consent banner.

### Admin Portal

-   **Authentication:** Secure login using Google SSO for authorized users.
-   **Content Management:** CRUD (Create, Read, Update, Delete) interfaces for all website content, including pages, products, categories, portfolio items, and articles.
-   **Media Library:** A tool for uploading and managing images and other media.

## Getting Started

To get the project up and running on your local machine, follow these steps.

### Prerequisites

-   Node.js (version 20.x or higher)
-   npm (version 10.x or higher)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Application

-   **Frontend:**
    ```bash
    npm start
    ```
    This will start the Angular development server, and you can view the application at `http://localhost:4200`.

-   **Backend:**
    *Note: The backend server setup is not fully defined in this template and will need to be implemented.*
    A typical NestJS application is started with:
    ```bash
    # In the server/ directory
    npm run start:dev
    ```

## Development Guidelines

This project enforces a strict set of development rules to maintain high code quality. These are defined in the `.cursor/rules` directory and cover:

-   **Code Style:** Adherence to modern Angular best practices, including the use of standalone components, signals, and built-in control flow.
-   **Scaffolding:** Use of the Angular and Nest CLIs for generating components, services, and other boilerplate.
-   **Verification:** A mandatory verification loop (`npm run verify`) must be run after each set of changes to ensure that linting, type-checking, and build processes pass.
-   **Security:** Strict security protocols, including secure handling of secrets and input validation.

**It is highly recommended to read the files in the `.cursor/rules` directory before starting development.**

## Testing

The project is set up to use both unit tests and end-to-end (E2E) tests.

-   **Unit Tests:**
    ```bash
    # From the frontend/ directory
    npm run test
    ```
    This will run the Jasmine/Karma tests.

-   **End-to-End (E2E) Tests:**
    *Note: E2E tests with Cypress are planned but not yet configured in `package.json`.* You would typically run them with a command like `npm run e2e`.

-   **Verification Script:**
    To run all checks at once, use the `verify` script:
    ```bash
    # From the frontend/ directory
    npm run verify
    ```
