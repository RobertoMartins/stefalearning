import express from 'express';
import AuthController from '../controllers/auth.controller';
import Login from '../models/login.model';

const router = express.Router();

/**
 * Login temporário até a conclusão do oidc
 */
router.post('/auth', async (req, res, next) => {
  try {
    const login: Login = await new AuthController().login(req.body);
    res.json(login);
  } catch (err) {
    next(err);
  }
});

export default router;
