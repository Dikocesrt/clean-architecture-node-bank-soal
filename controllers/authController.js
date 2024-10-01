class AuthController {
  constructor(authUsecase) {
    this.authUsecase = authUsecase;
  }

  async register(req, res) {
    try {
      const { email, password, name } = req.body;
      const user = await this.authUsecase.register(email, password, name);
      res.status(201).json({ message: 'User registered successfully', user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
      if (error.status) {
        return res.status(error.status).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await this.authUsecase.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      if (error.status) {
        return res.status(error.status).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

module.exports = AuthController;