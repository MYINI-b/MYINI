export interface ELEMENTPOS {
  x: number;
  y: number;
  width: number;
}

export interface ROW {
  id: number;
  category?: CATEGORY;
  requirement: string;
  description: string;
  division: string;
  manager: string;
  importance: number;
  point: number;
}

export interface CATEGORY {
  name: string;
  color: string;
  id?: number;
}
