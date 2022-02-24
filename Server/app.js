import express from 'express';
import cors from 'cors';
import urlRoutes from './routes/url.js';

function CreateApp() {
    const app = express();
    app.use(cors());
    app.use(express.json({ extented: false }));
    app.use('/', urlRoutes);
    return app;
}


export default CreateApp;