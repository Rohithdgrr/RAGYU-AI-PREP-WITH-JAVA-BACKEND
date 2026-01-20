# RAGYU Backend - Spring Boot

Government Jobs Preparation Platform - Java Spring Boot Backend

## Tech Stack

- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- PostgreSQL
- Spring Security with JWT
- Lombok
- WebFlux (for AI API calls)

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL 14+

## Database Setup

1. Create PostgreSQL database:
```sql
CREATE DATABASE ragyu_db;
```

2. Update `src/main/resources/application.properties` with your database credentials:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ragyu_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Environment Variables

Create a `.env` file in the project root or set environment variables:

```env
GEMINI_API_KEY=your_gemini_api_key
MISTRAL_API_KEY=your_mistral_api_key
```

## Build & Run

### Using Maven

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Using JAR

```bash
mvn clean package
java -jar target/ragyu-backend-1.0.0.jar
```

The server will start on `http://localhost:8080`

## API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Authentication
- `POST /api/auth/login` - Login with email and name
- `POST /api/auth/guest` - Create guest user

### Quiz
- `POST /api/quiz/start` - Start a new quiz (requires auth)
- `POST /api/quiz/result` - Save quiz result (requires auth)

### User
- `GET /api/user/me` - Get current user info (requires auth)

### Chat
- `POST /api/chat/message` - Send message to AI tutor

## Project Structure

```
backend/
├── src/main/java/com/ragyu/
│   ├── RagyuBackendApplication.java    # Main application
│   ├── controller/                      # REST controllers
│   ├── dto/                            # Data transfer objects
│   ├── entity/                         # JPA entities
│   ├── repository/                     # JPA repositories
│   ├── security/                       # Security configuration
│   └── service/                        # Business logic
└── src/main/resources/
    └── application.properties          # Configuration
```

## Security

- JWT-based authentication
- CORS enabled for frontend
- Public endpoints: `/api/auth/**`, `/api/health`, `/api/chat/**`
- Protected endpoints: `/api/quiz/**`, `/api/user/**`

## License

MIT
