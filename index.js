import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import storeRoutes from './routes/store.routes.js';

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error MongoDB:', err));

app.use('', storeRoutes);

const PORT = process.env.PORT || 4007;
app.listen(PORT, () => console.log(`🏪 Store Service corriendo en el puerto ${PORT}`));