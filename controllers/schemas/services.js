const { SimpleResSchema } = require('./admins');
const { AdminAccessSchema } = require('./members');
const typeString = { type: 'string' };

const ServiceResSchema = {
  type: 'object',
  properties: {
    title: typeString,
    attendance: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          memberId: typeString,
          timeEntered: typeString,
        },
      },
    },
    id: typeString,
    createdAt: { type: 'string', format: 'date-time' },
  },
};

const getAllServicesSchema = {
  header: AdminAccessSchema,
  response: {
    200: {
      type: 'array',
      items: ServiceResSchema,
    },
  },
};

const getServiceSchema = {
  header: AdminAccessSchema,
  params: {
    id: typeString,
  },
  response: {
    200: ServiceResSchema,
  },
};

const createServiceSchema = {
  header: AdminAccessSchema,
  body: {
    type: 'object',
    required: ['title'],
    properties: {
      title: typeString,
    },
  },
  response: {
    200: SimpleResSchema,
  },
};

const toggleMemberSchema = {
  header: AdminAccessSchema,
  params: {
    id: typeString,
  },
  body: {
    type: 'object',
    required: ['memberId', 'timeEntered'],
    properties: {
      memberId: typeString,
      timeEntered: typeString,
    },
  },
  response: {
    200: SimpleResSchema,
  },
};

module.exports = {
  getAllServicesSchema,
  getServiceSchema,
  createServiceSchema,
  toggleMemberSchema,
};
