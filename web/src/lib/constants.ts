const logos = {
  png: {
    128: "/images/Kafein128.png",
    256: "/images/Kafein256.png",
    512: "/images/Kafein512.png",
    1024: "/images/Kafein1024.png",
  },
  jpg: {
    128: "/images/Kafein128.jpg",
    256: "/images/Kafein256.jpg",
    512: "/images/Kafein512.jpg",
    1024: "/images/Kafein1024.jpg",
  },
};

export const images = {
  logos,
  hero: "/images/hero.png",
  matcha: "/images/matcha.png",
  classic: "/images/classic.png",
  banana_matcha: "/images/banana.png",
  strawberry_matcha: "/images/strawberry.png",
  blueberry_matcha: "/images/blueberry.png",
  about: "/images/about.jpg",
};

export const testimonials = [
  {
    name: "Emma T.",
    quote:
      "The best matcha latte I've ever had! Smooth, not bitter, and the perfect balance of flavors.",
    rating: 5,
  },
  {
    name: "Michael R.",
    quote:
      "Their Banana Cream matcha is amazing. The matcha is always fresh and ready to drink. ",
    rating: 5,
  },
  {
    name: "Sarah L.",
    quote:
      "As a matcha connoisseur, I'm impressed by the quality. You can taste the difference in their ceremonial grade.",
    rating: 5,
  },
];

export const products = [
  {
    id: "matcha",
    emoji: "",
    title: "Matcha Latte",
    price: 6.5,
    description:
      "Smooth and earthy Kanbayashi ceremonial-grade matcha, balanced with your choice of milk. Pure, simple, and timeless.",
    image: images.classic,
  },
  {
    id: "cloudy",
    emoji: "",
    title: "Cloudy Matcha Latte ",
    price: 7,
    description:
      "A dreamy matcha experience — layered with Kanbayashi matcha, your milk of choice, and crowned with a silky matcha foam cloud.",
    image: images.banana_matcha,
  },
  {
    id: "blueberry",
    emoji: "",
    title: "Blueberry Matcha Latte",
    price: 7,
    description:
      "Our signature matcha meets a vibrant house-made blueberry syrup, layered with your choice of milk for a fruity, energizing twist.",
    image: images.blueberry_matcha,
  },
  {
    id: "strawberry",
    emoji: "",
    title: "Strawberries & Cream Matcha Latte ",
    price: 7,
    description:
      "Bright, juicy homemade strawberry syrup swirled with Kanbayashi matcha, topped with a light strawberry cream foam. Sweet, creamy, and refreshing.",
    image: images.strawberry_matcha,
  },
];

export const socials = {
  instagram: "https://www.instagram.com/kafein.sj",
  instagram_handle: "@kafein.sj",
  tiktok: "https://www.tiktok.com/@kafein.sj",
  tiktok_handle: "@kafein.sj",
  linktree: "https://linktr.ee/kafein.sj",
  email: "sipkafein@gmail.com",
};

export const addons = [
  {
    id: "shot",
    title: "Matcha Shot",
    price: 1,
  },
  {
    id: "sweet",
    title: "Extra Sweetness",
    price: 0,
  },
  {
    id: "large",
    title: "Large 16oz",
    price: 1,
  },
];
