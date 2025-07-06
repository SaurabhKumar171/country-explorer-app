# Backend (Node.js & Express)

This directory contains the Node.js backend API for the Country Explorer application.

## Local Development Setup

These instructions are for running the backend API locally, independent of Docker.

### Prerequisites

-   Node.js (v18 or later)
-   `npm` or `yarn`
-   A local or remote MongoDB instance.

### Installation

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a file named `.env` in this directory (`server/`). This file provides the necessary environment variables for the server.
    ```
    # The port the server will run on
    PORT=5000

    # The connection string for your MongoDB database
    MONGO_URI=mongodb://localhost:27017/countriesDB
    ```

4.  **Run the development server:**
    ```bash
    npm start
    ```
    Or, if you have a `dev` script with `nodemon`:
    ```bash
    npm run dev
    ```

The API will be available at [http://localhost:5000](http://localhost:5000).

### Database Seeding

To populate your local database with country data, run the seed script. The server does **not** need to be running for this.
```bash
npm run seed
