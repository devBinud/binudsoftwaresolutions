import { TECH_COUNT } from './technologies';

/**
 * Stat cards in the "Why Choose Us" section on the Home page.
 * Replace these with your real figures whenever you like — keep them truthful.
 *
 * Fields:
 *   value    – the number (counts up from 0 when scrolled into view)
 *   prefix   – optional text before the number, e.g. '₹'
 *   suffix   – optional text after the number, e.g. '+', '%', 'K+'
 *   label    – the caption under the number
 *   icon     – one of: 'rocket' | 'users' | 'grid' | 'chip' | 'clock' | 'award' | 'smile' | 'globe'
 *   countUp  – set false to show the number without counting (e.g. a year)
 *
 * Cards alternate between the two columns: 1st left, 2nd right, 3rd left, …
 */
export const STATS = [
  { value: 2021, label: 'Year Founded', icon: 'rocket', countUp: false },
  { value: 7, label: 'Core Service Lines', icon: 'grid' },
  { value: 40, suffix: '+', label: 'Clients Worldwide', icon: 'smile' },
  // Rounded down to the nearest 5, from the list in technologies.js
  { value: Math.floor(TECH_COUNT / 5) * 5, suffix: '+', label: 'Technologies in Our Stack', icon: 'chip' },
];
