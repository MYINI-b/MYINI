export interface API {
  id: number;
  name: string;
  url: string;
  method: string;
  code: number;
}
export interface CONTROLLER {
  name: string;
  desc: string;
  baseurl: string;
}

export interface PATHVARIABLES {
  key: '';
}
export interface QUERY {
  key: '';
  type: '';
}

export interface MOUSEPOS {
  x: number;
  y: number;
}

export interface ATTRIBUTE {
  name: string;
  type: string;
  isList: boolean;
  attr?: Array<ATTRIBUTE>;
}

export interface ATTRIBUTE_PLUS extends ATTRIBUTE {
  idx: number;
}
