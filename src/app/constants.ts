export interface Vec2 {
  x: number;
  y: number;
}

export enum Directions {
  None,
  Left,
  Right,
  Up,
  Down,
}

export const NUM_TILES: number = 21;
export const TILE_SIZE: number = 20;
export const SPACING: number = 2;

export const STARTING_POSITION: Vec2 = { x: 10, y: 10 };

export const EMPTY_TILE_COLOR = '#151D3B';
export const SPACING_COLOR = '#DADBBD';
export const SNAKE_COLOR = '#6EBF8B';
export const APPLE_COLOR = '#D82148';

export const KEY_DIRECTION_MAP: Map<string, Directions> = new Map<
  string,
  Directions
>([
  ['a', Directions.Left],
  ['d', Directions.Right],
  ['w', Directions.Up],
  ['s', Directions.Down],
  ['A', Directions.Left],
  ['D', Directions.Right],
  ['W', Directions.Up],
  ['S', Directions.Down],
  ["ArrowLeft", Directions.Left],
  ["ArrowRight", Directions.Right],
  ["ArrowUp", Directions.Up],
  ["ArrowDown", Directions.Down],
]);
