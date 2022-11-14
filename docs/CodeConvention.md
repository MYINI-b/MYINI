# CodeConvention

# REACT / TypeScript

# SpringBoot

**MYINI Backend는 Spring의 멀티모듈설계에 기반을 둔 코드입니다. 관련 내용은 [우아한형제들 멀티모듈](https://techblog.woowahan.com/2637/) 문서를 참고해주세요.**

### 패키지명

- 소문자로 구성합니다.
- ex) com.ssafy.myini.member.{파일명}

### 파일명

- 모든 파일명은 Pascal Case를 원칙으로 합니다.
- **Controller**
    - 관련기능 + Controller로 작성해주세요.
    - ex) MemberController
- **Service**
    - 인터페이스는 관련기능 + Service로 작성해주세요.
    - 실제 구현 클래스는 관련기능 + ServiceImpl로 작성하여 implement해 사용해주세요.
    - ex) MemberService / MemberServiceImpl
- **Dto**
    - 요청 Dto는 API함수이름 + Request로 작성해주세요.
    - 응답 Dto는 API함수이름 + Response로 작성해주세요.
    - ex) createMemberRequest / findMemberResponse
- **Entity**
    - 사용하고자 하는 테이블명을 Pascal Case로 작성해주세요.
    - ex ) Member / MemberInfo
- **Repository**
    - 해당되는 Entity명 + Repository로 작성해주세요.
    - ex ) MemberRepository
- **ETC**
    - 이외에 작성해야하는 파일들은 최대한 의미에 걸맞게 작성하도록 하세요.
    - PR에 해당 내용을 작성하여 개발진에게 검토를 받아주세요.

### 함수명

- 모든 함수는 Camel Case를 원칙으로 합니다.
- **CRUD함수**
    - Rest API의 CRUD와 관련된 함수는 Controller, Service에서 동일한 이름을 사용합니다.
    - **Create**
        - create + 생성하려는 서비스
        - ex) createMember
    - **Read**
        - 쿼리에 형태에 맞게 사용하는JPA의 함수 명명과 동일하게 사용
        - ex) findMemberByMemberId / findMemberList
    - **Update**
        - update + 수정하려는 서비스
        - ex) updateMemberName
    - **Delete**
        - delete + 삭제하려는 서비스
        - ex) deleteMember
- **ETC**
    - 해당 로직에 적합한 함수명을 만들어 사용합니다.
    - PR에 해당 내용을 작성하여 개발진에게 검토를 받아주세요.

### 변수명

- 모든 변수명은 Camel Case를 원칙으로 합니다.
- 변수의 사용용도를 직관적으로 알 수 있도록 작성합니다.

### REST API

- path는 복수명사를 사용합니다.
- 소문자를 사용합니다.
- ex) members/memberinfos?id=1

### ETC

- 이외의 컨벤션은 해당 상황과 로직에 맞는 적절한 용어를 사용해주세요
- 특이사항이 있다면 PR에 해당 내용을 작성하여 개발진에게 검토를 받아주세요
- 기본적인 JAVA관련 컨벤션은 [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)를 참고해주세요

# Data

### JPA

- **테이블(Entity)**
    - Pascal Case로 작성한다.
    - 단수형을 사용한다.
    - ex) Member / MeberInfo
- **컬럼**
    - Camel Case로 작성한다.
    - auto increment 속성의 PK를 사용하는 경우 "테이블 이름"+Id로 작성한다.
    - boolean 필드인 경우 'isXXX' 같은 형태로 작성한다.
    - 날짜필드인 경우 ‘XXXAt’ 같은 형태로 작성한다.
    - ex) memberName / memberId / isAdmin / createdAt

### MYSQL

- **테이블**
    - Snake Case로 작성한다.
    - 단수형을 사용한다.
    - ex) member / member_info
- **컬럼**
    - Snake Case로 작성한다.
    - auto increment 속성의 PK를 사용하는 경우 "테이블 이름"_id로 작성한다.
    - boolean 필드인 경우 'is_XXX' 같은 형태로 작성한다.
    - 날짜필드인 경우 ‘XXX_at’ 같은 형태로 작성한다.
    - ex) member_name / member_id / is_admin / created_at
