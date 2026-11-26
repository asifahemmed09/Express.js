import express, { type Application } from "express";
import { userRouter } from "./modules/user/user.route";
import { profileRouter } from "./modules/profile/profile.route";
import { authRouter } from "./modules/auth/auth.route";
import logger from "./middlewares/logger";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler";



const app: Application = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}


//* middlewares
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* custom middleware
app.use(logger);

//* routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/auth", authRouter);

//* errors
app.use(globalErrorHandler)

export default app;
