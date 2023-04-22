const { ulid } = require('ulid');
const Members = require('../../models/Members');

const sendError = (statusCode, msg, replyCb) => {
  return replyCb.status(statusCode).send(new Error(msg));
};

const getAllMembersHandler = async (req, reply) => {
  try {
    const members = await Members.find({});

    return reply.send(members);
  } catch (err) {
    sendError(500, 'A server error occurred', reply);
  }
};

const getMemberHandler = async (req, reply) => {
  const { id } = req.params;
  try {
    const member = await Members.findOne({ id });

    if (!member) return sendError(404, 'This member does not exist', reply);

    return reply.send(member);
  } catch (err) {
    sendError(500, 'A server error occurred', reply);
  }
};

const createMemberHandler = async (req, reply) => {
  const {
    name,
    homeAddress,
    schoolAddress,
    email,
    phoneNum,
    gender,
    unit,
    dept,
    dateOfBirth,
  } = req.body;
  try {
    const id = ulid();

    await Members.create({
      name,
      homeAddress,
      schoolAddress,
      email,
      phoneNum,
      gender,
      unit,
      dept,
      dateOfBirth,
      id,
    });

    return reply.send({ msg: 'Member created' });
  } catch (err) {
    sendError(500, 'A server error occurred', reply);
  }
};

const updateMemberHandler = async (req, reply) => {
  const {
    name,
    homeAddress,
    schoolAddress,
    email,
    phoneNum,
    gender,
    unit,
    dept,
    dateOfBirth,
  } = req.body;
  const { id } = req.params;
  try {
    const memberExists = await Members.findOne({ id });
    if (!memberExists)
      return sendError(400, 'This member does not exist', reply);

    await Members.findOneAndUpdate(
      { id },
      {
        name,
        homeAddress,
        schoolAddress,
        email,
        phoneNum,
        gender,
        unit,
        dept,
        dateOfBirth,
      }
    );

    return reply.send({ msg: 'Member updated' });
  } catch (err) {
    sendError(500, 'A server error occurred', reply);
  }
};

module.exports = {
  getAllMembersHandler,
  getMemberHandler,
  createMemberHandler,
  updateMemberHandler,
};
