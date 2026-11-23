import config from "../../config";
import { pool } from "../../db";
import type { ICredentials } from "./auth.interface";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const userLoginFromDB = async(payLoad: ICredentials) => {
    const {email,password} = payLoad
    const result =  await pool.query(`
            SELECT * FROM users WHERE email=$1
        `,[email])
    if(result.rowCount === 0){
        throw new Error("Invalid Credentials")
    }
    const isPasswordCorrect = await bcrypt.compare(password,result.rows[0]?.password)
    if(!isPasswordCorrect){
        throw new Error("Invalid Credentials")
    }
    const jwtPayLoad = {
        email: result.rows[0].email,
        password: result.rows[0].password
    }
    const secretKey =  config.jwt_secret_key as string
    const accessToken = jwt.sign(jwtPayLoad,secretKey,{
        expiresIn: "1d"
    })
    delete result.rows[0].password
    return {
        accessToken,
        user: result.rows[0]
    }

}


export const authService = {
    userLoginFromDB
}
