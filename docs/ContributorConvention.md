# ContributorConvention

### 저희 MYINI는 다양한 컨벤션을 통해 Git 관리를 진행하고 있습니다. 꼭 확인 후 양식에 맞게 컨트리뷰트 해주세요.

## 😀 브랜치컨벤션

```bash
브랜치종류/개발파트_관련서비스

ex ) 프론트엔드에서 로그인관련 기능 추가작업을 할 때
git branch feature/FE_login develop
```

### 브랜치 종류

- master : 제품으로 출시될 수 있는 브랜치, 배포 Release(Prod) 버전의 소스가 들어있는 브랜치
- develop : 다음 출시 버전을 개발하는 브랜치, 개발버전의 소스가 들어있는 브랜치
- feature : 기능을 개발하는 브랜치
- release : 이번 출시 버전을 준비하는 브랜치
- hotfix : 출시 버전에서 발생한 버그를 수정 하는 브랜치

### 개발 파트

- **BE** : 백엔드 수정
- **FE** : 프론트엔드 수정

## 😀 커밋컨벤션

```bash
[커밋종류]개발파트_수정내용

ex) 백엔드 자바에서 프로젝트 관련 새로운 기능이 추가되었을 때
git commit -m "[FEAT]BE_새로운기능"
```

### 커밋 종류

- **FEAT** : 새로운 기능 추가
- **FIX** : 버그 수정
- **DOCS** : 문서 수정 및 추가
- **STYLE** : 코드 스타일 관련 변경(코드 포매팅, 세미콜론 누락 등)
- **REFACTOR** : 코드 리팩토링
- **TEST** : 테스트 코드, 리팩토링 테스트 코드 추가
- **CHORE** : 빌드 task 수정, 패키지 매니저 수정(.gitignore 수정 같은 경우)

### 개발 파트

- **BE** : 백엔드 수정
- **FE** : 프론트엔드 수정

## 😀 Pull Request 컨벤션

```bash
#제목
[PR종류] 수정내용

ex) [REFACTOR] Member 미사용 코드 삭제 

#본문
목적, 내용, 응답 세가지를 작성해주세요.

ex)
목적 : Member Repository에서 코드 삭제가 필요한 부분이 있어 PR요청합니다.

내용 : 
● ProjectService.java
	Optional<Member> findByMemberEmail(String memberEmail); #삭제

응답 : 해당 함수를 사용하는 부분이 있는지 확인 부탁드립니다. 문제 없다면 삭제 PR 머지 부탁드립니다.
```

### PR종류

- **FEAT** : 새로운 기능 추가
- **FIX** : 버그 수정
- **DOCS** : 문서 수정 및 추가
- **STYLE** : 코드 스타일 관련 변경(코드 포매팅, 세미콜론 누락 등)
- **REFACTOR** : 코드 리팩토링
- **TEST** : 테스트 코드, 리팩토링 테스트 코드 추가
- **CHORE** : 빌드 task 수정, 패키지 매니저 수정(.gitignore 수정 같은 경우)

### 본문

- **목적** : Pull Request의 목적을 짧게 작성해주세요.
- **내용** : 어떤 부분을 수정하였고 어떻게 수정했는지 자세히 작성해주세요.
- **응답** : 응답을 원하는 피드백이 있다면 작성해주세요.