import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ status: 'Server is running' });
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
 *        404:
 *          description: Page not found
 *        500:
 *          description: Internal server error
 */

export default router;
