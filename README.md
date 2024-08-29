# Full Stack Application

This is a full stack application consisting of a Node.js backend and MongoDB. You can start the application either using Docker or by running directly from the source code.

## Installation Guide

### 1. Prerequisites

Ensure you have the following software installed on your system:
- [Node.js](https://nodejs.org/) (Version 18.x or higher)
- [Docker](https://www.docker.com/products/docker-desktop) (If you want to use Docker)
- [MongoDB](https://www.mongodb.com/try/download/community) (If you want to run MongoDB directly)

### 2. Clone the Project

```bash
# Clone the project from GitHub
git clone https://github.com/username/repository-name.git

# Move into the project directory
cd repository-name


How to Run
1. Run the Backend Directly
Navigate to the backend directory:


cd backend
Navigate to the server directory:


cd server
Install dependencies:


npm install
Start the backend:


nodemon app.js
2. Run the Backend Using Docker
Navigate to the directory containing the docker-compose.yml file (if it's not in the backend directory):


cd path/to/docker-compose-directory
Start the services with Docker:

docker-compose up --build
This command will build the necessary Docker images and start the containers for the backend and MongoDB.

3. Run MongoDB Directly
If you are not using Docker, you can start MongoDB directly with the following command:


mongod
Application Features
Your application supports the following main features:

Create: Add new data entries to the database.
Update: Modify existing data entries.
Delete: Remove data entries from the database.
Configuration
MongoDB URL: You can configure the MongoDB URL in the docker-compose.yml file or in the backend configuration file.
