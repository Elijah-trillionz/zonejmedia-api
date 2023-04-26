const { ulid } = require('ulid');
const Admins = require('../../models/Admins');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sendError = (statusCode, msg, replyCb) => {
  return replyCb.status(statusCode).send(new Error(msg));
};

const registerAdminHandler = async (req, reply) => {
  const { username, password, passcode } = req.body;
  try {
    if (passcode !== process.env.PASSCODE) {
      return reply
        .status(401)
        .send(new Error('You are not authorized to create an account'));
    }

    const userExists = await Admins.findOne({ username });
    if (userExists)
      return sendError(400, 'This username already exists', reply);

    const id = ulid();
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;

      bcrypt.hash(password, salt, async (err, hashedPassword) => {
        if (err) throw err;

        await Admins.create({ username, password: hashedPassword, id });

        return reply.send({ msg: 'account created' });
      });
    });

    await reply;
  } catch (err) {
    sendError(500, 'A server error occurred', reply);
  }
};

const loginAdminHandler = async (req, reply) => {
  const { username, password } = req.body;
  try {
    const user = await Admins.findOne({ username: username.toLowerCase() });
    if (!user)
      return sendError(400, 'Username or password is incorrect', reply);

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (!isMatch)
        return sendError(400, 'Username or password is incorrect', reply);

      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 * 24 * 100 },
        (err, token) => {
          if (err) throw err;

          return reply.send({ token });
        }
      );
    });

    await reply;
  } catch (err) {
    sendError(500, 'A server error occurred', reply);
  }
};

const getCurrentAdminHandler = async (req, reply) => {
  const { id } = req.user;
  try {
    const admin = await Admins.findOne({ id });

    if (!admin) return sendError(401, 'Unathorized access', reply);

    return reply.send(admin);
  } catch (err) {
    sendError(500, 'A server error occurred', reply);
  }
};

module.exports = {
  registerAdminHandler,
  loginAdminHandler,
  getCurrentAdminHandler,
};
