const Units = require('../../models/Units');
const Members = require('../../models/Members');

const sendError = (statusCode, msg, replyCb) => {
  return replyCb.status(statusCode).send(new Error(msg));
};

const getAllUnitsHandler = async (req, reply) => {
  try {
    const units = await Units.find({});

    const unitsWithMembers = await Promise.all(
      units.map((unit) => addUnitMembers(unit))
    );

    return reply.send(unitsWithMembers);
  } catch (err) {
    sendError(500, 'A server error occurred', reply);
  }
};

const addUnitMembers = async (unit) => {
  const members = await Members.find({ unit: unit.name });

  return { id: unit.id, name: unit.name, members: members.length };
};

module.exports = {
  getAllUnitsHandler,
};
