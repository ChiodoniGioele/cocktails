import express from 'express';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars'; 
import path from 'path';
import cocktailRoutes from './routes/cocktailRoutes';
import { closeDbConnection, connectToDb } from './config/db';

dotenv.config();

const app = express();

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({
  defaultLayout: 'main'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const IMAGEFOLDER = process.env.IMAGE_FOLDER ||"uploads";
app.use(`/${IMAGEFOLDER}`, express.static(path.join(__dirname, '..', `${IMAGEFOLDER}`)));

app.use('/', cocktailRoutes);

const PORT = process.env.PORT || 3000;

connectToDb().then(() => {
  app.listen(PORT, () => {
      console.log(`Server avviato su http://localhost:${PORT}`);
  });
});

process.on('SIGINT', async () => {
  await closeDbConnection();
  process.exit(0);
});
