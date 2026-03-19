import 'dotenv/config';
import app from './app.js';
import { createServer } from 'node:http';

import { loadRoles } from './lib/roles.js';
import { initSocket } from './lib/socket.js';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  await loadRoles();
  const server = createServer(app);
  initSocket(server);
  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

bootstrap();
