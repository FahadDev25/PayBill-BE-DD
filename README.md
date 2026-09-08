# PayBill – Backend

PayBill is a bill-payment platform. This repository contains the Node.js/Express REST API that powers the [PayBill frontend](https://github.com/FahadDev25/PayBill-FE-DD) — handling phone/OTP authentication, utility bill registration, bill history, and payment plans, backed by a MySQL database via Sequelize.

## Tech Stack

- **Express** — HTTP server and routing
- **Sequelize** (MySQL, via `mysql2`) — ORM / models
- **jsonwebtoken** — JWT-based session auth
- **express-validator** — request validation
- **multer** — file uploads (bill images)
- **dotenv** — environment configuration
- **morgan**, **cors** — logging and CORS middleware
- **nodemon** — dev auto-reload

## Project Structure

```
index.js                     # App entry point: middleware, route mounting, DB sync, server start
app/
├── config/
│   └── db.config.js          # DB connection config (reads from env vars)
├── models/                   # Sequelize models (User, BillCompany, UserBill, Plan, ...) + db bootstrap
├── controllers/               # Route handlers (Auth, BillCompanies, UserBill, Plan)
├── routes/                   # Express routers, mounted under /api/v1/*
├── middlware/                 # JWT auth middleware
├── validations/               # express-validator rule sets per resource
├── service/                   # SMS sending service (used for OTP)
└── commons/                   # Shared response/helper functions
public/uploads/bills/         # Uploaded bill images (multer destination)
```

## Authentication

Auth is phone-number + OTP based, backed by JWT:

1. `POST /api/v1/auth/login` — takes a phone number, creates/updates the user with a generated OTP, and sends it via SMS.
2. `POST /api/v1/auth/verify-otp` — verifies the OTP and returns a JWT.
3. All protected routes require `Authorization: Bearer <token>`, checked by the `auth` middleware (`app/middlware/auth.js`), which verifies the token against `JWT_SECRET`.

## API Routes

| Base path                 | Description                                  |
|----------------------------|-----------------------------------------------|
| `/api/v1/auth`              | Login (send OTP), OTP verification, current user |
| `/api/v1/bill-companies`    | CRUD for bill companies (e.g. LESCO, MEPCO)  |
| `/api/v1/user-bill`         | CRUD for a user's registered bills (with bill picture upload) |
| `/api/v1/plan` *(currently disabled in `index.js`)* | Payment plans |

## Getting Started

### Prerequisites

- Node.js
- A MySQL database

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root (this file is gitignored and must not be committed):

```
PORT=4000
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
```

### Running

```bash
npm start
```

This runs `nodemon index.js`, which connects to the database, syncs Sequelize models, and starts the server (default port `4000`).

## Notes

- Uploaded bill images are written to `public/uploads/bills` and served as static files from `public/`.
- The `PlanRoute` is currently commented out in `index.js`; its controller/routes exist under `app/routes/PlanRoute.js` and `app/controllers/PlanController.js`.
