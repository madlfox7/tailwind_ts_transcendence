module.exports = async function (fastify, opts) {
    fastify.post('/api/logout', async (request, reply) => {
      const db = fastify.db;
  
      // Try to read user_id from cookie
      const userId = request.cookies?.user_id;
  
      if (userId) {
        // Update user's online_status to false
        await new Promise((resolve, reject) => {
          db.run(
            'UPDATE users SET online_status = ? WHERE id = ?',
            [false, userId],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
      }
  
      // Clear the user_id cookie anyway
      reply
        .clearCookie('user_id', { path: '/' })
        .code(200)
        .send({ success: true });
    });
  };
  