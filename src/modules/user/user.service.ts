import { pool } from "../../db";
import type { IUser } from "./user.interface";

//* get all user
const getUserFromDB = async () => {
  const result = await pool.query(`
        SELECT * FROM users
    `);
  return result;
};
//* get user
const getSingleUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
            SELECT * FROM users WHERE id=$1
        `,
    [id],
  );
  return result;
};

//* create user
const createUserIntoDB = async (payLoad: IUser) => {
  const { name, email, age, password } = payLoad;
  const result = await pool.query(
    `
            INSERT INTO USERS (name,email,age,password) VALUES
            ($1,$2,$3,$4) RETURNING *
        `,
    [name, email, age, password],
  );
  return result;
};

//* update user
const updateUserIntoDB = async (payLoad: Partial<IUser>, id: string) => {
  const result = await pool.query(
    `
            UPDATE users
            SET
            name = COALESCE($1,name),
            email = COALESCE($2,email),
            password = COALESCE($3, password)
            WHERE id = $4 RETURNING *
        `,
    [payLoad.name ?? null, payLoad.email ?? null, payLoad.password ?? null, id],
  );
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
            DELETE FROM users WHERE id=$1
        `,
    [id],
  );
  return result
};

export const userService = {
  getUserFromDB,
  getSingleUserFromDB,
  createUserIntoDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
