// routes/pongStats.js

function formatSeconds(seconds) {
  if (typeof seconds !== 'number') return '00:00';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}



module.exports = async function (fastify, opts) {
  const db = fastify.db;

  function dbGet(query, params) {
    return new Promise((resolve, reject) => {
      db.get(query, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  function dbAll(query, params) {
    return new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  // Global user pong stats
  fastify.get('/api/pong_stats', async (request, reply) => {
    const userId = request.cookies?.user_id;
    if (!userId) return reply.code(401).send({ error: 'Not authenticated' });

    try {
      const stats = await dbGet(
        `SELECT total_pong_matches, total_pong_time FROM users WHERE id = ?`,
        [userId]
      );

      return reply.send({
        total_pong_matches: stats?.total_pong_matches ?? 0,
        total_pong_time: stats?.total_pong_time ?? 0,
      });
    } catch (err) {
      //console.error('Error in /api/pong_stats:', err);
      console.error('Error in /api/pong_stats:', err.message, err.stack);
      return reply.code(500).send({ error: 'Server crash' });
    }
  });

  // PvP match history
  fastify.get('/api/PvPong_match_history', async (request, reply) => {
    const userId = request.cookies?.user_id;
    if (!userId) return reply.code(401).send({ error: 'Not authenticated' });
  
    try {
      const rows = await new Promise((resolve, reject) => {
        db.all(
          `SELECT player_one, player_two, winner, match_score, match_duration, match_date
           FROM pvp_pong_matches WHERE user_id = ? ORDER BY match_date DESC`,
          [userId],
          (err, results) => {
            if (err) reject(err);
            else resolve(results || []);
          }
        );
      });
  
      const formatted = rows.map(row => ({
        player_one: String(row.player_one),
        player_two: String(row.player_two),
        winner: String(row.winner),
        match_score: String(row.match_score),
        match_duration: formatSeconds(row.match_duration),
        match_date: new Date(row.match_date).toISOString()
      }));
  
      console.log("Formatted PvP matches:", formatted);
      return reply.send(formatted);
    } catch (err) {
      //console.error('Error in /api/PvPong_match_history:', err);
      console.error('Error in /api/PvPong_match_history:', err.message, err.stack);
      return reply.code(500).send({ error: 'Server crash' });
    }
  });
  
  /*fastify.get('/api/PvPong_match_history', async (request, reply) => {
    const userId = request.cookies?.user_id;
    if (!userId) return reply.code(401).send({ error: 'Not authenticated' });

    try {
      const rows = await dbAll(
        `SELECT player_one, player_two, winner, match_score, match_duration, match_date
         FROM pvp_pong_matches WHERE user_id = ? ORDER BY match_date DESC`,
        [userId]
      );

      return reply.send(rows || []);
    } catch (err) {
      console.error('Error in /api/PvPong_match_history:', err);
      return reply.code(500).send({ error: 'Server crash' });
    }
  });*/

  // AI match history
  fastify.get('/api/AIpong_match_history', async (request, reply) => {
    const userId = request.cookies?.user_id;
    if (!userId) return reply.code(401).send({ error: 'Not authenticated' });
  
    try {
      const rows = await new Promise((resolve, reject) => {
        db.all(
          `SELECT player_one, ai_level, winner, match_score, match_duration, match_date
           FROM ai_pong_matches WHERE user_id = ? ORDER BY match_date DESC`,
          [userId],
          (err, results) => {
            if (err) reject(err);
            else resolve(results || []);
          }
        );
      });
  
      const formatted = rows.map(row => ({
        player_one: String(row.player_one),
        ai_level: String(row.ai_level),
        winner: String(row.winner),
        match_score: String(row.match_score),
        match_duration: formatSeconds(row.match_duration),
        match_date: new Date(row.match_date).toISOString()
      }));
  
      console.log("Formatted PvAI matches:", formatted);
      return reply.send(formatted);
    } catch (err) {
      //console.error('Error in /api/AIpong_match_history:', err);
      console.error('Error in /api/AIpong_match_history:', err.message, err.stack);
      return reply.code(500).send({ error: 'Server crash' });
    }
  });
  
  /*fastify.get('/api/AIpong_match_history', async (request, reply) => {
    const userId = request.cookies?.user_id;
    if (!userId) return reply.code(401).send({ error: 'Not authenticated' });

    try {
      const rows = await dbAll(
        `SELECT player_one, ai_level, winner, match_score, match_duration, match_date
         FROM ai_pong_matches WHERE user_id = ? ORDER BY match_date DESC`,
        [userId]
      );

      return reply.send(rows || []);
    } catch (err) {
      console.error('Error in /api/AIpong_match_history:', err);
      return reply.code(500).send({ error: 'Server crash' });
    }
  });*/

  // Tournament match history

  fastify.get('/api/tournament_history', async (request, reply) => {
    const userId = request.cookies?.user_id;
    if (!userId) return reply.code(401).send({ error: 'Not authenticated' });
  
    try {
      const rows = await new Promise((resolve, reject) => {
        db.all(
          `SELECT player_one, player_two, player_three, player_four, winner, duration, date
           FROM pong_tournaments WHERE user_id = ? ORDER BY date DESC`,
          [userId],
          (err, results) => {
            if (err) reject(err);
            else resolve(results || []);
          }
        );
      });
  
      const formatted = rows.map(row => ({
        player_one: String(row.player_one),
        player_two: String(row.player_two),
        player_three: String(row.player_three),
        player_four: String(row.player_four),
        winner: String(row.winner),
        duration: formatSeconds(row.duration),
        date: new Date(row.date).toISOString()
      }));
  
      console.log("Formatted tournament match:", formatted);
      return reply.send(formatted);
    } catch (err) {
      console.error('Error in /api/tournament_history:', err);
      console.error('Error in /api/tournament_history:', err.message, err.stack);
      return reply.code(500).send({ error: 'Server crash' });
    }
  });

  /*fastify.get('/api/tournament_history', async (request, reply) => {
    const userId = request.cookies?.user_id;
    if (!userId) return reply.code(401).send({ error: 'Not authenticated' });

    try {
      const rows = await dbAll(
        `SELECT player_one, player_two, player_three, player_four, winner, duration, date
         FROM pong_tournaments WHERE user_id = ? ORDER BY date DESC`,
        [userId]
      );

      return reply.send(rows || []);
    } catch (err) {
      console.error('Error in /api/tournament_history:', err);
      return reply.code(500).send({ error: 'Server crash' });
    }
  });*/


};



/*module.exports = async function (fastify, opts) {
    const db = fastify.db;
  
    fastify.get('/api/pong_stats', async (request, reply) => {

        try {
          const userId = request.cookies?.user_id;
          if (!userId) return reply.code(401).send({ error: 'Not authenticated' });
      
          const stats = await db.get(
            `SELECT total_pong_matches, total_pong_time FROM users WHERE id = ?`,
            [userId]
          );
      
          if (!stats) {
            return reply.send({ total_pong_matches: 0, total_pong_time: 0 });
          }
      
          return reply.send({
            total_pong_matches: stats.total_pong_matches ?? 0,
            total_pong_time: stats.total_pong_time ?? 0,
          });
        } catch (err) {
          console.error('Server error in /api/pong_stats:', err); // 👈 print to console
          return reply.code(500).send({ error: 'Server crash' });
        }
      });   

    fastify.get('/api/PvPong_match_history', async (request, reply) => {
      const userId = request.cookies?.user_id;
      if (!userId) return reply.code(401).send({ error: 'Not authenticated' });
  
      try {
        const rows = await db.all(
          `SELECT player_one, player_two, winner, match_score, match_duration, match_date
           FROM pvp_pong_matches WHERE user_id = ? ORDER BY match_date DESC`,
          [userId]
        );
        return reply.send(Array.isArray(rows) ? rows : []);
      } catch (err) {
        console.error(err);
        return reply.code(500).send({ error: 'Database error' });
      }
    });
  
    fastify.get('/api/AIpong_match_history', async (request, reply) => {
      const userId = request.cookies?.user_id;
      if (!userId) return reply.code(401).send({ error: 'Not authenticated' });
  
      try {
        const rows = await db.all(
          `SELECT player_one, ai_level, winner, match_score, match_duration, match_date
           FROM ai_pong_matches WHERE user_id = ? ORDER BY match_date DESC`,
          [userId]
        );
        return reply.send(Array.isArray(rows) ? rows : []);
      } catch (err) {
        console.error(err);
        return reply.code(500).send({ error: 'Database error' });
      }
    });
  
    fastify.get('/api/tournament_history', async (request, reply) => {
      const userId = request.cookies?.user_id;
      if (!userId) return reply.code(401).send({ error: 'Not authenticated' });
  
      try {
        const rows = await db.all(
          `SELECT player_one, player_two, player_three, player_four, winner, duration, date
           FROM pong_tournaments WHERE user_id = ? ORDER BY date DESC`,
          [userId]
        );
        return reply.send(Array.isArray(rows) ? rows : []);
      } catch (err) {
        console.error(err);
        return reply.code(500).send({ error: 'Database error' });
      }
    });
  };*/
  