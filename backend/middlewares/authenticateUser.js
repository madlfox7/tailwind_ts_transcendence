// middlewares/authenticateUser.js
async function authenticateUser(request, reply) {
    const userId = request.cookies?.user_id;
  
    if (!userId) {
      return reply.code(401).send({ error: 'Not authenticated' });
    }
  
    const user = await new Promise((resolve, reject) => {
      request.server.db.get(
        'SELECT id, username, email, profile_picture, online_status FROM users WHERE id = ?',
        [userId],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  
    if (!user) {
      return reply.code(401).send({ error: 'User not found' });
    }
  
    request.user = user; // attach user to request
  }
  
  module.exports = { authenticateUser };
  

  //console.log('Auth cookie:', request.cookies?.user_id);
