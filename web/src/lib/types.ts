/** Mirrors backend/models/productModel.js */
export type Product = {
  _id: string;
  name: string;
  description: string;
  /** Price in INR keyed by size, e.g. { "50ml": 3250, "100ml": 4250 } */
  price: Record<string, number>;
  image: string[];
  category: string;
  subCategory: string;
  fragranceNotes: string[];
  sizes: string[];
  bestseller: boolean;
  date: number;
};
