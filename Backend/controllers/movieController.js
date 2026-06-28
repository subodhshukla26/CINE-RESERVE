import mongoose from 'mongoose';
import Movie from '../models/Movie.js';

const slugify = (value = '') =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const createMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      posterImage,
      genre,
      languages,
      duration,
      releaseDate,
      formats,
      director,
      cast,
      rating,
      status,
      slug,
    } = req.body;

    const missingFields = [];

    if (!title?.trim()) missingFields.push('title');
    if (!description?.trim()) missingFields.push('description');
    if (!posterImage?.trim()) missingFields.push('posterImage');
    if (!Array.isArray(genre) || genre.length === 0) missingFields.push('genre');
    if (!Array.isArray(languages) || languages.length === 0) missingFields.push('languages');
    if (!duration?.trim()) missingFields.push('duration');
    if (!releaseDate?.trim()) missingFields.push('releaseDate');
    if (!Array.isArray(formats) || formats.length === 0) missingFields.push('formats');
    if (!director?.trim()) missingFields.push('director');
    if (!Array.isArray(cast) || cast.length === 0) missingFields.push('cast');
    if (!status?.trim()) missingFields.push('status');

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required field(s): ${missingFields.join(', ')}`,
      });
    }

    const normalizedCast = cast.map((member) => {
      const name = member?.name?.trim();
      const photo = member?.photo?.trim();

      return { name, photo };
    });

    const invalidCast = normalizedCast.some((member) => !member.name || !member.photo);

    if (invalidCast) {
      return res.status(400).json({
        success: false,
        message: 'Each cast member must have a name and photo.',
      });
    }

    const movie = await Movie.create({
      title: title.trim(),
      description: description.trim(),
      posterImage: posterImage.trim(),
      slug: slug?.trim()?.toLowerCase() || slugify(title),
      genre: genre.map((item) => String(item).trim()).filter(Boolean),
      languages: languages.map((item) => String(item).trim()).filter(Boolean),
      duration: duration.trim(),
      releaseDate: releaseDate.trim(),
      formats: formats.map((item) => String(item).trim()).filter(Boolean),
      director: director.trim(),
      cast: normalizedCast,
      rating,
      status: status.trim(),
    });

    return res.status(201).json({
      success: true,
      message: 'Movie created successfully.',
      movie,
    });
  } catch (error) {
    console.error('Create movie controller error:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error.',
    });
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    return res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    console.error('Get all movies controller error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch movies.',
    });
  }
};

export const getMovieByIdentifier = async (req, res) => {
  try {
    const { identifier } = req.params;

    if (!identifier?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Movie identifier is required.',
      });
    }

    let movie = null;

    if (mongoose.isValidObjectId(identifier)) {
      movie = await Movie.findById(identifier);
    } else {
      const normalizedIdentifier = slugify(identifier);

      movie = await Movie.findOne({ slug: normalizedIdentifier });

      if (!movie) {
        const movies = await Movie.find();
        movie = movies.find((entry) => slugify(entry.title) === normalizedIdentifier) || null;
      }
    }

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found.',
      });
    }

    return res.status(200).json({
      success: true,
      movie,
    });
  } catch (error) {
    console.error('Get movie by ID controller error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch movie.',
    });
  }
};

