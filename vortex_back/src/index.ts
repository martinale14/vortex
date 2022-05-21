// Importing libraries
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';

// Importing routers
import mainRouter from './services/public/main.routes';
import authRouter from './services/auth/auth.routes';
import searchRouter from './services/search.routes';
import notFoundRouter from './services/public/notFound.routes';
import jwtrouter from './services/auth/jwt.routes';
import companyRouter from './services/companies.routes';
import projectRouter from './services/projects.routes';
import sprintRouter from './services/sprints.routes';
import historyRouter from './services/histories.routes';
import accRouter from './services/acc.routes';
import versionRouter from './services/versions.routes';

import { initializePassport } from './utilities/passport.util';
import { verifyJWT } from './middlewares/jwt.middleware';

const allowedOrigins: [string, string] = ['https://anahu-1428.web.app', 'http://localhost:3000'];

// Generating the server
const app = express();
initializePassport();

// Setting Middlewares
app.use(
  cors((req, cb) => {
    if (allowedOrigins.includes(req.header('Origin')!)) {
      cb(null, { origin: true });
    } else {
      cb(null, { origin: false });
    }
  })
);
app.use(express.json({ limit: '10mb' }));
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
app.use('/api/v1/auth/token', jwtrouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/company', verifyJWT, companyRouter);
app.use('/api/v1/project', verifyJWT, projectRouter);
app.use('/api/v1/sprint', verifyJWT, sprintRouter);
app.use('/api/v1/history', verifyJWT, historyRouter);
app.use('/api/v1/acc', verifyJWT, accRouter);
app.use('/api/v1/version', verifyJWT, versionRouter);
app.use('/api/v1/search', verifyJWT, searchRouter);
app.all('*', notFoundRouter);

// Starting the server
app.listen(app.get('PORT'), () => {
  console.log(`Server on port ${app.get('PORT')}`);
});
