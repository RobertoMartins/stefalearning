/* eslint-disable indent */
import debug from 'debug';
import app from './src/app';
import config from './src/utils/config/config';

debug('ts-express:server');

const onListening = (): void => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`[${config.name.toUpperCase()}] - Listening on ${bind}`);
};

const server = app.listen(config.port, onListening);
