# DIY + Hobby

## 나의 취미를 내 손으로 직접 다채롭게 구성해 보세요 🎈
![Dobby Dev UIUX Design](https://github.com/wecode-bootcamp-korea/50-2nd-Dobby-backend-final/assets/78453933/218635cb-3579-456b-b062-fd888db9aca4)

Back-End : 유진서, 조민수, 최현수, 김영범
Template Designer : 김성호(Front-End)

# Proejct - Dobby팀 
## 소개
<p style="color: dodgerblue">위코드 50기 B팀의 2nd Project입니다.</p>

백엔드 서버 코드를 저장했습니다. Back-End 소스 코드는 [여기](https://github.com/wecode-bootcamp-korea/50-2nd-Dobby-frontend)에 있습니다.

## 저장소 구조

```
├── app.js
├── controllers
│   ├── cartController.js
│   ├── cartPaymentController.js
│   ├── productController.js
│   ├── subscriptionController.js
│   └── userController.js
├── dobby.md
├── models
│   ├── addressDao.js
│   ├── cartDao.js
│   ├── dataSource.js
│   ├── productDao.js
│   ├── reviewDao.js
│   ├── subscriptionDao.js
│   └── userDao.js
├── package-lock.json
├── package.json
├── pull_request_template.md
├── routes
│   ├── cartRouter.js
│   ├── index.js
│   ├── productRouter.js
│   ├── subscriptionRouter.js
│   └── userRouter.js
├── services
│   ├── addressService.js
│   ├── cartService.js
│   ├── productService.js
│   ├── reviewService.js
│   ├── subscriptionService.js
│   └── userService.js
└── utils
    ├── auth.js
    └── error.js

```
- 백엔드 저장소 구조는 위와 같습니다.

## 기술스택
- Backend: [Express.js](https://expressjs.com)
- Frontend: [React.js](https://reactjs.org/)
  
<div align="center">
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/linux-FCC624?style=for-the-badge&logo=linux&logoColor=black">
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<br>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
</div>

# 프로젝트
## 설치하기
0. npm 버전을 확인해주세요.
    ```
    npm -v
    ```
    - 명령어를 입력했을 때 **10.2.0** 미만이면 아래 명령어를 통해 버전 업그레이드를 진행해주세요.
        ```
        npm install npm@10.2.0 -g
        ```
1. 백엔드 저장소를 클론해주세요.
    ```
    git clone https://github.com/wecode-bootcamp-korea/50-2nd-Dobby-backend
    ```
2. npm으로 패키지를 설치해주세요.
    ```
    npm install
    ```
    - 명령어는 디렉토리 최상단에서 실행해주세요.
    - pkg list는 package.json에서 확인하시면 됩니다.
 <p></p>
   
3. dbmate를 (brew로도 설치 가능) 글로벌 설치하여 db 설치를 진행해 주세요
    ```
    $ brew install -g dbmate
    $ npm install dbmate
    ```
   - dbmate를 설치하였으면 mysql 설치를 진행합니다. username과 password를 지정하고 사용할 database를 생성해 줍니다.
   - Project 폴더 내에 .env 파일을 생성합니다.
   ```
   DATABASE_URL="protocol(ex.mysql)://username:password@host:port/DATABASE_NAME"
   ```
   - .env 파일 내에 위 내용을 추가해 줍니다. sql 파일을 Repo에서 내려받습니다.

   ```
   mkdir db
   ```
   - 클론받은 directory 최상단에서 db 폴더를 생성해 줍니다.
   - <p>클론받은 sql 파일을 db 폴더 내의 <span style="color: dodgerblue"> repo의 순서와 동일하게</span> 넣어 줍니다.</p>

   ```
   dbmate up
   ```
   dbmate와 관련된 설명은 [여기](https://github.com/amacneil/dbmate)에서 볼 수 있습니다(공식 문서).



## 실행하기
- 아래 명령어를 입력하여 실행해주세요.
    ```
    npm start
    ```
    - 명령어는 디렉토리 최상단에서 실행해주세요.

# 기여하기
위코드 50기 2차 프로젝트 팀원 총 8명이 참여하였습니다.

프론트엔드 4명, 백엔드 4명이 참여하였습니다.

현재 기여하기는 팀원들을 통해서만 가능하니, 추가 코드 수정은 팀원을 통해 추후 진행할 예정입니다.

# 벤치마킹 Platform

### 구독 서비스 술담화를 벤치마킹하였습니다.
- 월간 토이 DIY 플랫폼의 DIY 카테고리 등을 추가로 참고하였습니다.


<p align="center"><img src="https://ibb.co/xm6R9QQ"><img src="https://i.ibb.co/3fcL6HH/2023-11-03-4-51-12.png" alt="파일이 잠시 누락됐습니다!">

## 벤치마킹 포인트 👀

### 구독 서비스 종류
  - 종합적, 창작성, 수집성


### 메인 페이지 단 하나에 구독 기능, 제품  추가
  - 메인 페이지에서 DIY 상품과 구독 DIY 상품을 전부 소개하여 이탈을 방지
    
    
<p align="center"><img src="https://i.ibb.co/D5rnz2D/2023-11-05-11-18-37.png" alt="파일이 잠시 누락됐습니다!" border="0">

<h5>- DIY 상품 검색 기능은 사용자의 취미 상품 찾기를 돕습니다.</h5>                                     
<p>&nbsp&nbsp&nbsp - DIY가 가능한 수집/제작 취미가 있는 분들은 특정 상품을 원할 수 있기 때문에 검색, 정렬 필터링 서비스도 활성화하였습니다.</p>
<h5 style="color: orange">- 구독 기능 : 메인 페이지에서 구독 버튼을 누르면 구독 결제 페이지로 이동합니다.</>
<p>- 제품을 클릭하면 그 제품의 상세 페이지로 화면 이동합니다.</p>
<p>- 로그인을 하면 결제 및 장바구니 생성이 가능합니다. </p>

<p align="center"><img src="https://i.ibb.co/61NzpJW/image-2.png" alt="파일이 잠시 누락됐습니다!" height="400px">
<h5>- 회원가입 및 로그인이 가능하다는 것을 로그인 페이지로 이동하자마자 곧바로 버튼을 보여 줘, 미가입 유저의 회원가입 장벽을 술담화보다 조금 더 낮췄습니다.
<p style="color:orange">- 사용자의 경험에서의 첫인상이 중요하고 유저의 이탈이 쉽게 언제든 이루어진다는 것을 근거로 위와 같이 설계하였습니다.</p>
<h5 style="color:dodgerblue">- 이로써 유저가 메인 페이지에서는 곧바로 구독, 스토어 상품을 보고 난 이후에, 회원가입/로그인은 상단에서 버튼만 누르면 그 다음에 기능을 쓰도록 설계하였습니다.</h5>

<h5>- 아이디, 비밀번호 찾기는 눈에 잘 띄게 컬러 버튼으로 만들어 시인성이 낮지 않게 하였습니다.</h5>
<p style="font-weight: bold"><span style="color: dodgerblue">- 로그인 하지 않아도 상품을 미리 볼 수 있습니다.</span>&nbsp; 로그인하면 고객이 가입 시 입력한 닉네임을 상단에 띄우며 인삿말을 보이도록 구현하였습니다.</p>

# Dev Story
## 기여한 사람들

| [🍑 Minsu](https://github.com/jominsu0103) | [🍇 Jinseo](https://github.com/coderjins) | [🥑 Hyunsu](https://github.com/chs991209) | [🥝 Youngbeom](https://github.com/pc0bum) | [🍋 Jiyeong](https://github.com/hjy961021) | [🍍 Juhee](https://github.com/Haze10425) | [🍹 Minji](https://github.com/fullminji) | [🍒 Seongho](https://github.com/rlatjdgh9612) 
|--------------------------------------------|---------------------------------------------|-------------------------------------------|--------------------------------------------|--------------------------------------------|-----------------------------------------|--------------------------------------------|---|

## Dev Note
[이곳](https://www.notion.so/Backend-37830de7c893483cb2bcde0aa2e5a4a3)에 개발 과정을 팀원들이 작성하였습니다.

Backend 관련 notion은 [여기](https://www.notion.so/2-DOBBY-f7a25eea39c8447d8f9366357f57b71c)에 있습니다.

저장소에 별 달아주세요 ✨✨✨
