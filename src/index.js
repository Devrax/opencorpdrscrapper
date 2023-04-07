import express from "express";
import { companies, company } from "./routes/index.js";

const app = express();

app.get("/companies", companies);
app.get("/company", company);

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000/");
});
