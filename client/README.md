# Frontend (Next.js)

This directory contains the Next.js frontend for the Country Explorer application.

## Local Development Setup

These instructions are for running the frontend locally, independent of Docker. This is useful for focused UI development.

### Prerequisites

-   Node.js (v18 or later)
-   `npm` or `yarn`

### Installation

1.  **Navigate to the client directory:**
    ```bash
    cd client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a file named `.env.local` in this directory (`client/`). This file tells the Next.js app where to find the backend API.
    ```
    NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at [http://localhost:3000](http://localhost:3000).

**Note:** For this to work, the backend server must also be running. See the instructions in the `server/README.md` file.
