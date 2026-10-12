from pathlib import Path

readme = r"""# JWT Authentication API

A REST API built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** to practise backend authentication. It supports user registration, password hashing with **bcrypt**, login, and **JSON Web Token (JWT)** access tokens for protected routes.

## Features

- User registration and login
- Password hashing with `bcryptjs`
- JWT access tokens with a 15-minute expiration
- Authentication middleware for protected routes
- MongoDB data storage through Mongoose
- Basic input validation and consistent JSON responses

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken
- dotenv

## Project Structure

```text
.
├── controllers/
│   └── auth-controller.js
├── db/
│   └── db.js
├── models/
│   └── schema.js
├── routes/
│   └── auth-routes.js
├── middleware/
│   └── auth-middleware.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

> Folder and file names may differ slightly depending on your local project.

## Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [MongoDB](https://www.mongodb.com/)

## Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_REPOSITORY_FOLDER>
```

Replace the placeholders with your GitHub repository URL and folder name.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=9000
MONGODB_URI=mongodb://127.0.0.1:27017/JWT_Aunthentication
JWT_SECRET_KEY=replace_this_with_a_long_random_secret
```

Use the exact MongoDB environment-variable name expected by your `db/db.js` file. If your code uses a different name than `MONGODB_URI`, update this example accordingly.

**Important:** Never commit your real `.env` file or JWT secret to GitHub. Keep `.env` in `.gitignore`. You can commit a `.env.example` containing placeholder values instead.

### 4. Start the server

Use the start script defined in your `package.json`. For example:

```bash
npm start
```

If you have not configured a start script, run:

```bash
node server.js
```

For development with Nodemon, if installed:

```bash
npx nodemon server.js
```

The API should be available at:

```text
http://localhost:9000
```

## API Endpoints

The examples below assume your routes are mounted at `/api/auth` and use `/register` and `/login`. Change the paths if your `auth-routes.js` defines different ones.

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/auth/register` | Register a user |
| `POST` | `/api/auth/login` | Log in and receive an access token |
| `GET` | `/home/welcome` | Example protected route, if configured in your project |

### Register a user

**Request**

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "username": "demo_user",
  "email": "demo@example.com",
  "password": "ReplaceWithAStrongPassword!"
}
```

A successful registration should return a success response. The API hashes the password before storing it; it should never store the original plaintext password.

### Log in

**Request**

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "username": "demo_user",
  "password": "ReplaceWithAStrongPassword!"
}
```

A successful login returns an access token in the JSON response.

Example response shape:

```json
{
  "status": "success",
  "message": "You have logged in successfully",
  "accessToken": "<JWT_ACCESS_TOKEN>"
}
```

The exact response wording depends on your controller implementation.

### Access a protected route

Send the token returned by the login endpoint in the `Authorization` header:

```http
GET /home/welcome
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

The authentication middleware verifies the token's signature and expiration before allowing the request to continue. Tokens expire after **15 minutes**, based on the current `expiresIn: "15m"` setting.

You can test these requests using [Postman](https://www.postman.com/) or another HTTP client.

## How It Works

1. **Registration:** The API receives user details, validates them, hashes the password with `bcryptjs`, and saves the user in MongoDB.
2. **Login:** The API finds the user and compares the submitted password with the stored hash.
3. **Token creation:** If the credentials are valid, the API signs a JWT containing selected user claims.
4. **Protected requests:** The client sends the JWT as a Bearer token. Middleware verifies it before passing control to the protected route.

Passwords and password hashes should **not** be included in JWT payloads. A signed JWT is not encrypted, so its payload can be read by someone who has the token.

## Testing with Postman

1. Start the server and make sure MongoDB is running.
2. Send a `POST` request to the registration endpoint.
3. Send a `POST` request to the login endpoint using the registered credentials.
4. Copy the returned `accessToken`.
5. Open a protected endpoint and select **Authorization → Bearer Token** in Postman.
6. Paste the token and send the request.
7. Try the request without a token or with an expired token to check that access is rejected.

## Security Notes

- Keep `.env` and real secrets out of version control.
- Never log or publish full Bearer tokens, passwords, or password hashes.
- Keep password hashes excluded from ordinary Mongoose queries where practical, and select them only when needed for password verification.
- Return `401 Unauthorized` for missing, invalid, or expired authentication tokens.
- If users can choose their own `role` during registration, do not trust that value for privileged access. Assign roles on the server or validate them against an explicit allowlist.
- Use HTTPS when deploying the API.
- This project is a learning project and should be reviewed and hardened before production use.

## Learning Goals

This project is intended to build practical understanding of:

- REST API structure with Express.js
- MongoDB queries and Mongoose schemas
- Password hashing and verification
- JWT creation, verification, and expiration
- Express middleware and protected routes
- Testing API requests with Postman

## Future Improvements

- Add request validation with a validation library
- Add role-based authorization checks
- Add rate limiting and login attempt protections
- Add automated tests
- Add refresh-token handling if the application requires longer sessions
- Add API documentation with Swagger/OpenAPI

## License

No license has been specified yet. Add a `LICENSE` file if you want others to use, modify, or distribute this project under explicit terms.
"""

path = Path("/mnt/data/README.md")
path.write_text(readme, encoding="utf-8")
print(f"Created {path} ({path.stat().st_size} bytes)")
