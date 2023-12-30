import express, { Application, Request, Response, NextFunction } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { Routes } from './api/routes';
const settings = require('./auth/appSettings.json');
const msalWrapper = require('./auth/wrapper/AuthProvider');
// @ts-ignore
const authProvider = new msalWrapper.AuthProvider(settings);

// @ts-ignore
class App {
  public app: Application;
  public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);

  }

  private config(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    });
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.static("public"));
    this.app.use(session({
      name: "tgmtr",
      secret: 'He&j3#(new22',
      cookie: {
        maxAge: 8 * 60 * 60 * 1000
      },
      saveUninitialized: false
    }))
    // authentication routes
    this.app.get('/signin', authProvider.signIn);
    this.app.get('/signout', authProvider.signOut);
    this.app.get('/loginresponse', authProvider.handleRedirect);
    this.app.get('/userdetails', authProvider.isAuthenticated, authProvider.getToken, async (request:any, response, next) => {
      // @ts-ignore
      response.send({
        name: request.session.account.name,
        username: request.session.account.username,
      });
      next();
    });
  }
}

export default new App().app;