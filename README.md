# Assignment submission portal

A powerful and efficient platform where users can upload assignments and tag relevant admins. Admins can seamlessly review and manage the assignments assigned to them. The project is built with clean, modular, and scalable code, following industry best practices to ensure easy maintenance and scalability..

# Highlights

- **API Documentation:** An OpenAPI contract is provided to detail the API endpoints.
- **Postman Integration:** Easily import provided Postman collections for testing and exploration of the API.
- **Extensive Testing:** The API has been extensively tested to ensure error-free functionality and optimal performance across various scenarios.

# API Documentation

For quick testing and exploration, you can use the Postman collection provided below:

**[Postman Collection Link](postman/Assignment-app-2.postman_collection.json)**

Simply import this collection into Postman and start interacting with the APIs.

## Tech Stack

**Backend:** Node, Express, MongoDB, Passport js.

## Features

- **Secure Authentication:** Passport.js integration ensures robust user authentication and role-based access control.

- **Dynamic Filtering:** Easily filter and access relevant data for a seamless user experience.

- **Role-based API Protection:** APIs are secured based on user roles (Admin and User).

- **File Uploads:** Users can upload assignment files in PDF format, with a file size limit of 5MB.

- **Password Security:** User passwords are securely hashed to ensure privacy and security.

- **Global Error Handling:** Implemented a global error handler to provide meaningful and consistent error messages for invalid inputs.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV`

`APP_PORT`

`MONGODB_URL`

`CORS_ORIGIN`

`SESSION_SECRET`

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
