# Inventory Management Service

Welcome to the Inventory Management Service! This component is designed to seamlessly integrate into larger-scale systems or function as a standalone application.

## Prerequisites

Before you dive into using the service, make sure you have the following prerequisites in place:

- **Docker Installation:** Ensure that Docker is installed on your system.

- **Create a 'password' file:** Navigate to the folder named 'db' in the root of the project. Inside this folder, add a file named 'password.txt'.

  - **password.txt content:** The 'password.txt' file should contain just one line, which will serve as the password for your database.

## Getting Started

To get the Inventory Management Service up and running, follow these simple steps:

1. Open a terminal in the project directory.

2. Run the following command to build and start the service:

   ```bash
   docker-compose up --build
   ```

## Booting up the Web UI

The web UI is not a part of the docker-compose setup and has to be run separately, any web server can be used (e.g. nginx).
An internet connection is required even for localhost setups since the OpenUI5 libraries are being dynamically loaded through a script in the index.html.



## 
Developed as an universiy assignment by Vesislav Dimitrov (2024)
