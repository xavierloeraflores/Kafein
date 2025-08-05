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
    title: "Iced Matcha Latte",
    price: 6.5,
    description:
      "Our signature iced drink made with ceremonial grade matcha and your choice of silky milk, served over ice for a smooth, refreshing boost.",
    image: images.classic,
  },
  {
    id: "banana",
    emoji: "",
    title: "Banana Cream Matcha Latte",
    price: 7,
    description:
      "A rich and creamy blend of matcha, banana, and vanilla bean, perfectly balanced for a smooth and naturally sweet latte experience.",
    image: images.banana_matcha,
  },
  {
    id: "blueberry",
    emoji: "",
    title: "Blueberry Matcha Latte",
    price: 7,
    description:
      "A vibrant blend of ceremonial matcha and our house-made organic blueberry jam, crafted to deliver a rich, fruity latte.",
    image: images.blueberry_matcha,
  },
  {
    id: "strawberry",
    emoji: "",
    title: "Strawberry Matcha Latte",
    price: 7,
    description:
      "A luscious fusion of matcha, real strawberries, and velvety cream, creating a fruity and vibrant twist on the classic latte.",
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
