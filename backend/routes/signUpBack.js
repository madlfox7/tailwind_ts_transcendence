module.exports = async function (fastify) {
  fastify.post('/api/signup', {
    schema: {
      body: {
        type: 'object',
        required: ['username', 'email', 'password'],
        properties: {
          username: { type: 'string', minLength: 1, maxLength: 30 },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 9, maxLength: 100 }
        },
        additionalProperties: false
      }
      // ❗ No response schema to avoid validation errors on dynamic error formats
    }
  }, async (request, reply) => {
    const { username, email, password } = request.body;
    const db = fastify.db;

    const checkQuery = `SELECT username, email FROM users WHERE username = ? OR email = ?`;
    const existing = await new Promise((resolve, reject) => {
      db.get(checkQuery, [username, email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (existing) {
      const errors = {};
      if (existing.username === username) errors.username = ['username-exists-error'];
      if (existing.email === email) errors.email = ['email-exists-error'];
      return reply.code(400).send(errors);
    }

    const insertQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);
    await new Promise((resolve, reject) => {
      db.run(insertQuery, [username, email, hashedPassword], function (err) {
      //db.run(insertQuery, [username, email, password], function (err) {
        if (err) reject(err);
        else {
          reply
            .setCookie('user_id', this.lastID.toString(), {
              path: '/',
              httpOnly: true,
              sameSite: 'strict',
              secure: false // Use `true` in production
            })
            .code(200)
            .send({ success: true });
          resolve();
        }
      });
    });
  });
};



/*module.exports = async function (fastify) {
  
  fastify.post('/api/signup', {
    schema: {
      body: {
        type: 'object',
        required: ['username', 'email', 'password'],
        properties: {
          username: { type: 'string', minLength: 3, maxLength: 30 },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 9, maxLength: 100 }
        },
        additionalProperties: false
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' }
          }
        },
        400: {
          type: 'object',
          additionalProperties: {
            type: 'array',
            items: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { username, email, password } = request.body;

    const db = fastify.db;
    const checkQuery = `SELECT username, email FROM users WHERE username = ? OR email = ?`;
    const existing = await new Promise((resolve, reject) => {
      db.get(checkQuery, [username, email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (existing) {
      const errors = {};
      if (existing.username === username) errors.username = ['username-exists-error'];
      if (existing.email === email) errors.email = ['email-exists-error'];
      return reply.code(400).send(errors);
    }

    const insertQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    await new Promise((resolve, reject) => {
      db.run(insertQuery, [username, email, password], function (err) {
        if (err) reject(err);
        else {
          reply
            .setCookie('user_id', this.lastID.toString(), {
              path: '/',
              httpOnly: true,
              sameSite: 'strict',
              secure: false // set to true in production
            })
            .code(200)
            .send({ success: true });
          resolve();
        }
      });
    });
  });
};*/




/*module.exports = async function (fastify) {
  
  fastify.post('/api/signup', async (request, reply) => {
    const { username, email, password } = request.body;
  
    if (!username || !email || !password) {
      return reply.code(400).send({ error: 'Missing required fields' });
    }
  
    const db = fastify.db;
    const checkQuery = `SELECT username, email FROM users WHERE username = ? OR email = ?`;
    const existing = await new Promise((resolve, reject) => {
      db.get(checkQuery, [username, email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  
    if (existing) {
      const errors = {};
      if (existing.username === username) errors.username = ['username-exists-error'];
      if (existing.email === email) errors.email = ['email-exists-error'];
      return reply.code(400).send(errors);
    }
  
    const insertQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    await new Promise((resolve, reject) => {
      db.run(insertQuery, [username, email, password], function (err) {
        if (err) reject(err);
        else {
          reply
            .setCookie('user_id', this.lastID.toString(), {
              path: '/',
              httpOnly: true,
              sameSite: 'strict',
              secure: false // important for 127.0.0.1!
            })
            .code(200)
            .send({ success: true });
          resolve();
        }
      });
    });
  });
};*/


/*module.exports = async function (fastify) {
    fastify.post('/api/signup', async (request, reply) => {
      const { username, email, password } = request.body;
  
      // Simple validations (replace with real ones if needed)
      if (!username || !email || !password) {
        return reply.code(400).send({ error: 'Missing required fields' });
      }
  
      const db = fastify.db;
  
      // Check for existing username or email
      const errors = {};
      const checkQuery = `SELECT username, email FROM users WHERE username = ? OR email = ?`;
      const existing = await new Promise((resolve, reject) => {
        db.get(checkQuery, [username, email], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });
  
      if (existing) {
        if (existing.username === username) {
          errors.username = ['username-exists-error'];
        }
        if (existing.email === email) {
          errors.email = ['email-exists-error'];
        }
        return reply.code(400).send(errors);
      }
  
      // Insert new user
      const insertQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
      await new Promise((resolve, reject) => {
        db.run(insertQuery, [username, email, password], function (err) {
          if (err) reject(err);
          else resolve();
        });
      });
  
      reply.code(200).send({ success: true });
    });
  };*/
  