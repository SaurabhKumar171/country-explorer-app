# Country Explorer Application

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A full-stack web application that allows users to browse, search, and learn about countries around the world. This project is built with a modern tech stack and is fully containerized with Docker for easy setup and deployment.

## Features

-   **Browse & Search:** Instantly search for countries by name.
-   **Filter by Continent:** Easily filter the country list by continent.
-   **Detailed View:** Click on a country to see a detailed page with information like capital, population, area, and bordering countries.
-   **Responsive Design:** A clean, modern, and fully responsive user interface.
-   **Database Seeding:** The database is automatically populated with country data on initial startup.

## Tech Stack

| Area      | Technology                                    |
| :-------- | :-------------------------------------------- |
| **Frontend** | Next.js, React, TypeScript, Tailwind CSS      |
| **Backend** | Node.js, Express.js, Mongoose               |
| **Database** | MongoDB                                       |
| **Deployment**| Docker, Docker Compose                        |

## Getting Started

This project is configured to run entirely within Docker containers. This is the recommended way to run the application for both development and production.

### Prerequisites

-   [Docker](https://www.docker.com/get-started)
-   [Docker Compose](https://docs.docker.com/compose/install/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SaurabhKumar171/country-explorer-app.git
    cd country-explorer-app
    ```

2.  **Run the application with Docker Compose:**
    This single command will build the images for the frontend and backend, start all services, and seed the database automatically.
    ```bash
    docker-compose up --build
    ```

3.  **Access the application:**
    -   **Frontend:** Open your browser to [http://localhost:3000](http://localhost:3000)
    -   **Backend API:** The API is accessible at `http://localhost:5000`

To stop the application, press `Ctrl + C` in the terminal where `docker-compose` is running, and then run `docker-compose down`.

## Local Development (Without Docker)

For developers who need to work on a specific service, the frontend and backend can be run locally. For detailed instructions, please see the README files in the respective directories:

-   [`client/README.md`](./client/README.md)
-   [`server/README.md`](./server/README.md)

## API Endpoints

The backend server provides the following main endpoints. All are prefixed with `/api/v1`.

| Method | Endpoint                  | Description                               |
| :----- | :------------------------ | :---------------------------------------- |
| `GET`  | `/countries`              | Get a list of all countries with filters. |
| `GET`  | `/countries/:cca3`        | Get full details for a single country.    |
| `GET`  | `/countries/continents`   | Get a unique list of all continents.      |
| `GET`  | `/countries/suggestions`  | Get lightweight suggestions for search.   |

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
