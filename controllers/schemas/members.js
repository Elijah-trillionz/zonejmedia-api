const { SimpleResSchema } = require('./admins');
const typeString = { type: 'string' };

const AdminAccessSchema = {
  type: 'object',
  required: ['access_token'],
  properties: {
    access_token: typeString,
  },
};

const MemberResSchema = {
  type: 'object',
  properties: {
    name: typeString,
    unit: typeString,
    createdAt: { type: 'string', format: 'date-time' },
    dateOfBirth: typeString,
    dept: typeString,
    schoolAddress: typeString,
    phoneNum: typeString,
    homeAddress: typeString,
    email: typeString,
    gender: typeString,
    id: typeString,
  },
};

const getAllMembersSchema = {
  header: AdminAccessSchema,
  response: {
    200: {
      type: 'array',
      items: MemberResSchema,
    },
  },
};

const getMemberSchema = {
  header: AdminAccessSchema,
  params: {
    id: typeString,
  },
  response: {
    200: MemberResSchema,
  },
};

const createMemberSchema = {
  header: AdminAccessSchema,
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: typeString,
      unit: typeString,
      dateOfBirth: typeString,
      dept: typeString,
      schoolAddress: typeString,
      phoneNum: typeString,
      homeAddress: typeString,
      email: typeString,
      gender: typeString,
    },
  },
  response: {
    200: SimpleResSchema,
  },
};

const updateMemberSchema = {
  header: AdminAccessSchema,
  params: {
    id: typeString,
  },
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: typeString,
      unit: typeString,
      dateOfBirth: typeString,
      dept: typeString,
      schoolAddress: typeString,
      phoneNum: typeString,
      homeAddress: typeString,
      email: typeString,
      gender: typeString,
    },
  },
  response: {
    200: SimpleResSchema,
  },
};

module.exports = {
  getAllMembersSchema,
  getMemberSchema,
  createMemberSchema,
  updateMemberSchema,
};
