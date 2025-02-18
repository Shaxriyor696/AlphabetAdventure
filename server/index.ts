import express from 'express';
import { setupVite } from './vite';

const app = express();
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

setupVite(app, server);
