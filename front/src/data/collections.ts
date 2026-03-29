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
  ctaContext: string
  scenario: string
  genres: string[]
  movies: CollectionMovie[]
  related: string[]
}

export const COLLECTIONS: Collection[] = [
  {
    slug: 'feel-good-movies',
    title: 'Feel Good Movies to Watch Tonight',
    description: 'Uplifting films that will leave you smiling. The perfect pick-me-up for any evening.',
    seoTitle: "Feel Good Movies to Watch | I Don't Know What To Watch",
    metaDescription:
      "Need a mood boost? Browse our curated list of feel-good movies and let us pick the perfect one for you.",
    ctaLabel: 'Show me more feel-good movies',
    ctaContext: "Like these? Let us find a feel-good movie you haven't seen yet.",
    scenario: 'alone',
    genres: ['Comedy', 'Romance', 'Family'],
    movies: [
      {
        tconst: 'tt0109830',
        primary_title: 'Forrest Gump',
        start_year: 1994,
        genres: ['Drama', 'Romance'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTItZmU5YS00YjQ5LTljYjgtMjY2NDVmYWMyNWFmXkEyXkFqcGc@._V1_SX300.jpg',
        plot: 'A big-hearted journey through decades of American history that leaves you believing in kindness.',
        director: 'Robert Zemeckis'
      },
      {
        tconst: 'tt4468740',
        primary_title: 'Paddington 2',
        start_year: 2017,
        genres: ['Adventure', 'Comedy', 'Family'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BNTk1YzlhMTUtZmU5MC00NmRmLTlkZjItYzQ0NTY4Y2NiNzc4XkEyXkFqcGc@._V1_SX300.jpg',
        plot: 'Pure joy in movie form — funnier and warmer than any comedy has a right to be.',
        director: 'Paul King'
      },
      {
        tconst: 'tt1675434',
        primary_title: 'The Intouchables',
        start_year: 2011,
        genres: ['Comedy', 'Drama'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTYxNDA3MDQwNl5BMl5BanBnXkFtZTcwNTU4Mzc1Nw@@._V1_SX300.jpg',
        plot: 'An unlikely friendship that will have you laughing and crying in equal measure.',
        director: 'Olivier Nakache, Éric Toledano'
      },
      {
        tconst: 'tt2883512',
        primary_title: 'Chef',
        start_year: 2014,
        genres: ['Adventure', 'Comedy', 'Drama'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BODkyNTI4YjUtNjEyNC00NWQ5LTk4M2YtM2Q3NjBiYmJmMGUyXkEyXkFqcGc@._V1_SX300.jpg',
        plot: 'A feel-good road trip about food, family, and finding your passion again.',
        director: 'Jon Favreau'
      },
      {
        tconst: 'tt1049413',
        primary_title: 'Up',
        start_year: 2009,
        genres: ['Animation', 'Adventure', 'Comedy'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BNmI1ZTc5MWMtMDYyOS00ZDc2LTkzOTAtNjQ4NWIxNjYyNDgzXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "Pixar's most emotional adventure — the first 10 minutes alone will change you.",
        director: 'Pete Docter, Bob Peterson'
      },
      {
        tconst: 'tt4698684',
        primary_title: 'Hunt for the Wilderpeople',
        start_year: 2016,
        genres: ['Adventure', 'Comedy', 'Drama'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjI1MDQ2MDg5Ml5BMl5BanBnXkFtZTgwMjc2NjM5ODE@._V1_SX300.jpg',
        plot: "Taika Waititi's hilarious and heartfelt misfit adventure in the New Zealand bush.",
        director: 'Taika Waititi'
      },
      {
        tconst: 'tt0093779',
        primary_title: 'The Princess Bride',
        start_year: 1987,
        genres: ['Adventure', 'Comedy', 'Family'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjFiOTEyNGMtN2E4MC00ZjZlLTk3ZDQtNTU1ZGNiZTA1MzJlXkEyXkFqcGc@._V1_SX300.jpg',
        plot: 'The most quotable, charming fairy tale ever made — as you wish.',
        director: 'Rob Reiner'
      },
      {
        tconst: 'tt0359950',
        primary_title: 'The Secret Life of Walter Mitty',
        start_year: 2013,
        genres: ['Adventure', 'Comedy', 'Drama'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BODYwNDYxNDk1Nl5BMl5BanBnXkFtZTgwOTAwMTk2MDE@._V1_SX300.jpg',
        plot: 'A visually stunning reminder to stop dreaming and start living.',
        director: 'Ben Stiller'
      }
    ],
    related: ['cozy-movies-for-rainy-days', 'date-night-movies', 'movies-to-watch-with-family']
  },
  {
    slug: 'date-night-movies',
    title: 'Best Movies for Date Night',
    description: 'Romantic, funny and captivating films perfect for a night in with your special someone.',
    seoTitle: "Date Night Movies | I Don't Know What To Watch",
    metaDescription:
      "Planning a date night in? Let us pick the perfect movie for you and your partner. Romance, comedy, and more.",
    ctaLabel: 'Show me more date night movies',
    ctaContext: 'Like these? Let us find the perfect date night movie for you.',
    scenario: 'date',
    genres: ['Romance', 'Comedy', 'Drama'],
    movies: [
      {
        tconst: 'tt0098635',
        primary_title: 'When Harry Met Sally...',
        start_year: 1989,
        genres: ['Comedy', 'Drama', 'Romance'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjE0ODEwNjM2NF5BMl5BanBnXkFtZTcwMjU2Mzg3NA@@._V1_SX300.jpg',
        plot: 'The ultimate proof that friends make the best lovers — witty, warm, and endlessly quotable.',
        director: 'Rob Reiner'
      },
      {
        tconst: 'tt2194499',
        primary_title: 'About Time',
        start_year: 2013,
        genres: ['Comedy', 'Drama', 'Fantasy'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTA1ODUzMDA3NzFeQTJeQWpwZ15BbWU3MDgxMTYxNTk@._V1_SX300.jpg',
        plot: 'A hidden gem about love and cherishing every moment — charming, funny and surprisingly deep.',
        director: 'Richard Curtis'
      },
      {
        tconst: 'tt3783958',
        primary_title: 'La La Land',
        start_year: 2016,
        genres: ['Comedy', 'Drama', 'Music'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_SX300.jpg',
        plot: 'A dazzling musical romance that makes every evening feel like magic.',
        director: 'Damien Chazelle'
      },
      {
        tconst: 'tt0112471',
        primary_title: 'Before Sunrise',
        start_year: 1995,
        genres: ['Comedy', 'Drama', 'Romance'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BZDZhZmI1ZTUtYWI3NC00NTMwLTk3NWMtNDc0OGNjM2I0ZjlmXkEyXkFqcGc@._V1_SX300.jpg',
        plot: 'Two strangers, one night in Vienna — the most intimate and real romance ever filmed.',
        director: 'Richard Linklater'
      },
      {
        tconst: 'tt0332280',
        primary_title: 'The Notebook',
        start_year: 2004,
        genres: ['Drama', 'Romance'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BZjE0ZjgzMzYtMTAxYi00NGMzLThmZDktNzFlMzA2MWRmYWQ0XkEyXkFqcGc@._V1_SX300.jpg',
        plot: 'The gold standard of sweeping romance — bring tissues and hold hands.',
        director: 'Nick Cassavetes'
      },
      {
        tconst: 'tt5462602',
        primary_title: 'The Big Sick',
        start_year: 2017,
        genres: ['Comedy', 'Drama', 'Romance'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BYWQ4MWVkMTMtOTE4YS00Y2VmLWE5Y2YtMWJkOTMwZjIyZjY4XkEyXkFqcGc@._V1_SX300.jpg',
        plot: 'A true love story that\'s funny, honest and deeply moving — based on the couple who wrote it.',
        director: 'Michael Showalter'
      },
      {
        tconst: 'tt3104988',
        primary_title: 'Crazy Rich Asians',
        start_year: 2018,
        genres: ['Comedy', 'Drama', 'Romance'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTYxNDMyOTAxN15BMl5BanBnXkFtZTgwMDg1ODYzNTM@._V1_SX300.jpg',
        plot: "A glamorous, feel-good romance that's impossible not to enjoy together.",
        director: 'Jon M. Chu'
      },
      {
        tconst: 'tt0211915',
        primary_title: 'Amélie',
        start_year: 2001,
        genres: ['Comedy', 'Romance'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BOTNmYzY0MWQtZGZmNy00Y2Y4LWFmMDQtMTZjYTdiYzEwZGQ2XkEyXkFqcGc@._V1_SX300.jpg',
        plot: 'A whimsical Parisian fairy tale that will make you believe in serendipity.',
        director: 'Jean-Pierre Jeunet'
      }
    ],
    related: ['scary-movies-for-date-night', 'movies-for-couples', 'feel-good-movies']
  },
  {
    slug: 'scary-movies-for-date-night',
    title: 'Scary Movies for Date Night',
    description: 'Heart-pounding horror that brings you closer together. Perfect for a thrilling date night in.',
    seoTitle: "Scary Movies for Date Night | I Don't Know What To Watch",
    metaDescription:
      "Looking for a scary movie to watch on date night? Browse our curated picks and let us find the perfect fright for two.",
    ctaLabel: 'Show me more scary date movies',
    ctaContext: "Like these? Let us find a scary movie you haven't watched together.",
    scenario: 'date',
    genres: ['Horror', 'Thriller'],
    movies: [
      {
        tconst: 'tt5052448',
        primary_title: 'Get Out',
        start_year: 2017,
        genres: ['Horror', 'Mystery', 'Thriller'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_SX300.jpg',
        plot: 'A smart, gripping thriller that will have you both glued to the screen and talking for hours after.',
        director: 'Jordan Peele'
      },
      {
        tconst: 'tt1259521',
        primary_title: 'The Cabin in the Woods',
        start_year: 2011,
        genres: ['Horror', 'Mystery', 'Thriller'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BNTUxNzYyMjg2N15BMl5BanBnXkFtZTcwMTExNzExNw@@._V1_SX300.jpg',
        plot: 'A wildly inventive horror-comedy that flips every scary movie trope on its head.',
        director: 'Drew Goddard'
      },
      {
        tconst: 'tt6644200',
        primary_title: 'A Quiet Place',
        start_year: 2018,
        genres: ['Drama', 'Horror', 'Sci-Fi'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_SX300.jpg',
        plot: "So tense you'll forget to breathe — and grab each other's hand without thinking.",
        director: 'John Krasinski'
      },
      {
        tconst: 'tt7798634',
        primary_title: 'Ready or Not',
        start_year: 2019,
        genres: ['Action', 'Comedy', 'Horror'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTViMDA4YjgtZDQ4NC00ZDk2LTg0MWItOTc4MTkwMmVkZWRmXkEyXkFqcGc@._V1_SX300.jpg',
        plot: 'A darkly hilarious survival thriller — equal parts screams and laughs.',
        director: 'Matt Bettinelli-Olpin, Tyler Gillett'
      },
      {
        tconst: 'tt1457767',
        primary_title: 'The Conjuring',
        start_year: 2013,
        genres: ['Horror', 'Mystery', 'Thriller'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_SX300.jpg',
        plot: 'Old-school haunted house scares done to perfection — the one that makes you cuddle closer.',
        director: 'James Wan'
      },
      {
        tconst: 'tt8772262',
        primary_title: 'Midsommar',
        start_year: 2019,
        genres: ['Drama', 'Horror', 'Mystery'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BMzQxNzQzOTQwM15BMl5BanBnXkFtZTgwMDQ2NTcwODM@._V1_SX300.jpg',
        plot: 'A beautiful, unsettling folk horror that will spark the wildest post-movie debate.',
        director: 'Ari Aster'
      },
      {
        tconst: 'tt0117571',
        primary_title: 'Scream',
        start_year: 1996,
        genres: ['Horror', 'Mystery'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjA2NjU5MTg5OF5BMl5BanBnXkFtZTgwOTkyMzQxMDE@._V1_SX300.jpg',
        plot: "The slasher classic that's scary, funny, and endlessly rewatchable.",
        director: 'Wes Craven'
      },
      {
        tconst: 'tt3235888',
        primary_title: 'It Follows',
        start_year: 2014,
        genres: ['Horror', 'Mystery', 'Thriller'],
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BNGZiYWRiYjAtODU0NS00YzAzLTk2MzQtZGVlMzVjM2M3MGQ3XkEyXkFqcGc@._V1_SX300.jpg',
        plot: 'A slow-burn indie with a uniquely creepy premise that stays with you for days.',
        director: 'David Robert Mitchell'
      }
    ],
    related: ['date-night-movies', 'movies-to-watch-alone-at-night', 'movies-for-couples']
  },
  {
    slug: 'movies-to-watch-alone-at-night',
    title: 'Movies to Watch Alone at Night',
    description: 'Gripping, atmospheric films best enjoyed solo with the lights off.',
    seoTitle: "Movies to Watch Alone at Night | I Don't Know What To Watch",
    metaDescription:
      "Home alone tonight? Find the perfect movie for a solo night in — thrillers, horror, and mysteries that will keep you on the edge.",
    ctaLabel: 'Show me more movies for tonight',
    ctaContext: "Like these? Let us find one you haven't seen yet.",
    scenario: 'alone',
    genres: ['Thriller', 'Horror', 'Mystery'],
    movies: [
      {
        tconst: 'tt0114369',
        primary_title: 'Se7en',
        start_year: 1995,
        genres: ['Crime', 'Drama', 'Mystery'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BY2IzNzMxZjctZjUxZi00YzAxLTk3ZjMtODFjODdhMDU5NDM1XkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A dark, gripping detective thriller that demands your full, undivided attention.",
        director: 'David Fincher'
      },
      {
        tconst: 'tt2400463',
        primary_title: 'The Invitation',
        start_year: 2015,
        genres: ['Drama', 'Horror', 'Mystery'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTkzODMwNDkzOF5BMl5BanBnXkFtZTgwNDA4NzA1ODE@._V1_SX300.jpg',
        plot: "A slow-burn dinner party thriller where something feels deeply wrong from the start.",
        director: 'Karyn Kusama'
      },
      {
        tconst: 'tt0443706',
        primary_title: 'Zodiac',
        start_year: 2007,
        genres: ['Crime', 'Drama', 'Mystery'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BNDFkMTRkZmQtM2I0NC00NjJjLWJlMDctNTNiZWYxYzhjZDZiXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "An obsessive true-crime mystery that will keep you up way past midnight.",
        director: 'David Fincher'
      },
      {
        tconst: 'tt2866360',
        primary_title: 'Coherence',
        start_year: 2013,
        genres: ['Mystery', 'Sci-Fi', 'Thriller'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BNzQ3ODUzNDY2M15BMl5BanBnXkFtZTgwNzg0ODY2MTE@._V1_SX300.jpg',
        plot: "A mind-bending sci-fi mystery made on a shoestring — you'll want to rewatch it immediately.",
        director: 'James Ward Byrkit'
      },
      {
        tconst: 'tt0102926',
        primary_title: 'The Silence of the Lambs',
        start_year: 1991,
        genres: ['Crime', 'Drama', 'Horror'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BNDdhOGJhYzctYzYwZC00YmI2LWI0MjctYjg4ODdlMDExYjBlXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "The gold standard of psychological thrillers — best experienced alone in the dark.",
        director: 'Jonathan Demme'
      },
      {
        tconst: 'tt5215952',
        primary_title: 'The Wailing',
        start_year: 2016,
        genres: ['Drama', 'Horror'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BODkwMTgxNjA2NF5BMl5BanBnXkFtZTgwMDc0OTcwOTE@._V1_SX300.jpg',
        plot: "A South Korean horror-mystery masterpiece that builds dread like nothing else.",
        director: 'Na Hong-jin'
      },
      {
        tconst: 'tt1130884',
        primary_title: 'Shutter Island',
        start_year: 2010,
        genres: ['Drama', 'Mystery', 'Thriller'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BN2FjNWExYzEtY2YzOC00YjNlLTllMTQtNmIwM2Q1YzBhOWM1XkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A twisting psychological mystery that rewards a solo viewing with zero distractions.",
        director: 'Martin Scorsese'
      },
      {
        tconst: 'tt2267998',
        primary_title: 'Gone Girl',
        start_year: 2014,
        genres: ['Drama', 'Mystery', 'Thriller'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTk0MDQ3MzAzOV5BMl5BanBnXkFtZTgwNzU1NzE3MjE@._V1_SX300.jpg',
        plot: "A razor-sharp thriller that keeps pulling the rug out — perfect for a solo night in.",
        director: 'David Fincher'
      }
    ],
    related: ['mind-bending-movies', 'scary-movies-for-date-night', 'movies-that-make-you-think']
  },
  {
    slug: 'movies-to-watch-with-friends',
    title: 'Movies to Watch with Friends',
    description: 'Crowd-pleasers guaranteed to get everyone laughing, cheering or on the edge of their seats.',
    seoTitle: "Movies to Watch with Friends | I Don't Know What To Watch",
    metaDescription:
      "Movie night with friends? Let us pick the perfect film for your group. Action, comedy, and adventure picks everyone will love.",
    ctaLabel: 'Show me more movies for the group',
    ctaContext: "Like these? Let us pick one nobody in the group has seen.",
    scenario: 'friends',
    genres: ['Comedy', 'Action', 'Adventure'],
    movies: [
      {
        tconst: 'tt0829482',
        primary_title: 'Superbad',
        start_year: 2007,
        genres: ['Comedy'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BNjk0MzdlZGEtNTRkOC00ZDRiLWJkYjAtMzUzYTRiNzk1YTViXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "The funniest hang-out comedy ever made — guaranteed to have the whole room quoting it.",
        director: 'Greg Mottola'
      },
      {
        tconst: 'tt2704998',
        primary_title: 'Game Night',
        start_year: 2018,
        genres: ['Action', 'Adventure', 'Comedy'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMjI3ODkzNDk5MF5BMl5BanBnXkFtZTgwNTEyNjY2NDM@._V1_SX300.jpg',
        plot: "A criminally underrated comedy-thriller that's way smarter and funnier than it has any right to be.",
        director: 'John Francis Daley, Jonathan Goldstein'
      },
      {
        tconst: 'tt1392190',
        primary_title: 'Mad Max: Fury Road',
        start_year: 2015,
        genres: ['Action', 'Adventure', 'Sci-Fi'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BZDRkODJhOTgtOTc1OC00NTgzLTk4NjItNDgxZDY4YjlmNDY2XkEyXkFqcGc@._V1_SX300.jpg',
        plot: "Two hours of pure adrenaline — the ultimate group movie experience.",
        director: 'George Miller'
      },
      {
        tconst: 'tt3799694',
        primary_title: 'The Nice Guys',
        start_year: 2016,
        genres: ['Action', 'Comedy', 'Crime'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BM2YwNWZlZGEtYTEyZi00NjdjLWEwM2ItM2Q2MDMwZjkzMjk0XkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A buddy comedy with perfect chemistry — hilarious, stylish, and endlessly rewatchable.",
        director: 'Shane Black'
      },
      {
        tconst: 'tt8946378',
        primary_title: 'Knives Out',
        start_year: 2019,
        genres: ['Comedy', 'Crime', 'Drama'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BZDU5ZTRkYmItZjg0Mi00ZTQwLThjMWItNWM3MTMxMzVjZmVjXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A whodunit so fun the whole room will be shouting theories at the screen.",
        director: 'Rian Johnson'
      },
      {
        tconst: 'tt1465522',
        primary_title: 'Tucker and Dale vs Evil',
        start_year: 2010,
        genres: ['Comedy', 'Horror'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BODQ5NDQ0MjkwMF5BMl5BanBnXkFtZTcwNDg1OTU4NQ@@._V1_SX300.jpg',
        plot: "A horror-comedy that flips every slasher trope on its head — your friends won't see it coming.",
        director: 'Eli Craig'
      },
      {
        tconst: 'tt0425112',
        primary_title: 'Hot Fuzz',
        start_year: 2007,
        genres: ['Action', 'Comedy', 'Mystery'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BYjFkZTkzZTQtNjM1ZS00M2EyLWE3MTAtMmY5Yzk0NTc0NDc3XkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A pitch-perfect action-comedy that rewards every single rewatch with new jokes.",
        director: 'Edgar Wright'
      },
      {
        tconst: 'tt1213663',
        primary_title: "The World's End",
        start_year: 2013,
        genres: ['Action', 'Comedy', 'Sci-Fi'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BNzA1MTk1MzY0OV5BMl5BanBnXkFtZTgwNjkzNTUwMDE@._V1_SX300.jpg',
        plot: "Five friends, twelve pubs, one alien invasion — the most chaotic night out ever filmed.",
        director: 'Edgar Wright'
      }
    ],
    related: ['epic-movies-to-watch', 'movies-to-watch-with-family', 'feel-good-movies']
  },
  {
    slug: 'movies-to-watch-with-kids',
    title: 'Movies to Watch with Kids',
    description: 'Family-friendly adventures, animations and comedies that kids and adults will both enjoy.',
    seoTitle: "Movies to Watch with Kids | I Don't Know What To Watch",
    metaDescription:
      "Looking for a movie the whole family can enjoy? Browse our kid-friendly picks and let us find the perfect one.",
    ctaLabel: 'Show me more movies for the kids',
    ctaContext: "Like these? Let us find a movie the kids haven't seen yet.",
    scenario: 'kids',
    genres: ['Animation', 'Family', 'Adventure'],
    movies: [
      {
        tconst: 'tt2380307',
        primary_title: 'Coco',
        start_year: 2017,
        genres: ['Animation', 'Adventure', 'Drama'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMDIyM2E2NTAtMzlhNy00ZGUxLWI1NjgtZDY5MzhiMDc5NGU3XkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A vibrant, musical adventure about family and memory — bring tissues, even the kids will cry happy tears.",
        director: 'Lee Unkrich, Adrian Molina'
      },
      {
        tconst: 'tt4302938',
        primary_title: 'Kubo and the Two Strings',
        start_year: 2016,
        genres: ['Animation', 'Action', 'Adventure'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMjA2Mzg2NDMzNl5BMl5BanBnXkFtZTgwMjcwODUzOTE@._V1_SX300.jpg',
        plot: "A visually stunning stop-motion epic with real emotional depth — a hidden gem kids and adults will love.",
        director: 'Travis Knight'
      },
      {
        tconst: 'tt0317705',
        primary_title: 'The Incredibles',
        start_year: 2004,
        genres: ['Animation', 'Action', 'Adventure'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTY5OTU0OTc2NV5BMl5BanBnXkFtZTcwMzU4MDcyMQ@@._V1_SX300.jpg',
        plot: "A superhero family that's funny, exciting and surprisingly relatable for parents too.",
        director: 'Brad Bird'
      },
      {
        tconst: 'tt0129167',
        primary_title: 'The Iron Giant',
        start_year: 1999,
        genres: ['Animation', 'Action', 'Adventure'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BODM4ZjZjMGEtYmFiMy00MThjLWIzZjUtMDU0ODg1NTI2MzIwXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A boy-and-his-robot story with a huge heart — one of the most underrated animated films ever.",
        director: 'Brad Bird'
      },
      {
        tconst: 'tt0266543',
        primary_title: 'Finding Nemo',
        start_year: 2003,
        genres: ['Animation', 'Adventure', 'Comedy'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTc5NjExNTA5OV5BMl5BanBnXkFtZTYwMTQ0ODY2._V1_SX300.jpg',
        plot: "The underwater adventure that never gets old — a masterclass in storytelling for all ages.",
        director: 'Andrew Stanton, Lee Unkrich'
      },
      {
        tconst: 'tt3521164',
        primary_title: 'Moana',
        start_year: 2016,
        genres: ['Animation', 'Adventure', 'Comedy'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMjI4MzU5NTExNF5BMl5BanBnXkFtZTgwNzY1MTEwMDI@._V1_SX300.jpg',
        plot: "A fearless heroine, catchy songs, and a gorgeous ocean adventure — impossible not to sing along.",
        director: 'Ron Clements, John Musker, Don Hall'
      },
      {
        tconst: 'tt1865505',
        primary_title: 'Song of the Sea',
        start_year: 2014,
        genres: ['Animation', 'Adventure', 'Drama'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTQ2MDMwNjEwNV5BMl5BanBnXkFtZTgwOTkxMzI0MzE@._V1_SX300.jpg',
        plot: "A breathtakingly beautiful Irish animation rooted in folklore — magical for kids, moving for adults.",
        director: 'Tomm Moore'
      },
      {
        tconst: 'tt0245429',
        primary_title: 'Spirited Away',
        start_year: 2001,
        genres: ['Animation', 'Adventure', 'Family'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BNTEyNmEwOWUtYzkyOC00ZTQ4LTllZmUtMjk0Y2YwOGUzYjRiXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "Miyazaki's masterpiece — a fantastical journey that will spark wonder in kids and nostalgia in grown-ups.",
        director: 'Hayao Miyazaki'
      }
    ],
    related: ['movies-to-watch-with-family', 'feel-good-movies', 'epic-movies-to-watch']
  },
  {
    slug: 'movies-to-watch-with-family',
    title: 'Movies to Watch with Family',
    description: 'Heartwarming films for all ages — the best picks for family movie night.',
    seoTitle: "Movies to Watch with Family | I Don't Know What To Watch",
    metaDescription:
      "Family movie night? Let us find the perfect film everyone will enjoy. Comedy, adventure and feel-good picks.",
    ctaLabel: 'Show me more family movies',
    ctaContext: "Like these? Let us find a family movie you haven't seen together.",
    scenario: 'family',
    genres: ['Family', 'Comedy', 'Adventure'],
    movies: [
      {
        tconst: 'tt0319061',
        primary_title: 'Big Fish',
        start_year: 2003,
        genres: ['Adventure', 'Drama', 'Fantasy'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BNTVlNjc4ZmItMDZjYy00YWZjLTg1OWEtOTNlZjJlN2FlMjEwXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "Tim Burton's most heartfelt film — a father-son story full of wonder that the whole family will love.",
        director: 'Tim Burton'
      },
      {
        tconst: 'tt0096283',
        primary_title: 'My Neighbor Totoro',
        start_year: 1988,
        genres: ['Animation', 'Adventure', 'Comedy'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BYWM3MDE3YjEtMzIzZC00ODE5LTgxNTItNmUyMTBkM2M2NmNiXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A gentle, magical Studio Ghibli film that captures the wonder of childhood like nothing else.",
        director: 'Hayao Miyazaki'
      },
      {
        tconst: 'tt0477347',
        primary_title: 'Night at the Museum',
        start_year: 2006,
        genres: ['Adventure', 'Comedy', 'Family'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BNGMyYjYyZDAtNzRiZC00ZjRkLTkwYjktODkxODQzNTFiMTVmXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A fun, imaginative adventure that makes history come alive — entertaining for kids and parents alike.",
        director: 'Shawn Levy'
      },
      {
        tconst: 'tt4364194',
        primary_title: 'The Peanut Butter Falcon',
        start_year: 2019,
        genres: ['Adventure', 'Comedy', 'Drama'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BYjgxZTE4NDctZTM1MC00YjIwLTk0MmMtNWFkZGUwMGE2ZjNhXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A heartwarming, underseen road trip movie about friendship and chasing your dreams.",
        director: 'Tyler Nilson, Michael Schwartz'
      },
      {
        tconst: 'tt0382932',
        primary_title: 'Ratatouille',
        start_year: 2007,
        genres: ['Animation', 'Adventure', 'Comedy'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@._V1_SX300.jpg',
        plot: "A Pixar gem about following your passion — delicious, funny, and genuinely inspiring.",
        director: 'Brad Bird, Jan Pinkava'
      },
      {
        tconst: 'tt0327137',
        primary_title: 'Secondhand Lions',
        start_year: 2003,
        genres: ['Comedy', 'Drama', 'Family'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BYTlmYjViMWItMDE0MS00OGFlLTg3YWUtMjUyNTQzMWI4ZGYxXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A charming tale of a boy and his eccentric great-uncles — funny, adventurous, and surprisingly moving.",
        director: 'Tim McCanlies'
      },
      {
        tconst: 'tt0486655',
        primary_title: 'Stardust',
        start_year: 2007,
        genres: ['Adventure', 'Fantasy', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMjkyMTE1OTYwNF5BMl5BanBnXkFtZTcwMDIxODYzMw@@._V1_SX300.jpg',
        plot: "A fairy-tale adventure with wit, romance, and Robert De Niro as you've never seen him.",
        director: 'Matthew Vaughn'
      },
      {
        tconst: 'tt0970179',
        primary_title: 'Hugo',
        start_year: 2011,
        genres: ['Adventure', 'Drama', 'Family'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMjAzNzk5MzgyNF5BMl5BanBnXkFtZTcwOTE4NDU5Ng@@._V1_SX300.jpg',
        plot: "Scorsese's love letter to cinema — a beautiful, magical film the whole family can share.",
        director: 'Martin Scorsese'
      }
    ],
    related: ['movies-to-watch-with-kids', 'feel-good-movies', 'cozy-movies-for-rainy-days']
  },
  {
    slug: 'movies-for-couples',
    title: 'Movies for Couples',
    description: 'Romantic comedies, touching dramas and charming films to watch together.',
    seoTitle: "Movies for Couples | I Don't Know What To Watch",
    metaDescription:
      "Find the perfect movie for you and your partner. Romantic, funny and heartfelt picks for couples.",
    ctaLabel: 'Show me more movies for couples',
    ctaContext: "Like these? Let us find one you haven't watched together yet.",
    scenario: 'partner',
    genres: ['Romance', 'Comedy', 'Drama'],
    movies: [
      {
        tconst: 'tt0147800',
        primary_title: '10 Things I Hate About You',
        start_year: 1999,
        genres: ['Comedy', 'Drama', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BOTQwYmRhNGQtODI2Mi00ZTRlLTk0Y2QtY2NkNjE1MGNhNTgwXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A smart, funny teen romance with incredible chemistry — the perfect couple's comfort watch.",
        director: 'Gil Junger'
      },
      {
        tconst: 'tt9683478',
        primary_title: 'The Half of It',
        start_year: 2020,
        genres: ['Comedy', 'Drama'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BN2Y0NWUzNmEtMDM4My00ODQyLTg1NGItOGViYjg0MzNlYTQwXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A quietly brilliant coming-of-age romance that subverts every expectation — perfect for a cozy night in.",
        director: 'Alice Wu'
      },
      {
        tconst: 'tt1045658',
        primary_title: 'Silver Linings Playbook',
        start_year: 2012,
        genres: ['Comedy', 'Drama', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTM2MTI5NzA3MF5BMl5BanBnXkFtZTcwODExNTc0OA@@._V1_SX300.jpg',
        plot: "A messy, honest love story with heart — you'll both be rooting for them by the end.",
        director: 'David O. Russell'
      },
      {
        tconst: 'tt0118694',
        primary_title: 'In the Mood for Love',
        start_year: 2000,
        genres: ['Drama', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BN2Q4NjllMDgtOTk2Zi00YzM1LWJmOTMtNmRiZDgyZGJmMjQzXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "Arguably the most beautiful film ever made about longing — visually stunning and deeply romantic.",
        director: 'Wong Kar-Wai'
      },
      {
        tconst: 'tt0338013',
        primary_title: 'Eternal Sunshine of the Spotless Mind',
        start_year: 2004,
        genres: ['Drama', 'Romance', 'Sci-Fi'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_SX300.jpg',
        plot: "A beautifully original film about love and memory that hits different when you watch it together.",
        director: 'Michel Gondry'
      },
      {
        tconst: 'tt9484998',
        primary_title: 'Palm Springs',
        start_year: 2020,
        genres: ['Comedy', 'Fantasy', 'Mystery'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BY2VkNGY0MTMtMjEzZi00OThkLWJiOTMtNGU4ZGNjZDE5ZGIyXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A clever, hilarious time-loop rom-com that's way more romantic than you'd expect.",
        director: 'Max Barbakow'
      },
      {
        tconst: 'tt0477139',
        primary_title: 'Wristcutters: A Love Story',
        start_year: 2006,
        genres: ['Comedy', 'Drama', 'Fantasy'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BZTQzY2ZlYzItY2M0Ny00YjIwLWJjYTQtNDEzNzJmNzE2MTc1XkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A quirky, offbeat love story set in the strangest afterlife — unlike anything you've seen together.",
        director: 'Goran Dukic'
      },
      {
        tconst: 'tt1405365',
        primary_title: 'Celeste & Jesse Forever',
        start_year: 2012,
        genres: ['Comedy', 'Drama', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTM0Mzk3MTY1N15BMl5BanBnXkFtZTcwNDcwNTg5Nw@@._V1_SX300.jpg',
        plot: "A bittersweet, realistic romance that couples will connect with on a deep level.",
        director: 'Lee Toland Krieger'
      }
    ],
    related: ['date-night-movies', 'feel-good-movies', 'cozy-movies-for-rainy-days']
  },
  {
    slug: 'mind-bending-movies',
    title: 'Mind-Bending Movies That Will Blow Your Mind',
    description: 'Films that twist reality and challenge everything you think you know.',
    seoTitle: "Mind-Bending Movies | I Don't Know What To Watch",
    metaDescription:
      "Ready for a brain workout? Browse our curated list of mind-bending movies and let us pick the perfect one for you.",
    ctaLabel: 'Show me more mind-bending movies',
    ctaContext: "Like these? Let us find a mind-bending movie you haven't seen yet.",
    scenario: 'alone',
    genres: ['Sci-Fi', 'Thriller', 'Mystery'],
    movies: [
      {
        tconst: 'tt0482571',
        primary_title: 'The Prestige',
        start_year: 2006,
        genres: ['Drama', 'Mystery', 'Sci-Fi'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTM3MzQ5MjQ5OF5BMl5BanBnXkFtZTcwMTQ3NzMzMw@@._V1_SX300.jpg',
        plot: "Two rival magicians, one impossible trick — Nolan at his most deviously clever.",
        director: 'Christopher Nolan'
      },
      {
        tconst: 'tt0390384',
        primary_title: 'Primer',
        start_year: 2004,
        genres: ['Drama', 'Sci-Fi', 'Thriller'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BZTRmZDlmNzUtNjM2NS00MjBjLWFmNjQtMTczMWNkZTdiOGZmXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "The most realistic time-travel film ever made — a puzzle box that rewards repeat viewings.",
        director: 'Shane Carruth'
      },
      {
        tconst: 'tt2543164',
        primary_title: 'Arrival',
        start_year: 2016,
        genres: ['Drama', 'Mystery', 'Sci-Fi'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_SX300.jpg',
        plot: "A cerebral sci-fi masterpiece about language and time that will change how you think.",
        director: 'Denis Villeneuve'
      },
      {
        tconst: 'tt2397535',
        primary_title: 'Predestination',
        start_year: 2014,
        genres: ['Action', 'Drama', 'Sci-Fi'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BY2VhODM5OTUtZDJhMi00MTc5LThjNjYtZWY1M2NlNWU0N2NjXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A twisting sci-fi thriller that will melt your brain — the less you know going in, the better.",
        director: 'Michael Spierig, Peter Spierig'
      },
      {
        tconst: 'tt0246578',
        primary_title: 'Donnie Darko',
        start_year: 2001,
        genres: ['Drama', 'Mystery', 'Sci-Fi'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMWE3NTYzZmEtM2U5MS00MDZhLTk2ZTQtZTgzNjg0ZGQ5ZjM0XkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A haunting, surreal puzzle that burrows into your brain and never leaves.",
        director: 'Richard Kelly'
      },
      {
        tconst: 'tt0118929',
        primary_title: 'Dark City',
        start_year: 1998,
        genres: ['Fantasy', 'Mystery', 'Sci-Fi'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTFhMmE1YzgtNTFhYS00MTRlLWI3ZDMtMWJkMTBmOWMzOTk5XkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A noir-soaked sci-fi gem that asked 'what is reality?' before The Matrix did.",
        director: 'Alex Proyas'
      },
      {
        tconst: 'tt1187064',
        primary_title: 'Triangle',
        start_year: 2009,
        genres: ['Fantasy', 'Mystery', 'Sci-Fi'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BNzU3ZDA2MmUtYzFhMS00OGYyLWI3MDgtNDI4Zjg2YmRkNGYzXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A time-loop nightmare at sea — once you think you've figured it out, it pulls the rug again.",
        director: 'Christopher Smith'
      },
      {
        tconst: 'tt0480669',
        primary_title: 'Timecrimes',
        start_year: 2007,
        genres: ['Horror', 'Mystery', 'Sci-Fi'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BZTc3NGZkZmItMmZkZS00Yzc4LWIzZDItODRkYTI0MjlhNjA0XkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A tight, clever Spanish time-travel thriller that spirals beautifully out of control.",
        director: 'Nacho Vigalondo'
      }
    ],
    related: ['movies-that-make-you-think', 'movies-to-watch-alone-at-night', 'epic-movies-to-watch']
  },
  {
    slug: 'movies-that-make-you-cry',
    title: 'Movies That Will Make You Cry',
    description: 'Powerful emotional stories that will move you to tears. Keep the tissues handy.',
    seoTitle: "Movies That Make You Cry | I Don't Know What To Watch",
    metaDescription:
      "In the mood for a good cry? Let us pick a deeply moving film for you. The most emotional dramas, romances and biopics.",
    ctaLabel: 'Show me more emotional movies',
    ctaContext: "Like these? Let us find an emotional movie you haven't seen yet.",
    scenario: 'alone',
    genres: ['Drama', 'Romance', 'Biography'],
    movies: [
      {
        tconst: 'tt0108052',
        primary_title: "Schindler's List",
        start_year: 1993,
        genres: ['Biography', 'Drama', 'History'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BNjM1ZDQxYWUtMzQyZS00MTE1LWJmZGYtNGUyNTdlYjM3ZmVmXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "Spielberg's devastating masterpiece — one of the most powerful films ever made.",
        director: 'Steven Spielberg'
      },
      {
        tconst: 'tt8637428',
        primary_title: 'The Farewell',
        start_year: 2019,
        genres: ['Comedy', 'Drama'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BYjdlZDI1OWYtZWU4MC00NDhkLThmOWEtMTZiODFhZThkMjA4XkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A funny, tender film about family and loss that sneaks up on you emotionally.",
        director: 'Lulu Wang'
      },
      {
        tconst: 'tt0454921',
        primary_title: 'The Pursuit of Happyness',
        start_year: 2006,
        genres: ['Biography', 'Drama'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTQ5NjQ0NDI3NF5BMl5BanBnXkFtZTcwNDI0MjEzMw@@._V1_SX300.jpg',
        plot: "A true story of perseverance that will break your heart and put it back together.",
        director: 'Gabriele Muccino'
      },
      {
        tconst: 'tt3416532',
        primary_title: 'A Monster Calls',
        start_year: 2016,
        genres: ['Adventure', 'Drama', 'Family'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTg1OTA5OTkyNV5BMl5BanBnXkFtZTgwODMwNDU5OTE@._V1_SX300.jpg',
        plot: "A visually stunning film about grief that will destroy you — in the best possible way.",
        director: 'J.A. Bayona'
      },
      {
        tconst: 'tt0119217',
        primary_title: 'Good Will Hunting',
        start_year: 1997,
        genres: ['Drama', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BNDdjZGQ5YzEtNTc2My00Mjc0LWFlMTctYzkwMzZlNzdiZWYzXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "That bench scene alone is worth it — a raw, emotional film about letting people in.",
        director: 'Gus Van Sant'
      },
      {
        tconst: 'tt1152758',
        primary_title: 'Dear Zachary: A Letter to a Son About His Father',
        start_year: 2008,
        genres: ['Documentary', 'Biography', 'Crime'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BYTc3NTM1ZmQtNGI3YS00Y2JhLThiMWEtY2QxYTU3N2ZiNjNkXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A documentary so emotionally devastating you'll never forget it. Go in blind.",
        director: 'Kurt Kuenne'
      },
      {
        tconst: 'tt0978762',
        primary_title: 'Mary and Max',
        start_year: 2009,
        genres: ['Animation', 'Comedy', 'Drama'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BNzY2Mjc4NjMtNGY4Mi00NzM5LTk3ZTQtN2VkNzVkMzRmM2Y2XkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A claymation film about loneliness and friendship that's far more moving than you'd expect.",
        director: 'Adam Elliot'
      },
      {
        tconst: 'tt1120985',
        primary_title: 'Blue Valentine',
        start_year: 2010,
        genres: ['Drama', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTU4MTQ2MzA1Ml5BMl5BanBnXkFtZTcwODE3NTgwNA@@._V1_SX300.jpg',
        plot: "An unflinchingly honest portrait of love falling apart — raw, real, and heartbreaking.",
        director: 'Derek Cianfrance'
      }
    ],
    related: ['feel-good-movies', 'movies-for-couples', 'date-night-movies']
  },
  {
    slug: 'movies-that-make-you-think',
    title: 'Movies That Make You Think',
    description: 'Thought-provoking films that stay with you long after the credits roll.',
    seoTitle: "Movies That Make You Think | I Don't Know What To Watch",
    metaDescription:
      "Looking for a film that challenges your perspective? Browse our picks of thought-provoking movies.",
    ctaLabel: 'Show me more thought-provoking movies',
    ctaContext: "Like these? Let us find a thought-provoking movie you haven't seen yet.",
    scenario: 'alone',
    genres: ['Sci-Fi', 'Thriller', 'Mystery'],
    movies: [
      {
        tconst: 'tt0050083',
        primary_title: '12 Angry Men',
        start_year: 1957,
        genres: ['Crime', 'Drama'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BYjE4NzdmOTYtYjc5Yi00YzBiLWEzNDEtNTgxZGQ2MWVkN2NiXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "Twelve men, one room, one verdict — a masterclass in tension and moral reasoning.",
        director: 'Sidney Lumet'
      },
      {
        tconst: 'tt0756683',
        primary_title: 'The Man from Earth',
        start_year: 2007,
        genres: ['Drama', 'Fantasy', 'Mystery'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BOTE1NGYxNjgtYmVlMS00ODEwLTg2NjAtMTdjODMzY2I1ZjZmXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A professor claims he's 14,000 years old — one room, zero effects, all brain. Utterly gripping.",
        director: 'Richard Schenkman'
      },
      {
        tconst: 'tt0120382',
        primary_title: 'The Truman Show',
        start_year: 1998,
        genres: ['Comedy', 'Drama'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BNzA3ZjZlNzYtMTdjMy00NjMzLTk5ZGYtMTkyYzNiOGM1YmM3XkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A prescient, deeply human film about free will that gets more relevant every year.",
        director: 'Peter Weir'
      },
      {
        tconst: 'tt8267604',
        primary_title: 'Capernaum',
        start_year: 2018,
        genres: ['Drama'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BYzEyMzQ1OTktZTljZi00OWQzLWE2ZmUtZjQyNzBjYjE1NTc0XkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A 12-year-old sues his parents for being born — raw, devastating, and impossible to shake.",
        director: 'Nadine Labaki'
      },
      {
        tconst: 'tt6751668',
        primary_title: 'Parasite',
        start_year: 2019,
        genres: ['Drama', 'Thriller'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A genre-defying Korean thriller about class that will leave you stunned and thinking for days.",
        director: 'Bong Joon Ho'
      },
      {
        tconst: 'tt0405094',
        primary_title: 'The Lives of Others',
        start_year: 2006,
        genres: ['Drama', 'Mystery', 'Thriller'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BYjM1N2Q0YWEtN2E5MC00NDM3LTk2NTEtMTc1NTk5OTA5ZGIzXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A Stasi agent slowly questions everything — a quiet, powerful film about conscience and surveillance.",
        director: 'Florian Henckel von Donnersmarck'
      },
      {
        tconst: 'tt0470752',
        primary_title: 'Ex Machina',
        start_year: 2014,
        genres: ['Drama', 'Sci-Fi', 'Thriller'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_SX300.jpg',
        plot: "A taut AI thriller that asks the big questions about consciousness — and doesn't give easy answers.",
        director: 'Alex Garland'
      },
      {
        tconst: 'tt1255953',
        primary_title: 'Incendies',
        start_year: 2010,
        genres: ['Drama', 'Mystery', 'War'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BYWFmMjdmNjctNzhhOC00ZmMzLTkwOGItMmVmZDU4MjE2MTYwXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A Villeneuve mystery that peels back layers of a family's past — the final reveal is devastating.",
        director: 'Denis Villeneuve'
      }
    ],
    related: ['mind-bending-movies', 'movies-to-watch-alone-at-night', 'movies-that-make-you-cry']
  },
  {
    slug: 'cozy-movies-for-rainy-days',
    title: 'Cozy Movies for Rainy Days',
    description: 'Warm, comforting films perfect for curling up on the couch when it rains.',
    seoTitle: "Cozy Movies for Rainy Days | I Don't Know What To Watch",
    metaDescription:
      "Rainy day? Curl up with the perfect cozy movie. Heartwarming romances, comedies and animations to brighten any grey day.",
    ctaLabel: 'Show me more cozy movies',
    ctaContext: "Like these? Let us find a cozy movie you haven't seen yet.",
    scenario: 'alone',
    genres: ['Romance', 'Comedy', 'Animation'],
    movies: [
      {
        tconst: 'tt0125439',
        primary_title: 'Notting Hill',
        start_year: 1999,
        genres: ['Comedy', 'Drama', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BZjY3YWI5OTMtYTdlNy00ZTZiLWEwYjItN2M1MGVkMDM4ZDExXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "The cosiest rom-com ever made — warm, witty, and perfect with a cup of tea.",
        director: 'Roger Michell'
      },
      {
        tconst: 'tt2278388',
        primary_title: 'The Grand Budapest Hotel',
        start_year: 2014,
        genres: ['Comedy', 'Drama'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_SX300.jpg',
        plot: "A whimsical, perfectly crafted visual treat — like watching a storybook come to life.",
        director: 'Wes Anderson'
      },
      {
        tconst: 'tt0107048',
        primary_title: 'Groundhog Day',
        start_year: 1993,
        genres: ['Comedy', 'Drama', 'Fantasy'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BOWE3MjQ3ZDAtNDQ2MC00YjBjLTk0ZWYtNjQ0YzQ4YWE3YTEyXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A feel-good classic that gets better every loop — ideal for a lazy rainy afternoon.",
        director: 'Harold Ramis'
      },
      {
        tconst: 'tt0097814',
        primary_title: "Kiki's Delivery Service",
        start_year: 1989,
        genres: ['Animation', 'Family', 'Fantasy'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BOTFhYWI1NGUtZWFhZS00MTdkLWIzZTItMDBhNWNiZDNlMjYyXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A cozy Ghibli gem about a young witch finding her way — pure rainy-day comfort.",
        director: 'Hayao Miyazaki'
      },
      {
        tconst: 'tt1135503',
        primary_title: 'Julie & Julia',
        start_year: 2009,
        genres: ['Biography', 'Drama', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMzA4NjA2NjI2NV5BMl5BanBnXkFtZTcwOTEzNzI2Mg@@._V1_SX300.jpg',
        plot: "A warm, delicious film about food and passion — the ultimate comfort movie.",
        director: 'Nora Ephron'
      },
      {
        tconst: 'tt1605783',
        primary_title: 'Midnight in Paris',
        start_year: 2011,
        genres: ['Comedy', 'Fantasy', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTM4NjY1MDQwMl5BMl5BanBnXkFtZTcwNTI3Njg3NA@@._V1_SX300.jpg',
        plot: "A romantic stroll through literary Paris — charming, dreamy, and effortlessly cozy.",
        director: 'Woody Allen'
      },
      {
        tconst: 'tt2381111',
        primary_title: 'Brooklyn',
        start_year: 2015,
        genres: ['Drama', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMzE4MDk5NzEyOV5BMl5BanBnXkFtZTgwNDM4NDA3NjE@._V1_SX300.jpg',
        plot: "A tender, beautifully told immigration story that wraps you in warmth.",
        director: 'John Crowley'
      },
      {
        tconst: 'tt0241303',
        primary_title: 'Chocolat',
        start_year: 2000,
        genres: ['Drama', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BNGIwYzczYWItZmI5Yi00M2JiLTg4M2EtNzFhNjUzZTRjNmRhXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A sweet, comforting film about a mysterious chocolatier who changes a small town — pure indulgence.",
        director: 'Lasse Hallström'
      }
    ],
    related: ['feel-good-movies', 'movies-for-couples', 'movies-to-watch-with-family']
  },
  {
    slug: 'epic-movies-to-watch',
    title: 'Epic Movies You Need to Watch',
    description: 'Grand-scale adventures, sweeping battles and unforgettable journeys.',
    seoTitle: "Epic Movies to Watch | I Don't Know What To Watch",
    metaDescription:
      "Ready for something epic? Let us pick a grand-scale movie for you. Action, adventure, history and war films.",
    ctaLabel: 'Show me more epic movies',
    ctaContext: "Like these? Let us find an epic movie you haven't seen yet.",
    scenario: 'friends',
    genres: ['Action', 'Adventure', 'History', 'War'],
    movies: [
      {
        tconst: 'tt0172495',
        primary_title: 'Gladiator',
        start_year: 2000,
        genres: ['Action', 'Adventure', 'Drama'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BYWQ4YmNjYjEtOWE1Zi00Y2U4LWI4NTAtMTU0MjkxNWQ1ZmJiXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A sweeping revenge epic with Russell Crowe at his most commanding — pure cinematic spectacle.",
        director: 'Ridley Scott'
      },
      {
        tconst: 'tt0299977',
        primary_title: 'Hero',
        start_year: 2002,
        genres: ['Action', 'Adventure', 'Drama'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BYTlkZWVjYzQtZmI1My00MGM2LTlmZjEtNjU1M2Y1MTRkNmZjXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A visually breathtaking Chinese martial arts epic — every frame is a painting.",
        director: 'Yimou Zhang'
      },
      {
        tconst: 'tt0320661',
        primary_title: 'Kingdom of Heaven',
        start_year: 2005,
        genres: ['Action', 'Adventure', 'Drama'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMzdhNGZhMjQtYjVmNy00OWMyLTk1MmQtZGNhZDYwMzZlZjI3XkEyXkFqcGc@._V1_SX300.jpg',
        plot: "Ridley Scott's misunderstood crusades epic — the director's cut turns it into a masterpiece.",
        director: 'Ridley Scott'
      },
      {
        tconst: 'tt0460791',
        primary_title: 'The Fall',
        start_year: 2006,
        genres: ['Adventure', 'Drama', 'Fantasy'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMjAzODUwMjM1M15BMl5BanBnXkFtZTcwNjU2MjU2MQ@@._V1_SX300.jpg',
        plot: "A stunningly gorgeous fantasy epic shot across 18 countries — the most beautiful film you've never seen.",
        director: 'Tarsem Singh'
      },
      {
        tconst: 'tt0112573',
        primary_title: 'Braveheart',
        start_year: 1995,
        genres: ['Biography', 'Drama', 'War'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BNGMxZDBhNGQtYTZlNi00N2UzLWI4NDEtNmUzNWM2NTdmZDA0XkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A rousing, emotional epic about freedom that will have you on your feet by the end.",
        director: 'Mel Gibson'
      },
      {
        tconst: 'tt0472043',
        primary_title: 'Apocalypto',
        start_year: 2006,
        genres: ['Action', 'Adventure', 'Drama'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMzJkNzI3ZmEtZmRhOS00YTM1LWI3OTAtZmVjZmNkODIxNmFmXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A relentless survival thriller set in the Mayan empire — raw, visceral, and utterly gripping.",
        director: 'Mel Gibson'
      },
      {
        tconst: 'tt0311113',
        primary_title: 'Master and Commander: The Far Side of the World',
        start_year: 2003,
        genres: ['Action', 'Adventure', 'Drama'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BZDEzYmZmOTYtMzdlYS00MWNjLWE2YjEtMzkyZTMyOWZjMjkyXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "An immersive naval epic that makes you feel every wave — criminally underrated.",
        director: 'Peter Weir'
      },
      {
        tconst: 'tt0120657',
        primary_title: 'The 13th Warrior',
        start_year: 1999,
        genres: ['Action', 'Adventure', 'History'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BY2IwMTYyNjctYzhjZi00Y2Y3LWE3NjktMGVjMjFhNzk0NWFjXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A Viking adventure based on Michael Crichton's novel — gritty, atmospheric, and wildly entertaining.",
        director: 'John McTiernan'
      }
    ],
    related: ['movies-to-watch-with-friends', 'mind-bending-movies', 'movies-to-watch-alone-at-night']
  },
  {
    slug: 'movies-to-watch-with-girlfriend',
    title: 'Movies to Watch with Your Girlfriend',
    description: 'Sweet, funny and romantic films perfect for a cozy night in together.',
    seoTitle: "Movies to Watch with Your Girlfriend | I Don't Know What To Watch",
    metaDescription:
      "Looking for the perfect movie to watch with your girlfriend? Let us pick a romantic, funny or heartwarming film for you.",
    ctaLabel: 'Show me more movies for us',
    ctaContext: "Like these? Let us find one you haven't watched together yet.",
    scenario: 'partner',
    genres: ['Romance', 'Comedy', 'Drama'],
    movies: [
      {
        tconst: 'tt0414387',
        primary_title: 'Pride & Prejudice',
        start_year: 2005,
        genres: ['Drama', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTA1NDQ3NTcyOTNeQTJeQWpwZ15BbWU3MDA0MzA4MzE@._V1_SX300.jpg',
        plot: "Keira Knightley, that hand flex, and the most romantic dawn confession ever filmed.",
        director: 'Joe Wright'
      },
      {
        tconst: 'tt4669986',
        primary_title: 'Loving',
        start_year: 2016,
        genres: ['Biography', 'Drama', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMjE4NTI3NjIzOF5BMl5BanBnXkFtZTgwNjI0NTI5ODE@._V1_SX300.jpg',
        plot: "A quiet, powerful true story of an interracial couple who fought for their right to love.",
        director: 'Jeff Nichols'
      },
      {
        tconst: 'tt1041829',
        primary_title: 'The Proposal',
        start_year: 2009,
        genres: ['Comedy', 'Drama', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BYWU3ZmFhYTktNzU4NS00ZTEyLTkwNTYtMWE1M2JjMTFmODVkXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A perfectly executed rom-com with Sandra Bullock and Ryan Reynolds at their charming best.",
        director: 'Anne Fletcher'
      },
      {
        tconst: 'tt5304992',
        primary_title: 'Set It Up',
        start_year: 2018,
        genres: ['Comedy', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTk0MDUyMzA1OF5BMl5BanBnXkFtZTgwNzA4NzE1NTM@._V1_SX300.jpg',
        plot: "A modern rom-com that actually delivers — funny, sweet, and criminally overlooked.",
        director: 'Claire Scanlon'
      },
      {
        tconst: 'tt0092890',
        primary_title: 'Dirty Dancing',
        start_year: 1987,
        genres: ['Drama', 'Music', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BZmIwZjA1NzUtNTA0OS00OWMyLWE5MzctM2RjOWYxZjQyZDdmXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "Nobody puts Baby in a corner — a timeless romance with an iconic soundtrack.",
        director: 'Emile Ardolino'
      },
      {
        tconst: 'tt1714206',
        primary_title: 'The Spectacular Now',
        start_year: 2013,
        genres: ['Drama', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMjA5MTc0NTkzM15BMl5BanBnXkFtZTcwODEwNjE3OQ@@._V1_SX300.jpg',
        plot: "A teen romance that feels startlingly real — tender, honest, and beautifully acted.",
        director: 'James Ponsoldt'
      },
      {
        tconst: 'tt7374948',
        primary_title: 'Always Be My Maybe',
        start_year: 2019,
        genres: ['Comedy', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BZjUxMDEzMWItN2Y2OS00ZTNmLThhYTEtZDAzYWFiMzQ0MTlkXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A hilarious, heartfelt rom-com with the greatest celebrity cameo of all time.",
        director: 'Nahnatchka Khan'
      },
      {
        tconst: 'tt8613070',
        primary_title: 'Portrait of a Lady on Fire',
        start_year: 2019,
        genres: ['Drama', 'Romance'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BZjJlYWJlYmMtNjMyMS00ZDgxLTlmNjAtOTJhMzBiZWM5N2VmXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "A slow-burning masterpiece about forbidden love — one of the most beautiful romances ever filmed.",
        director: 'Céline Sciamma'
      }
    ],
    related: ['date-night-movies', 'movies-for-couples', 'feel-good-movies']
  },
  {
    slug: 'movies-to-watch-with-boyfriend',
    title: 'Movies to Watch with Your Boyfriend',
    description: 'Action-packed, thrilling and fun films you can both enjoy.',
    seoTitle: "Movies to Watch with Your Boyfriend | I Don't Know What To Watch",
    metaDescription:
      "Need a movie to watch with your boyfriend? Let us find the perfect mix of action, thriller and comedy for you.",
    ctaLabel: 'Show me more movies for us',
    ctaContext: "Like these? Let us find one you haven't watched together yet.",
    scenario: 'partner',
    genres: ['Action', 'Thriller', 'Comedy'],
    movies: [
      {
        tconst: 'tt0095016',
        primary_title: 'Die Hard',
        start_year: 1988,
        genres: ['Action', 'Thriller'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMGNlYmM1NmQtYWExMS00NmRjLTg5ZmEtMmYyYzJkMzljYWMxXkEyXkFqcGc@._V1_SX300.jpg',
        plot: "The action movie that doubles as a date movie — funny, thrilling, and endlessly quotable.",
        director: 'John McTiernan'
      },
      {
        tconst: 'tt2980592',
        primary_title: 'The Guest',
        start_year: 2014,
        genres: ['Action', 'Mystery', 'Thriller'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BOTQyODc5MTAwM15BMl5BanBnXkFtZTgwNjMwMjA1MjE@._V1_SX300.jpg',
        plot: "A stylish, unpredictable thriller with a killer synth soundtrack — a cult classic in the making.",
        director: 'Adam Wingard'
      },
      {
        tconst: 'tt0407887',
        primary_title: 'The Departed',
        start_year: 2006,
        genres: ['Crime', 'Drama', 'Thriller'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_SX300.jpg',
        plot: "Scorsese's twisty crime thriller — gripping from start to finish with a stacked cast.",
        director: 'Martin Scorsese'
      },
      {
        tconst: 'tt0780536',
        primary_title: 'In Bruges',
        start_year: 2008,
        genres: ['Comedy', 'Crime', 'Drama'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BNjliZjBlNDItOWUyZC00ZTExLTg5NmUtNzE5ZmQyZWVmZmE5XkEyXkFqcGc@._V1_SX300.jpg',
        plot: "Two hitmen hiding in Belgium — darkly hilarious, surprisingly touching, and totally unique.",
        director: 'Martin McDonagh'
      },
      {
        tconst: 'tt0264464',
        primary_title: 'Catch Me If You Can',
        start_year: 2002,
        genres: ['Biography', 'Crime', 'Drama'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTY5MzYzNjc5NV5BMl5BanBnXkFtZTYwNTUyNTc2._V1_SX300.jpg',
        plot: "A slick, charming cat-and-mouse caper that's impossible not to enjoy together.",
        director: 'Steven Spielberg'
      },
      {
        tconst: 'tt6499752',
        primary_title: 'Upgrade',
        start_year: 2018,
        genres: ['Action', 'Sci-Fi', 'Thriller'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMjI0NzcyMjM5Ml5BMl5BanBnXkFtZTgwMzk2NzAyNTM@._V1_SX300.jpg',
        plot: "A low-budget sci-fi action film that punches way above its weight — fast, brutal, and smart.",
        director: 'Leigh Whannell'
      },
      {
        tconst: 'tt0373469',
        primary_title: 'Kiss Kiss Bang Bang',
        start_year: 2005,
        genres: ['Comedy', 'Crime', 'Mystery'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMTY5NDExMDA3M15BMl5BanBnXkFtZTYwNTc2MzA3._V1_SX300.jpg',
        plot: "A razor-sharp, hilarious noir with Robert Downey Jr. at his best — before Iron Man.",
        director: 'Shane Black'
      },
      {
        tconst: 'tt1478964',
        primary_title: 'Attack the Block',
        start_year: 2011,
        genres: ['Action', 'Adventure', 'Comedy'],
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BMjAzNjc1MjgzOF5BMl5BanBnXkFtZTcwMzE3Njk5NQ@@._V1_SX300.jpg',
        plot: "Teens vs aliens in a London tower block — a wildly fun, inventive sci-fi comedy.",
        director: 'Joe Cornish'
      }
    ],
    related: ['date-night-movies', 'movies-for-couples', 'epic-movies-to-watch']
  }
]

export const COLLECTION_BY_SLUG: Record<string, Collection> = Object.fromEntries(
  COLLECTIONS.map((c) => [c.slug, c])
)

export const COLLECTION_SLUGS = COLLECTIONS.map((c) => c.slug)
