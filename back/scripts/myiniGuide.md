- myINI에는 프로젝트 기획에 필요한 다양한 기능들이 있습니다.
- **동시편집 기능**을 제공하여 더 확실한 협업서비스를 제공합니다.
---

## 요구사항 명세서 with JIRA

지라에 이슈를 등록하기 위해서, **myINI 프로젝트와 JIRA 연동이 필요**합니다. 이에 관한 사용 가이드를 참고해주세요.

### 지라이메일 등록

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/65422786-92e7-4930-93b8-5c014b60a4d5/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/89513f98-a227-4c55-9973-1de03e3734b4/Untitled.png)

### 프로젝트의 연동

![api등록1.PNG](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/11f009ab-d777-4156-b1bb-0dfe17e79eb8/api%EB%93%B1%EB%A1%9D1.png)

![api등록2.PNG](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/66a51ddb-b01f-43b0-9b29-f4acef3a8f6c/api%EB%93%B1%EB%A1%9D2.png)


![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9cf5ef44-db7a-4dd7-afd5-5d9a06a14a26/Untitled.png)

### 요구사항 명세서 - 지라 스토리 매핑사항

|**요구사항명세서**|**Jira 스토리**|
|:-----------:|:----------:|
|카테고리|에픽|
|요구사항명|제목|
|요구사항내용|내용|
|구분|제목|
|담당자|보고자 & 책임자|
|중요도|우선순위|
|포인트|스토리포인트|
---

## E-R 다이어그램

서비스 요구사항 기획에 따라 E-R Diagram(개체-관계 다이어그램)을 생성할 수 있습니다.

만들어진 ERD정보를 바탕으로  해당 프로젝트의 Domain(Entity, Repository)이 생성됩니다.

**💡 myINI는 프로젝트를 이니셜라이징 할 때, Database는 MySQL과 JPA를 기준으로 생성됩니다.**


### 테이블

- 우클릭 후 “New Table”을 클릭해 테이블 생성
- Pascal Case로 테이블명 작성

  ![테이블.PNG](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b0c0fcea-5826-4872-a9b7-66946944feea/%ED%85%8C%EC%9D%B4%EB%B8%94.png)


### 컬럼

- Snake Case로 컬럼명 작성

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/efcd08dc-fb3e-47b3-86db-d3906f351270/Untitled.png)

### 제약조건

- Not Null, Unique, Default, Auto Increment 제공
- 우클릭 후 “Primary Key”를 클릭해 PK 지정

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8d8bdd44-31cf-48b1-9edb-fc606815e2b7/Untitled.png)

### 연관관계

- 우클릭 후 “Relationship”를 클릭해 연관관계 설정
- 연관짓는 테이블과 연관되는 테이블 클릭 후 관계설정

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a451e400-0bdc-4803-bb23-2493fe8d975f/Untitled.png)


💡 **더 자세한 이용방법은 [vuerd](https://github.com/vuerd/vuerd)에서 찾아보실 수 있습니다. (일부 기능 변형되어 다를 수 있음)**

ERD tool 출처 : [https://github.com/vuerd/vuerd](https://github.com/vuerd/vuerd)

---

### API 명세서

API 문서에 따라 프로젝트의 기본적인 MVC 패턴 코드를 이니셜라이징 해드립니다.

1. API Controller 생성

각 기능별로 API가 생성될 수 있도록 API Controller를 생성합니다. 이를 토대로 Controller.java가 생성됩니다.

(화면 캡쳐)

<aside>
💡 **API Controller의 이름이 Controller.java의 이름으로 생성됩니다.**
(예시) userController.java

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/12138a0f-a5fd-4d41-aeaa-d5f8b30a3f02/Untitled.png)

</aside>

<aside>
📌 `MethodName`을 바탕으로 메소드가 생성되니, **`MethodName`**은 **Camel Case** 형식으로 작성해주세요

</aside>

1. API 생성

기능에 필요한 API를 생성합니다. API별로 각각의 method가 생성됩니다.

(API 정보 입력 화면 캡쳐)

1. API에 요구되는 Pathvariable, Querystring, Request / ResponseDTO들을 생성합니다.

- Pathvariable과 Querystring은 API URL에 적용됩니다.

(Pathvariable Querystring 생성 화면 캡쳐)

- RequestBody ResponseBody는 생성될 API의 DTO로 생성됩니다.

(RequestBody ResponseBody 생성화면 캡쳐)

> ResponseDTO에서 변수로 쓰일 객체형 DTO는 자료형 관리에서 생성할 수 있습니다.
>

(자료형 관리 화면 캡쳐)

---

### 빌드

1. 사용자가 원하는 버전에 맞춰 프로젝트의 환경을 설정할 수 있습니다.

(빌드 왼쪽화면 캡쳐)

- Versions
  - JVM(***Java Virtual Machine***) 버전
  - Project 언어 명시
  - 패키징 확장자
  - Spring Boot 버전
  - Build 도구
- Metadata - 프로젝트 상세설명
  - Group
  - Atifact
  - Name
  - Description
  - Package Name
- Dependencies - 의존성 추가

1. 환경을 설정한 후 빌드를 누르면 오른쪽 화면에서 이니셜라이징된 프로젝트의 산출물을 확인할 수 있습니다.

(빌드 오른쪽화면 캡쳐)

<aside>
💡 프로젝트를 다운받은 후 Settings or Preferences에서 **SDK와 자바 버전을 맞춰주세요.**

</aside>

<aside>
💡 **빌드 후 조치**

프로젝트를 실행하기전, MySQL과 연결이 필요합니다. MySQL에서 Database를 생성한 후, 프로젝트 설정파일에서 연결해주세요.

</aside>