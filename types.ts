export interface FontStyle {
  id: string;
  fontSize: number;
  fontStyle: 'normal' | 'italic';
  lineHeight: number;
  fontWeight: number;
  letterSpacing: number;
}

export interface FontFamily {
  id:string;
  prefix: string;
  styles: FontStyle[];
}
