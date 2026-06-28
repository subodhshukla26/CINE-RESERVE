const slugify = (value = '') =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const asArray = (value) => {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === 'string' && value.trim()) {
    return [value.trim()];
  }

  return [];
};

export const normalizeMovie = (movie, fallbackImage = '') => {
  if (!movie) {
    return null;
  }

  const genres = asArray(movie.genre);
  const languages = asArray(movie.languages);
  const formats = asArray(movie.formats);
  const posterImage =
    movie.posterImage || movie.poster || movie.bannerImage || movie.banner || fallbackImage;
  const bannerImage =
    movie.bannerImage || movie.banner || movie.posterImage || movie.poster || fallbackImage;

  return {
    ...movie,
    id: movie._id || movie.id,
    slug: movie.slug || slugify(movie.title),
    title: movie.title || 'Untitled Movie',
    description: movie.description || '',
    posterImage,
    bannerImage,
    poster: movie.poster || posterImage,
    banner: movie.banner || bannerImage,
    genre: genres,
    genres,
    languages,
    formats,
    duration: movie.duration || '',
    releaseDate: movie.releaseDate || '',
    director: movie.director || '',
    rating: typeof movie.rating === 'number' ? movie.rating : Number(movie.rating) || 0,
    status: movie.status || '',
    cast: Array.isArray(movie.cast)
      ? movie.cast.map((member, index) => ({
          id: member?._id || member?.id || `${movie._id || movie.id || 'cast'}-${index}`,
          name: member?.name || 'Cast Member',
          image: member?.photo || member?.image || fallbackImage,
          character: member?.character || member?.role || '',
        }))
      : [],
  };
};

export const slugifyMovie = slugify;
