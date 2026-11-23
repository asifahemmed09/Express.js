import express, {
  type Application,
} from "express";
import { userRouter } from "./modules/user/user.route";
<<<<<<< HEAD
import { profileRouter } from "./modules/profile/profile.route";
=======
>>>>>>> f37cb1400e5f1c3382bf7c10df78183949a59471


const app: Application = express();

//* middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//* routes
app.use("/api/v1/users", userRouter)
<<<<<<< HEAD
app.use("/api/v1/profile",profileRouter)
=======
>>>>>>> f37cb1400e5f1c3382bf7c10df78183949a59471




export default app
