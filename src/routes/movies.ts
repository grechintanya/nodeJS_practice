import { Router } from 'express';
import * as movieControllers from '../controllers/moviesControllers';
import * as movieValidationRules from '../middleware/movieValidationRules';
import { requestValidator } from '../middleware/requestValidator';

const router = Router();

router.get('/', movieControllers.getAllMovies);
router.get('/genre/:genreName', movieControllers.getMoviesByGenre);
router.post('/', requestValidator(movieValidationRules.movieCreateValidationRules), movieControllers.createMovie);
router.patch('/:id', requestValidator(movieValidationRules.movieUpdateValidationRules), movieControllers.updateMovie);
router.delete('/:id', requestValidator(movieValidationRules.movieDeleteValidationRules), movieControllers.deleteMovie);

export default router;

/**
 * @swagger
 * /movies:
 *    get:
 *      tags:
 *        - movies
 *      summary: Movies
 *      description: Returns list of movies
 *      responses:
 *        200:
 *          description: List of movies
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ArrayOfMovies'
 *        204:
 *          description: movies not found
 *        500:
 *          $ref: '#/components/responses/ServerError'
 *    post:
 *      tags:
 *        - movies
 *      summary: creates a new movie
 *      description: creates a new movie and returns it
 *      requestBody:
 *        description: new movie
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *      responses:
 *        201:
 *          description: Movie object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Movie'
 *        400:
 *          $ref: '#components/responses/BadRequest'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 *
 * /movies/{id}:
 *   patch:
 *     tags:
 *        - movies
 *     summary: updates a movie by ID
 *     description: updates a movie by ID and return a message
 *     parameters:
 *       - in: path
 *         name: id
 *         example: 652ac551287c746dcad8659f
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-f]{24}$'
 *         required: true
 *     requestBody:
 *       description: updated movie
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Movie'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *       400:
 *         $ref: '#components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   delete:
 *     tags:
 *        - movies
 *     summary: deletes a movie by ID
 *     description: deletes a movie by ID and return a message
 *     parameters:
 *       - in: path
 *         name: id
 *         example: 652ac551287c746dcad8659f
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-f]{24}$'
 *         required: true
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * /movies/genre/{genreName}:
 *   get:
 *     tags:
 *       - movies
 *     summary: movies by a genre
 *     description: returns list of movies by a genre's name
 *     parameters:
 *       - in: path
 *         name: genreName
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: List of movies
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArrayOfMovies'
 *       204:
 *         description: Movies not found
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
 *           example: 652ac551287c746dcad8659f
 *         title:
 *           type: string
 *           example: movie's title
 *           required: true
 *         description:
 *           type: string
 *           example: movie's description
 *           required: true
 *         releaseDate:
 *           type: Date
 *           example: 2020/10/23
 *           required: true
 *         genres:
 *           type: array
 *           items:
 *             type: integer
 *             example: 652ac551287c746dcad11111
 *     ArrayOfMovies:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Movie'
 *   responses:
 *     BadRequest:
 *       description: Bad request
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               errors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                     value:
 *                        type: string
 *                     msg:
 *                        type: string
 *                     path:
 *                        type: string
 *                     location:
 *                        type: string
 *     NotFound:
 *       description: page not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Page not found
 *     ServerError:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Internal server error
 *     SuccessResponse:
 *       description: success message
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 */
