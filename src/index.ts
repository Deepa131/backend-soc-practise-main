import express, {request, response} from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.routes';

const app = express();

app.use(bodyParser.json());

app.use('./api/users', userRoutes);
 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});