import express from 'express';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars'; 
import path from 'path';
import cocktailRoutes from './routes/cocktailRoutes';

dotenv.config();

const app = express();

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({
  defaultLayout: 'main'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/', cocktailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
