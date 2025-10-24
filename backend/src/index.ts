// src/index.ts
import handleProcessEvents from './startup/handleProcessEvents';
handleProcessEvents();
import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import { setupSwagger } from './swagger';
import PublicRoutes from "./routes/Public.routes";
import ProtectedRoutes from './routes/Protected.routes';
import { requestLogger } from './middleware/requestLogger';
import { authorizeAdmin, verifyJWT } from './middleware/auth';
import AdminRoutes from './routes/Admin.routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// ✅ allow both 5173 and 5174 (useful if using multiple Vite ports)
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // if you use cookies/auth headers
  })
);

app.use(requestLogger); // logs API requests
app.use(cookieParser());

const port = 3000;

app.use(express.json());

setupSwagger(app);
// Routes
app.use(PublicRoutes);
app.use(verifyJWT, ProtectedRoutes); // requires JWT authentication
app.use('/admin', verifyJWT, authorizeAdmin, AdminRoutes); // requires admin role

// Error handler
app.use(errorHandler); 


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
