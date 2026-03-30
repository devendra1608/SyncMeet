# Video Chat Application

A full-stack video chat application with a Node.js/Express backend, MongoDB persistence, and a React frontend. The backend manages user authentication, meeting history, and real-time socket connections. The frontend provides the user interface for login, registration, video meeting, and meeting history.

## Repository Structure

- `Backend/`
  - `src/app.js` - main Express server entrypoint
  - `src/controllers/` - API logic for users and socket connections
  - `src/models/` - Mongoose models for users and meetings
  - `src/routes/` - backend API routes
  - `package.json` - backend dependencies and scripts

- `Frontend/`
  - `src/App.js` - main React app component
  - `src/pages/` - React pages and views
  - `src/contexts/` - authentication context
  - `src/utils/` - helper utilities and route guards
  - `package.json` - frontend dependencies and scripts

## Prerequisites

- Node.js (recommended v18 or later)
- npm
- MongoDB database access

## Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside the `Backend` folder by copying the example file:
   ```bash
   cd Backend
   copy .env.example .env
   ```
4. Open `Backend/.env` and set `MONGODB_URI` with your MongoDB Atlas connection string.
5. Start the backend server:
   ```bash
   npm start
   ```

The backend listens on port `8000` by default.

## Frontend Setup

1. Open a terminal and navigate to the frontend folder:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```

The frontend runs in development mode on `http://localhost:3000` by default.

## Available Scripts

### Backend
- `npm start` - runs the backend server via `node src/app.js`
- `npm run dev` - runs the backend using `nodemon src/app.js`

### Frontend
- `npm start` - starts the React development server
- `npm run build` - builds the production bundle
- `npm test` - runs tests

## API Endpoints

- `POST /api/v1/users/register` - register a new user
- `POST /api/v1/users/login` - login with username and password
- `GET /api/v1/users/history?token=<token>` - get user meeting history
- `POST /api/v1/users/history` - add meeting history record

## Notes

- If you want to use environment variables, add support for `.env` in `Backend/src/app.js` and `Frontend` as needed.
- The application currently uses `bcryptjs` for password hashing.

## GitHub Push

1. Initialize git in the root if not already initialized:
   ```bash
   git init
   ```
2. Add files and commit:
   ```bash
   git add .
   git commit -m "Initial commit: add video chat application"
   ```
3. Add your GitHub remote and push:
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

---

Enjoy building and extending your video chat application!