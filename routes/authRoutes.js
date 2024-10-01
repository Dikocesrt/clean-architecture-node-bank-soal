const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const AuthUseCase = require('../usecases/authUsecase');
const AuthRepository = require('../repositories/authRepository');

const authRepository = new AuthRepository();
const authUsecase = new AuthUseCase(authRepository);
const authController = new AuthController(authUsecase);

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

module.exports = router;
