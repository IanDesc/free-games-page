const UserModel = require('../model/User');

const userController = {
  list: async function() {
    const users = await UserModel.findAll();
    return users;
  },

  save: async function(email, password, isAdmin) {
    const user = await UserModel.create({
      email: email,
      password: password,
      isAdmin: isAdmin,
    });
    return user;
  },

  update: async function(id, email, password, isAdmin) {
    const user = await UserModel.findByPk(id);
    if (!user) {
      return false;
    }

    await user.update({
      email: email,
      password: password,
      isAdmin: isAdmin,
    });

    return user;
  },

  delete: async function(id) {
    return await UserModel.destroy({ where: { id: id } });
  },

  getById: async function(id) {
    return await UserModel.findByPk(id);
  },

  getByEmail: async function(email) {
    return await UserModel.findOne({ where: { email: email } });
  },

  // Outras funções do controlador, se necessário
};

module.exports = userController;