<h1 align="center"> E105 공통프로젝트 </h1>

## 📝 목차

[프로젝트 개요](#item-one)

[역할 분담](#item-two)

[기술 스택](#item-three)

[데이터 베이스 모델링 (ERD)](#item-four)

[서비스 구현 화면](#item-five)

[느낀 점](#item-end)

## 프로젝트 개요

![naknak.JPG](README_assets/daafe1398fc8edc24a33a30f065e383cd5113e0a.JPG)

---

 **낚시 초보들을 위한 A to Z 어플리케이션** 

![naknak 쓰는 이유.png](README_assets/a55dc2dcf9b1735cc20790cc1032735d8831603b.png)

<aside>
💡 저희 팀은 초보자를 위한 낚시 어플 서비스 “낚낚” 을 만들었습니다.

낚시가 처음인 사람을 위해 어플 사용법과 낚시의 기본을 알려주는 뉴비 가이드!

**찰칵!** 낚시를 성공했을때 어플로 촬영하면 잡은 어종의 종류와 크기를 알려주는 AI 서비스!

내가 잡은 물고기를 등록하는 도감 서비스와 잡은 물고기를 구경할 수 있는 수족관 서비스 등을 만들었습니다.

저희 서비스와 함께 낚시를 시작해보세요!

</aside>

# 프로젝트 확인하기

모바일 웹으로 접속 : [https://i9e105.p.ssafy.io](https://i9e105.p.ssafy.io/)

웹 apk 설치 경로 : https://i9e105.p.ssafy.io/api1/upload/app-arm64-v8a-release.apk

## 역할 분담

**Frontend**

- 최상익 : UX/UI 설계, 카메라(욜로) 설정 및 수조 상호작용 구현, 플러터 기능 구현, 프로필페이지 제작, 사전 및 TMI 페이지 제작
- 윤자현 : UX/UI 설계, 뉴비페이지 컨텐츠 제작 및 TTS연결, 기상청 api 카카오맵 활용해 낚시 지도 생성 및 정보 전달 페이지 제작, 피싱모드 제작
- 조병철 : UX/UI 설계, 사용자 SNS(커뮤니티) 페이지, 물고기 도감 페이지, 일러스트제작, PPT 제작 및 발표

**Backend**

- 이강민 : 스크럼 마스터, 백엔드 주요 기능 API 개발, 개발 서버 CI, AI 데이터 학습, 영상 제작, 서비스 아키텍쳐 설계
- 조현덕 : sns 기능에 사용되는 DB와 api 서비스 제작, Mahout 라이브러리를 사용해 유저별 게시글 추천, 학습에 사용되는 이미지 데이터 정제
- 오철원 : DevOps CI/CD, 배포 관리, 서버 데이터 보안, 시스템 환경& 서비스 기능 QA, 테크니컬 라이터

<a id="item-three"></a> 

## 기술 스택

<a id="item-four"></a>

## **⚙** Management Tool

- 형상 관리 : Gitlab
- 이슈 관리 : Jira
- 커뮤니케이션 : Mattermost, Webex, Notion, Discord
- 디자인 : Figma, PowerPoint

## 💻 IDE

- Visual Studio Code `1.75.1`
- IntelliJ `IntelliJ IDEA 2022.3(Ultimate Edition)`

## 📱 Frontend

- React `18.2.0`
- Javacript `4.9.3`
- Flutter

## 💾 Backend

- Springboot  `3.1.1`
- Spring Data JPA
- Spring Data Redis(lettuce)
- Redis
- MySql 8.0.33
- Mongodb
- Apache Kafka 3.5.0
- SSL
- CertBot(CA Certificates)`

## 🔃 DevOPS

- Jenkins
- Docker 2.25.0
- nginx

## 데이터 베이스 모델링 (ERD)

![erdtable.png](README_assets/db3ffd49a3af91a511ae92f4c30c51ccd3a6997a.png)


## 프로젝트 구조도
전체
```
┗📂back
    ┗📁 AutoCrawler
  ┗📁 demo
  ┗📁 Django
  ┗📁 fisher-log-server
  ┗📁 Spring
┗📂front
┗📂mobile
┗📂data
```

front-end
```
📦src
 ┣ 📂api
 ┃ ┣ 📜BadanuriAPI.js
 ┃ ┣ 📜KMAAPI.js
 ┃ ┣ 📜SeaAPI.js
 ┃ ┗ 📜WeatherAPI.js
 ┣ 📂components
 ┃ ┣ 📂account
 ┃ ┃ ┣ 📜Api.js
 ┃ ┃ ┣ 📜Authinput.jsx
 ┃ ┃ ┣ 📜AxiosInterceptor.js
 ┃ ┃ ┣ 📜email_input.js
 ┃ ┃ ┣ 📜Kakao.jsx
 ┃ ┃ ┣ 📜Login.css
 ┃ ┃ ┣ 📜Login.js
 ┃ ┃ ┣ 📜signup.css
 ┃ ┃ ┣ 📜Signup.js
 ┃ ┃ ┣ 📜test.css
 ┃ ┃ ┣ 📜test.js
 ┃ ┃ ┣ 📜Userupdate.js
 ┃ ┃ ┗ 📜use_input.js
 ┃ ┣ 📂achievements
 ┃ ┃ ┣ 📜Achievements.jsx
 ┃ ┃ ┣ 📜quest.css
 ┃ ┃ ┣ 📜QuestDetailModal.css
 ┃ ┃ ┣ 📜QuestDetailModal.jsx
 ┃ ┃ ┗ 📜Questlist.jsx
 ┃ ┣ 📂board
 ┃ ┃ ┣ 📜Board.css
 ┃ ┃ ┣ 📜Board.jsx
 ┃ ┃ ┣ 📜CreateFeed.css
 ┃ ┃ ┣ 📜CreateFeed.jsx
 ┃ ┃ ┣ 📜DeleteFeed.css
 ┃ ┃ ┣ 📜DeleteFeed.jsx
 ┃ ┃ ┣ 📜DeleteFeedModal.jsx
 ┃ ┃ ┣ 📜Feed.css
 ┃ ┃ ┣ 📜Feed.jsx
 ┃ ┃ ┣ 📜FeedTag.css
 ┃ ┃ ┣ 📜FeedTag.jsx
 ┃ ┃ ┣ 📜ModifyFeed.css
 ┃ ┃ ┗ 📜ModifyFeed.jsx
 ┃ ┣ 📂camera
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┗ 📜loader.js
 ┃ ┃ ┣ 📂style
 ┃ ┃ ┃ ┣ 📜App.css
 ┃ ┃ ┃ ┗ 📜loader.css
 ┃ ┃ ┣ 📂utils
 ┃ ┃ ┃ ┣ 📜detect.js
 ┃ ┃ ┃ ┣ 📜download.js
 ┃ ┃ ┃ ┣ 📜labels.js
 ┃ ┃ ┃ ┣ 📜labels.json
 ┃ ┃ ┃ ┗ 📜renderBox.js
 ┃ ┃ ┣ 📜Camera.css
 ┃ ┃ ┣ 📜Camera.jsx
 ┃ ┃ ┣ 📜Detectdata.js
 ┃ ┃ ┣ 📜Getfish.css
 ┃ ┃ ┗ 📜Getfish.jsx
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜Background.css
 ┃ ┃ ┣ 📜Background.jsx
 ┃ ┃ ┣ 📜Footer.css
 ┃ ┃ ┣ 📜Footer.js
 ┃ ┃ ┣ 📜Loading.css
 ┃ ┃ ┣ 📜Loading.jsx
 ┃ ┃ ┣ 📜NotFound.js
 ┃ ┃ ┗ 📜server.js
 ┃ ┣ 📂dict
 ┃ ┃ ┣ 📜Dict.css
 ┃ ┃ ┣ 📜Dict.jsx
 ┃ ┃ ┣ 📜Dictdetail.css
 ┃ ┃ ┣ 📜Dictdetail.jsx
 ┃ ┃ ┣ 📜Dictlist.css
 ┃ ┃ ┗ 📜Dictlist.js
 ┃ ┣ 📂dogam
 ┃ ┃ ┣ 📜Dogam.css
 ┃ ┃ ┣ 📜Dogam.jsx
 ┃ ┃ ┣ 📜FishDetailModal.css
 ┃ ┃ ┗ 📜FishDetailModal.jsx
 ┃ ┣ 📂fishbowl
 ┃ ┃ ┣ 📜Balls.jsx
 ┃ ┃ ┣ 📜Bowl.jsx
 ┃ ┃ ┣ 📜fishbowl.png
 ┃ ┃ ┣ 📜fishbowl2.png
 ┃ ┃ ┣ 📜fishbowl3.jpg
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜Inventory.css
 ┃ ┃ ┣ 📜Inventory.jsx
 ┃ ┃ ┣ 📜ItemSlide.jsx
 ┃ ┃ ┣ 📜Profileballs.jsx
 ┃ ┃ ┣ 📜Profilesea.jsx
 ┃ ┃ ┣ 📜SeaScene.css
 ┃ ┃ ┣ 📜SeaScene.js
 ┃ ┃ ┣ 📜SlideInnerMenu.css
 ┃ ┃ ┣ 📜SlideInnerMenu.jsx
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📂fishing
 ┃ ┃ ┣ 📜Fish.js
 ┃ ┃ ┣ 📜Fishing.css
 ┃ ┃ ┣ 📜Fishing.js
 ┃ ┃ ┣ 📜Fishpic.css
 ┃ ┃ ┣ 📜Fishpic.js
 ┃ ┃ ┣ 📜Getfish.js
 ┃ ┃ ┣ 📜Nowget.css
 ┃ ┃ ┣ 📜Nowget.js
 ┃ ┃ ┣ 📜Picresult.jsx
 ┃ ┃ ┣ 📜StopWatch.css
 ┃ ┃ ┗ 📜StopWatch.js
 ┃ ┣ 📂freshman
 ┃ ┃ ┣ 📜Checkbox.css
 ┃ ┃ ┣ 📜Checkbox.jsx
 ┃ ┃ ┣ 📜Checklist.css
 ┃ ┃ ┣ 📜Checklist.jsx
 ┃ ┃ ┣ 📜Firstpage.css
 ┃ ┃ ┣ 📜Firstpage.jsx
 ┃ ┃ ┣ 📜Freshman.css
 ┃ ┃ ┣ 📜Freshman.jsx
 ┃ ┃ ┣ 📜Lure.js
 ┃ ┃ ┣ 📜Newbie.css
 ┃ ┃ ┣ 📜Newbie.jsx
 ┃ ┃ ┣ 📜Onetwo.js
 ┃ ┃ ┣ 📜Secondpage.css
 ┃ ┃ ┣ 📜Secondpage.jsx
 ┃ ┃ ┣ 📜Talk.js
 ┃ ┃ ┣ 📜Talk2.js
 ┃ ┃ ┣ 📜TTS.jsx
 ┃ ┃ ┗ 📜upgradeProgress.jsx
 ┃ ┣ 📂map
 ┃ ┃ ┣ 📜badanuriPositions.js
 ┃ ┃ ┣ 📜FavoriteSpot.jsx
 ┃ ┃ ┣ 📜FavoriteSpots.css
 ┃ ┃ ┣ 📜FavoriteSpots.jsx
 ┃ ┃ ┣ 📜GetXY.jsx
 ┃ ┃ ┣ 📜Map.css
 ┃ ┃ ┣ 📜Map.jsx
 ┃ ┃ ┣ 📜MapInfo.json
 ┃ ┃ ┣ 📜MapModal.css
 ┃ ┃ ┣ 📜MapModal.jsx
 ┃ ┃ ┣ 📜markerPositions.js
 ┃ ┃ ┗ 📜Weather.jsx
 ┃ ┣ 📂user
 ┃ ┃ ┣ 📜Follower.jsx
 ┃ ┃ ┣ 📜FollowerModal.js
 ┃ ┃ ┣ 📜Following.jsx
 ┃ ┃ ┣ 📜FollowModal.css
 ┃ ┃ ┣ 📜Mypost.jsx
 ┃ ┃ ┣ 📜profile.css
 ┃ ┃ ┣ 📜Profile.jsx
 ┃ ┃ ┣ 📜Profileinventory.css
 ┃ ┃ ┣ 📜Profileinventory.jsx
 ┃ ┃ ┣ 📜ProfileModal.js
 ┃ ┃ ┗ 📜profileStyle.js
 ┃ ┣ 📜Home.css
 ┃ ┗ 📜Home.jsx
 ┣ 📂temp
 ┃ ┗ 📂Teacherable
 ┃ ┃ ┣ 📂my_model
 ┃ ┃ ┃ ┣ 📜metadata.json
 ┃ ┃ ┃ ┣ 📜model.json
 ┃ ┃ ┃ ┗ 📜weights.bin
 ┃ ┃ ┣ 📜AxiosTest.js
 ┃ ┃ ┣ 📜ImgProcess.js
 ┃ ┃ ┗ 📜ImgTest.jsx
 ┣ 📂utils
 ┃ ┣ 📂data
 ┃ ┃ ┣ 📜challenge.csv
 ┃ ┃ ┣ 📜challenge.js
 ┃ ┃ ┣ 📜fishingspot.json
 ┃ ┃ ┣ 📜point.js
 ┃ ┃ ┣ 📜quest.js
 ┃ ┃ ┗ 📜tmi.js
 ┃ ┣ 📂video
 ┃ ┃ ┣ 📜casting.mp4
 ┃ ┃ ┗ 📜reel.mp4
 ┃ ┣ 📜api.js
 ┃ ┣ 📜atoms.js
 ┃ ┣ 📜FontAwesome.jsx
 ┃ ┣ 📜location.js
 ┃ ┗ 📜util.js
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜AppRouter.jsx
 ┣ 📜index.css
 ┣ 📜index.jsx
 ┣ 📜reportWebVitals.js
 ┗ 📜setupProxy.js
```
back-end
```
📦src
 ┣ 📂main
 ┃ ┣ 📂java
 ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┗ 📂net
 ┃ ┃ ┃ ┃ ┗ 📂fisher
 ┃ ┃ ┃ ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜AuthController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LoginDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LoginResponseDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Oauth2LoginDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜OAuthAttributes.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂handler
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MemberAccessDeniedHandler.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MemberAuthenticationEntryPoint.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MemberAuthenticationFailureHandler.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MemberAuthenticationSuccessHandler.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜OAuth2SuccessHandler.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂jwt
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜JwtAuthenticationFilter.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜JwtTokenizer.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜JwtVerificationFilter.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂oauth
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CustomOAuth2UserService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂redis
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RedisDao.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RedisRepositoryConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂userdetails
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MemberDetailsService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂utils
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CustomAuthorityUtils.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ErrorResponder.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂challenge
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ChallengeController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ChallengeCheckDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ChallengeDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Challenge.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ChallengeCheck.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mapper
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ChallengeMapper.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ChallengeCheckRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ChallengeRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ChallengeService.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂comment
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CommentController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CommentDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜Comment.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mapper
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CommentMapper.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CommentRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CommentService.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜KafkaLogDtoProducerConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LocalDateTimeSerializer.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MvcConfiguration.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜SecurityConfiguration.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂conv
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Attachment.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RequestMessage.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BusinessLogicException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ExceptionCode.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜GlobalExceptionAdvice.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂file
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FileController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FileService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FileInfo.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂fish
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FishController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BooksDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FishBowlsDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FishDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FishRecogDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜InventoryDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Books.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Fish.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FishBowls.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜Inventory.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mapper
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FishMapper.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BooksRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FishBowlsRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FishRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜InventoryRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FishService.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂fishinghole
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FishingHoleController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FavoritePointDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FishingHoleDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FavoritePoint.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FishingHole.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mapper
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FishingHoleMapper.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FavoritePointRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FishingHoleRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜FishingHoleService.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂kafka
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LogDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜KafkaProducer.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂member
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MemberController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FollowDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MemberDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MemberStatusDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Follow.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Member.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MemberImage.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MemberStatus.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mapper
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MemberMapper.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FollowRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MemberImageRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MemberRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MemberStatusRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MemberService.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂post
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜PostController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DateDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LikeDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostImageDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜TagDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Like.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Post.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostImage.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostTag.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜Tag.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserPreference.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mapper
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostImageMapper.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostMapper.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜TagMapper.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LikeRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostImageRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostTagRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PreferenceRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜TagRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜PostService.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BooksResponse.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ChallengeCheckResponse.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ChallengeResponse.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ErrorResponse.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜FishCheckResponse.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LocationResponse.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MemberStatusResponse.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PageResponse.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostResponse.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜PostSimpleResponse.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜SchedulerService.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📜FisherApplication.java
 ┃ ┃ ┃ ┃ ┃ ┗ 📜HomeController.java
 ┃ ┗ 📂resources
 ┃ ┃ ┣ 📂static
 ┃ ┃ ┃ ┣ 📂assets
 ┃ ┃ ┃ ┃ ┣ 📂cats
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cat.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cat1.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cat10.gif
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cat11.gif
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cat2.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cat3.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cat4.gif
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cat5.gif
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cat6.gif
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cat7.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cat8.png
 ┃ ┃ ┃ ┃ ┃ ┗ 📜cat9.png
 ┃ ┃ ┃ ┃ ┣ 📂firstpage
 ┃ ┃ ┃ ┃ ┃ ┣ 📜common1-1.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜common1-2.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜common1-3.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜common1-4.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜common1-5.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜lure1-1.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜lure1-2.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜lure1-3.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜lure1-4.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜lure1-5.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜lure1-6.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜lure1-7.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜lure1-8.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜lure2-1.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜lure2-2.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜lure2-3.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜onetwo1-1.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜onetwo1-2.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜onetwo1-3.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜onetwo1-4.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜onetwo1-5.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜onetwo1-6.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜onetwo1-7.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜onetwo1-8.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜onetwo1-9.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜onetwo2-1.png
 ┃ ┃ ┃ ┃ ┃ ┗ 📜onetwo2-2.png
 ┃ ┃ ┃ ┃ ┣ 📂icons
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ac.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜btn_google_light_normal_hdpi.9.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜btn_google_signin_light_focus_hdpi.9.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜btn_google_signin_light_normal_hdpi.9.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜camera.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜camera1.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜camera2.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜close.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜dict.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜do.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜do2.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜favspot.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜fishpic.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ge.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜google.PNG
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Google1.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜heart.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ji.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜kakao.PNG
 ┃ ┃ ┃ ┃ ┃ ┣ 📜kakao_login_large.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜like2.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜on.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜pro.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜pro2.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜pro3.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜seagull.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜set.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜spring.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜tank.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜unlike.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜unlike2.png
 ┃ ┃ ┃ ┃ ┃ ┗ 📜x.png
 ┃ ┃ ┃ ┃ ┣ 📂images
 ┃ ┃ ┃ ┃ ┃ ┣ 📜background.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜background1.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜background2.jpg
 ┃ ┃ ┃ ┃ ┃ ┣ 📜badabada.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜bookcover.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cl.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cl1.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cover1.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜fishbowl.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜island.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜island2.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜island3.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜jge.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜main.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜mainballoon.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜mainballoon2.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜mainballoon3.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜mallpoong.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜mallpoong2.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜mallpoong3.png
 ┃ ┃ ┃ ┃ ┃ ┗ 📜mallpoong4.png
 ┃ ┃ ┃ ┃ ┣ 📂json
 ┃ ┃ ┃ ┃ ┃ ┣ 📜dict.json
 ┃ ┃ ┃ ┃ ┃ ┗ 📜fish.json
 ┃ ┃ ┃ ┃ ┣ 📂weather
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cloud1.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cloud2.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cloud3.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜rain1.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜rain2.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜snow1.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜snow2.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜snowandrain.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜sun1.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜sun2.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜sun3.png
 ┃ ┃ ┃ ┃ ┃ ┗ 📜wind.png
 ┃ ┃ ┃ ┃ ┣ 📜123123123.png
 ┃ ┃ ┃ ┃ ┣ 📜dom1.png
 ┃ ┃ ┃ ┃ ┗ 📜loading.gif
 ┃ ┃ ┃ ┣ 📂img
 ┃ ┃ ┃ ┃ ┣ 📜감성돔.png
 ┃ ┃ ┃ ┃ ┣ 📜고등어.png
 ┃ ┃ ┃ ┃ ┣ 📜놀래미.png
 ┃ ┃ ┃ ┃ ┣ 📜도다리.png
 ┃ ┃ ┃ ┃ ┣ 📜돌돔.png
 ┃ ┃ ┃ ┃ ┣ 📜방어.png
 ┃ ┃ ┃ ┃ ┣ 📜벵에돔.png
 ┃ ┃ ┃ ┃ ┣ 📜보리멸.png
 ┃ ┃ ┃ ┃ ┣ 📜볼락.png
 ┃ ┃ ┃ ┃ ┣ 📜붕어싸만코.png
 ┃ ┃ ┃ ┃ ┣ 📜숭어.png
 ┃ ┃ ┃ ┃ ┣ 📜우럭.png
 ┃ ┃ ┃ ┃ ┣ 📜참돔.png
 ┃ ┃ ┃ ┃ ┗ 📜학꽁치.png
 ┃ ┃ ┃ ┣ 📂model
 ┃ ┃ ┃ ┃ ┣ 📜best.onnx
 ┃ ┃ ┃ ┃ ┣ 📜best_ver1.onnx
 ┃ ┃ ┃ ┃ ┣ 📜nms-yolov8.onnx
 ┃ ┃ ┃ ┃ ┗ 📜yolov8n.onnx
 ┃ ┃ ┃ ┣ 📂static
 ┃ ┃ ┃ ┃ ┣ 📂css
 ┃ ┃ ┃ ┃ ┃ ┣ 📜main.da467156.css
 ┃ ┃ ┃ ┃ ┃ ┗ 📜main.da467156.css.map
 ┃ ┃ ┃ ┃ ┣ 📂js
 ┃ ┃ ┃ ┃ ┃ ┣ 📜787.71df535f.chunk.js
 ┃ ┃ ┃ ┃ ┃ ┣ 📜787.71df535f.chunk.js.map
 ┃ ┃ ┃ ┃ ┃ ┣ 📜main.7435955e.js
 ┃ ┃ ┃ ┃ ┃ ┣ 📜main.7435955e.js.LICENSE.txt
 ┃ ┃ ┃ ┃ ┃ ┣ 📜main.7435955e.js.map
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ort-wasm-simd-threaded.jsep.wasm
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ort-wasm-simd-threaded.wasm
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ort-wasm-simd.jsep.wasm
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ort-wasm-simd.wasm
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ort-wasm-threaded.wasm
 ┃ ┃ ┃ ┃ ┃ ┗ 📜ort-wasm.wasm
 ┃ ┃ ┃ ┃ ┗ 📂media
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cat.047ede868e16a77e042b.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cat11.a51bbde9aef839436ea8.gif
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cat2.03a95bcb277f72caa4d8.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜cat3.bae1c41938c51969571b.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜fishbowl.eb57eb04480ec3b78629.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜mallpoong.9576f69d3adbb1686361.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜mallpoong4.b8422c17ded7132fe806.png
 ┃ ┃ ┃ ┃ ┃ ┣ 📜slick.2630a3e3eab21c607e21.svg
 ┃ ┃ ┃ ┃ ┃ ┣ 📜slick.295183786cd8a1389865.woff
 ┃ ┃ ┃ ┃ ┃ ┣ 📜slick.a4e97f5a2a64f0ab1323.eot
 ┃ ┃ ┃ ┃ ┃ ┗ 📜slick.c94f7671dcc99dce43e2.ttf
 ┃ ┃ ┃ ┣ 📜asset-manifest.json
 ┃ ┃ ┃ ┣ 📜favicon.ico
 ┃ ┃ ┃ ┣ 📜index.html
 ┃ ┃ ┃ ┣ 📜logo192.png
 ┃ ┃ ┃ ┣ 📜logo512.png
 ┃ ┃ ┃ ┣ 📜manifest.json
 ┃ ┃ ┃ ┗ 📜robots.txt
 ┃ ┃ ┣ 📜application-deploy.yml
 ┃ ┃ ┣ 📜application-dev.yml
 ┃ ┃ ┗ 📜application-prod.yml
 ┗ 📂test
 ┃ ┗ 📂java
 ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┗ 📂net
 ┃ ┃ ┃ ┃ ┗ 📂fisher
 ┃ ┃ ┃ ┃ ┃ ┗ 📜FisherApplicationTests.java
```



## 서비스 구현 화면

> **로그인 화면** 

![로그인 화면.gif](README_assets/8132a5ed033265ab2eac479c70129359c06905e6.gif)

**메인 화면**

![메인화면.gif](README_assets/5ab88a415eb9e3020b7ada50c882c466f43bc9a3.gif)

**뉴비 모드**

![뉴비.png](README_assets/23d129830ed5241ee26b00ad93018b130b4adf95.png)

> **포획 물고기 판별**

![잡은 물고기는 수조로.gif](README_assets/9dfcaef4068c61c2b5e9219077b88b6ea37d9773.gif)

![물고기AI.gif](README_assets/46ae5d7979320e6d15ba782c1be071e7fed792e8.gif)



> **포획 물고기 관리**

![물고기획득.png](README_assets/6e62c7c7aa1284ed40937ac2efef836b2a0c4be6.png)

> **물고기 도감**

![도감.gif](README_assets/b323ae96b21f1fb29cbf03a68dcab564cdf31250.gif)

![도감2.png](README_assets/6b570f7fdf592b6ae0ddb547945a6d2c103f9ec6.png)

> **SNS**

![sns.gif](README_assets/3f2800a6da1fdc08e4dba1b923a163a981f935ae.gif)

> **낚시터**

![낚시터.png](README_assets/d7a5f4b1371659faac132944b22d21eabe9386c7.png)

> **사전**

![사전.png](README_assets/47966c3a46d61156dff4f635c7553b94fb5a573f.png)

> **즐겨찾기**

![즐겨찾기.png](README_assets/9af6bc1bfc5b980dfa0e611143272d1f50bc37ea.png)

> **프로필**

![프로필2.png](README_assets/030278c7d65da1401459eb3fb47171f9c4dd6c5f.png)

> **피싱모드**

![피싱모드.png](README_assets/5e16a3052f021f80082763b8cbce9423176fa7f9.png)

> 

## 느낀 점

주차별 회고 보러가기 : https://nsel.notion.site/4480070ad37d4111b037f8c19f3842c3?pvs=4
