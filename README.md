# myINI : (부)가제

(자바 + 리액트)

일렉트론을 통해 **웹앱**으로 제작

## 🛒쇼핑카트

- 지라

## 기능

### 1. 요구사항명세, ERD, API명세

- 서로의 연결성 확보방안
- 요구사항명세
    - 명확한 과정과 표준을 통해 명세서 작성
    - 지라와의 연결 확인
- ERD
    - 자체제작
    - 연관관계, 컬럼특성 등 설정가능
- API명세
    - 명확한 과정과 표준을 통해 명세서 작성
    - Dto를 꼭 써야함
    - 이를 토대로 이니셜라이징 시작

[📋시장조사📋](https://www.notion.so/34f5f90b86384df39e03537e28fc4c8d)

### 2. CRUD 자동생성, 기본 웹개발 코딩 작성

- 스프링, 리액트 프로젝트 생성
    - 스프링
        - Maven / Gradle
        - 스프링 / 자바 버젼
        - 프로젝트 패키지이름
        - Jar/War
        - 디펜던시
    - 리액트
        - create-react-app / typescript
        - 프로젝트 패키지이름
        - ESLint/Prettier
        - redux
        - react router
- ERD 작성 ([https://knowhow.visual-paradigm.com/openapi/er-diagram/](https://knowhow.visual-paradigm.com/openapi/er-diagram/))
    - 엔티티 이름 설정.
    - 컬럼 이름, 조건 설정.
    - 엔티티 연관관계 설정.
    - → 시각적인 방법 좀 더 구상
    - 엔티티별 CRUD선택(Dto가 필요한 요청에서는 요청조건 설정)
    - 엔티티,컬럼단위의 추가/수정/삭제
- 스프링부트 MVC패턴 구조화
    - 위의 조건들을 통해 엔티티/레포지토리/서비스/컨트롤러/dto 생성
- 리액트 스토어 패턴 구조화
    - 위의 조건들을 통해 Axios요청 → 상태관리 저장코드 생성
- api원터치테스트

[기능 명세](https://www.notion.so/1d9ac0c832e749a3b4563bf025aef0f3)