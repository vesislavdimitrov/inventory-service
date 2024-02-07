# Inventory Management Service

Welcome to the Inventory Management Service! This component is designed to seamlessly integrate into larger-scale systems or function as a standalone application.

## Prerequisites

Before you dive into using the service, make sure you have the following prerequisites in place:

- **Docker Installation:** Ensure that Docker is installed on your system.

- **Create a 'db' folder:** In the root of your project, create a folder named 'db'. Inside this folder, add a file named 'password.txt'.

  - **password.txt content:** The 'password.txt' file should contain just one line, which will serve as the password for your database.

## Getting Started

To get the Inventory Management Service up and running, follow these simple steps:

1. Open a terminal in the project directory.

2. Run the following command to build and start the service:

   ```bash
   docker-compose up --build
   ```