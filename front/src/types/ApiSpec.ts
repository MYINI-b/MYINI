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
  desc?: string;
}

export interface CONTROLLER {
  id: number;
  name: string;
  desc: string;
  baseurl: string;
  responses: RESPONSE[];
}

export interface QUERY {
  id: number;
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
  dtoId: number;
  dtoName: string;
  dtoType: string;
  dtoItemResponses: DTO_RESPONSE[];
  dtoIsList?: boolean;
}

export interface DTO_RESPONSE {
  dtoItemId: number;
  dtoItemName: string;
  dtoClassTypeId?: number | null;
  dtoPrimitiveTypeId?: number | null;
  dtoClassTypeName?: string;
  dtoPrimitiveTypeName?: string;
  dtoIsList: boolean;
}

export interface EDITOR {
  id: number;
  space: string;
  img: string;
  name: string;
}
