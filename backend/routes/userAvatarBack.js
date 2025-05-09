const path = require('path');
const fs = require('fs');

module.exports = async function (fastify, opts) {
  fastify.get('/api/user_avatar', async (request, reply) => {
    const db = fastify.db;

    // Get user_id from cookie (same as profile)
    const userId = request.cookies?.user_id;
    if (!userId) {
      return reply.code(401).send({ error: 'Not authenticated' });
    }

    // Fetch user from database
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT profile_picture FROM users WHERE id = ?', [userId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!user || !user.profile_picture) {
      return reply.code(404).send({ error: 'No profile photo found' });
    }

    const profilePicturePath = path.resolve(user.profile_picture);

    // Check if file exists
    if (!fs.existsSync(profilePicturePath)) {
      return reply.code(404).send({ error: 'No profile photo found' });
    }

    // Send the image file
    return reply
      .header('Content-Type', 'image/jpeg')
      .send(fs.createReadStream(profilePicturePath));
  });
};
