import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "https://frontend-jwt-project.vercel.app",
    credentials: true,
  }),
);

app.use(express.json());

/**
 * @routes impoting authentication routes
 */
import authRotuer from "./routes/auth.routes.js";

/**
 * @name /api/auth
 * @description user authentication routes
 */
app.use("/api/auth", authRotuer);

/**
 * @description 404 error handler that catches routes that didn't match above routes
 */
app.use((req, res, next) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} Not Found`,
  });
});

export default app;
