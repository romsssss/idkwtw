export interface CollectionMovie {
  tconst: string
  primary_title: string
  start_year: number
  genres: string[]
  posterUrl: string | null
  plot: string | null
  director: string | null
}

export interface Collection {
  slug: string
  title: string
  description: string
  seoTitle: string
  metaDescription: string
  ctaLabel: string
  scenario: string
  genres: string[]
  movies: CollectionMovie[]
  related: string[]
}

// Placeholder movies — will be hand-picked per collection later
const PLACEHOLDER_MOVIES: CollectionMovie[] = [
  {
    tconst: 'tt0111161',
    primary_title: 'The Shawshank Redemption',
    start_year: 1994,
    genres: ['Drama'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_SX300.jpg',
    plot: 'A banker convicted of uxoricide forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion.',
    director: 'Frank Darabont'
  },
  {
    tconst: 'tt0088763',
    primary_title: 'Back to the Future',
    start_year: 1985,
    genres: ['Adventure', 'Comedy', 'Sci-Fi'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BZmM3ZjE0NzctNjBiOC00MDZmLTgzMTUtNGVlOWFlOTNiZDJiXkEyXkFqcGc@._V1_SX300.jpg',
    plot: "Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.",
    director: 'Robert Zemeckis'
  },
  {
    tconst: 'tt0468569',
    primary_title: 'The Dark Knight',
    start_year: 2008,
    genres: ['Action', 'Crime', 'Drama'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
    plot: 'When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.',
    director: 'Christopher Nolan'
  },
  {
    tconst: 'tt0109830',
    primary_title: 'Forrest Gump',
    start_year: 1994,
    genres: ['Drama', 'Romance'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTItZmU5YS00YjQ5LTljYjgtMjY2NDVmYWMyNWFmXkEyXkFqcGc@._V1_SX300.jpg',
    plot: "The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.",
    director: 'Robert Zemeckis'
  },
  {
    tconst: 'tt0102926',
    primary_title: 'The Silence of the Lambs',
    start_year: 1991,
    genres: ['Crime', 'Drama', 'Thriller'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BNDdhOGJhYzctYzYwZC00YmI2LWI0MjctYjg4ODdlMDExYjBlXkEyXkFqcGc@._V1_SX300.jpg',
    plot: 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.',
    director: 'Jonathan Demme'
  },
  {
    tconst: 'tt0110357',
    primary_title: 'The Lion King',
    start_year: 1994,
    genres: ['Adventure', 'Animation', 'Drama'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BZGRiZDZhZjItM2M3ZC00Y2IyLTk3Y2MtMWY5YjliNDFkZTJlXkEyXkFqcGc@._V1_SX300.jpg',
    plot: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
    director: 'Roger Allers, Rob Minkoff'
  },
  {
    tconst: 'tt0167260',
    primary_title: 'The Lord of the Rings: The Return of the King',
    start_year: 2003,
    genres: ['Action', 'Adventure', 'Drama'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BMTZkMjBjNWMtZGI5OC00MGU0LTk4ZTItODg2NWM3NTVmNWQ4XkEyXkFqcGc@._V1_SX300.jpg',
    plot: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
    director: 'Peter Jackson'
  },
  {
    tconst: 'tt0078748',
    primary_title: 'Alien',
    start_year: 1979,
    genres: ['Horror', 'Sci-Fi'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BN2NhMDk2MmEtZDQzOC00MmY5LThhYzAtMDdjZGFjOGZjMjdjXkEyXkFqcGc@._V1_SX300.jpg',
    plot: 'After investigating a mysterious transmission of unknown origin, the crew of a commercial spacecraft encounters a deadly lifeform.',
    director: 'Ridley Scott'
  }
]

export const COLLECTIONS: Collection[] = [
  {
    slug: 'feel-good-movies',
    title: 'Feel Good Movies to Watch Tonight',
    description: 'Uplifting films that will leave you smiling. The perfect pick-me-up for any evening.',
    seoTitle: "Feel Good Movies to Watch | I Don't Know What To Watch",
    metaDescription:
      "Need a mood boost? Browse our curated list of feel-good movies and let us pick the perfect one for you.",
    ctaLabel: 'Find me a feel-good movie',
    scenario: 'alone',
    genres: ['Comedy', 'Romance', 'Family'],
    movies: PLACEHOLDER_MOVIES,
    related: ['cozy-movies-for-rainy-days', 'date-night-movies', 'movies-to-watch-with-family']
  },
  {
    slug: 'date-night-movies',
    title: 'Best Movies for Date Night',
    description: 'Romantic, funny and captivating films perfect for a night in with your special someone.',
    seoTitle: "Date Night Movies | I Don't Know What To Watch",
    metaDescription:
      "Planning a date night in? Let us pick the perfect movie for you and your partner. Romance, comedy, and more.",
    ctaLabel: 'Find me a date night movie',
    scenario: 'date',
    genres: ['Romance', 'Comedy', 'Drama'],
    movies: PLACEHOLDER_MOVIES,
    related: ['scary-movies-for-date-night', 'movies-for-couples', 'feel-good-movies']
  },
  {
    slug: 'scary-movies-for-date-night',
    title: 'Scary Movies for Date Night',
    description: 'Heart-pounding horror that brings you closer together. Perfect for a thrilling date night in.',
    seoTitle: "Scary Movies for Date Night | I Don't Know What To Watch",
    metaDescription:
      "Looking for a scary movie to watch on date night? Browse our curated picks and let us find the perfect fright for two.",
    ctaLabel: 'Find me a scary date movie',
    scenario: 'date',
    genres: ['Horror', 'Thriller'],
    movies: PLACEHOLDER_MOVIES,
    related: ['date-night-movies', 'movies-to-watch-alone-at-night', 'movies-for-couples']
  },
  {
    slug: 'movies-to-watch-alone-at-night',
    title: 'Movies to Watch Alone at Night',
    description: 'Gripping, atmospheric films best enjoyed solo with the lights off.',
    seoTitle: "Movies to Watch Alone at Night | I Don't Know What To Watch",
    metaDescription:
      "Home alone tonight? Find the perfect movie for a solo night in — thrillers, horror, and mysteries that will keep you on the edge.",
    ctaLabel: 'Find me a movie for tonight',
    scenario: 'alone',
    genres: ['Thriller', 'Horror', 'Mystery'],
    movies: PLACEHOLDER_MOVIES,
    related: ['mind-bending-movies', 'scary-movies-for-date-night', 'movies-that-make-you-think']
  },
  {
    slug: 'movies-to-watch-with-friends',
    title: 'Movies to Watch with Friends',
    description: 'Crowd-pleasers guaranteed to get everyone laughing, cheering or on the edge of their seats.',
    seoTitle: "Movies to Watch with Friends | I Don't Know What To Watch",
    metaDescription:
      "Movie night with friends? Let us pick the perfect film for your group. Action, comedy, and adventure picks everyone will love.",
    ctaLabel: 'Find me a movie for the group',
    scenario: 'friends',
    genres: ['Comedy', 'Action', 'Adventure'],
    movies: PLACEHOLDER_MOVIES,
    related: ['epic-movies-to-watch', 'movies-to-watch-with-family', 'feel-good-movies']
  },
  {
    slug: 'movies-to-watch-with-kids',
    title: 'Movies to Watch with Kids',
    description: 'Family-friendly adventures, animations and comedies that kids and adults will both enjoy.',
    seoTitle: "Movies to Watch with Kids | I Don't Know What To Watch",
    metaDescription:
      "Looking for a movie the whole family can enjoy? Browse our kid-friendly picks and let us find the perfect one.",
    ctaLabel: 'Find me a movie for the kids',
    scenario: 'kids',
    genres: ['Animation', 'Family', 'Adventure'],
    movies: PLACEHOLDER_MOVIES,
    related: ['movies-to-watch-with-family', 'feel-good-movies', 'epic-movies-to-watch']
  },
  {
    slug: 'movies-to-watch-with-family',
    title: 'Movies to Watch with Family',
    description: 'Heartwarming films for all ages — the best picks for family movie night.',
    seoTitle: "Movies to Watch with Family | I Don't Know What To Watch",
    metaDescription:
      "Family movie night? Let us find the perfect film everyone will enjoy. Comedy, adventure and feel-good picks.",
    ctaLabel: 'Find me a family movie',
    scenario: 'family',
    genres: ['Family', 'Comedy', 'Adventure'],
    movies: PLACEHOLDER_MOVIES,
    related: ['movies-to-watch-with-kids', 'feel-good-movies', 'cozy-movies-for-rainy-days']
  },
  {
    slug: 'movies-for-couples',
    title: 'Movies for Couples',
    description: 'Romantic comedies, touching dramas and charming films to watch together.',
    seoTitle: "Movies for Couples | I Don't Know What To Watch",
    metaDescription:
      "Find the perfect movie for you and your partner. Romantic, funny and heartfelt picks for couples.",
    ctaLabel: 'Find me a movie for us',
    scenario: 'partner',
    genres: ['Romance', 'Comedy', 'Drama'],
    movies: PLACEHOLDER_MOVIES,
    related: ['date-night-movies', 'feel-good-movies', 'cozy-movies-for-rainy-days']
  },
  {
    slug: 'mind-bending-movies',
    title: 'Mind-Bending Movies That Will Blow Your Mind',
    description: 'Films that twist reality and challenge everything you think you know.',
    seoTitle: "Mind-Bending Movies | I Don't Know What To Watch",
    metaDescription:
      "Ready for a brain workout? Browse our curated list of mind-bending movies and let us pick the perfect one for you.",
    ctaLabel: 'Find me a mind-bending movie',
    scenario: 'alone',
    genres: ['Sci-Fi', 'Thriller', 'Mystery'],
    movies: PLACEHOLDER_MOVIES,
    related: ['movies-that-make-you-think', 'movies-to-watch-alone-at-night', 'epic-movies-to-watch']
  },
  {
    slug: 'movies-that-make-you-cry',
    title: 'Movies That Will Make You Cry',
    description: 'Powerful emotional stories that will move you to tears. Keep the tissues handy.',
    seoTitle: "Movies That Make You Cry | I Don't Know What To Watch",
    metaDescription:
      "In the mood for a good cry? Let us pick a deeply moving film for you. The most emotional dramas, romances and biopics.",
    ctaLabel: 'Find me an emotional movie',
    scenario: 'alone',
    genres: ['Drama', 'Romance', 'Biography'],
    movies: PLACEHOLDER_MOVIES,
    related: ['feel-good-movies', 'movies-for-couples', 'date-night-movies']
  },
  {
    slug: 'movies-that-make-you-think',
    title: 'Movies That Make You Think',
    description: 'Thought-provoking films that stay with you long after the credits roll.',
    seoTitle: "Movies That Make You Think | I Don't Know What To Watch",
    metaDescription:
      "Looking for a film that challenges your perspective? Browse our picks of thought-provoking movies.",
    ctaLabel: 'Find me a thought-provoking movie',
    scenario: 'alone',
    genres: ['Sci-Fi', 'Thriller', 'Mystery'],
    movies: PLACEHOLDER_MOVIES,
    related: ['mind-bending-movies', 'movies-to-watch-alone-at-night', 'movies-that-make-you-cry']
  },
  {
    slug: 'cozy-movies-for-rainy-days',
    title: 'Cozy Movies for Rainy Days',
    description: 'Warm, comforting films perfect for curling up on the couch when it rains.',
    seoTitle: "Cozy Movies for Rainy Days | I Don't Know What To Watch",
    metaDescription:
      "Rainy day? Curl up with the perfect cozy movie. Heartwarming romances, comedies and animations to brighten any grey day.",
    ctaLabel: 'Find me a cozy movie',
    scenario: 'alone',
    genres: ['Romance', 'Comedy', 'Animation'],
    movies: PLACEHOLDER_MOVIES,
    related: ['feel-good-movies', 'movies-for-couples', 'movies-to-watch-with-family']
  },
  {
    slug: 'epic-movies-to-watch',
    title: 'Epic Movies You Need to Watch',
    description: 'Grand-scale adventures, sweeping battles and unforgettable journeys.',
    seoTitle: "Epic Movies to Watch | I Don't Know What To Watch",
    metaDescription:
      "Ready for something epic? Let us pick a grand-scale movie for you. Action, adventure, history and war films.",
    ctaLabel: 'Find me an epic movie',
    scenario: 'friends',
    genres: ['Action', 'Adventure', 'History', 'War'],
    movies: PLACEHOLDER_MOVIES,
    related: ['movies-to-watch-with-friends', 'mind-bending-movies', 'movies-to-watch-alone-at-night']
  },
  {
    slug: 'movies-to-watch-with-girlfriend',
    title: 'Movies to Watch with Your Girlfriend',
    description: 'Sweet, funny and romantic films perfect for a cozy night in together.',
    seoTitle: "Movies to Watch with Your Girlfriend | I Don't Know What To Watch",
    metaDescription:
      "Looking for the perfect movie to watch with your girlfriend? Let us pick a romantic, funny or heartwarming film for you.",
    ctaLabel: 'Find me a movie for us',
    scenario: 'partner',
    genres: ['Romance', 'Comedy', 'Drama'],
    movies: PLACEHOLDER_MOVIES,
    related: ['date-night-movies', 'movies-for-couples', 'feel-good-movies']
  },
  {
    slug: 'movies-to-watch-with-boyfriend',
    title: 'Movies to Watch with Your Boyfriend',
    description: 'Action-packed, thrilling and fun films you can both enjoy.',
    seoTitle: "Movies to Watch with Your Boyfriend | I Don't Know What To Watch",
    metaDescription:
      "Need a movie to watch with your boyfriend? Let us find the perfect mix of action, thriller and comedy for you.",
    ctaLabel: 'Find me a movie for us',
    scenario: 'partner',
    genres: ['Action', 'Thriller', 'Comedy'],
    movies: PLACEHOLDER_MOVIES,
    related: ['date-night-movies', 'movies-for-couples', 'epic-movies-to-watch']
  }
]

export const COLLECTION_BY_SLUG: Record<string, Collection> = Object.fromEntries(
  COLLECTIONS.map((c) => [c.slug, c])
)

export const COLLECTION_SLUGS = COLLECTIONS.map((c) => c.slug)
