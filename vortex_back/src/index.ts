// Importing libraries
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';

// Importing routers
import mainRouter from './services/main.routes';
import authRouter from './services/auth.routes';
import searchRouter from './services/search.routes';

// Initializing database
require('./database');

// Generating the server
const app = express();

// Setting Middlewares
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(morgan(':method :url :status'));
app.use(
  session({
    secret: 'Vortex@Bird_Secret',
    resave: false,
    saveUninitialized: false
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

// Starting the server
app.listen(app.get('PORT'), () => {
  // eslint-disable-next-line no-console
  console.log(`Server on port ${app.get('PORT')}`);
});
