# Spotto back end
A simple NestJS application built using CQRS pattern that manages books in-memory. It demonstrates clean architecture principles, validation, Swagger documentation, and Docker support.


## ✨ Features

- **CQRS Pattern** with `@nestjs/cqrs`
- **In-memory book repository**
- **CRUD operations**
- **DTO Validation** using `class-validator`
- **Swagger API Docs**
- **Unit Tests** for service layer
- **Dockerized**


## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/HashanWijesinghe/spotto-be.git
cd spotto-be
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```


## 🔬 Run tests

```bash
# unit tests
npm run test
```


## 📘 Api Documentation

Available via Swagger at:
👉 http://localhost:3000/api-docs



## 🐳 Docker

```bash
docker compose up --build
```

Then visit:
👉 http://localhost:3000



## Endpoints

| Method | URL          | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/books`     | List all books    |
| GET    | `/books/:id` | Get book by ID    |
| POST   | `/books`     | Create a new book |
| PATCH  | `/books/:id` | Update a book     |
| DELETE | `/books/:id` | Delete a book     |

Supports optional query param: ?searchTerm=test



## Project Structure

```
src/
├── books/
│   ├── commands/
│   ├── queries/
│   ├── dtos/
│   ├── handlers/
│   ├── service/
│   ├── controller/
│   ├── errors/
│   └── repository/
├── shared/
│   ├── utils/
│   └── validators/
```



## ✍️ Author
Hashan Wijesinghe
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/hashanchathuranga/)