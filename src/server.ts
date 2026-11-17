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

//* Get All Users
app.get("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
        SELECT * FROM users
    `);
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
});

//* Get Single User
app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
            SELECT * FROM users WHERE id=$1
        `,
      [id],
    );
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
});

//* Create Single User
app.post("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const { name, email, age, password } = await req.body;
    const result = await pool.query(
      `
            INSERT INTO USERS (name,email,age,password) VALUES
            ($1,$2,$3,$4) RETURNING *
        `,
      [name, email, age, password],
    );
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
});

//* Update User
app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const result = await pool.query(
      `
            UPDATE users
            SET
            name = COALESCE($1,name),
            email = COALESCE($2,email),
            password = COALESCE($3, password)
            WHERE id = $4 RETURNING *
        `,
      [name ?? null, email ?? null, password ?? null, id],
    );
    res.status(200).json({
      success: true,
      message: "User created successfullY",
      data:  result.rows[0],
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
