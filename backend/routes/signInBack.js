/*const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET; // || 'your_secret_key';

module.exports = async function (fastify, opts) {
  fastify.post('/api/login', {
    schema: {
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string', minLength: 1, maxLength: 30 },
          password: { type: 'string', minLength: 9, maxLength: 100 }
        },
        additionalProperties: false
      }
    }
  }, async (request, reply) => {
    const { username, password } = request.body;

    try {
      const user = await new Promise((resolve, reject) => {
        fastify.db.get(
          `SELECT id, username, email, password, twofa_enabled FROM users WHERE username = ?`,
          [username],
          (err, row) => {
            if (err) reject(err);
            else resolve(row);
          }
        );
      });

      if (!user) {
        return reply.code(400).send({ error: ['Invalid credentials'] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return reply.code(400).send({ error: ['Invalid credentials'] });
      }

      // If 2FA is enabled, send short-lived token and require second step
      if (user.twofa_enabled) {
        const tempToken = jwt.sign(
          { id: user.id, username: user.username, twofa_verified: false },
          JWT_SECRET,
          { expiresIn: '5m' }
        );
        return reply.code(200).send({ twofa_required: true, temp_token: tempToken });
      }

      // ✅ If no 2FA, issue full access JWT
      const fullToken = jwt.sign(
        { id: user.id, username: user.username, twofa_verified: true },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Optionally update online status
      await new Promise((resolve, reject) => {
        fastify.db.run(
          'UPDATE users SET online_status = ? WHERE id = ?',
          [true, user.id],
          (err) => err ? reject(err) : resolve()
        );
      });

      reply.code(200).send({ token: fullToken });

    } catch (err) {
      console.error('Login error:', err);
      return reply.code(500).send({ error: ['Server error'] });
    }
  });
};*/



module.exports = async function (fastify, opts) {
  fastify.post('/api/login', {
    schema: {
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string', minLength: 1, maxLength: 30 },
          password: { type: 'string', minLength: 9, maxLength: 100 }
        },
        additionalProperties: false
      }
    }
  }, async (request, reply) => {
    const { username, password } = request.body;

    try {
      const user = await new Promise((resolve, reject) => {
        fastify.db.get(
          'SELECT id, username, email, password FROM users WHERE username = ?',
          [username],
          (err, user) => {
            if (err) {
              reject(err);
            } else {
              resolve(user);
            }
          }
        );
      });


      const bcrypt = require('bcrypt');
      const isMatch = user && await bcrypt.compare(password, user.password);
      if (!user || !isMatch) {
        return reply.code(400).send({ error: ['Invalid credentials'] });
      }

      await new Promise((resolve, reject) => {
        fastify.db.run(
          'UPDATE users SET online_status = ? WHERE id = ?',
          [true, user.id],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });

      reply
        .setCookie('user_id', user.id.toString(), {
          path: '/',
          httpOnly: true,
          sameSite: 'strict',
          secure: false
        })
        .send({ success: true });

    } catch (err) {
      console.error('Login error:', err);
      return reply.code(500).send({ error: ['DB error'] });
    }
  });
};



/*module.exports = async function (fastify, opts) {
  fastify.post('/api/login', {
    schema: {
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string', minLength: 1, maxLength: 30 },
          password: { type: 'string', minLength: 9, maxLength: 100 }
        },
        additionalProperties: false
      }
      // ❗ We skip the response schema to allow flexible error responses
    }
  }, async (request, reply) => {
    const { username, password } = request.body;

    try {
      const user = await new Promise((resolve, reject) => {
        fastify.db.get(
          'SELECT id, username, email, password FROM users WHERE username = ?',
          [username],
          (err, user) => {
            if (err) {
              reject(err);
            } else {
              resolve(user);
            }
          }
        );
      });


      const bcrypt = require('bcrypt');
      const isMatch = user && await bcrypt.compare(password, user.password);
      if (!user || !isMatch) {
      //if (!user || user.password !== password) {
        return reply.code(400).send({ error: ['Invalid credentials'] });
      }

      await new Promise((resolve, reject) => {
        fastify.db.run(
          'UPDATE users SET online_status = ? WHERE id = ?',
          [true, user.id],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });

      reply
        .setCookie('user_id', user.id.toString(), {
          path: '/',
          httpOnly: true,
          sameSite: 'strict',
          secure: false
        })
        .send({ success: true });

    } catch (err) {
      console.error('Login error:', err);
      return reply.code(500).send({ error: ['DB error'] });
    }
  });
};*/



/*module.exports = async function (fastify, opts) {
  fastify.post('/api/login', {
    schema: {
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string', minLength: 3, maxLength: 30 },
          password: { type: 'string', minLength: 6, maxLength: 100 }
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
          properties: {
            error: {
              type: 'array',
              items: { type: 'string' }
            }
          }
        },
        500: {
          type: 'object',
          properties: {
            error: {
              type: 'array',
              items: { type: 'string' }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { username, password } = request.body;

    try {
      const user = await new Promise((resolve, reject) => {
        fastify.db.get(
          'SELECT id, username, email, password FROM users WHERE username = ?',
          [username],
          (err, user) => {
            if (err) {
              reject(err);
            } else {
              resolve(user);
            }
          }
        );
      });

      if (!user || user.password !== password) {
        return reply.code(400).send({ error: ['Invalid credentials'] });
      }

      await new Promise((resolve, reject) => {
        fastify.db.run(
          'UPDATE users SET online_status = ? WHERE id = ?',
          [true, user.id],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });

      reply
        .setCookie('user_id', user.id.toString(), {
          path: '/',
          httpOnly: true,
          sameSite: 'strict',
          secure: false
        })
        .send({ success: true });

    } catch (err) {
      console.error('Login error:', err);
      return reply.code(500).send({ error: ['DB error'] });
    }
  });
};*/



/*module.exports = async function (fastify, opts) {
  fastify.post('/api/login', async (request, reply) => {
    const { username, password } = request.body;

    if (!username || !password) {
      return reply.code(400).send({ error: ['Missing username or password'] });
    }

    try {
      const user = await new Promise((resolve, reject) => {
        fastify.db.get(
          'SELECT id, username, email, password FROM users WHERE username = ?',
          [username],
          (err, user) => {
            if (err) {
              reject(err);
            } else {
              resolve(user);
            }
          }
        );
      });

      if (!user || user.password !== password) {
        return reply.code(400).send({ error: ['Invalid credentials'] });
      }

      // ✅ Set user's online_status = true
      await new Promise((resolve, reject) => {
        fastify.db.run(
          'UPDATE users SET online_status = ? WHERE id = ?',
          [true, user.id],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });

      // ✅ Set cookie with user_id
      reply
        .setCookie('user_id', user.id.toString(), {
          path: '/',
          httpOnly: true,
          sameSite: 'strict',
          secure: false // for localhost https (127.0.0.1)
        })
        .send({ success: true });

    } catch (err) {
      console.error('Login error:', err);
      return reply.code(500).send({ error: ['DB error'] });
    }
  });
};*/


/*module.exports = async function (fastify, opts) {
  fastify.post('/api/login', async (request, reply) => {
    const { username, password } = request.body;

    if (!username || !password) {
      return reply.code(400).send({ error: ['Missing username or password'] });
    }

    try {
      const user = await new Promise((resolve, reject) => {
        fastify.db.get(
          'SELECT id, username, email, password FROM users WHERE username = ?',
          [username],
          (err, user) => {
            if (err) {
              reject(err);
            } else {
              resolve(user);
            }
          }
        );
      });

      if (!user || user.password !== password) {
        return reply.code(400).send({ error: ['Invalid credentials'] });
      }

      // Set cookie with user_id after successful login
      reply
        .setCookie('user_id', user.id.toString(), {
          path: '/',
          httpOnly: true,
          sameSite: 'strict',
          secure: false // set false for localhost https (127.0.0.1)
        })
        .send({ success: true });

    } catch (err) {
      console.error('Login error:', err);
      return reply.code(500).send({ error: ['DB error'] });
    }
  });
};*/



/*module.exports = async function (fastify, opts) {
  fastify.post('/api/login', async (request, reply) => {
    const { username, password } = request.body;

    if (!username || !password) {
      return reply.code(400).send({ error: ['Missing username or password'] });
    }

    try {
      const user = await new Promise((resolve, reject) => {
        fastify.db.get(
          'SELECT * FROM users WHERE username = ?',
          [username],
          (err, user) => {
            if (err) {
              reject(err);
            } else {
              resolve(user);
            }
          }
        );
      });

      if (!user || user.password !== password) {
        return reply.code(400).send({ error: ['Invalid credentials'] });
      }

      // Success
      return reply.send({ success: true });

    } catch (err) {
      return reply.code(500).send({ error: ['DB error'] });
    }
  });
};*/


/*module.exports = async function (fastify, opts) {
    fastify.post('/api/login', async (request, reply) => {
      const { username, password } = request.body;
  
      if (!username || !password) {
        return reply.code(400).send({ error: ['Missing username or password'] });
      }
  
      fastify.db.get(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, user) => {
          if (err) {
            return reply.code(500).send({ error: ['DB error'] });
          }
  
          if (!user || user.password !== password) {
            return reply.code(400).send({ error: ['Invalid credentials'] });
          }
  
          // Set session, token, or cookie here if needed
          return reply.send({ success: true });
        }
      );
    });
  };*/
  

/*const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const util = require('util');

async function loginRoute(fastify, options) {
  const db = new sqlite3.Database('./database.sqlite');
  const dbGet = util.promisify(db.get).bind(db);

  // Make sure @fastify/cookie is registered in your Fastify instance
  fastify.post('/api/login', async (request, reply) => {
    const { username, password } = request.body;

    if (!username || !password) {
      return reply.status(400).send({ error: ['missing-fields'] });
    }

    try {
      const user = await dbGet('SELECT * FROM users WHERE username = ?', [username]);

      if (!user) {
        return reply.status(400).send({ error: ['invalid-credentials'] });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return reply.status(400).send({ error: ['invalid-credentials'] });
      }

      // Here you'd generate a session token or use the user ID
      const sessionValue = user.id; // simple version: use user ID

      reply
        .setCookie('session', sessionValue, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
          path: '/',
        })
        .status(200)
        .send({ message: 'login-successful' });

    } catch (err) {
      console.error(err);
      return reply.status(500).send({ error: ['server-error'] });
    }
  });
}

module.exports = loginRoute;*/



/*const bcrypt = require('bcrypt');

async function loginRoute(fastify, options) {
  const db = new require('sqlite3').verbose().Database('./database.sqlite');

  fastify.post('/api/login', (request, reply) => {
    const { username, password } = request.body;

    if (!username || !password) {
      return reply.status(400).send({ error: ['missing-fields'] });
    }

    const query = `SELECT * FROM users WHERE username = ?`;
    db.get(query, [username], async (err, user) => {
      if (err) {
        console.error(err);
        return reply.status(500).send({ error: ['server-error'] });
      }

      if (!user) {
        return reply.status(400).send({ error: ['invalid-credentials'] });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return reply.status(400).send({ error: ['invalid-credentials'] });
      }

      // Success! You could set a session cookie or just return success
      return reply.status(200).send({ message: 'login-successful' });
    });
  });
}

module.exports = loginRoute;*/


/*module.exports = async function (fastify, opts) {
    fastify.post('/api/login', async (request, reply) => {
      const { username, password } = request.body;
  
      if (!username || !password) {
        return reply.code(400).send({ error: ['Missing username or password'] });
      }
  
      fastify.db.get(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, user) => {
          if (err) {
            return reply.code(500).send({ error: ['DB error'] });
          }
  
          if (!user || user.password !== password) {
            return reply.code(400).send({ error: ['Invalid credentials'] });
          }
  
          // Set session, token, or cookie here if needed
          return reply.send({ success: true });
        }
      );
    });
  };*/
