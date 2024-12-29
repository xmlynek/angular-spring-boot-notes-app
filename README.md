# Notes Demo Application

This is a **full-stack demo application** for managing notes. The project demonstrates the integration of modern technologies for building scalable, secure, and maintainable applications. It is designed primarily for educational and demonstration purposes.

---

## Features

- **User Authentication**: Secure login and authentication using Keycloak.
- **CRUD Operations**: Create, Read, Update, and Delete notes.
- **Dynamic Note Loading**: Fetch notes and their details dynamically.
- **Reactive State Management**: State management in Angular using `@ngrx/signals`.
- **Modern UI**: Responsive front-end built with PrimeNG 19.
- **API Integration**: Auto-generated REST APIs using OpenAPI.
- **Backend Services**: Developed with Spring Boot 3 for robust and scalable server-side functionality.

---

## Technologies Used

### Frontend:
- **Angular 19**: Framework for building the user interface.
- **@ngrx/signals**: Reactive state management for improved performance and scalability.
- **PrimeNG**: Rich UI components for Angular.
- **Keycloak**: Authentication and authorization.
- **OpenAPI**: API client integration.

### Backend:
- **Java 23**
- **Spring Boot 3**: Java-based framework for building RESTful backend services.
- **OpenAPI**: Auto-generates API specifications and clients.
- **Keycloak Resource server**: Integration with Keycloak for securing backend endpoints.

---

## Prerequisites

1. **Java 23** or higher (for Spring Boot backend).
2. **Node.js 22** or higher (for Angular frontend).
3. **Docker running** (for Mongo and Keycloak containers).
4. **Maven** (for building the backend).
5. **Angular CLI** (for building and serving the frontend).

---

## Usage

1. Open the frontend in your browser at `http://localhost:4200`.
2. Login using your Keycloak credentials.
3. Create, view, update, or delete notes.
4. Explore the API documentation at `http://localhost:8080/swagger-ui.html`.

---

## Future Improvements

- Implement pagination and filtering for notes.
- Enhance UI/UX with additional animations and themes.

---

## Contributions

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

