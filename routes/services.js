const {
  getAllServicesHandler,
  getServiceHandler,
  createServiceHandler,
  toggleMemberHandler,
} = require('../controllers/handlers/services');

const {
  getAllServicesSchema,
  getServiceSchema,
  createServiceSchema,
  toggleMemberSchema,
} = require('../controllers/schemas/services');

const getAllServicesOpts = {
  schema: getAllServicesSchema,
  handler: getAllServicesHandler,
};

const getServiceOpts = {
  schema: getServiceSchema,
  handler: getServiceHandler,
};

const createServiceOpts = {
  schema: createServiceSchema,
  handler: createServiceHandler,
};

const toggleMemberOpts = {
  schema: toggleMemberSchema,
  handler: toggleMemberHandler,
};

const servicesRoutes = (fastify, opts, done) => {
  fastify.register(require('@fastify/auth')).after(() => {
    servicesPrivateRoutes(fastify);
  });

  done();
};

const servicesPrivateRoutes = (fastify) => {
  fastify.get('/', {
    preHandler: fastify.auth([fastify.verifyAdminToken]),
    ...getAllServicesOpts,
  });

  fastify.get('/:id', {
    preHandler: fastify.auth([fastify.verifyAdminToken]),
    ...getServiceOpts,
  });

  fastify.post('/new', {
    preHandler: fastify.auth([fastify.verifyAdminToken]),
    ...createServiceOpts,
  });

  // add or remove member
  fastify.put('/toggle-member/:id', {
    preHandler: fastify.auth([fastify.verifyAdminToken]),
    ...toggleMemberOpts,
  });

  //remove member
};

module.exports = servicesRoutes;
