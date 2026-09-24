/**
 * Curated editorial imagery. All photos are from Unsplash under the Unsplash License
 * (free for commercial use, no attribution required — credited here anyway).
 * None show another fragrance brand's label.
 */
export type Media = {
  src: string;
  width: number;
  height: number;
  alt: string;
  credit: string;
};

const unsplash = (id: string, width: number, height: number, alt: string, credit: string): Media => ({
  src: `https://images.unsplash.com/${id}`,
  width,
  height,
  alt,
  credit,
});

export const media = {
  goldenFlaconSilk: unsplash(
    "photo-1733660227163-01bc46e0d7d7",
    2586,
    4596,
    "A golden round flacon resting on ivory silk",
    "Simply Mersah",
  ),
  flaconShadow: unsplash(
    "photo-1733660227168-444e3c751a1e",
    2586,
    4596,
    "A square amber flacon beaded with droplets, casting a long shadow",
    "Simply Mersah",
  ),
  pipette: unsplash(
    "photo-1709662217659-c7966220219f",
    3962,
    5943,
    "A glass pipette releasing a single drop into an amber flacon",
    "Fulvio Ciccolo",
  ),
  pipetteWide: unsplash(
    "photo-1709666414115-47ecd5143293",
    5660,
    3773,
    "A perfumer's pipette above an amber flacon in the atelier",
    "Fulvio Ciccolo",
  ),
  pour: unsplash(
    "photo-1602928355784-b05f7a78b842",
    3392,
    3680,
    "A gloved hand pouring a thread of golden essence",
    "Fulvio Ciccolo",
  ),
  vials: unsplash(
    "photo-1708721800786-ade594b2c14a",
    7599,
    4755,
    "Rows of amber vials glowing in warm light",
    "Dmitrii E.",
  ),
  bergamot: unsplash(
    "photo-1617442775153-a695a37cad2f",
    4000,
    6000,
    "A single bergamot on a dark surface",
    "an_vision",
  ),
  darkBloom: unsplash(
    "photo-1623183074617-90611646e4ca",
    3121,
    4682,
    "A dusky pink bloom scattering petals into darkness",
    "micheile henderson",
  ),
  bakhoor: unsplash(
    "photo-1684039568465-24c31d0cc80f",
    3376,
    6000,
    "Oud smoke rising from a carved bakhoor burner",
    "Miftah Dudung",
  ),
  smoke: unsplash(
    "photo-1536405416754-3bcd4fb38128",
    3456,
    5184,
    "A ribbon of smoke curling against black",
    "Thomas Stephan",
  ),
  silk: unsplash(
    "photo-1705674337411-3b89e5afcc11",
    8456,
    4739,
    "Folds of black silk",
    "Leo Chen",
  ),
  blossom: unsplash(
    "photo-1518343265568-51eec52d40da",
    4565,
    3264,
    "Pale blossoms against deep foliage",
    "Annie Spratt",
  ),
  rose: unsplash(
    "photo-1518931479438-62470470be9a",
    5250,
    3750,
    "A deep red rose among dark leaves",
    "Joshua Harris",
  ),
} satisfies Record<string, Media>;
