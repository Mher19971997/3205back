import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";
import { IUser } from "./types";
import { AbortController } from 'abort-controller';
import cors from "cors";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors({


  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
const aaa = 'ff'

const loadData = () => {
  const data = fs.readFileSync('db.json', 'utf8');
  return JSON.parse(data);
};
let currentAbortController: AbortController | null = null;

app.get("/user", (req: Request<{}, {}, {}, { email?: string; number?: string }>, res: Response) => {
  const { email, number } = req.query;

  if (!email) {
    res.status(400).json({ message: "Email is required." });
  }

  if (currentAbortController) {
    currentAbortController.abort();
  }

  currentAbortController = new AbortController();
  const { signal } = currentAbortController;

  const userPromise = new Promise((resolve, reject) => {

    setTimeout(() => {
      if (signal.aborted) {
        return reject(new Error("Request canceled"));
      }

      const users = loadData();

      let filteredUsers = users.filter((user: IUser) => user.email === email);

      if (number) {
        filteredUsers = filteredUsers.filter((user: IUser) => user.number === number);
      }

      if (filteredUsers.length > 0) {
        resolve(filteredUsers);
      } else {
        reject(new Error("No user found with the given criteria."));
      }
    }, 5000);
  });


  userPromise
    .then(users => res.json(users))
    .catch(err => {
      if (err.message === "Request canceled") {
        res.status(408).json({ message: err.message });
      } else {
        res.status(404).json({ message: err.message });
      }
    });
});


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});