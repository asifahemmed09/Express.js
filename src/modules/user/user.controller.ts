import type { Request, Response } from "express";
import { userService } from "./user.service";

//* get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUserFromDB();
    res.status(200).json({
      success: true,
      message: "Successfully retrieved all users",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error,
    });
  }
};

//* get user
const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.getSingleUserFromDB(id as string);
    res.status(200).json({
      success: true,
      message: "Successfully retrieved  user",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error,
    });
  }
};

//* create user
const createUser = async (req: Request, res: Response) => {
  try {
    const body = await req.body;
    const result = await userService.createUserIntoDB(body);
    res.status(201).json({
      success: true,
      message: "User created successfullY",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error,
    });
  }
};

//* update user
const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.updateUserIntoDB(req.body, id as string);
    res.status(200).json({
      success: true,
      message: "User updated successfullY",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error,
    });
  }
};

//* delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUserFromDB(id as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error,
    });
  }
};

export const userController = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
