/**
 * City data for the selection sheet — Figma node 1050:8751.
 *
 * The eight popular cities and their landmark artwork come from the design.
 * `OTHER_CITIES` does NOT: the frame shows only four entries, so the rest are
 * a generic list of well-known Indian cities chosen to exercise search and
 * scrolling. They are NOT a statement of where MediBuddy actually operates —
 * replace this array with the real coverage list before launch.
 */

export type PopularCity = {
  name: string;
  /** Landmark artwork, served from public/city rather than inlined: the eight
      SVGs are traced artwork totalling ~180KB, which would bloat the bundle. */
  icon: string;
  /** Figma sizes a few of these at fractional dimensions. */
  width: number;
  height: number;
};

export const POPULAR_CITIES: PopularCity[] = [
  { name: "New Delhi", icon: "/city/city-new-delhi.svg", width: 48.223, height: 48.311 },
  { name: "Bengaluru", icon: "/city/city-bengaluru.svg", width: 47.313, height: 47.047 },
  { name: "Hyderabad", icon: "/city/city-hyderabad.svg", width: 47.784, height: 47.245 },
  { name: "Chennai", icon: "/city/city-chennai.svg", width: 47.852, height: 47.18 },
  { name: "Kolkata", icon: "/city/city-kolkata.svg", width: 48, height: 48 },
  { name: "Pune", icon: "/city/city-pune.svg", width: 48, height: 48 },
  { name: "Ahmedabad", icon: "/city/city-ahmedabad.svg", width: 48, height: 48 },
  { name: "Mumbai", icon: "/city/city-mumbai.svg", width: 48, height: 48 },
];

export type OtherCity = {
  name: string;
  /** How many programmes are on offer. `null` means the city is not served
      yet, which renders as a greyed row with a "Coming Soon" tag and cannot
      be selected. */
  programs: number | null;
};

/**
 * PLACEHOLDER — see the note at the top of this file.
 *
 * The first five entries carry the exact names and counts from the Figma
 * frame. Everything else, including every other programme count and which
 * cities are "Coming Soon", is invented to exercise the UI. None of it
 * describes real MediBuddy coverage or inventory.
 *
 * Alphabetical by city name.
 */
export const OTHER_CITIES: OtherCity[] = [
  { name: "Ajmer, Rajasthan", programs: 12 },
  { name: "Amritsar, Punjab", programs: 6 },
  { name: "Bhopal, Madhya Pradesh", programs: 4 },
  { name: "Bhubaneswar, Odisha", programs: null },
  { name: "Chandigarh, Haryana", programs: null },
  { name: "Coimbatore, Tamil Nadu", programs: null },
  { name: "Dehradun, Uttarakhand", programs: 3 },
  { name: "Faridabad, Haryana", programs: 4 },
  { name: "Ghaziabad, Uttar Pradesh", programs: 7 },
  { name: "Gurugram, Haryana", programs: 15 },
  { name: "Guwahati, Assam", programs: null },
  { name: "Indore, Madhya Pradesh", programs: 8 },
  { name: "Jaipur, Rajasthan", programs: 11 },
  { name: "Jodhpur, Rajasthan", programs: 3 },
  { name: "Kanpur, Uttar Pradesh", programs: 5 },
  { name: "Kochi, Kerala", programs: 9 },
  { name: "Lucknow, Uttar Pradesh", programs: 10 },
  { name: "Ludhiana, Punjab", programs: 4 },
  { name: "Madurai, Tamil Nadu", programs: null },
  { name: "Mysuru, Karnataka", programs: 6 },
  { name: "Nagpur, Maharashtra", programs: 7 },
  { name: "Nashik, Maharashtra", programs: 5 },
  { name: "Noida, Uttar Pradesh", programs: 14 },
  { name: "Patna, Bihar", programs: 4 },
  { name: "Raipur, Chhattisgarh", programs: null },
  { name: "Rajkot, Gujarat", programs: 3 },
  { name: "Ranchi, Jharkhand", programs: null },
  { name: "Surat, Gujarat", programs: 8 },
  { name: "Thiruvananthapuram, Kerala", programs: 5 },
  { name: "Vadodara, Gujarat", programs: 6 },
  { name: "Varanasi, Uttar Pradesh", programs: 4 },
  { name: "Visakhapatnam, Andhra Pradesh", programs: 7 },
];

/** Where the chosen city is remembered between visits. */
export const CITY_STORAGE_KEY = "healthverse.city";
