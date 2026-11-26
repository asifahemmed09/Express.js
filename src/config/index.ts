import dotenv from "dotenv"
import path from "node:path";

dotenv.config({path: path.resolve(process.cwd(),".env")})

const config = {
    port: process.env.PORT,
    connection_string: process.env.CONNECTION_STRING as string,
    jwt_secret_key: process.env.JWT_SECRET_KEY as string
} as const

export default config
