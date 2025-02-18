export type AlphabetItem = {
  letter: string;
  word: string;
  image: string;
  audioStart: number;
  audioEnd: number;
};

export const alphabetData: AlphabetItem[] = [
  {
    letter: "A",
    word: "Alligator",
    image: "/images/alphabet/alligator1.jpg",
    audioStart: 0,
    audioEnd: 3,
  },
  {
    letter: "B",
    word: "Bird",
    image: "images/alphabet/bird.jpg",
    audioStart: 4,
    audioEnd: 8,
  },

  { letter: "C",
    word: "Cat", 
    image: "images/alphabet/cat.jpg",
    audioStart: 8.5,
    audioEnd: 14,
  },
  { letter: "D", 
    word: "Dog", 
    image: "images/alphabet/dog.jpg",
    audioStart: 15,
    audioEnd: 18,
  },
  { letter: "E",
     word: "Elephant", 
     image: "images/alphabet/f1.jpg",
     audioStart: 19,
     audioEnd: 22,
    },
   { letter: "F", 
    word: "Frog", 
    image: "images/alphabet/frog1.jpg",
    audioStart: 23,
    audioEnd: 27,
  },
  { letter: "G",
     word: "Goose", 
     image: "images/alphabet/g.jpg",
     audioStart: 27.5,
     audioEnd: 32,
    },
  { letter: "H",
     word: "Horse",
      image: "images/alphabet/h.jpg",
      audioStart: 33,
      audioEnd: 36,
    },
  { letter: "I",
     word: "Iguana", 
     image: "images/alphabet/iguona.jpg",
     audioStart: 37,
     audioEnd: 40,
    },
  { letter: "J",
     word: "Jaguar", 
     image: "images/alphabet/j.jpg",
     audioStart: 41,
     audioEnd: 44,
    },
    { letter: "K",
       word: "Kangaroo", 
       image: "images/alphabet/k.jpg",
       audioStart: 45,
       audioEnd: 49,
      },
   { letter: "L",
     word: "Lion", 
     image: "images/alphabet/l.jpg",
     audioStart: 50,
     audioEnd: 54,
    },
  { letter: "M", 
    word: "Monkey", 
    image: "images/alphabet/m1.jpg",
    audioStart: 55,
    audioEnd: 59,
  },
  { letter: "N", 
    word: "Nightfish",
     image: "images/alphabet/n.jpg",
     audioStart: 60,
     audioEnd: 64,
    },
  { letter: "O",
     word: "Owl",
      image: "images/alphabet/o.jpg",
      audioStart: 64,
      audioEnd: 68,
    },
  { letter: "P",
     word: "Penguin",
      image: "images/alphabet/p.jpg",
      audioStart: 69,
      audioEnd: 73,
    },
   { letter: "Q",
     word: "Quil",
     image: "images/alphabet/q.jpg",
     audioStart: 74,
     audioEnd: 78,
    },
  { letter: "R", 
    word: "Rooster", 
    image: "images/alphabet/r.jpg",
    audioStart: 78,
    audioEnd: 83,
  },
  { letter: "S", 
    word: "Snake", 
    image: "images/alphabet/s.jpg",
    audioStart: 83,
    audioEnd: 88,
   },
  { letter: "T",
     word: "Tiger",
     image: "images/alphabet/t.jpg",
     audioStart: 88.5,
     audioEnd: 92,
    },
  { letter: "U",
     word: "Unicorn", 
     image: "images/alphabet/u.jpg",
     audioStart: 92.5,
     audioEnd: 96.5,
    },
  { letter: "V",
     word: "Vampire bat", 
     image: "images/alphabet/v.jpg",
    audioStart: 97.5,
    audioEnd: 101,
    },
  { letter: "W", 
    word: "Whale", 
    image: "images/alphabet/w.jpg",
    audioStart: 102,
    audioEnd: 107, 
  },
  { letter: "X",
     word: "Xray-fish", 
     image: "images/alphabet/x.jpg",
     audioStart: 108,
     audioEnd: 112,
    },
  { letter: "Y", 
    word: "Yak", 
    image: "images/alphabet/y.jpg",
    audioStart: 113,
    audioEnd: 117,
  },
  { letter: "Z", 
    word: "Zebra", 
    image: "images/alphabet/z.jpg",
    audioStart: 117,
    audioEnd: 122,
  }
];

export const ITEMS_PER_PAGE = 3;