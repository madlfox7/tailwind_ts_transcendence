/*const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async function (fastify) {
  fastify.get('/api/profile', async (request, reply) => {
    const db = fastify.db;

    // ✅ Extract JWT from Authorization header
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.code(401).send({ error: 'Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return reply.code(401).send({ error: 'Invalid or expired token' });
    }

    // ✅ Ensure 2FA has been completed
    if (!decoded.twofa_verified) {
      return reply.code(403).send({ error: '2FA not verified' });
    }

    // ✅ Fetch user info from database
    const user = await new Promise((resolve, reject) => {
      db.get(
        `SELECT id, username, email FROM users WHERE id = ?`,
        [decoded.id],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });

    if (!user) {
      return reply.code(404).send({ error: 'User not found' });
    }

    return reply.code(200).send({ user });
  });
};*/

module.exports = async function (fastify) {
    fastify.get('/api/profile', async (request, reply) => {
      const db = fastify.db;
  
      // Very basic authentication based on a user_id cookie (for your style)
      const userId = request.cookies?.user_id;
      if (!userId) {
        return reply.code(401).send({ error: 'Not authenticated' });
      }
      
      //ChatGPT Improved version:
      /*const userId = parseInt(request.cookies?.user_id, 10);
      if (isNaN(userId)) {
        return reply.code(401).send({ error: 'Not authenticated' });
      }*/
      
      // Find user by ID
      const query = `SELECT id, username, email FROM users WHERE id = ?`;
      const user = await new Promise((resolve, reject) => {
        db.get(query, [userId], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });
  
      if (!user) {
        return reply.code(404).send({ error: 'User not found' });
      }
  
      return reply.code(200).send({ user });
    });
  };
  