import express, {
  type Application,
} from "express";
import { userRouter } from "./modules/user/user.route";


const app: Application = express();

//* middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//* routes
app.use("/api/v1/users", userRouter)




export default app
