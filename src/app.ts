import express, {
  type Application,
} from "express";
import { userRouter } from "./modules/user/user.route";
import { profileRouter } from "./modules/profile/profile.route";
import { authRouter } from "./modules/auth/auth.route";



const app: Application = express();

//* middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//* routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/profile",profileRouter)
app.use("/api/v1/auth",authRouter)



export default app
