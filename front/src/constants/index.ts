import Jira from 'assets/jira.png';

export const API_METHOD = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export const PATHVARIABLE_TYPE = ['NORMAL', 'Long', 'Integer'];

export const DATATYPE = [
  'String',
  'Integer',
  'Long',
  'Double',
  'Float',
  'LocalDateTime',
  'Character',
  'Boolean',
  'Short',
  'Byte',
];

export const LINK_LIST = [
  {
    img: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
    name: 'github',
  },
  {
    img: Jira,
    name: 'Jira',
  },
  {
    img: 'https://img.icons8.com/ios/500/notion.png',
    name: 'notion',
  },
  {
    img: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png',
    name: 'figma',
  },
];

export const DIVISION_LIST = ['FE', 'BE', '공통'];

export const IMPORTANCE_LIST = [1, 2, 3, 4, 5];

export const IMPORTANCE_TEXT = [
  '',
  '매우 높음',
  '높음',
  '중간',
  '낮음',
  '매우 낮음',
];
