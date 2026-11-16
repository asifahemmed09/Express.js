import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_6LKYgcG0CPBf@ep-crimson-pond-bdjcxbq2-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=false&channel_binding=require",
});

const initDB = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            age INT,
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `);
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is root route",
  });
});

app.post("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const { name, email, age, password } = await req.body;
    const result = pool.query(
      `
            INSERT INTO USERS (name,email,age,password) VALUES
            ($1,$2,$3,$4) RETURNING *
        `,
      [name, email, age, password],
    );
    res.status(201).json({
      success: true,
      message: "User created successfullY",
      data: (await result).rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error,
    });
  }
});

app.listen(port, () => {
  initDB();
  console.log(`Server is listening on port: ${port}`);
});
