const {
  getAllMembersHandler,
  getMemberHandler,
  createMemberHandler,
  updateMemberHandler,
} = require('../controllers/handlers/members');
const {
  getAllMembersSchema,
  getMemberSchema,
  createMemberSchema,
  updateMemberSchema,
} = require('../controllers/schemas/members');

const getAllMembersOpts = {
  schema: getAllMembersSchema,
  handler: getAllMembersHandler,
};

const getMemberOpts = {
  schema: getMemberSchema,
  handler: getMemberHandler,
};

const createMemberOpts = {
  schema: createMemberSchema,
  handler: createMemberHandler,
};

const updateMemberOpts = {
  schema: updateMemberSchema,
  handler: updateMemberHandler,
};

const membersRoutes = (fastify, opts, done) => {
  fastify.register(require('@fastify/auth')).after(() => {
    membersPrivateRoutes(fastify);
  });

  done();
};

const membersPrivateRoutes = (fastify) => {
  fastify.get('/', {
    preHandler: fastify.auth([fastify.verifyAdminToken]),
    ...getAllMembersOpts,
  });

  fastify.get('/:id', {
    preHandler: fastify.auth([fastify.verifyAdminToken]),
    ...getMemberOpts,
  });

  fastify.post('/new', {
    preHandler: fastify.auth([fastify.verifyAdminToken]),
    ...createMemberOpts,
  });

  fastify.put('/update/:id', {
    preHandler: fastify.auth([fastify.verifyAdminToken]),
    ...updateMemberOpts,
  });
};

module.exports = membersRoutes;
