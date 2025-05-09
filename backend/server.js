const Fastify = require('fastify');
const sqlite3 = require('sqlite3').verbose();
const fastifyCookie = require('@fastify/cookie');
const fastifyMultipart = require('@fastify/multipart');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Create log file stream
//const logStream = fs.createWriteStream(path.join(__dirname + "/backend", 'server.log'), { flags: 'a' });
const logStream = fs.createWriteStream(path.join(__dirname, 'server.log'), { flags: 'a' });

const fastify = Fastify({
  logger: {
    level: 'debug',
    stream: logStream
  }
});

// Connect to database
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  }
  console.log('Database connected');
});

// Decorate db to fastify instance
fastify.decorate('db', db);

// Close DB properly when server stops
fastify.addHook('onClose', (instance, done) => {
  db.close(done);
});

// Register plugins
fastify.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET,
});

/*fastify.register(fastifyCookie, {
  secret: 'mysecret', // you can configure if you want signed cookies later
});*/

fastify.register(fastifyMultipart);

// Register routes
fastify.register(require('./routes/signUpBack'));
fastify.register(require('./routes/signInBack'));
fastify.register(require('./routes/profileBack'));
fastify.register(require('./routes/signOutBack'));
fastify.register(require('./routes/userAvatarBack'));
fastify.register(require('./routes/updateUserBack'));
fastify.register(require('./routes/usersListBack')); // 👈 now you can uncomment and use it
fastify.register(require('./routes/friendsBack'));
fastify.register(require('./routes/pong'));
fastify.register(require('./routes/pongStats'));
fastify.register(require('./routes/verify-2fa'));
fastify.register(require('./routes/setup-2fa'));
fastify.register(require('./routes/enable-2fa'));

// Start server
fastify.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});





/*const Fastify = require('fastify');
const sqlite3 = require('sqlite3').verbose();
const fastifyCookie = require('@fastify/cookie');
const fastifyMultipart = require('@fastify/multipart');
const fs = require('fs');
const path = require('path');

// Create log file stream
const logStream = fs.createWriteStream(path.join(__dirname, 'server.log'), { flags: 'a' });

const fastify = Fastify({
  logger: {
    level: 'debug',
    stream: logStream
  }
});

/const testFilePath = path.join(__dirname, 'test-file.txt');

fs.writeFile(testFilePath, 'Test file created successfully!', (err) => {
  if (err) {
    console.error('❌ Cannot create test file:', err.message);
  } else {
    console.log('✅ Test file created successfully.');
  }
});/

// DB and plugins registration
fastify.decorate('db', new sqlite3.Database('./database.sqlite'));
fastify.register(fastifyCookie);
fastify.register(fastifyMultipart);

// Routes
fastify.register(require('./routes/signUpBack'));
fastify.register(require('./routes/signInBack'));
fastify.register(require('./routes/profileBack'));
fastify.register(require('./routes/signOutBack'));
fastify.register(require('./routes/userAvatarBack'));
fastify.register(require('./routes/updateUserBack'));
//fastify.register(require('./routes/usersListBack'));

// Start
fastify.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});*/





/*const Fastify = require('fastify');
const sqlite3 = require('sqlite3').verbose();
const fastifyCookie = require('@fastify/cookie');
const fastifyMultipart = require('@fastify/multipart'); // ✅ correctly import

// const dotenv = require('dotenv');
// dotenv.config();

//const fastify = Fastify({ logger: true }); // ✅ must create Fastify instance FIRST!
const fastify = Fastify({ logger: { level: 'debug' } });


// SQLite init
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) console.error('DB Error:', err);
  else console.log('SQLite DB connected.');
});

// Attach DB instance to Fastify for use in routes
fastify.decorate('db', db);

// Register plugins
fastify.register(fastifyCookie);  // ✅ register cookie plugin
fastify.register(fastifyMultipart); // ✅ now register multipart plugin correctly

// Example route
fastify.get('/ping', async (request, reply) => {
  return { pong: 'it works!' };
});

// Register routes
fastify.register(require('./routes/signUpBack'));
fastify.register(require('./routes/signInBack'));
fastify.register(require('./routes/profileBack'));
fastify.register(require('./routes/signOutBack'));
fastify.register(require('./routes/userAvatarBack'));
fastify.register(require('./routes/updateUserBack'));

// Start server
fastify.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});*/




/*const Fastify = require('fastify');
const sqlite3 = require('sqlite3').verbose();
const fastifyCookie = require('@fastify/cookie'); // ✅ import cookie plugin
fastify.register(require('@fastify/multipart'));

// const dotenv = require('dotenv');
// dotenv.config();

const fastify = Fastify({ logger: true });

// SQLite init
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) console.error('DB Error:', err);
  else console.log('SQLite DB connected.');
});

// Attach DB instance to Fastify for use in routes
fastify.decorate('db', db);

// Register plugins (cookie must come before routes that need it)
fastify.register(fastifyCookie);

// Example route
fastify.get('/ping', async (request, reply) => {
  return { pong: 'it works!' };
});

// Register routes
fastify.register(require('./routes/signUpBack'));
fastify.register(require('./routes/signInBack'));
fastify.register(require('./routes/profileBack'));
fastify.register(require('./routes/signOutBack'));
fastify.register(require('./routes/userAvatarBack'));
fastify.register(require('./routes/updateUserBack'));


// Start server
fastify.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});*/




/*const Fastify = require('fastify');
const sqlite3 = require('sqlite3').verbose();

//require('dotenv').config();

const fastify = Fastify({ logger: true });

// SQLite init
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) console.error('DB Error:', err);
  else console.log('SQLite DB connected.');
});

// Attach DB instance to Fastify for use in routes
fastify.decorate('db', db);

// Example route
fastify.get('/ping', async (request, reply) => {
  return { pong: 'it works!' };
});

// Register routes
fastify.register(require('./routes/signup'));
fastify.register(require('./routes/auth/login'));
fastify.register(require('@fastify/cookie'));
fastify.register(require('./routes/profile'));

// Start server
fastify.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});*/
