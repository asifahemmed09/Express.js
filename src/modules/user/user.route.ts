import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";

const router = Router()

router.get("/",auth,userController.getAllUsers)
router.get("/:id",userController.getUser)
router.post("/", userController.createUser)
router.put("/:id",userController.updateUser)
router.delete("/:id", userController.deleteUser)


export const userRouter = router
