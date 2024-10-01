const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

class AuthUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async register(email, password, name) {
    if (!email) {
      throw { status: 400, message: 'Email is required' };
    }

    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser) {
      throw { status: 409, message: 'Email already exists' };
    }

    if (!name) {
      throw { status: 400, message: 'Name is required' };
    }
  
    if (!password) {
      throw { status: 400, message: 'Password is required' };
    }
  
    if (password.length < 12) {
      throw { status: 400, message: 'Password must be at least 12 characters long' };
    }
  
    if (!/\d/.test(password)) {
      throw { status: 400, message: 'Password must contain at least one number' };
    }
  
    if (!/[A-Z]/.test(password)) {
      throw { status: 400, message: 'Password must contain at least one uppercase letter' };
    }

    const salRounds = 10;
    const salt = bcrypt.genSaltSync(salRounds);

    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await this.authRepository.createUser({
      email: email,
      password: hashedPassword,
      name: name
    });

    return newUser;
  };

  async login(email, password) {
    if (!email || !password) {
      throw { status: 400, message: 'Email and password are required' };
    }

    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw { status: 401, message: 'Invalid email or password' };
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw { status: 401, message: 'Invalid email or password' };
    }
  
    const token = jwt.generateToken({ userId: user.id });
    return token;
  };
}

module.exports = AuthUseCase;
