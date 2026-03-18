import 'dotenv/config';
import app from './app.js';
import { loadRoles } from './lib/roles.js';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  await loadRoles();
  app.listen(process.env.PORT || 3000, () => {
    console.log(
      `🚀 Server running on http://localhost:${process.env.PORT || 3000}`
    );
  });
}

bootstrap();
