const typeString = { type: 'string' };

const SimpleResSchema = {
  type: 'object',
  properties: {
    msg: typeString,
  },
};

const AdminAccessSchema = {
  type: 'object',
  required: ['access_token'],
  properties: {
    access_token: typeString,
  },
};

const registerAdminSchema = {
  body: {
    type: 'object',
    required: ['username', 'password', 'passcode'],
    properties: {
      username: typeString,
      password: typeString,
      passcode: typeString,
    },
  },
  response: {
    200: SimpleResSchema,
  },
};

const loginAdminSchema = {
  body: {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: typeString,
      password: typeString,
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        token: typeString,
      },
    },
  },
};

const getCurrentAdminSchema = {
  header: AdminAccessSchema,
  response: {
    200: {
      type: 'object',
      properties: {
        username: typeString,
        id: typeString,
      },
    },
  },
};

module.exports = {
  registerAdminSchema,
  loginAdminSchema,
  SimpleResSchema,
  getCurrentAdminSchema,
};
