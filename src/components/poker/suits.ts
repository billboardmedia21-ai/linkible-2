/** Suit outlines, centred on the origin, roughly 34 units wide. */
export const SPADE =
  "M0 -15 C 9 -5 17 1 17 9 C 17 15 11 18 5.5 15 C 6.5 20 8.5 22.5 11 25 L -11 25 C -8.5 22.5 -6.5 20 -5.5 15 C -11 18 -17 15 -17 9 C -17 1 -9 -5 0 -15 Z";
export const HEART = "M0 17 C -24 -1 -16 -19 0 -7 C 16 -19 24 -1 0 17 Z";
export const DIAMOND = "M0 -18 L 12 0 L 0 18 L -12 0 Z";
export const CLUB =
  "M0 -17 C -8 -17 -12 -8 -6 -3 C -13 -5 -20 2 -15 9 C -10 14 -4 11 -1.5 8 C -1.5 14 -3.5 18 -7 23 L 7 23 C 3.5 18 1.5 14 1.5 8 C 4 11 10 14 15 9 C 20 2 13 -5 6 -3 C 12 -8 8 -17 0 -17 Z";

export const SUIT_PATH = { spade: SPADE, heart: HEART, diamond: DIAMOND, club: CLUB } as const;
export type Suit = keyof typeof SUIT_PATH;
