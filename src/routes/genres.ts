import { Router } from 'express';

import * as genresControllers from '../controllers/genresControllers';
import * as genreValidationRules from '../middleware/genreValidationRules';
import { requestValidator } from '../middleware/requestValidator';

const router = Router();
router.get('/', genresControllers.getAllGenres);
router.post('/', requestValidator(genreValidationRules.genreCreateValidationRules), genresControllers.createGenre);
router.patch('/:id', requestValidator(genreValidationRules.genreUpdateValidationRules), genresControllers.updateGenre);
router.delete('/:id', requestValidator(genreValidationRules.genreDeleteValidationRules), genresControllers.deleteGenre);

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
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ArrayOfGenre'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 *    post:
 *      tags:
 *        - genres
 *      summary: creates a new genre
 *      description: creates a new genre and returns it
 *      requestBody:
 *        description: new genre
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *              example:
 *                name: action
 *      responses:
 *        201:
 *          description: a new genre successfully created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Genre'
 *        400:
 *          $ref: '#components/responses/BadRequest'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 *
 * /genres/{id}:
 *   patch:
 *     tags:
 *        - genres
 *     summary: updates a genre by ID
 *     description: updates a genre by ID and return a message
 *     parameters:
 *       - in: path
 *         name: id
 *         example: 652ac551287c746dcad8659f
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-f]{24}$'
 *         required: true
 *     requestBody:
 *       description: updated genre
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: action
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *       400:
 *         $ref: '#components/responses/BadRequest'
 *       404:
 *         $ref: '#components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *   delete:
 *     tags:
 *        - genres
 *     summary: deletes a genre by ID
 *     description: deletes a genre by ID and return a message
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
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
 *           example: 652ac551287c746dcad8659f
 *         name:
 *           type: string
 *           example: action
 *           required: true
 *     ArrayOfGenre:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Genre'
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
