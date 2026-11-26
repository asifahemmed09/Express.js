import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";

const router = Router();

const roles = {
  admin: "admin",
  agent: "agent",
  user: "user",
} as const;

router.get("/", auth(roles.admin, roles.agent), userController.getAllUsers);
router.get("/:id", auth(roles.admin, roles.user), userController.getUser);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export const userRouter = router;
