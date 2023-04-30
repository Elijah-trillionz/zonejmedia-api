const {
  loginAdminHandler,
  registerAdminHandler,
  getCurrentAdminHandler,
} = require('../controllers/handlers/admins');
const {
  registerAdminSchema,
  loginAdminSchema,
  getCurrentAdminSchema,
} = require('../controllers/schemas/admins');

const registerAdminOpts = {
  schema: registerAdminSchema,
  handler: registerAdminHandler,
};

const loginAdminOpts = {
  schema: loginAdminSchema,
  handler: loginAdminHandler,
};

const getCurrentAdminOpts = {
  schema: getCurrentAdminSchema,
  handler: getCurrentAdminHandler,
};

const adminsRoutes = (fastify, opts, done) => {
  // create admin acct;
  fastify.post('/new', registerAdminOpts);

  // log admin in
  fastify.post('/login', loginAdminOpts);

  fastify.register(require('@fastify/auth')).after(() => {
    adminsPrivateRoutes(fastify);
  });

  done();
};

const adminsPrivateRoutes = (fastify) => {
  fastify.get('/admin', {
    preHandler: fastify.auth([fastify.verifyAdminToken]),
    ...getCurrentAdminOpts,
  });
};

module.exports = adminsRoutes;
