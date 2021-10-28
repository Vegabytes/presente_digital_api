//Configuration properties

import express from 'express'
import morgan from 'morgan'
import cors from "cors"
import pkg from '../package.json'
import productRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import { createRoles } from './libs/initialSetup'
const app = express()
createRoles();

app.set('pkg', pkg);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//middleware
app.use(morgan('dev'));
app.use(cors());
//app.use(productRoutes);

app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    });
})

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)


export default app;