import { FontFamily } from './types';

export const INITIAL_FONT_FAMILIES: FontFamily[] = [
  {
    id: 'ff1',
    prefix: 'heading',
    styles: [
      { id: 'fs1-1', fontSize: 48, fontStyle: 'normal', lineHeight: 56, fontWeight: 800, letterSpacing: -1 },
      { id: 'fs1-2', fontSize: 32, fontStyle: 'normal', lineHeight: 40, fontWeight: 700, letterSpacing: -0.5 },
      { id: 'fs1-3', fontSize: 24, fontStyle: 'normal', lineHeight: 32, fontWeight: 600, letterSpacing: -0.25 },
    ],
  },
  {
    id: 'ff2',
    prefix: 'body',
    styles: [
      { id: 'fs2-1', fontSize: 16, fontStyle: 'normal', lineHeight: 24, fontWeight: 400, letterSpacing: 0 },
      { id: 'fs2-2', fontSize: 14, fontStyle: 'normal', lineHeight: 20, fontWeight: 400, letterSpacing: 0.1 },
      { id: 'fs2-3', fontSize: 16, fontStyle: 'italic', lineHeight: 24, fontWeight: 400, letterSpacing: 0 },
    ],
  },
  {
    id: 'ff3',
    prefix: 'display',
    styles: [
        { id: 'fs3-1', fontSize: 80, fontStyle: 'normal', lineHeight: 88, fontWeight: 900, letterSpacing: -2 },
    ]
  }
];
