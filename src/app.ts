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
    
    
  }
}

export default new App().app;