import express, { Request, Response, Application } from 'express';
import session from 'express-session';
import path from "path"
import api from './api';

const settings = require('../../auth/appSettings.json');
const msalWrapper = require('../../auth/wrapper/AuthProvider');
// @ts-ignore
const authProvider = new msalWrapper.AuthProvider(settings);

export class Routes {
  

  public routes(app: Application): void {
    app.route('/_status').get((req: Request, res: Response) => {
      res.status(200).send('Healthy!!!');
    });
    app.use(session({
      name: "tgmtr",
      secret: 'He&j3#(new22',
      cookie: {
        maxAge: 8 * 60 * 60 * 1000
      },
      saveUninitialized: false
    }))
    // authentication routes
    app.get('/signin', authProvider.signIn);
    app.get('/signout', authProvider.signOut);
    app.get('/loginresponse', authProvider.handleRedirect);
    // app.get('/userdetails', authProvider.isAuthenticated, authProvider.getToken, async (request:any, response, next) => {
    //   // @ts-ignore
    //   response.send({
    //     name: request.session.account.name,
    //     username: request.session.account.username,
    //     role:request.session.account.idTokenClaims.roles[0]
    //   });
    //   next();
    // });
    app.use('/api', api);
    const clientPath = path.normalize(path.join(process.cwd(), './client'));
    app.use(express.static(clientPath));
    app.use('(/*)?', async (req, res, next) => {
      res.sendFile(path.join(clientPath, 'index.html'));
    });

  }
}
