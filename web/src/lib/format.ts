const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatINR = (amount: number) => inr.format(amount);

/** Smallest size and its price, e.g. { size: "50ml", price: 3250 } */
export function startingPrice(price: Record<string, number>) {
  const entries = Object.entries(price);
  if (entries.length === 0) return null;
  const [size, amount] = entries.reduce((min, cur) => (cur[1] < min[1] ? cur : min));
  return { size, price: amount };
}
