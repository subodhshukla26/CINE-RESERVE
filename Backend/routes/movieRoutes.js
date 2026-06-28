import express from 'express';
import { createMovie, getAllMovies, getMovieByIdentifier } from '../controllers/movieController.js';

const router = express.Router();

router.post('/', createMovie);
router.get('/', getAllMovies);
router.get('/:identifier', getMovieByIdentifier);

export default router;
