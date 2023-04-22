const {
  loginAdminHandler,
  registerAdminHandler,
} = require('../controllers/handlers/admins');
const {
  registerAdminSchema,
  loginAdminSchema,
} = require('../controllers/schemas/admins');

const registerAdminOpts = {
  schema: registerAdminSchema,
  handler: registerAdminHandler,
};

const loginAdminOpts = {
  schema: loginAdminSchema,
  handler: loginAdminHandler,
};

const adminRoutes = (fastify, opts, done) => {
  // create admin acct;
  fastify.post('/new', registerAdminOpts);

  // log admin in
  fastify.post('/login', loginAdminOpts);

  done();
};

module.exports = adminRoutes;
