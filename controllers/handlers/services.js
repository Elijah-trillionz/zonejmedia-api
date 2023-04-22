const Services = require('../../models/Services');
const Members = require('../../models/Members');
const { ulid } = require('ulid');

const sendError = (statusCode, msg, replyCb) => {
  return replyCb.status(statusCode).send(new Error(msg));
};

const getAllServicesHandler = async (req, reply) => {
  try {
    const services = await Services.find({});

    return reply.send(services);
  } catch (err) {
    sendError(500, 'A server error occurred', reply);
  }
};

const getServiceHandler = async (req, reply) => {
  const { id } = req.params;
  try {
    console.log(id);
    const service = await Services.findOne({ id });

    if (!service) return sendError(404, 'This service does not exist', reply);

    return reply.send(service);
  } catch (err) {
    sendError(500, 'A server error occurred', reply);
  }
};

const createServiceHandler = async (req, reply) => {
  const { title } = req.body;
  try {
    const id = ulid();
    await Services.create({ title, id, attendance: [] });

    return reply.send({ msg: 'Service started' });
  } catch (err) {
    sendError(500, 'A server error occurred', reply);
  }
};

const toggleMemberHandler = async (req, reply) => {
  const { memberId, timeEntered } = req.body;
  const { id: serviceId } = req.params;

  try {
    const id = ulid();
    const service = await Services.findOne({ id: serviceId });

    if (!service) return sendError(404, 'This service does not exist', reply);

    const attendanceIds = service.attendance.map(({ memberId }) => memberId);
    if (attendanceIds.includes(memberId)) {
      await Services.findOneAndUpdate(
        { id: serviceId },
        { $pull: { attendance: { memberId } } }
      );
      return reply.send({ msg: 'Member removed' });
    } else {
      await Services.findOneAndUpdate(
        { id: serviceId },
        { $push: { attendance: { memberId, timeEntered } } }
      );
      return reply.send({ msg: 'Member added' });
    }
  } catch (err) {
    sendError(500, 'A server error occurred', reply);
  }
};

module.exports = {
  getAllServicesHandler,
  getServiceHandler,
  createServiceHandler,
  toggleMemberHandler,
};
