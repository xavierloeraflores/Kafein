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
  hero: "/images/matcha.png",
  matcha: "/images/matcha.png",
  banana_matcha: "/images/matcha.png",
  strawberry_matcha: "/images/matcha.png",
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
    emoji: "🍵",
    title: "Iced Matcha Latte",
    price: "$4.95",
    description:
      "Our signature iced drink made with ceremonial grade matcha and your choice of silky milk, served over ice for a smooth, refreshing boost.",
    image: images.matcha,
  },
  {
    emoji: "🍌",
    title: "Banana Cream Matcha Latte",
    price: "$5.45",
    description:
      "A rich and creamy blend of matcha, banana, and vanilla bean, perfectly balanced for a smooth and naturally sweet latte experience.",
    image: images.banana_matcha,
  },
  {
    emoji: "🍓",
    title: "Strawberry & Cream Matcha Latte",
    price: "$5.95",
    description:
      "A luscious fusion of matcha, real strawberries, and velvety cream, creating a fruity and vibrant twist on the classic latte.",
    image: images.strawberry_matcha,
  },
];
