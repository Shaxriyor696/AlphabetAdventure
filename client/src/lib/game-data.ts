export type AlphabetItem = {
  letter: string;
  word: string;
  image: string;
};

export const alphabetData: AlphabetItem[] = [
  { letter: "A", word: "Apple", image: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa" },
  { letter: "B", word: "Balloon", image: "https://images.unsplash.com/photo-1541480601022-2308c0f02487" },
  { letter: "C", word: "Cat", image: "https://images.unsplash.com/photo-1503792070985-b4147d061915" },
  { letter: "D", word: "Dog", image: "https://images.unsplash.com/photo-1551546785-423f456af418" },
  { letter: "E", word: "Elephant", image: "https://images.unsplash.com/photo-1529265895721-65945a176cff" },
  { letter: "F", word: "Fish", image: "https://images.unsplash.com/photo-1499796683658-b659bc751db1" },
  { letter: "G", word: "Giraffe", image: "https://images.unsplash.com/photo-1519951529813-0c1a4fe5a82c" },
  { letter: "H", word: "House", image: "https://images.unsplash.com/photo-1511140973288-19bf21d7e771" },
  { letter: "I", word: "Ice Cream", image: "https://images.unsplash.com/photo-1519555535395-78608d9e7ec5" },
  { letter: "J", word: "Jellyfish", image: "https://images.unsplash.com/photo-1520529389463-866106188d86" }
];

// Using short sound effects encoded as base64 data URIs
const correctSoundBase64 = "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAABPAAfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f4CAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/+MYxAAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

const incorrectSoundBase64 = "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAABPAAfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f4CAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/+MYxAAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

export const correctSound = new Audio(correctSoundBase64);
export const incorrectSound = new Audio(incorrectSoundBase64);

export const ITEMS_PER_PAGE = 4;