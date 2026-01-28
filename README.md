# OrderData Backend

## 🚀 Project Overview
OrderData is a backend system built with **NestJS** (v11), **TypeORM**, and **PostgreSQL**. It provides a modern API for managing user records, is designed for extensibility and robust development workflows, and now uses plain npm scripts and the standard NestJS CLI (no Nx).

**Tech Stack:**
- NestJS 11 (TypeScript)
- TypeORM 0.3 (PostgreSQL)
- Docker & Docker Compose support
- Jest Testing (unit & e2e)

---

## 🏃 Quickstart (5-Min Setup)

### 1. Start with Docker (Recommended):
```bash
git clone <your-repo>
cd OrderData/backend
cp .env.example .env  # Edit as needed
docker-compose up --build
```
Your backend will be available at [http://localhost:3000/api](http://localhost:3000/api).

### 2. Manual Local Setup:
```bash
npm ci  # or yarn install
# Start required DB (see below for Docker setup)
npm run start:dev
```

---

## 📦 Full Installation Guide
1. **Install Node.js (18+) & npm**
2. Clone this repo and `cd backend`
3. Copy `.env.example` to `.env` and update credentials as needed
4. [Optional] Use Docker Compose to run dependencies:
   ```bash
   docker-compose up -d
   ```
5. Install dependencies:
   ```bash
   npm ci
   ```
6. Run DB migrations:
   ```bash
   npm run migration:run
   ```
7. Start the server:
   ```bash
   npm run start:dev
   ```

---

## 🧑‍💻 Running the Program
- **Development Mode:**  `npm run start:dev`
- **Production Build:**  `npm run build`
- **Production Serve:**  (after build)
  ```bash
  npm run start
  ```

---

## 🔑 Environment Variables & Configuration
Copy `.env.example` to `.env` and set these variables:
```
NODE_ENV=development
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5433
DATABASE_USER=postgres
DATABASE_PASSWORD=example
DATABASE_NAME=order-data
```

---

## 📁 Project Structure
```
backend/
├── apps/
│   ├── order-data/                # Main NestJS app
│   │   ├── src/
│   │   │   ├── app/               # App bootstrap, controller, service
│   │   │   ├── config/            # Database config service
│   │   │   ├── features/
│   │   │   │   └── users/         # Users module (CRUD)
│   │   │   ├── database/
│   │   │   │   └── migrations/    # TypeORM migrations
│   │   │   └── main.ts            # Entry point (NestJS)
│   │   ├── typeorm.config.ts      # TypeORM config
│   │   └── tsconfig.*.json        # TS configs
├── docker-compose.yaml            # Compose for DB, Pulsar
├── README.md                      # This documentation!
└── ...
```

---

## 🛣️ API Documentation (All 6 Endpoints)

Base path: **/api/users**

### 1. Create a new User
- **POST /api/users**
- Request:
  ```json
  {
    "email": "user@example.com",
    "password": "strong-password"
  }
  ```
- cURL Example:
  ```bash
  curl -X POST http://localhost:3000/api/users \
   -H "Content-Type: application/json" \
   -d '{"email":"user@example.com", "password":"..."}'
  ```

### 2. Get all Users
- **GET /api/users**
- cURL:
  ```bash
  curl http://localhost:3000/api/users
  ```

### 3. Get User by ID
- **GET /api/users/:id**
- cURL:
  ```bash
  curl http://localhost:3000/api/users/1
  ```

### 4. Get User by Email
- **GET /api/users/email/:email**
- cURL:
  ```bash
  curl http://localhost:3000/api/users/email/me@example.com
  ```

### 5. Update a User
- **PATCH /api/users/:id**
- Request:
  ```json
  { "email": "new@example.com" }
  ```
- cURL:
  ```bash
  curl -X PATCH http://localhost:3000/api/users/1 \
    -H "Content-Type: application/json" \
    -d '{"email":"new@example.com"}'
  ```

### 6. Delete a User
- **DELETE /api/users/:id**
- cURL:
  ```bash
  curl -X DELETE http://localhost:3000/api/users/1
  ```

_All endpoints return status codes and error messages using NestJS HTTP conventions._

---

## 👩‍🔬 Development Commands (npm, Nest CLI, TypeORM CLI)
| Command                                                  | Description                  |
|----------------------------------------------------------|------------------------------|
| `npm run start:dev`                                      | Start dev server (hot reload)|
| `npm run build`                                          | Build for production         |
| `npm run start`                                          | Run production build         |
| `npm run test`                                           | Run Jest tests               |
| `npm run lint`                                           | Run ESLint                   |
| `npm run migration:generate --name=MyMigration`           | Generate migration           |
| `npm run migration:run`                                  | Apply DB migrations          |
| `npm run migration:revert`                               | Revert migration             |

**Code Generation:**
- Use the official [NestJS CLI](https://docs.nestjs.com/cli/overview) to scaffold new modules, controllers and services.
    ```bash
    npx nest g module products
    npx nest g controller products
    npx nest g service products
    ```
  This will generate boilerplate and update imports. No NX required.

---

## 🧩 How to Extend: Add Products Feature

This project uses a modular feature-based structure. Here’s how you would add a **Products** feature with CRUD endpoints using the Nest CLI:

1. **Generate the Module, Controller, and Service:**
   ```bash
   npx nest g module features/products
   npx nest g controller features/products
   npx nest g service features/products
   ```

2. **Entity (src/features/products/entities/Product.entity.ts):**
   ```ts
   import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
   
   @Entity('products')
   export class Product {
     @PrimaryGeneratedColumn() id: number;
     @Column() name: string;
     @Column('decimal') price: number;
     @Column({ nullable: true }) description?: string;
   }
   ```

3. **Controller/Service:** Copy patterns from `users`, adapt as needed.
4. **Migrations:**
   ```bash
   npm run migration:generate --name=CreateProducts
   npm run migration:run
   ```
5. **Test:** Add endpoints/tests as in users feature.

---

## 🗃️ Database & TypeORM Guide
- TypeORM configured in `src/config/database-config.service.ts` and `apps/order-data/typeorm.config.ts`
- Migrations in `src/database/migrations/`
- Entities from `features/<feature>/entities/*.entity.ts`
- Production/Development configs via `.env`
- To sync or migrate entities, use the scripts above.

---

## 🛠️ Troubleshooting
- **DB Connection Error**: Make sure `docker-compose` DB is running, `.env` credentials are correct
- **Migrations Fail**: Delete generated files if corrupted, check for pending DB changes
- **Port In Use**: Edit `.env` or stop other apps
- **Type Errors**: Ensure Node.js, npm, and TypeScript versions match requirements

---

## 🏗️ Best Practices (NestJS)
- Use modules for each domain/feature
- Keep controller logic minimal; prefer services and repositories
- Use DTOs & Pipes to validate/transform input
- Prefer async/promise-based code
- Handle errors with NestJS exception filters
- Manage secrets/infra with environment variables
- Use migrations, not `synchronize: true`
- Write and run tests (see `test` script)

---

## 🐳 Docker & Docker-Compose
- **Build and run:**
  ```bash
  docker-compose up --build
  ```
- **Teardown:**
  ```bash
  docker-compose down -v
  ```
- Make sure to keep your `.env` in sync for each environment

---

## 🚢 Deployment Guide
1. Set environment variables for production
2. Use Docker or build scripts for reproducibility
3. Run migrations before start
4. Launch with:
   ```bash
   npm run build
   npm run start
   ```

---

## 🧪 Jest Testing Setup
- Run all tests: `npm run test`
- E2E tests: located in `/apps/order-data-e2e/` (run manually as needed)
- Jest config in `/apps/order-data/jest.config.cts`

---

## 🧑‍🎓 For Beginners
- This README is beginner-friendly: follow the quick start section
- Each section in the codebase is commented where needed
- To learn more, see official docs:
  - [NestJS Docs](https://docs.nestjs.com/)
  - [TypeORM Docs](https://typeorm.io/)
  - [Docker Docs](https://docs.docker.com/)
- If you get stuck: check Troubleshooting, then search online

---

Happy building! 🚀
