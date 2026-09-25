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

/** PLACEHOLDER — see the note above. Alphabetical by city name. */
export const OTHER_CITIES: string[] = [
  "Ajmer, Rajasthan",
  "Amritsar, Punjab",
  "Bhopal, Madhya Pradesh",
  "Bhubaneswar, Odisha",
  "Chandigarh, Punjab",
  "Coimbatore, Tamil Nadu",
  "Dehradun, Uttarakhand",
  "Faridabad, Haryana",
  "Ghaziabad, Uttar Pradesh",
  "Gurugram, Haryana",
  "Guwahati, Assam",
  "Indore, Madhya Pradesh",
  "Jaipur, Rajasthan",
  "Jodhpur, Rajasthan",
  "Kanpur, Uttar Pradesh",
  "Kochi, Kerala",
  "Lucknow, Uttar Pradesh",
  "Ludhiana, Punjab",
  "Madurai, Tamil Nadu",
  "Mysuru, Karnataka",
  "Nagpur, Maharashtra",
  "Nashik, Maharashtra",
  "Noida, Uttar Pradesh",
  "Patna, Bihar",
  "Raipur, Chhattisgarh",
  "Rajkot, Gujarat",
  "Ranchi, Jharkhand",
  "Surat, Gujarat",
  "Thiruvananthapuram, Kerala",
  "Vadodara, Gujarat",
  "Varanasi, Uttar Pradesh",
  "Visakhapatnam, Andhra Pradesh",
];

/** Where the chosen city is remembered between visits. */
export const CITY_STORAGE_KEY = "healthverse.city";
