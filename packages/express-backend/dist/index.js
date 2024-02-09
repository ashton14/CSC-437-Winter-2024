import express from "express";
import cors from "cors";
import { connect } from "./mongoConnect.js";
import profiles from "./profiles.js";
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
connect("caddycoaches");
app.get("/hello", (req, res)=>{
    res.send("Hello, World");
});
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
});
app.get("/api/profile/:userid", (req, res)=>{
    const { name } = req.params;
    profiles.get(name).then((profile)=>res.json(profile)).catch((err)=>res.status(404).end());
});
app.post("/api/profiles", (req, res)=>{
    const newProfile = req.body;
    profiles.create(newProfile).then((profile)=>res.status(201).send(profile)).catch((err)=>res.status(500).send(err));
});
