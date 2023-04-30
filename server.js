const app = require('fastify')({ logger: true });
const { ulid } = require('ulid');
const { verifyAdminToken } = require('./auth/verifyToken');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
require('dotenv').config();

connectDB();
app.register(require('@fastify/cors'), {
  origin: ['http://localhost:3000'],
});

app.decorate('verifyAdminToken', verifyAdminToken);

app.register(require('./routes/admins'), { prefix: '/admins' });
app.register(require('./routes/members'), { prefix: '/members' });
app.register(require('./routes/units'), { prefix: '/units' });
app.register(require('./routes/services'), { prefix: '/services' });

app.get('/', (req, reply) => {
  reply.send('Hello world');
});

(async () => {
  try {
    await app.listen({ port: PORT });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
