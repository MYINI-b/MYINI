![main2](https://user-images.githubusercontent.com/62869982/202833584-5b77f43d-db79-48bd-80db-6d7656233ed2.gif)

# MYINI

**🏆 삼성 청년 SW 아카데미 7th 2학기 자율 프로젝트(오픈소스) 대전 2등 1등 수상**  
**🏆 삼성 청년 SW 아카데미 7th 2학기 자율 프로젝트(오픈소스) 결선 발표 2등 수상**

### 스프링 기반 프로젝트를 쉽고 빠르게 이니셜라이징해드립니다

> 똑같은 **기획 -> 설계 -> 개발 -> 배포**를 하면서 시간 단축의 필요성을 느꼈나요?
>
> MYINI는 프로젝트의 설계 및 초기 개발 단계에서 도움을 드립니다.
>
> MYINI를 통해 쉽고 빠르게 프로젝트를 관리해보세요! 
>
> **[🔗 마이크로페이지 바로가기 Click !](https://k7b203.p.ssafy.io/)** 👈


## 🌠기술스택

|                      Frontend                       |        Backend         |      DB      |  CI/CD  |      IDE      |        Tool         |
|:---------------------------------------------------:|:----------------------:|:------------:|:-------:|:-------------:|:-------------------:|
|      HTML5, CSS3, JAVASCRIPT, Node.js 16.16.0       |        Java 11         | MySQL 8.0.29 | AWS EC2 | IntelliJ IDEA |         Git         |
|                    react 18.2.0                     |   Spring Boot 2.7.5    |              | Docker  |    VScode     |        Jira         |
|                   node-sass 7.0.3                   |  Spring Data JPA 2.0   |              | Jenkins |               |       Notion        |
|                     axios 1.1.3                     | Spring REST Docs 2.0.6 |              |  NGINX  |               |        Figma        |
| eslint 8.25.0  + prettier 2.7.1 + AirBnB Convention |                        |              |   SSL   |               |
|               react-router-dom 6.4.2                |                        |              |         |               |
|                  react-redux 8.0.4                  |                        |              |         |               |


## EC2 포트 정리
|  **PORT**  |         **이름**         |
|:----------:|:----------------------:|
|    443     |         HTTPS          |
|     80     |      HTTP, nginx       |
|    3000    |        FrontEnd        |
|    3306    |         MySQL          |
|    8080    |        Jenkins         |
| 8081, 8082 | Spring boot API Server |
 


## 🏛 아키텍쳐

![아키텍쳐](https://user-images.githubusercontent.com/62869982/202833773-c74d5f50-4afa-47ca-9314-7dc2e6558411.png)


## 💡 주요 기능

#### 1. 프로젝트 관리

![project](https://user-images.githubusercontent.com/62869982/202833600-6634a4bc-3049-4c3f-96b6-dbffe74d7e0b.gif)

>✨특장점
>
>- 프로젝트의 정보 및 팀원 관리
>- 동시편집 기술을 이용하여 협업서비스의 강점 극대화

- 프로젝트의 정보들을 입력 및 수정할 수 있습니다.
  - 제목, 내용, 프로젝트 기간, 협업 툴
- 프로젝트의 팀원들을 초대, 검색, 삭제 할 수 있습니다.
- JIRA와 프로젝트를 연동할 수 있습니다.

#### 2. 요구사항 명세서

![requirement](https://user-images.githubusercontent.com/62869982/202833613-e3d9bedd-7276-4953-9f7a-9f1dda42cc29.gif)

>
>✨ 핵심 기능 및 기술 
>
>- 동시편집 기술을 사용하여 팀원들이 동시에 함께 요구사항 산출
>  - CRDT기반의 Yjs 라이브러리를 도입하여 데이터의 신뢰도를 높임
>- MYINI만의 자세한 기준을 통해 더 명확하게 명세서 작성 가능
>- JIRA API와 연동하여 생성된 요구사항으로 이슈를 등록할 수 있게 함
>


- 요구사항 명세서 페이지에서 추가 버튼을 누르면 초기 요구사항이 생성됩니다.

- `카테고리`  : 카테고리를 생성하고 등록하여 요구사항을 주제별로 구분할 수 있습니다.

  (JIRA 이슈 등록시 -> `Epic`)

- `요구사항 명`, `구분` : JIRA 이슈 등록시 `이슈제목`이 `구분_요구사항 명`으로 생성됩니다.

- `담당자` : 담당자는 **JIRA 이메일을 연동한 사람만 조회**됩니다.
  
    (JIRA 이슈 등록시 -> `담당자`)

- `중요도` : JIRA 이슈 등록시 -> `우선순위`

- `포인트` :  JIRA 이슈 등록시 -> `스토리포인트`


#### 3. E-R Diagram

![erd](https://user-images.githubusercontent.com/62869982/202833626-4bf234a8-4420-4456-87a1-a027a3eb7b2e.gif)

>✨ 핵심 기능 및 기술
>
>- Vuerd 라이브러리를 사용하여 사용자의 프로젝트에 따른 E-R Diagram 생성기능을 제공
>- 사용자가 ERD를 생성하면, 빌드 시에 ERD를 기반으로 Entity와 Repository가 생성됨

- 자세한 사용 가이드는[MYINI 가이드](https://github.com/wooobinkim/myini/blob/main/docs/MYINIGuide.md)의 E-R 다이어그램 가이드를 참고해주세요.


#### 4. API 명세서

![api](https://user-images.githubusercontent.com/62869982/202833632-68e7c556-a35a-4e7e-aed4-db14fc1dd3c1.gif)

>✨ 핵심 기능 및 기술
>
>- 동시편집 기술을 사용하여 팀원들이 동시에 함께 API 명세서작성 
>  - CRDT기반의 Yjs 라이브러리를 도입하여 데이터의 신뢰도를 높임
>- 사용자가 프로젝트에 필요한 API를 생성하면, 빌드 시에 API를 기반으로 코드를 이니셜라이징

- 자세한 사용 가이드는[MYINI 가이드](https://github.com/wooobinkim/myini/blob/main/docs/MYINIGuide.md)의 API 가이드를 참고해주세요.


#### 5. 빌드

![build](https://user-images.githubusercontent.com/62869982/202833649-8683a9a3-3809-4cb0-8845-25085e9497c0.gif)

>✨ 핵심 기능 및 기술
>
>- Start Spring.io API를 이용하여 초기 프로젝트 빌드
>- 사용자가 원하는 환경에 맞춰 프로젝트를 생성
>- **ERD와 API명세서를 토대로 프로젝트 이니셜라이징**하여 다운받을수 있게 함


- 프로젝트에 맞는 환경을 설정한 후 `BUILD`버튼을 누르면, 오른쪽 화면에 생성될 프로젝트의 코드를 볼 수 있습니다.


## 🎥 데모 영상

**[🔗 서비스 소개 영상 바로가기 Click !](https://youtu.be/r_y0IaMoE30)** 👈

> 새 창 열기 방법 : CTRL+click (on Windows and Linux) | CMD+click (on MacOS)

## 👪 개발 팀 소개

<table>
<tr>
<td align="center" width="150px">
<a href="[https://github.com/woobinkim](https://github.com/woobinkim)" target="_blank">
<a href="https://github.com/woobinkim"><img height="100px" width="100px" src="https://user-images.githubusercontent.com/62869982/201554445-9f912af4-b8b0-463b-80ae-9f3d536c2ad9.png" alt="김우빈 프로필"/></a>
</a>
</td>
<td align="center" width="150px">
<a href="[https://github.com/rkarud1234](https://github.com/rkarud1234)" target="_blank">
<a href="https://github.com/rkarud1234"><img height="100px" width="100px" src="https://user-images.githubusercontent.com/62869982/201554484-b23ce090-100b-407c-adef-190bd3e6adb5.png" alt="김갑경 프로필"/></a>
</a>
</td>
<td align="center" width="150px">
<a href="[https://github.com/daisy6365](https://github.com/daisy6365)" target="_blank">
<a href="https://github.com/daisy6365"><img height="100px" width="100px" src="https://avatars.githubusercontent.com/u/62869982?v=4" alt="한다빈 프로필"/></a>
</a>
</td>
<td align="center" width="150px">
<a href="[https://github.com/hanyoonseok](https://github.com/hanyoonseok)" target="_blank">
<a href="https://github.com/hanyoonseok"><img height="100px" width="100px" src="https://user-images.githubusercontent.com/62869982/201554520-56311fa4-6e69-4b16-bbae-ceec562c5f60.png" alt="한윤석 프로필"/></a>
</a>
</td>
<td align="center" width="150px">
<a href="[https://github.com/geon-gil](https://github.com/geon-gil)" target="_blank">
<a href="https://github.com/geon-gil"><img height="100px" width="100px" src="https://user-images.githubusercontent.com/62869982/201554557-f912990e-8b05-4375-8f20-309f4f740ab3.png" alt="배건길 프로필"/></a>
</a>
</td>
<td align="center" width="150px">
<a href="[https://github.com/ggamlee)" target="_blank">
<a href="https://github.com/ggamlee"><img height="100px" width="100px" src="https://user-images.githubusercontent.com/62869982/201554646-89e0b997-6d6b-403d-af4c-ef191126ce36.png" alt="이성재 프로필"/></a>
</a>
</td>
</tr>
<tr>
<td align="center">
<a href="[https://github.com/woobinkim](https://github.com/woobinkim)" target="_blank">
김우빈<br />(Back-end)
</a>
</td>
<td align="center">
<a href="[https://github.com/rkarud1234](https://github.com/rkarud1234)" target="_blank">
김갑경<br />(Back-end)
</a>
</td>
<td align="center">
<a href="[https://github.com/daisy6365](https://github.com/daisy6365)" target="_blank">
한다빈<br />(Back-end)
</a>
</td>
<td align="center">
<a href="[https://github.com/hanyoonseok](https://github.com/hanyoonseok)" target="_blank">
한윤석<br />(Front-end)
</a>
</td>
<td align="center">
<a href="[https://github.com/geon-gil](https://github.com/geon-gil)" target="_blank">
배건길<br />(Front-end)
</a>
</td>
<td align="center">
<a href="[https://github.com/ggamlee](https://github.com/ggamlee)">
이성재<br />(Front-end)
</a>
</td>
</tr>
</table>

## 📅 개발 기간

22.10.11. ~ 22.11.21

<br />

## 커밋 규칙

1. 모두 각자 branch에서 기능개발 후 `PR`
2. `PR` 후 팀원모두함께 코드리뷰 진행 후 팀장이 `merge`
3. 커밋 방법
  - `issue`에 이슈를 등록
    ex) `#fe-01`, `#be-01`
  - 이슈 해결 후 커밋메세지 규칙으로 커밋 후 `PR`, 권한자가 `merge`
  - issue close
### 커밋 종류

- **FEAT** : 새로운 기능 추가
- **FIX** : 버그 수정
- **DOCS** : 문서 수정 및 추가
- **STYLE** : 코드 스타일 관련 변경(코드 포매팅, 세미콜론 누락 등)
- **REFACTOR** : 코드 리팩토링
- **TEST** : 테스트 코드, 리팩토링 테스트 코드 추가
- **CHORE** : 빌드 task 수정, 패키지 매니저 수정(.gitignore 수정 같은 경우)

## 📖 문서

#### [📑Notion](https://flawless-yarn-6c8.notion.site/SSAFY-63a8275c69fd47a09f7db03750507aa2)

<br />

## 🔑 라이센스
```bash
MIT LICENSE
Copyright (c) 2022 MYINI

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
