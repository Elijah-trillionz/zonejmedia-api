const { AdminAccessSchema, MemberResSchema } = require('./members');
const typeString = { type: 'string' };

const getAllUnitsSchema = {
  header: AdminAccessSchema,
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: typeString,
          members: { type: 'number' },
          id: typeString,
        },
      },
    },
  },
};

const getUnitMembersSchema = {
  header: AdminAccessSchema,
  params: {
    unit: typeString,
  },
  response: {
    200: {
      type: 'array',
      items: MemberResSchema,
    },
  },
};

module.exports = {
  getAllUnitsSchema,
  getUnitMembersSchema,
};
