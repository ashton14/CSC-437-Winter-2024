import express, { Request, Response } from "express";
import cors from "cors";
import { connect } from "./mongoConnect.js";
import profiles from "./profiles.js";
import { Profile } from "./models/profile.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
connect("caddycoaches");

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/api/profile/:userid", (req: Request, res: Response) => {
  const { name } = req.params;

  profiles
    .get(name)
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