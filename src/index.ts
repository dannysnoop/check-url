import express from 'express';
import urlRoutes from './routers/urlRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', urlRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});