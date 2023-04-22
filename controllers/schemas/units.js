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

module.exports = {
  getAllUnitsSchema,
};
