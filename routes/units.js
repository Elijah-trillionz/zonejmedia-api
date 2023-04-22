const {
  getAllUnitsHandler,
  getUnitMembersHandler,
} = require('../controllers/handlers/units');
const {
  getAllUnitsSchema,
  getUnitMembersSchema,
} = require('../controllers/schemas/units');

const getAllUnitsOpts = {
  schema: getAllUnitsSchema,
  handler: getAllUnitsHandler,
};

const getUnitMembersOpts = {
  schema: getUnitMembersSchema,
  handler: getUnitMembersHandler,
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

  fastify.get('/:unit', {
    preHandler: fastify.auth([fastify.verifyAdminToken]),
    ...getUnitMembersOpts,
  });
};

module.exports = unitsRoutes;
