import express from 'express';
import routes from './routes/routes.js';

const app = express();
const PORT = process.env.PORT || 8080;

//rutas
app.use("/", routes); 

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});