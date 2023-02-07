import express from "express";
import { mongoose } from "mongoose";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import userRoute from "./router/users.js";
import sectorRoute from "./router/sectors.js";
import session from "express-session";

const app = express();
if (process.env.NODE_ENV !== 'production') dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


mongoose.connect(process.env.SERVER_URL)
  .then((res) => { console.log('connect successfully') })
  .catch((err) => { console.log({ err }) });
// mongoose.set('strictQuery', true);

//enable all cors
// app.use(cors());

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }));

const sessionObj = {
  secret: 'mypassword',
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
}

const PORT = process.env.PORT || 5000;

if (process.env.VERCEL_ENV === 'production') sessionObj.cookie = { secure: true };
app.use(session(sessionObj));

app.use('/users', userRoute);
app.use('/sectors', sectorRoute);

// static files for frontend
if (process.env.VERCEL_ENV !== 'production') {

  app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'front-end', 'build')));
    res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html'));
  })
}


app.listen(PORT, () => console.log(`listening at PORT : ${PORT}`));
