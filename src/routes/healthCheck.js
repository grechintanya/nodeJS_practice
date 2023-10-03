const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ status: "Server is running" });
});

/**
 * @swagger
 * /health-check:
 *    get: 
 *      tags: 
 *        - health
 *      summary: Server health check
 *      description: This api is used to check server health
 *      responses: 
 *        200:
 *          description: Server is running       
 */

module.exports = router;
