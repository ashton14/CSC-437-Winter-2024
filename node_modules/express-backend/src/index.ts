import express, { Request, Response } from "express";
import cors from "cors";
import { connect } from "./mongoConnect.js";
import profiles from "./profiles.js";
import { Profile } from "../../lit-frontend/src/models/profile.js";
import path from "path";


const app = express();
const port = process.env.PORT || 3000;

const indexHtml = require.resolve("lit-frontend");
const dist = path.dirname(indexHtml);

app.use(cors());
app.use(express.json());
connect("CaddyCoaches");

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/api/profile/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  profiles
    .get(userid)
    .then((profile: Profile) => res.json(profile))
    .catch((err) => res.status(404).end());
});

app.post("/api/profiles", (req: Request, res: Response) => {
  const newProfile = req.body;

  profiles
    .create(newProfile)
    .then((profile: Profile) => res.status(201).send(profile))
    .catch((err) => res.status(500).send(err));
});

