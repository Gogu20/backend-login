import "reflect-metadata";
import { AppDataSource } from './database/dbConfig';
import { User } from './database/entities/User'
import dotenv from 'dotenv'; dotenv.config();
import express, { Express, Router, Request, Response } from 'express';
const app: Express = express();
app.use(express.json());


await AppDataSource.initialize()
    .then(() => {
        console.log("Connected to mySQL server.");
    })
    .catch((error) => {
        console.log("Unable to connect to mySQL server.");
        throw error;
    })

app.post('/test/user', async (req: Request, res: Response) => {
    const userInput = {
        email: req.body.email,
        password: req.body.password
    }
    const user = User.create({
        email: userInput.email,
        password: userInput.password
    });

    await user.save()
        .then(() => {
            console.log("User created successfully: ", res.json(user));
        })
        .catch((error) => {
            console.log("Unable to create user.");
            console.error(error);
        })
})


app.listen(1550, () => {
    console.log(`Server running at localhost: 1550`);
})

/*const query = async (sqlQuery: string) => {
  pool.query(sqlQuery, (err: any, result: any) => {
      if(err) {
          console.error('Error executing SELECT query:', err);
          return;
      }
      console.log(result);
      return result;
  });
}

function getUsers() {
  pool.query('SELECT * FROM Users', (err: any, result: any) => {
      if(err) {
          console.error('Error executing SELECT query:', err);
          return;
      }
      console.log(result);
      return result;
  });
}

function getUser(id: number) {
  const row = pool.query(`
    SELECT *
    FROM User
    WHERE id = ${id}
  `);
  return row[0]
}

console.log(getUser(1));


async function fetchDataFromDatabase(query: string): Promise<any> {
  try {
    const pool = await DbConnection.getPool();
  const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    throw error;
  }
}

// Example usage:
const selectQuery = 'SELECT * FROM Users';
const result = await fetchDataFromDatabase(selectQuery);
console.log(result);


class UserService {
  private dbPool: any;
  constructor(dbPool: any) {
    this.dbPool = dbPool;
  }

  public async createUser(user: User) {
    try {
      this.dbPool.query(`
        INSERT INTO Users (
          email,
          password
        )
        VALUES (
          '${user.email}',
          '${user.password}'
        )
      `)
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const userService = new UserService(connection);
const newUser: User = {
  email: "test@test",
  password: "passwordTest"
}
await userService.createUser(newUser);

const closeMySqlConnectionawait = connection.end((error: Error) => {
  if (error) {
    console.error('Error closing MySQL connection:', error);
    return;
  }

  console.log('MySQL connection closed.');
});
*/