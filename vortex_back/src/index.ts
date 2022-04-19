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
import notFoundRouter from './services/notFound.routes';
import jwtrouter from './services/jwt.routes';

import { initializePassport } from './utilities/passport.util';
import { TokenManager } from './utilities/tokenManager.util';

// Generating the server
const app = express();
initializePassport();
console.log(TokenManager.refreshTokens);

// Setting Middlewares
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json({limit: '10mb'}));
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
app.use('/api/v1/auth/token', jwtrouter);
app.use('/api/v1/search', searchRouter);
app.use('/api/v1/search', searchRouter);
app.all('*', notFoundRouter);

// Starting the server
app.listen(app.get('PORT'), () => {
  // eslint-disable-next-line no-console
  console.log(`Server on port ${app.get('PORT')}`);
});
