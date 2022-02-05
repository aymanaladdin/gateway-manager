import dotenv from 'dotenv-safe';
import app from './app';

dotenv.config();

const port = process.env.PORT;
const env = process.env.NODE_ENV;

// listen to requests
app.listen(port, () => console.info(`server started on port ${port} (${env})`));
