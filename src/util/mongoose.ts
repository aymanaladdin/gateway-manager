import { connect, connection } from 'mongoose';

const initConnection = async (uri: string) => {
  const options = {
    useCreateIndex: true,
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await connect(uri, options);
  console.info('Mong connection established successfully!');

  // Exit application on error
  connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);

    process.exit(-1);
  });

  return connection;
};

export default initConnection;
