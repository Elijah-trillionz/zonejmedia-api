const { getAllUnitsHandler } = require('../controllers/handlers/units');
const { getAllUnitsSchema } = require('../controllers/schemas/units');

const getAllUnitsOpts = {
  schema: getAllUnitsSchema,
  handler: getAllUnitsHandler,
};

const unitsRoutes = (fastify, opts, done) => {
  fastify.register(require('@fastify/auth')).after(() => {
    unitsPrivateRoutes(fastify);
  });

  done();
};

const unitsPrivateRoutes = (fastify) => {
  fastify.get('/', {
    preHandler: fastify.auth([fastify.verifyAdminToken]),
    ...getAllUnitsOpts,
  });
};

module.exports = unitsRoutes;
