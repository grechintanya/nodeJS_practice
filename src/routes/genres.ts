import { Router } from 'express';
const router = Router();
import * as genresControllers from '../controllers/genresControllers';
import * as genreValidationRules from '../middleware/genreValidationRules';

router.get('/', genresControllers.getAllGenres);
router.post('/', genreValidationRules.genreCreateValidationRules, genresControllers.createGenre);
router.patch('/:id', genreValidationRules.genreUpdateValidationRules, genresControllers.updateGenre);
router.delete('/:id', genreValidationRules.genreDeleteValidationRules, genresControllers.deleteGenre);

export default router;

/**
 * @swagger
 * /genres:
 *    get:
 *      tags:
 *        - genres
 *      summary: Movies genres
 *      description: Returns list of genres
 *      responses:
 *        200:
 *          description: List of genres
 *        204:
 *          description: Genres not found
 *        404:
 *          description: Page not found
 *        500:
 *          description: Internal server error
 *    post:
 *      tags:
 *        - genres
 *      summary: creates a new genre
 *      description: creates a new genre and returns it
 *      responses:
 *        200:
 *          description: Genre object
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/Genre'
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
 *           name: string
 */
