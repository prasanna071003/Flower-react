import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db.js";
import User from "../models/User.js";
import Flower from "../models/Flower.js";

dotenv.config();

const ADMIN_EMAIL = "admin@crimsonbloom.com";
const ADMIN_TEMP_PASSWORD = "NoorBloom@2026!";

const FLOWERS = [
  {
    name: "Velvet Wine Roses",
    category: "roses",
    price: 1899,
    compareAtPrice: 2199,
    meta: "Dozen, hand-tied",
    description:
      "A dozen deep-wine garden roses, hand-tied with eucalyptus and wrapped in kraft paper. Our most-requested everyday arrangement — equally at home on a desk or a dinner table.",
    image: "/images/inside.jpg",
    badge: "Bestseller",
    featured: true,
    tags: ["Dozen (12 stems)", "Same-day delivery", "Vase optional"],
    details:
      "Includes 12 wine-red garden roses, seeded eucalyptus, and a hidden water source at the stems. Wrapped, not boxed, so it arrives ready to place straight into a vase.",
    care: "Trim stems at an angle every two days, change the water, and keep away from direct heat or fruit bowls. With care, blooms typically last 6—8 days.",
    delivery:
      "Order before 3pm for delivery today within city limits. Choose a preferred time slot at checkout — our rider will call ahead 30 minutes before arrival.",
    reviews: 214,
  },
  {
    name: "Blush Tulip Bunch",
    category: "seasonal",
    price: 1249,
    meta: "Seasonal, 15 stems",
    description:
      "Fifteen blush tulips gathered into a soft, romantic bunch. A gentle favourite for birthdays, thank-yous, and quiet celebrations at home.",
    image: "/images/inside3.jpg",
    featured: true,
    tags: ["15 stems", "Seasonal", "Gift wrapped"],
    details:
      "Includes 15 blush tulips with seasonal foliage, hand-tied and wrapped in ivory paper with a natural raffia ribbon.",
    care: "Keep in cool, fresh water, trim stems at an angle every two days, and keep away from direct sunlight. Tulips typically last 5—7 days.",
    delivery:
      "Order before 3pm for same-day delivery within city limits. Choose a preferred time slot at checkout — our rider will call ahead 30 minutes before arrival.",
    reviews: 132,
  },
  {
    name: "Ivory Peony Jar",
    category: "bouquets",
    price: 2450,
    meta: "Limited season",
    description:
      "Lush ivory peonies arranged in a stoneware jar. A limited-season centrepiece that brings a quiet, editorial elegance to sideboards and dining tables.",
    image: "/images/inside5.jpg",
    badge: "New",
    featured: true,
    tags: ["Ceramic jar included", "Limited season", "Statement piece"],
    details:
      "Includes a full bunch of ivory peonies styled in a reusable stoneware jar, with foliage tucked to frame the blooms.",
    care: "Top up the jar with cool water every two days and keep away from ripening fruit. Peonies typically last 5—7 days once open.",
    delivery:
      "Peonies are subject to seasonal availability — order early to secure your date. Delivered by hand within city limits; our rider will call ahead 30 minutes before arrival.",
    reviews: 87,
  },
  {
    name: "Midnight Orchid Stem",
    category: "roses",
    price: 899,
    meta: "Single statement stem",
    description:
      "A single dark orchid stem with sculptural lines. Understated, architectural, and remarkably long-lasting — ideal for desks and console styling.",
    image: "/images/inside6.jpg",
    featured: true,
    tags: ["Single stem", "Long-lasting", "Minimal styling"],
    details:
      "Includes one premium orchid stem presented in living hydration, ready to place in your own vessel or ours.",
    care: "Mist lightly every few days and keep out of direct sun. Orchids typically hold their bloom for 14—21 days.",
    delivery:
      "Order before 3pm for same-day delivery within city limits. Choose a preferred time slot at checkout — our rider will call ahead 30 minutes before arrival.",
    reviews: 64,
  },
  {
    name: "Bridal Lily Cascade",
    category: "weddings",
    price: 4200,
    meta: "Made to order",
    description:
      "A cascading bridal bouquet of lilies and trailing greenery, made to order for your ceremony. Designed with your palette, ribbons, and proportions in mind.",
    image: "/images/inside9.png",
    tags: ["Bridal", "Made to order", "Palette consultation"],
    details:
      "Made to order after a short consultation on palette, size, and ribbon. Includes coordinated stem wrapping and a keepsake box.",
    care: "Delivered in living hydration on the morning of your event. Keep in a cool room and mist lightly before the ceremony.",
    delivery:
      "Wedding orders are scheduled at least 7 days in advance. We deliver on the morning of your event and coordinate timing with your planner.",
    reviews: 41,
  },
  {
    name: "Wine Leaf Potted Plant",
    category: "plants",
    price: 1050,
    meta: "Low maintenance",
    description:
      "A deep-toned foliage plant in a matte ceramic pot. Effortlessly handsome and low maintenance — a thoughtful gift that outlasts the occasion.",
    image: "/images/inside2.png",
    tags: ["Ceramic pot included", "Low maintenance", "Air purifying"],
    details:
      "Includes the potted plant in a matte ceramic pot with a care card for light, watering, and feeding.",
    care: "Water when the top inch of soil feels dry, and place in bright, indirect light. Feed monthly for best growth.",
    delivery:
      "Delivered by hand within city limits to prevent bruising. Our rider will call ahead 30 minutes before arrival.",
    reviews: 58,
  },
  {
    name: "Sunlit Daisy Mix",
    category: "bouquets",
    price: 749,
    meta: "Everyday bunch",
    description:
      "A cheerful mix of daisies and seasonal fillers, gathered fresh each morning. Simple, sunny, and made for no reason at all.",
    image: "/images/inside4.jpg",
    tags: ["Everyday price", "Seasonal mix", "Gift wrapped"],
    details:
      "Includes a generous bunch of daisies with seasonal filler flowers, hand-tied and wrapped in kraft paper.",
    care: "Change the water daily, trim stems at an angle, and keep in a cool spot. Daisies typically last 5—7 days.",
    delivery:
      "Order before 3pm for same-day delivery within city limits. Choose a preferred time slot at checkout — our rider will call ahead 30 minutes before arrival.",
    reviews: 176,
  },
  {
    name: "Ceremony Arch Flowers",
    category: "weddings",
    price: 18000,
    priceFrom: true,
    meta: "Quote on request",
    description:
      "Full-service ceremony arch florals, installed and styled on site. Designed around your venue, palette, and season with a dedicated florist.",
    image: "/images/inside9.png",
    badge: "Event",
    tags: ["On-site installation", "Custom palette", "Dedicated florist"],
    details:
      "Priced from ₹18,000 depending on arch size, stem counts, and season. Includes design consultation, on-site installation, and post-event breakdown.",
    care: "Installed and monitored by our team on the day of your event so the blooms look their best from the first guest to the last.",
    delivery:
      "Event installations are scheduled at least 14 days in advance and delivered directly to your venue by our installations team.",
    reviews: 23,
  },
];

async function seed() {
  await connectDB();

  if (mongoose.connection.readyState !== 1) {
    console.error("[seed] No MongoDB connection — set MONGO_URI in backend/.env and try again.");
    process.exit(1);
  }

  const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
  if (existingAdmin) {
    console.log(`[seed] Admin already exists: ${ADMIN_EMAIL} (unchanged)`);
  } else {
    await User.create({
      firstName: "Noor",
      lastName: "Bloom",
      email: ADMIN_EMAIL,
      phone: "+91 90000 00000",
      password: ADMIN_TEMP_PASSWORD,
      role: "admin",
    });
    console.log(`[seed] Admin created: ${ADMIN_EMAIL} (password bcrypt-hashed)`);
  }

  const flowerCount = await Flower.countDocuments();
  if (flowerCount > 0) {
    console.log(`[seed] Flowers already present: ${flowerCount} (unchanged)`);
  } else {
    const created = await Flower.create(FLOWERS);
    console.log(`[seed] Flowers created: ${created.length}`);
  }

  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error(`[seed] Failed: ${err.message}`);
  process.exit(1);
});
