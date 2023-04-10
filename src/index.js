import express from "express";
import { companies, company } from "./routes/index.js";
import path from 'path';

const app = express();

app.use(express.static(path.resolve('src', 'public')))

app.get('/', function(_, res) {
  const filePath = path.resolve('src', 'public', 'index.html');
  res.sendFile(filePath);
});

app.get("/companies", companies);
app.get("/company", company);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server started on http://localhost:/${process.env.PORT}`);
});
