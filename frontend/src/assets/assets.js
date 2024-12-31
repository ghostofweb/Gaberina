import p_img1 from './p_img1.png'
import p_img2_1 from './p_img2_1.png'
import p_img2_2 from './p_img2_2.png'
import p_img2_3 from './p_img2_3.png'
import p_img2_4 from './p_img2_4.png'
import p_img2 from './p_img2.png'
import p_img3 from './p_img3.png'
import p_img4 from './p_img4.png'
import p_img5 from './p_img5.png'
import p_img6 from './p_img6.png'
import p_img7 from './p_img7.png'
import p_img8 from './p_img8.png'
import p_img9 from './p_img9.png'
import p_img10 from './p_img10.png'
import p_img11 from './p_img11.png'
import p_img12 from './p_img12.png'
import p_img13 from './p_img13.png'
import p_img14 from './p_img14.png'
import p_img15 from './p_img15.png'
import p_img16 from './p_img16.png'
import p_img17 from './p_img17.png'
import p_img18 from './p_img18.png'
import p_img19 from './p_img19.png'
import p_img20 from './p_img20.png'
import p_img21 from './p_img21.png'
import p_img22 from './p_img22.png'
import p_img23 from './p_img23.png'
import p_img24 from './p_img24.png'
import p_img25 from './p_img25.png'
import p_img26 from './p_img26.png'
import p_img27 from './p_img27.png'
import p_img28 from './p_img28.png'
import p_img29 from './p_img29.png'
import p_img30 from './p_img30.png'
import p_img31 from './p_img31.png'
import p_img32 from './p_img32.png'
import p_img33 from './p_img33.png'
import p_img34 from './p_img34.png'
import p_img35 from './p_img35.png'
import p_img36 from './p_img36.png'
import p_img37 from './p_img37.png'
import p_img38 from './p_img38.png'
import p_img39 from './p_img39.png'
import p_img40 from './p_img40.png'
import p_img41 from './p_img41.png'
import p_img42 from './p_img42.png'
import p_img43 from './p_img43.png'
import p_img44 from './p_img44.png'
import p_img45 from './p_img45.png'
import p_img46 from './p_img46.png'
import p_img47 from './p_img47.png'
import p_img48 from './p_img48.png'
import p_img49 from './p_img49.png'
import p_img50 from './p_img50.png'
import p_img51 from './p_img51.png'
import p_img52 from './p_img52.png'
import gaberina from './gaberina.png'
import contactImage from './image.png'
import image from './image.jpg'
import image2 from './image2.jpg'
import image3 from './image3.jpg'
import logo from './logo.png'
import logo2 from './logo2.png'
import hero_img from './hero_img.png'
import cart_icon from './cart_icon.png'
import bin_icon from './bin_icon.png'
import dropdown_icon from './dropdown_icon.png'
import exchange_icon from './exchange_icon.png'
import profile_icon from './profile_icon.png'
import quality_icon from './quality_icon.png'
import search_icon from './search_icon.png'
import star_dull_icon from './star_dull_icon.png'
import star_icon from './star_icon.png'
import support_img from './support_img.png'
import menu_icon from './menu_icon.png'
import about_img from './about_img.png'
import contact_img from './contact_img.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import cross_icon from './cross_icon.png'

export const assets = {
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_img,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon,
    image,
    image2,
    image3,
    logo2,
    p_img19,
    gaberina,
    contactImage
}

export const products = [
    {
        id: "aaaa",
        name: "Mystic Rose",
        description:
          "A luxurious floral fragrance with hints of rose, jasmine, and a subtle touch of vanilla, perfect for an elegant evening.",
        price: {
          "50ml": 3250,
          "100ml": 4250,
        },
        image: [p_img1, p_img2, p_img3, p_img4],
        category: "Oil",
        subCategory: "Floral",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["Rose", "Jasmine", "Vanilla"],
        date: 1716634345448,
        bestseller: true,
      },
      {
        id: "aaab",
        name: "Golden Oud",
        description:
          "An intense, rich scent featuring oud wood, amber, and a hint of citrus, perfect for those who love deep, woody fragrances.",
        price: {
          "50ml": 5850,
          "100ml": 7650,
        },
        image: [p_img2],
        category: "Oil",
        subCategory: "Oud",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["Oud", "Amber", "Citrus"],
        date: 1716634345449,
        bestseller: false,
      },
      {
        id: "aaac",
        name: "Citrus Blossom",
        description:
          "A refreshing, zesty fragrance with notes of lemon, orange blossom, and a touch of musk, perfect for daytime wear.",
        price: {
          "50ml": 2600,
          "100ml": 3400,
        },
        image: [p_img3],
        category: "Oil",
        subCategory: "Citrus",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["Lemon", "Orange Blossom", "Musk"],
        date: 1716634345450,
        bestseller: true,
      },
      {
        id: "aaad",
        name: "Midnight Leather",
        description:
          "A bold fragrance with smoky leather, tobacco, and spicy notes, ideal for those who prefer a daring scent.",
        price: {
          "50ml": 4550,
          "100ml": 5950,
        },
        image: [p_img4],
        category: "Oil",
        subCategory: "Leather",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["Leather", "Tobacco", "Spice"],
        date: 1716634345451,
        bestseller: false,
      },
      {
        id: "aaae",
        name: "Amber Noir",
        description:
          "A sophisticated, warm fragrance blending amber, sandalwood, and a hint of patchouli, perfect for evening wear.",
        price: {
          "50ml": 5200,
          "100ml": 6800,
        },
        image: [p_img5],
        category: "Oil",
        subCategory: "Amber",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["Amber", "Sandalwood", "Patchouli"],
        date: 1716634345452,
        bestseller: true,
      },
      {
        id: "aaaf",
        name: "Eau De Luxe",
        description:
          "A refined scent with fresh citrus notes, violet, and a hint of patchouli, creating a balanced fragrance that’s both vibrant and sophisticated.",
        price: {
          "50ml": 3900,
          "100ml": 5100,
        },
        image: [p_img6],
        category: "Oil",
        subCategory: "Citrus",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["Citrus", "Violet", "Patchouli"],
        date: 1716634345453,
        bestseller: true,
      },
      {
        id: "aaag",
        name: "Vanilla Amber",
        description:
          "A warm and comforting fragrance featuring sweet vanilla and rich amber, perfect for a cozy evening or special occasion.",
        price: {
          "50ml": 4160,
          "100ml": 5440,
        },
        image: [p_img7],
        category: "Oil",
        subCategory: "Vanilla",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["Vanilla", "Amber", "Sandalwood"],
        date: 1716634345454,
        bestseller: false,
      },
      {
        id: "aaah",
        name: "Tropical Breeze",
        description:
          "A light, fruity fragrance with notes of coconut, pineapple, and mango, perfect for warm, sunny days.",
        price: {
          "50ml": 2340,
          "100ml": 3060,
        },
        image: [p_img8],
        category: "Oil",
        subCategory: "Fruity",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["Coconut", "Pineapple", "Mango"],
        date: 1716634345455,
        bestseller: true,
      },
      {
        id: "aaai",
        name: "Spice Noir",
        description:
          "A warm, spicy fragrance with hints of cinnamon, clove, and black pepper, perfect for the cooler months.",
        price: {
          "50ml": 4810,
          "100ml": 6290,
        },
        image: [p_img9],
        category: "Oil",
        subCategory: "Spicy",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["Cinnamon", "Clove", "Black Pepper"],
        date: 1716634345456,
        bestseller: false,
      },
      {
        id: "aaaj",
        name: "Charming Musk",
        description:
          "A seductive blend of white musk, jasmine, and lily of the valley, creating a fragrance that is both clean and alluring.",
        price: {
          "50ml": 3640,
          "100ml": 4760,
        },
        image: [p_img10],
        category: "Oil",
        subCategory: "Musk",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["White Musk", "Jasmine", "Lily of the Valley"],
        date: 1716634345457,
        bestseller: true,
      },
      {
        id: "aaak",
        name: "Ocean Mist",
        description:
          "A refreshing aquatic fragrance with notes of sea salt, driftwood, and a hint of citrus, evoking the serenity of the ocean.",
        price: {
          "50ml": 2990,
          "100ml": 3890,
        },
        image: [p_img11],
        category: "Oil",
        subCategory: "Aquatic",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["Sea Salt", "Driftwood", "Citrus"],
        date: 1716634345458,
        bestseller: false,
      },
      {
        id: "aaal",
        name: "Velvet Orchid",
        description:
          "A delicate and sensual blend of orchid, bergamot, and sandalwood, perfect for creating a sophisticated aura.",
        price: {
          "50ml": 3480,
          "100ml": 4520,
        },
        image: [p_img12],
        category: "Perfume",
        subCategory: "Floral",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["Orchid", "Bergamot", "Sandalwood"],
        date: 1716634345459,
        bestseller: true,
      },
      {
        id: "aaam",
        name: "Noir Patchouli",
        description:
          "An exotic and captivating scent with earthy patchouli, smoky vetiver, and a touch of black pepper.",
        price: {
          "50ml": 4680,
          "100ml": 6120,
        },
        image: [p_img13],
        category: "Perfume",
        subCategory: "Earthy",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["Patchouli", "Vetiver", "Black Pepper"],
        date: 1716634345460,
        bestseller: false,
      },
      {
        id: "aaan",
        name: "Cedar Haven",
        description:
          "A warm and woody fragrance with cedarwood, amber, and a hint of vanilla, creating a cozy and inviting aroma.",
        price: {
          "50ml": 4370,
          "100ml": 5720,
        },
        image: [p_img14],
        category: "Perfume",
        subCategory: "Woody",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["Cedarwood", "Amber", "Vanilla"],
        date: 1716634345461,
        bestseller: true,
      },
      {
        id: "aaao",
        name: "Sapphire Breeze",
        description:
          "A vibrant and energizing fragrance with blue lotus, bergamot, and aquatic notes, ideal for a fresh start to the day.",
        price: {
          "50ml": 3120,
          "100ml": 4050,
        },
        image: [p_img15],
        category: "Perfume",
        subCategory: "Fresh",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["Blue Lotus", "Bergamot", "Aquatic Notes"],
        date: 1716634345462,
        bestseller: false,
      },
      {
        id: "aaap",
        name: "Velvet Noir",
        description:
          "A dark and luxurious fragrance blending smoky leather, sweet tonka bean, and deep spices for a bold finish.",
        price: {
          "50ml": 4940,
          "100ml": 6450,
        },
        image: [p_img16],
        category: "Perfume",
        subCategory: "Spicy",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["Leather", "Tonka Bean", "Spices"],
        date: 1716634345463,
        bestseller: true,
      },
      {
        id: "aaaq",
        name: "Summer Bloom",
        description:
          "A light and cheerful floral fragrance with peony, gardenia, and a hint of citrus, ideal for a sunny day.",
        price: {
          "50ml": 2750,
          "100ml": 3570,
        },
        image: [p_img17],
        category: "Perfume",
        subCategory: "Floral",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["Peony", "Gardenia", "Citrus"],
        date: 1716634345464,
        bestseller: false,
      },
      {
        id: "aaar",
        name: "Twilight Amber",
        description:
          "A sultry and warm scent with amber, musk, and a touch of exotic spices, perfect for a romantic evening.",
        price: {
          "50ml": 4730,
          "100ml": 6180,
        },
        image: [p_img18],
        category: "Perfume",
        subCategory: "Amber",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["Amber", "Musk", "Spices"],
        date: 1716634345465,
        bestseller: true,
      },
      {
        id: "aaas",
        name: "Fruity Bliss",
        description:
          "A playful and juicy fragrance with notes of raspberry, apple, and pear, creating a delightful fruity blend.",
        price: {
          "50ml": 2860,
          "100ml": 3710,
        },
        image: [p_img19],
        category: "Perfume",
        subCategory: "Fruity",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["Raspberry", "Apple", "Pear"],
        date: 1716634345466,
        bestseller: false,
      },
      {
        id: "aaat",
        name: "Midnight Bloom",
        description:
          "A captivating floral blend with notes of tuberose, ylang-ylang, and white jasmine, evoking the mystery of the night.",
        price: {
          "50ml": 3260,
          "100ml": 4230,
        },
        image: [p_img20],
        category: "Perfume",
        subCategory: "Floral",
        sizes: ["50ml", "100ml"],
        fragranceNotes: ["Tuberose", "Ylang-Ylang", "White Jasmine"],
        date: 1716634345467,
        bestseller: false,
      },
];

  
