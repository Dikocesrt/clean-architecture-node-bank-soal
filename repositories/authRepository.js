const User = require('../entities/user');

class AuthRepository {
    async findByEmail(email) {
        const user = await User.findOne({ where: { email } });
        return user;
    }

    async createUser(user) {
        const newUser = await User.create(user);
        return newUser;
    }
}

module.exports = AuthRepository