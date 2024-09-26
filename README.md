# Server Application

## Description
This is a simple server application built using Express and TypeScript. It provides a foundation for developing RESTful APIs and handling server-side logic.

## Features
- **TypeScript Support:** Leveraging TypeScript for type safety and modern JavaScript features.
- **Hot-reloading:** Using Nodemon to automatically reload the server during development.
- **Environment Variable Management:** Utilizing `dotenv` for managing configuration settings in different environments.
- **CORS Handling:** Configured with the CORS middleware to allow cross-origin requests.

## Installation
To get started with this server application, you will need to set up your development environment. First, ensure that Node.js and npm are installed on your machine. Then, install the necessary dependencies by running the appropriate package manager.

After the installation, you can set up your environment variables in a `.env` file at the root of the project. This file can include configurations like the server port.
## How to Run the Project

1. **Build the Project:** 
   - Run the command to transpile the TypeScript files into JavaScript:

     ```bash
     npm run build
     ```

2. **Start the Application:**
   - After building, you can start the application with the following command:

     ```bash
     npm start
     ```

3. **Development Mode:**
   - If you prefer to work in development mode, which allows for hot-reloading, use the following command:

     ```bash
     npm run dev
     ```

## License
This project is licensed under the ISC License.