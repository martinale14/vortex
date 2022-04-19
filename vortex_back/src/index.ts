// Importing libraries
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';

// Importing routers
import mainRouter from './routes/main.routes';
import authRouter from './routes/auth.routes';
import searchRouter from './routes/search.routes';
import notFoundRouter from './routes/notFound.routes';

import { initializePassport } from './lib/passport.lib';

// Generating the server
const app = express();
initializePassport();

// Setting Middlewares
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(morgan(':method :url :status'));
app.use(
  session({
    secret: 'Vortex@Bird_Secret',
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Initializing APP variables
app.set('PORT', process.env.PORT || 4000);

// Routes
app.use('/api/v1', mainRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/search', searchRouter);
app.all('*', notFoundRouter);

// Starting the server
app.listen(app.get('PORT'), () => {
  // eslint-disable-next-line no-console
  console.log(`Server on port ${app.get('PORT')}`);
});
