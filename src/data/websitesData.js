// Live client websites shown in the "Websites We've Launched" showcase (Home page + Case Studies page).
// image:      homepage screenshot, first screen at 1440×810 (16:9)
// stageColor: muted tint of the client's brand colour, shown behind the screenshot
import ashokaImage from '../assets/projects/ashoka_ias_academy_screen.webp';
import cureoImage from '../assets/projects/cureo_homeopathy_screen.webp';
import dimaNiwasImage from '../assets/projects/dima_niwas_campsite_screen.webp';

export const websites = [
  {
    id: 'ashoka-ias-academy',
    name: 'Ashoka IAS Academy',
    url: 'https://www.ashokaiasacademy.com/',
    description:
      'The complete online home of a UPSC & APSC coaching institute, built to bring in admissions and keep aspirants coming back.',
    image: ashokaImage,
    stageColor: '#a9bbd9',
  },
  {
    id: 'cureo-homeopathy',
    name: 'Cureo Homeopathy Care',
    url: 'https://cureohomeopathy.in/',
    description:
      'A warm, trust-first website for a doctor-led homeopathy clinic that turns visitors into booked consultations.',
    image: cureoImage,
    stageColor: '#9fcca9',
  },
  {
    id: 'dima-niwas-campsite',
    name: 'Dima Niwas Campsite',
    url: 'https://www.dimaniwascampsite.in/',
    description:
      'A nature-first website for a lakeside campsite and restaurant, built to show off the stay and bring bookings straight to WhatsApp.',
    image: dimaNiwasImage,
    stageColor: '#d8c6a2',
  },
];
