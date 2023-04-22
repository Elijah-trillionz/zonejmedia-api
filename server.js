const app = require('fastify')({ logger: true });
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
require('dotenv').config();

connectDB();
app.register(require('@fastify/cors'), {
  origin: ['http://localhost:5173'],
});

app.register(require('./routes/admins'), { prefix: '/admins' });

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
