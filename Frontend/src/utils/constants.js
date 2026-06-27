import bhootBangla from '../assets/BHOOT BANGLA.png';
import border2 from '../assets/BORDER 2.png';
import dhurandhar from '../assets/DHURANDHAR THE REVENGE.png';
import pathaan from '../assets/PATHAAN.png';
import jawan from '../assets/JAWAAN.png';
import ranveerSingh from '../assets/Ranveer Singh.png';
import saraArjun from '../assets/Sara Arjun.png';
import meg2Banner from '../assets/meg2_banner.png';

export const MOVIES = [
  {
    id: '1',
    slug: 'dhurandhar-the-revenge',
    title: 'Dhurandhar: The Revenge',
    genre: 'Action, Drama',
    rating: 4.8,
    poster: dhurandhar,
    banner: dhurandhar,
    ratingBadge: 'PG-13',
    description: 'A relentless hero returns to seek justice against a powerful underworld syndicate, embarking on a dangerous journey of retribution that will change his life forever.',
    releaseDate: '19 March 2026',
    formats: ['2D', '3D', 'IMAX'],
    cast: [
      {
        id: 'c1',
        name: 'Ranveer Singh',
        role: 'Dhurandhar',
        image: ranveerSingh,
      },
      {
        id: 'c2',
        name: 'Sara Arjun',
        role: 'Shakti',
        image: saraArjun,
      },
      {
        id: 'c3',
        name: 'Vicky Kaushal',
        role: 'Inspector Vikram',
        image: 'https://images.pexels.com/photos/12596735/pexels-photo-12596735.jpeg',
      },
    ],
  },
  {
    id: '2',
    slug: 'pathaan',
    title: 'Pathaan',
    genre: 'Action, Thriller',
    rating: 4.5,
    poster: pathaan,
    banner: pathaan,
    ratingBadge: 'UA',
    description: 'An Indian spy takes on the leader of a group of mercenaries who have nefarious plans to target his homeland.',
    releaseDate: '25 January 2023',
    formats: ['2D', 'IMAX'],
    cast: [
      {
        id: 'p1',
        name: 'Shah Rukh Khan',
        role: 'Pathaan',
        image: 'https://images.pexels.com/photos/3130419/pexels-photo-3130419.jpeg',
      },
    ],
  },
  {
    id: '3',
    slug: 'bhoot-bangla',
    title: 'Bhoot Bangla',
    genre: 'Horror, Comedy',
    rating: 4.6,
    poster: bhootBangla,
    banner: bhootBangla,
    ratingBadge: 'UA',
    description: 'A family moves into a haunted mansion only to discover that the ghosts are more hilarious than horrific.',
    releaseDate: '15 May 2026',
    formats: ['2D'],
    cast: [
      {
        id: 'b1',
        name: 'Akshay Kumar',
        role: 'Rohan',
        image: 'https://images.pexels.com/photos/13226336/pexels-photo-13226336.jpeg',
      },
    ],
  },
  {
    id: '4',
    slug: 'border-2',
    title: 'Border 2',
    genre: 'Action, War',
    rating: 4.9,
    poster: border2,
    banner: border2,
    ratingBadge: 'UA',
    description: 'The saga of valor and sacrifice continues as a new generation of soldiers defends the borders against overwhelming odds.',
    releaseDate: '23 January 2026',
    formats: ['2D', 'IMAX'],
    cast: [
      {
        id: 'bo1',
        name: 'Sunny Deol',
        role: 'Major Kuldip',
        image: 'https://images.pexels.com/photos/13226332/pexels-photo-13226332.jpeg',
      },
    ],
  },
  {
    id: '5',
    slug: 'jawan',
    title: 'Jawan',
    genre: 'Action, Thriller',
    rating: 4.7,
    poster: jawan,
    banner: jawan,
    ratingBadge: 'UA',
    description: 'A man is driven by a personal vendetta to rectify the wrongs in society, while keeping a promise made years ago.',
    releaseDate: '7 September 2023',
    formats: ['2D', 'IMAX'],
    cast: [
      {
        id: 'j1',
        name: 'Shah Rukh Khan',
        role: 'Vikram Rathore',
        image: 'https://images.pexels.com/photos/3130419/pexels-photo-3130419.jpeg',
      },
    ],
  },
  {
    id: '6',
    slug: 'meg-2-the-trench',
    title: 'Meg 2: The Trench',
    genre: 'Action, Sci-fi, Horror',
    rating: 4.5,
    poster: meg2Banner,
    banner: meg2Banner,
    ratingBadge: 'PG-13',
    description: 'An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.',
    releaseDate: '4 August 2023',
    formats: ['2D', '3D', 'IMAX'],
    cast: [
      {
        id: 'm1',
        name: 'Jason Statham',
        role: 'Jonas Taylor',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      },
      {
        id: 'm2',
        name: 'Wu Jing',
        role: 'Jiuming Zhang',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      },
      {
        id: 'm3',
        name: 'Shuya Sophia Cai',
        role: 'Meiying',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      },
    ],
  },
];

export const THEATRES = [
  {
    id: '1',
    name: 'Cinepolis - Fun Republic Mall',
    location: 'Gomti Nagar, Lucknow',
    priceRange: '₹250 - ₹550',
    logo: 'https://picsum.photos/seed/cinepolis/100/100',
  },
  {
    id: '2',
    name: 'PVR - Phoenix United Mall',
    location: 'Alambagh, Lucknow',
    priceRange: '₹300 - ₹600',
    logo: 'https://picsum.photos/seed/pvr/100/100',
  },
  {
    id: '3',
    name: 'INOX - Riverside Mall',
    location: 'Gomti Nagar, Lucknow',
    priceRange: '₹280 - ₹580',
    logo: 'https://picsum.photos/seed/inox/100/100',
  },
  {
    id: '4',
    name: 'The Grandview',
    location: 'Camp Aguinaldo, Quezon City',
    priceRange: '₹320 - ₹450',
    logo: 'grandview',
  },
  {
    id: '5',
    name: 'Play Loft',
    location: 'Aurora Boulevard, Santa Mesa',
    priceRange: '₹300 - ₹430',
    logo: 'playloft',
  },
  {
    id: '6',
    name: 'CinemaOne',
    location: 'A Cruz, Pasay City',
    priceRange: '₹320',
    logo: 'cinemaone',
  },
  {
    id: '7',
    name: 'Cinemount',
    location: 'Baclaran, Paranaque City',
    priceRange: '₹350',
    logo: 'cinemount',
  },
];
