const path = require('path');
const fs = require('fs');

module.exports = async function (fastify, opts) {
  fastify.put('/api/update_user', async (request, reply) => {
    try {
      const db = fastify.db;

      const userId = request.cookies?.user_id;
      if (!userId) {
        return reply.code(401).send({ error: 'Not authenticated' });
      }

      const parts = request.parts();
      const formFields = {};
      let uploadedProfilePicturePath = null;

      const uploadDir = path.join(__dirname, '..', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      for await (const part of parts) {
        if (part.type === 'file') {
          if (part.fieldname === 'profile_picture') {
            const extension = path.extname(part.filename) || '.jpg';
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];
            if (!allowedExtensions.includes(extension.toLowerCase())) {
              console.error('Invalid file extension:', extension);
              return reply.code(400).send({ error: 'Invalid file type' });
            }

            const filename = `avatar_${userId}_${Date.now()}${extension}`;
            const filepath = path.join(uploadDir, filename);

            await new Promise((resolve, reject) => {
              const writeStream = fs.createWriteStream(filepath);
              part.file.pipe(writeStream);
              writeStream.on('finish', resolve);
              writeStream.on('error', reject);
            });

            uploadedProfilePicturePath = filepath;
          } else {
            // Drain unexpected file parts
            await part.file.resume();
          }
        } else {
          formFields[part.fieldname] = part.value;
        }
      }

      const { username, email, password } = formFields;

      const errors = {};

      if (username && username.length < 3) {
        errors.username = ['username-too-short'];
      }

      if (email && !email.includes('@')) {
        errors.email = ['invalid-email'];
      }

      if (password && password.length < 6) {
        errors.password = ['password-too-short'];
      }

      if (Object.keys(errors).length > 0) {
        return reply.code(400).send(errors);
      }

      const fields = [];
      const values = [];

      if (username) {
        fields.push('username = ?');
        values.push(username);
      }
      if (email) {
        fields.push('email = ?');
        values.push(email);
      }
      if (password) {
        fields.push('password = ?');
        values.push(password);
      }
      if (uploadedProfilePicturePath) {
        fields.push('profile_picture = ?');
        values.push(uploadedProfilePicturePath);
      }

      if (fields.length === 0) {
        return reply.code(400).send({ error: 'Nothing to update' });
      }

      const updateQuery = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
      values.push(userId);

      await new Promise((resolve, reject) => {
        db.run(updateQuery, values, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      return reply.code(200).send({ success: true });

    } catch (err) {
      console.error('UpdateUserBack Fatal error:', err);
      return reply.code(500).send({ error: 'Server error' });
    }
  });
};



/*const path = require('path');
const fs = require('fs');

module.exports = async function (fastify, opts) {
  fastify.put('/api/update_user', async (request, reply) => {
    try {
      const db = fastify.db;

      const userId = request.cookies?.user_id;
      if (!userId) {
        return reply.code(401).send({ error: 'Not authenticated' });
      }


const FilePath = path.join(__dirname, 'test-file.txt');////
fs.writeFile(FilePath, '16', (err) => {});////


      // Parsing parts
      const parts = request.parts();
      const formFields = {};
      let profilePictureFile = null;
let i = 100;
      for await (const part of parts) {
        if (part.type === 'file') {
fs.writeFile(FilePath, '26', (err) => {});////
          if (part.fieldname === 'profile_picture') {
            profilePictureFile = part;
fs.writeFile(FilePath, '29', (err) => {});////
          }
        } else {
          formFields[part.fieldname] = part.value;
fs.writeFile(FilePath, '33', (err) => {});////
        }
        ++i;
fs.writeFile(FilePath, i.toString(), (err) => {});////
      }


fs.writeFile(FilePath, '39', (err) => {});////


      const { username, email, password } = formFields;

      const errors = {};

      if (username && username.length < 3) {
        errors.username = ['username-too-short'];
      }

      if (email && !email.includes('@')) {
        errors.email = ['invalid-email'];
      }

      if (password && password.length < 6) {
        errors.password = ['password-too-short'];
      }

      if (Object.keys(errors).length > 0) {
        return reply.code(400).send(errors);
      }


fs.writeFile(FilePath, '59', (err) => {});////


      const fields = [];
      const values = [];

      if (username) {
        fields.push('username = ?');
        values.push(username);
      }
      if (email) {
        fields.push('email = ?');
        values.push(email);
      }
      if (password) {
        fields.push('password = ?');
        values.push(password);
      }

      // If profile picture uploaded
      if (profilePictureFile) {
        const uploadDir = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const extension = path.extname(profilePictureFile.filename) || '.jpg';
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        if (!allowedExtensions.includes(extension.toLowerCase())) {
          return reply.code(400).send({ error: 'Invalid file type' });
        }

        const filename = `avatar_${userId}_${Date.now()}${extension}`;
        const filepath = path.join(uploadDir, filename);

        /*await new Promise((resolve, reject) => {
          const writeStream = fs.createWriteStream(filepath);
          profilePictureFile.file.pipe(writeStream);
          writeStream.on('finish', resolve);
          writeStream.on('error', reject);
        });

/////////////////////////////////////////////////////////
const testFilePath = path.join(__dirname, 'test-file.txt');
console.log('Starting file upload...'); // change
fs.writeFile(testFilePath, '90', (err) => {});
await new Promise((resolve, reject) => {
fs.writeFile(testFilePath, '92', (err) => {});
  const writeStream = fs.createWriteStream(filepath);
fs.writeFile(testFilePath, '94', (err) => {});
  profilePictureFile.file.pipe(writeStream);
fs.writeFile(testFilePath, '96', (err) => {});
  writeStream.on('finish', () => {
    console.log('Upload finished successfully');
    fs.writeFile(testFilePath, 'Upload finished successfully', (err) => {
});
    resolve();
  });

  writeStream.on('error', (err) => {
    console.error('Upload error:', err);
    fs.writeFile(testFilePath, 'Upload error', (err) => {
    });
    reject(err);
  });
});
/////////////////////////////////////////////////////////

        fields.push('profile_picture = ?');
        values.push(filepath);
      }



fs.writeFile(FilePath, '133', (err) => {});////


      if (fields.length === 0) {
        return reply.code(400).send({ error: 'Nothing to update' });
      }

      const updateQuery = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
      values.push(userId);

      await new Promise((resolve, reject) => {
        db.run(updateQuery, values, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      return reply.code(200).send({ success: true });

    } catch (err) {
      console.error('UpdateUserBack Fatal error:', err);
      return reply.code(500).send({ error: 'Server error' });
    }
  });
};*/



/*const path = require('path');
const fs = require('fs');

module.exports = async function (fastify, opts) {
  fastify.put('/api/update_user', async (request, reply) => {
    const db = fastify.db;

    // Get user_id from cookie
    const userId = request.cookies?.user_id;
    if (!userId) {
      return reply.code(401).send({ error: 'Not authenticated' });
    }

    try {
      // Parse multipart/form-data
      const parts = request.parts();
      const formFields = {};
      let profilePictureFile = null;

      for await (const part of parts) {
        if (part.type === 'file') {
          if (part.fieldname === 'profile_picture') {
            profilePictureFile = part;
          }
        } else {
          formFields[part.fieldname] = part.value;
        }
      }

      const { username, email, password } = formFields;

      // Simple validation
      const errors = {};

      if (username && username.length < 3) {
        errors.username = ['username-too-short'];
      }

      if (email && !email.includes('@')) {
        errors.email = ['invalid-email'];
      }

      if (password && password.length < 6) {
        errors.password = ['password-too-short'];
      }

      if (Object.keys(errors).length > 0) {
        return reply.code(400).send(errors);
      }

      // Prepare fields to update
      const fields = [];
      const values = [];

      if (username) {
        fields.push('username = ?');
        values.push(username);
      }
      if (email) {
        fields.push('email = ?');
        values.push(email);
      }
      if (password) {
        fields.push('password = ?');
        values.push(password);
      }

      // Handle profile picture upload
      if (profilePictureFile) {
        const uploadDir = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const extension = path.extname(profilePictureFile.filename) || '.jpg';
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];

        if (!allowedExtensions.includes(extension.toLowerCase())) {
          return reply.code(400).send({ error: 'Invalid file type' });
        }

        const filename = `avatar_${userId}_${Date.now()}${extension}`;
        const filepath = path.join(uploadDir, filename);

        await new Promise((resolve, reject) => {
          const writeStream = fs.createWriteStream(filepath);
          profilePictureFile.file.pipe(writeStream);
          writeStream.on('finish', resolve);
          writeStream.on('error', reject);
        });

        fields.push('profile_picture = ?');
        values.push(filepath);
      }

      if (fields.length === 0) {
        return reply.code(400).send({ error: 'Nothing to update' });
      }

      const updateQuery = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
      values.push(userId);

      await new Promise((resolve, reject) => {
        db.run(updateQuery, values, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      return reply.code(200).send({ success: true });

    } catch (err) {
      console.error('Update user error:', err);
      return reply.code(500).send({ error: 'Server error' });
    }
  });
};*/



/*const path = require('path');
const fs = require('fs');

module.exports = async function (fastify, opts) {
  fastify.put('/api/update_user', async (request, reply) => {
    const db = fastify.db;

    // Get user_id from cookie
    const userId = request.cookies?.user_id;
    if (!userId) {
      return reply.code(401).send({ error: 'Not authenticated' });
    }

    // Parse multipart/form-data parts
    const parts = request.parts();
    const formFields = {};
    let profilePictureFile = null;

    for await (const part of parts) {
      if (part.type === 'file') {
        if (part.fieldname === 'profile_picture') {
          profilePictureFile = part;
        }
      } else {
        // Regular field
        formFields[part.fieldname] = part.value;
      }
    }

    const { username, email, password } = formFields;

    // Simple validations
    const errors = {};

    if (username && username.length < 3) {
      errors.username = ['username-too-short'];
    }

    if (email && !email.includes('@')) {
      errors.email = ['invalid-email'];
    }

    if (password && password.length < 6) {
      errors.password = ['password-too-short'];
    }

    if (Object.keys(errors).length > 0) {
      return reply.code(400).send(errors);
    }

    try {
      // Start building update query
      const fields = [];
      const values = [];

      if (username) {
        fields.push('username = ?');
        values.push(username);
      }
      if (email) {
        fields.push('email = ?');
        values.push(email);
      }
      if (password) {
        fields.push('password = ?');
        values.push(password);
      }

      // Handle profile_picture file upload
      if (profilePictureFile) {
        const uploadDir = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filename = `avatar_${userId}_${Date.now()}.jpg`; // unique filename
        const filepath = path.join(uploadDir, filename);

        await new Promise((resolve, reject) => {
          const writeStream = fs.createWriteStream(filepath);
          profilePictureFile.file.pipe(writeStream);
          writeStream.on('finish', resolve);
          writeStream.on('error', reject);
        });

        fields.push('profile_picture = ?');
        values.push(filepath);
      }

      if (fields.length === 0) {
        // Nothing to update
        return reply.code(400).send({ error: 'Nothing to update' });
      }

      const updateQuery = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
      values.push(userId);

      await new Promise((resolve, reject) => {
        db.run(updateQuery, values, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      return reply.code(200).send({ success: true });

    } catch (err) {
      console.error('Update user error:', err);
      return reply.code(500).send({ error: 'Server error' });
    }
  });
};*/



/*module.exports = async function (fastify, opts) {
    fastify.put('/api/update_user', async (request, reply) => {
      const db = fastify.db;
  
      // Get user_id from cookie
      const userId = request.cookies?.user_id;
      if (!userId) {
        return reply.code(401).send({ error: 'Not authenticated' });
      }
  
      // Parse incoming data (formData)
      const { username, email, password } = request.body;
  
      // Prepare error object
      const errors = {};
  
      // Simple validations (you can improve them later)
      if (username && username.length < 3) {
        errors.username = ['username-too-short'];
      }
  
      if (email && !email.includes('@')) {
        errors.email = ['invalid-email'];
      }
  
      if (password && password.length < 6) {
        errors.password = ['password-too-short'];
      }
  
      // If any validation failed
      if (Object.keys(errors).length > 0) {
        return reply.code(400).send(errors);
      }
  
      try {
        // Update user fields
        await new Promise((resolve, reject) => {
          const fields = [];
          const values = [];
  
          if (username) {
            fields.push('username = ?');
            values.push(username);
          }
          if (email) {
            fields.push('email = ?');
            values.push(email);
          }
          if (password) {
            fields.push('password = ?');
            values.push(password);
          }
  
          if (fields.length === 0) {
            // Nothing to update
            return resolve();
          }
  
          const updateQuery = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
          values.push(userId);
  
          db.run(updateQuery, values, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
  
        return reply.code(200).send({ success: true });
  
      } catch (err) {
        console.error('Update user error:', err);
        return reply.code(500).send({ error: 'Server error' });
      }
    });
  };*/
  