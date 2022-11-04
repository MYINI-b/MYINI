export interface API {
  id: number;
  apiName: string;
  desc: string;
  methodName: string;
  url: string;
  method: string;
  code: number;
  reqVarName: string;
  resVarName: string;
  pathVarList: QUERY[];
  queryList: QUERY[];
}
export interface CONTROLLER {
  name: string;
  desc: string;
  baseurl: string;
}

export interface QUERY {
  key: string;
  type: string;
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
