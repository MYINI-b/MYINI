// api 상세 type
export interface API {
  responses: RESPONSE;
  pathVarList: QUERY[];
  queryList: QUERY[];
  dtoResponse: DTO[];
}

export interface RESPONSE {
  id: number;
  apiName: string;
  methodName: string;
  url: string;
  method: string;
  code: number;
}

export interface CONTROLLER {
  id: number;
  name: string;
  desc: string;
  baseurl: string;
  responses: RESPONSE[];
}

export interface QUERY {
  id?: number;
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

export interface DTO {
  id: number;
  name: string;
  type: string;
  responses: DTO_RESPONSE[];
}

export interface DTO_RESPONSE {
  id: number;
  name: string;
  classTypeId: number;
  primitiveTypeId: number;
  classTypeName: string;
  primitiveTypeName: string;
  isList: boolean;
}
