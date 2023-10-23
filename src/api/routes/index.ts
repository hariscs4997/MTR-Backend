import { Request, Response, Application } from 'express';
import api from './api';
export class Routes {

  public routes(app: Application): void {
    app.route('/_status')
      .get((req: Request, res: Response) => {
        res.status(200).send('Healthy!!!');
      });
    app.use('/api', api);
  }
}
