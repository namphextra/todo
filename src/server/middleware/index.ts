import express from 'express'
import jwt from 'jsonwebtoken'
import config from '../../../config/dev.conf'

class Middleware {
  constructor(app: any) {
    const ProtectedRoutes = express.Router();

    app.use('/api', ProtectedRoutes);

    ProtectedRoutes.use((req: any, res: any, next: any) => {
      const token = req.headers['access-token'];

      if (token) {
        jwt.verify(token, config.secret, (err: any, decoded: any) => {
          if (err) {
            return res.json({ message: 'invalid token' });
          }
          req.decoded = decoded;
          next();
        });
      } else {
        res.json({ message: 'No token provided' });
      }
    });
  }
}

export default Middleware
