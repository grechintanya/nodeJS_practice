import { Router } from 'express';
import * as movieControllers from '../controllers/moviesControllers';
import * as movieValidationRules from '../middleware/movieValidationRules';

const router = Router();

router.get('/', movieControllers.getAllMovies);
router.get('/genre/:genreName', movieControllers.getMoviesByGenre);
router.post('/', movieValidationRules.movieCreateValidationRules, movieControllers.createMovie);
router.patch('/:id', movieValidationRules.movieUpdateValidationRules, movieControllers.updateMovie);
router.delete('/:id', movieValidationRules.movieDeleteValidationRules, movieControllers.deleteMovie);

export default router;
