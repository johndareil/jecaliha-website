import {
  Building2,
  Waves,
  Droplets,
  UtensilsCrossed,
  Sun,
  Building,
  Hammer,
} from "lucide-react";

export const COMPANY = {
  name: "Jecaliha Builders Corporation",
  shortName: "JBC",
  logo: "https://pub-7bc4037c95e641a38dea4fa14fc2154b.r2.dev/logo/logo.webp?v=2",
  email: "Jecalihabuilderscorporation@gmail.com",
  established: "September 27, 2019",
  phone: "0926-051-3662 / 0917-701-5493",
  addressLines: ["MIA's BLDG. Purok 1, Mataas Na Lupa,", "Villa Corazon, Indang, Cavite"],
  hours: [
    { day: "Mon - Fri", time: "8:00 AM - 5:00 PM" },
    { day: "Sat", time: "1:00 PM - 5:00 PM" },
    { day: "Sun", time: "Closed" },
  ],
  facebook: "https://www.facebook.com/BossWardenmoto",
  youtube: "https://www.youtube.com/@poolmotovlog",
};

export const HOME_MEDIA = {
  hero: "https://pub-7bc4037c95e641a38dea4fa14fc2154b.r2.dev/home/hero.webp",
  president: "https://pub-7bc4037c95e641a38dea4fa14fc2154b.r2.dev/home/president.webp",
  family: "https://pub-7bc4037c95e641a38dea4fa14fc2154b.r2.dev/home/our-family.webp",
  quote: "https://pub-7bc4037c95e641a38dea4fa14fc2154b.r2.dev/home/quote.webp",
};

export const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Vlog", to: "/vlog" },
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Events", to: "/events" },
  { label: "Contact Us", to: "/contact" },
  { label: "Get a Free Quote", to: "/contact" },
];

export const SERVICES = [
  {
    icon: Building2,
    title: "General Construction Design & Build",
    blurb:
      "End-to-end design and build delivery for homes, commercial buildings, and warehouses — from concept drawings and permits to turnkey turnover.",
  },
  {
    icon: Waves,
    title: "Customized Pool & Resort Construction",
    blurb:
      "Bespoke swimming pools, infinity edges, heated jacuzzis, and complete resort build-outs engineered for the tropics and built to stay leak-free.",
  },
  {
    icon: Droplets,
    title: "Specialized 5-Stage Waterproofing",
    blurb:
      "Our five-stage waterproofing system protects decks, roofs, and pool shells from the source — stopping water intrusion instead of masking it.",
  },
  {
    icon: UtensilsCrossed,
    title: "Café & Restaurant Fit-Outs",
    blurb:
      "Turn-key fit-outs for cafés and restaurants — millwork, lighting, MEP, and finishes coordinated so you open on schedule and on budget.",
  },
  {
    icon: Sun,
    title: "Solar Installation",
    blurb:
      "Grid-tied and hybrid solar systems sized for real consumption, cutting operating costs for homes, resorts, and commercial facilities.",
  },
  {
    icon: Building,
    title: "Condo Fit-Outs",
    blurb:
      "Precision interior build-outs for high-rise units and common areas, executed strictly within building hours and house rules.",
  },
  {
    icon: Hammer,
    title: "Major Renovations, Rehabilitation & Consultancy",
    blurb:
      "Structural remediation, full renovations, and technical consultancy backed by 17+ years of hands-on field expertise.",
  },
];

export const SERVICE_OPTIONS = [...SERVICES.map((service) => service.title), "Other / Not sure yet"];

const TEAM_IMAGE_BASE = "https://pub-7bc4037c95e641a38dea4fa14fc2154b.r2.dev/home/team";

export const TEAM = [
  {
    name: "Maria Liberty Geraldo",
    role: "Chief Financial Officer",
    image: `${TEAM_IMAGE_BASE}/maria.webp`,
    facebook: "https://www.facebook.com/denwar.liberty",
  },
  {
    name: "Edgar Leigh P. Catolico",
    role: "Architect",
    image: `${TEAM_IMAGE_BASE}/edgar.webp`,
    facebook: "https://www.facebook.com/edgar.leigh.catolico",
  },
  {
    name: "Lorenze Harvey F. De Jesus",
    role: "Engineer",
    image: `${TEAM_IMAGE_BASE}/lorenze.webp`,
    facebook: "https://www.facebook.com/VanadiumL",
  },
  {
    name: "Rizz Tryke Jaberina",
    role: "Board of Director",
    image: `${TEAM_IMAGE_BASE}/rizz.webp`,
    facebook: "https://www.facebook.com/kuchayte",
  },
  {
    name: "Geraldine C. Sambulay",
    role: "Chief Marketing Officer",
    image: `${TEAM_IMAGE_BASE}/geraldine.webp`,
    facebook: "https://www.facebook.com/geraldine.tolentino.733",
  },
  {
    name: "Cath Arcilla Enopia",
    role: "Chief Marketing Officer",
    image: `${TEAM_IMAGE_BASE}/cath.webp`,
    facebook: "https://www.facebook.com/cath.enopia18",
  },
];

export const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867.54612029912!2d120.88400577592218!3d14.221333986248059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd81d654c7991b%3A0xc035de232aeaf5c7!2sJecaliha%20Builders%20Corporation!5e0!3m2!1sen!2sph!4v1774334689961!5m2!1sen!2sph";

export const PROJECT_CATEGORY_FILTERS = [
  "All",
  "Swimming Pool",
  "Cafe/ Consultancy",
  "Construction",
];