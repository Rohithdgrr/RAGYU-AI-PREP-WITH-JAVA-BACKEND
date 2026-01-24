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

---

# Java Backend Interview & Seminar Preparation

## Core Java Concepts

### Object-Oriented Programming (OOP)
- **Encapsulation**: Data hiding using private fields and public getters/setters
- **Inheritance**: Extending classes, `extends` keyword, method overriding with `@Override`
- **Polymorphism**: Method overloading (compile-time) and overriding (runtime)
- **Abstraction**: Abstract classes vs interfaces, when to use each

### Key Java Features
- **Java 8+ Features**: Lambdas, Streams API, Optional, Functional Interfaces
- **Collections Framework**: List, Set, Map implementations and their use cases
- **Exception Handling**: Checked vs unchecked exceptions, try-catch-finally, try-with-resources
- **Generics**: Type safety, wildcards (`?`, `? extends T`, `? super T`)
- **Multithreading**: Thread class, Runnable interface, synchronized keyword, volatile
- **Java Memory Model**: Stack vs Heap, Garbage Collection algorithms

## Spring Framework

### Core Concepts
- **Dependency Injection**: Constructor injection vs Field injection vs Setter injection
- **IoC Container**: ApplicationContext, BeanFactory, Bean scopes (singleton, prototype)
- **Spring Boot Auto-configuration**: How it works, `@SpringBootApplication`, `@EnableAutoConfiguration`

### Spring MVC
- **REST Controllers**: `@RestController`, `@RequestMapping`, `@GetMapping`, `@PostMapping`
- **Request Handling**: `@PathVariable`, `@RequestParam`, `@RequestBody`, `@RequestHeader`
- **Response Handling**: `ResponseEntity`, `@ResponseStatus`, custom status codes
- **Exception Handling**: `@ControllerAdvice`, `@ExceptionHandler`, `@ResponseStatus`

### Spring Data JPA
- **Entity Mapping**: `@Entity`, `@Table`, `@Id`, `@GeneratedValue`, `@Column`
- **Relationships**: `@OneToOne`, `@OneToMany`, `@ManyToOne`, `@ManyToMany`
- **Repositories**: `JpaRepository`, custom query methods, `@Query`, `@Modifying`
- **Transactions**: `@Transactional`, propagation types, isolation levels

### Spring Security
- **Authentication vs Authorization**: Understanding the difference
- **JWT (JSON Web Tokens)**: Token generation, validation, refresh tokens
- **Security Configuration**: `SecurityFilterChain`, `HttpSecurity`, CORS, CSRF
- **User Details**: `UserDetailsService`, `UserDetails`, `PasswordEncoder`

## Database & SQL

### PostgreSQL Specific
- **Advanced Queries**: Window functions, CTEs (Common Table Expressions), recursive queries
- **Indexing**: B-tree, Hash, GIN indexes, when to use them
- **Performance**: EXPLAIN ANALYZE, query optimization, connection pooling (HikariCP)
- **Data Types**: JSON/JSONB, UUID, Arrays, custom types

### SQL Best Practices
- **Normalization**: 1NF, 2NF, 3NF, when to denormalize
- **Joins**: INNER, LEFT, RIGHT, FULL joins, join performance
- **Subqueries**: Correlated vs non-correlated, EXISTS vs IN
- **ACID Properties**: Atomicity, Consistency, Isolation, Durability

## API Design & REST

### RESTful Principles
- **HTTP Methods**: GET (read), POST (create), PUT/PATCH (update), DELETE (delete)
- **Status Codes**: 2xx (success), 3xx (redirect), 4xx (client error), 5xx (server error)
- **Resource Naming**: Use nouns, plural forms, hierarchical structure
- **Versioning**: URL versioning (/api/v1/), header versioning

### API Best Practices
- **Request/Response Format**: JSON content-type, consistent structure
- **Error Handling**: Standardized error responses, error codes, messages
- **Pagination**: Page-based vs cursor-based, limit/offset parameters
- **Filtering & Sorting**: Query parameters for dynamic queries
- **HATEOAS**: Hypermedia as the Engine of Application State

## Microservices & Architecture

### Design Patterns
- **Singleton Pattern**: Implementation, thread safety, enum singleton
- **Factory Pattern**: Simple factory, factory method, abstract factory
- **Builder Pattern**: Fluent API, immutable objects
- **Strategy Pattern**: Runtime behavior selection
- **Observer Pattern**: Event-driven architecture, pub-sub

### Microservices Concepts
- **Service Communication**: REST, gRPC, message queues (RabbitMQ, Kafka)
- **Service Discovery**: Eureka, Consul, Kubernetes services
- **API Gateway**: Routing, rate limiting, authentication
- **Circuit Breaker**: Resilience4j, Hystrix patterns
- **Distributed Tracing**: OpenTelemetry, Zipkin, Jaeger

## Performance & Optimization

### JVM Tuning
- **Memory Management**: Heap size (-Xms, -Xmx), Metaspace, GC algorithms
- **Garbage Collection**: G1GC, ZGC, Shenandoah, GC tuning
- **Profiling**: VisualVM, JProfiler, YourKit
- **Monitoring**: JMX, Micrometer, Prometheus, Grafana

### Application Performance
- **Caching**: Redis, Caffeine, cache strategies (LRU, LFU, TTL)
- **Connection Pooling**: HikariCP configuration, optimal pool size
- **Async Processing**: `@Async`, CompletableFuture, WebFlux reactive programming
- **Database Optimization**: Indexing, query optimization, N+1 problem solutions

## Testing

### Unit Testing
- **JUnit 5**: Assertions, parameterized tests, nested tests
- **Mockito**: Mocking dependencies, verification, stubbing
- **Test Coverage**: JaCoCo, coverage thresholds

### Integration Testing
- **Spring Boot Test**: `@SpringBootTest`, `@WebMvcTest`, `@DataJpaTest`
- **TestContainers**: Real database testing, Docker containers
- **REST Assured**: API testing, JSON path assertions

## DevOps & Deployment

### Build Tools
- **Maven**: pom.xml, dependencies, plugins, lifecycle phases
- **Gradle**: build.gradle, dependency management, tasks

### Containerization
- **Docker**: Dockerfile, multi-stage builds, docker-compose
- **Kubernetes**: Pods, Services, Deployments, ConfigMaps, Secrets

### CI/CD
- **GitHub Actions**: Workflows, jobs, steps, secrets
- **Jenkins**: Pipelines, stages, shared libraries
- **Deployment Strategies**: Blue-green, canary, rolling updates

## Common Interview Questions

### Java Core
1. Difference between `==` and `.equals()`?
2. What is the difference between `ArrayList` and `LinkedList`?
3. Explain the `HashMap` internal implementation.
4. What is the difference between `String`, `StringBuilder`, and `StringBuffer`?
5. How does garbage collection work in Java?

### Spring Framework
1. What is Dependency Injection and why is it useful?
2. Explain the Spring Bean lifecycle.
3. What is the difference between `@Component`, `@Service`, `@Repository`, and `@Controller`?
4. How does Spring Security handle authentication and authorization?
5. What is the difference between `@Autowired` on fields vs constructors?

### Database & SQL
1. What is the difference between `INNER JOIN` and `LEFT JOIN`?
2. Explain ACID properties in database transactions.
3. What are database indexes and how do they improve performance?
4. What is the N+1 problem and how do you solve it?
5. Difference between `DELETE` and `TRUNCATE`?

### System Design
1. How would you design a RESTful API for a blog platform?
2. Explain microservices architecture and its pros/cons.
3. How would you handle high traffic on your application?
4. What is CAP theorem and how does it apply to distributed systems?
5. How would you implement rate limiting for an API?

## Seminar Presentation Topics

### Advanced Java
- Java 17+ Features (Records, Pattern Matching, Sealed Classes)
- Project Lombok: Reducing boilerplate code
- Java Memory Model Deep Dive
- Concurrency in Java: CompletableFuture and Reactive Streams

### Spring Ecosystem
- Spring Boot 3.x: What's New
- Spring Security 6: Security Best Practices
- Spring WebFlux: Reactive Programming with Spring
- Spring Cloud: Building Microservices

### Performance & Scalability
- JVM Performance Tuning in Production
- Database Query Optimization Techniques
- Caching Strategies for High-Performance Applications
- Building Resilient Microservices with Circuit Breakers

### Modern Development Practices
- Test-Driven Development (TDD) with Spring Boot
- Domain-Driven Design (DDD) in Practice
- Event-Driven Architecture with Kafka
- GraphQL vs REST: When to Use Which

## Recommended Resources

### Books
- "Effective Java" by Joshua Bloch
- "Spring in Action" by Craig Walls
- "Design Patterns" by Gang of Four
- "Clean Code" by Robert C. Martin
- "Java Performance" by Scott Oaks

### Online Courses
- Spring Framework Master Class (Udemy)
- Java Multithreading (Coursera)
- Microservices with Spring Boot (Pluralsight)
- Database Design and Management (edX)

### Practice Platforms
- LeetCode (algorithm practice)
- HackerRank (coding challenges)
- Codewars (kata exercises)
- Pramp (mock interviews)

## Quick Reference Commands

### Maven
```bash
mvn clean install              # Clean and build project
mvn spring-boot:run            # Run Spring Boot application
mvn test                       # Run tests
mvn package                    # Create JAR file
mvn dependency:tree            # View dependency tree
```

### Git
```bash
git branch -a                  # List all branches
git log --oneline --graph      # Visual commit history
git stash                      # Stash changes
git cherry-pick <commit>       # Apply specific commit
```

### Docker
```bash
docker build -t app:latest .   # Build Docker image
docker run -p 8080:8080 app    # Run container
docker-compose up -d           # Start services in background
docker logs -f <container>     # View container logs
```

### PostgreSQL
```sql
\d table_name                  # Describe table structure
\dt                            # List all tables
EXPLAIN ANALYZE query;         # Analyze query performance
SELECT * FROM pg_stat_activity;  # View active connections
```

## Preparation Tips

### Before the Interview
1. **Review the Job Description**: Identify key technologies and skills required
2. **Practice Coding**: Solve 2-3 coding problems daily for 2 weeks
3. **Build Projects**: Create a portfolio project using the tech stack
4. **Know Your Resume**: Be prepared to discuss every project in detail
5. **Research the Company**: Understand their products and tech stack

### During the Interview
1. **Think Aloud**: Explain your thought process while solving problems
2. **Ask Clarifying Questions**: Ensure you understand the requirements
3. **Write Clean Code**: Follow naming conventions and best practices
4. **Handle Edge Cases**: Consider null checks, empty inputs, error scenarios
5. **Be Honest**: If you don't know something, admit it and explain your approach to learning

### After the Interview
1. **Send a Thank You Note**: Follow up within 24 hours
2. **Reflect on Questions**: Note areas where you struggled
3. **Continue Learning**: Fill knowledge gaps identified during the interview
4. **Stay Positive**: Each interview is a learning experience

## Mock Interview Scenarios

### Scenario 1: Design a URL Shortener
- Requirements: Generate short URLs, redirect to original, handle expiration
- Tech Stack: Spring Boot, Redis, PostgreSQL
- Considerations: Collision handling, caching, analytics

### Scenario 2: Build a Chat Application
- Requirements: Real-time messaging, user authentication, message history
- Tech Stack: Spring Boot WebSocket, STOMP, RabbitMQ
- Considerations: Scalability, message delivery guarantees, offline support

### Scenario 3: E-commerce Order Processing
- Requirements: Product catalog, shopping cart, payment integration
- Tech Stack: Spring Boot, PostgreSQL, Stripe API, Kafka
- Considerations: Transaction management, inventory management, order status tracking
