# <img src="./src/assets/img/defaultcomologo.png"  width="80" height="80"/> **COMO** **_- Cryptocurrency Monitoring Chrome Extension_**

<p align="center">
<br>
<br> 
<img src="./src/assets/img/como_preview.png"/>
<br>
<br>
가상화폐 시세조회 크롬 익스텐션
</p>

---

## :wrench: Skills

<p align="center">
<br>
Dependencies
<br>
<br>  
<img alt="HTML5" src ="https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white"/>
<img alt="CSS3" src ="https://img.shields.io/badge/CSS3-1572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=white"/>
<img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=white"/>
  <img alt="ES6" src ="https://img.shields.io/badge/ES6-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=white"/>
<img alt="React" src ="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=white"/>
<img alt="Redux" src ="https://img.shields.io/badge/Redux-764ABC.svg?&style=for-the-badge&logo=Redux&logoColor=white"/>
<img alt="Redux-Saga" src ="https://img.shields.io/badge/Redux-Saga-999999.svg?&style=for-the-badge&logo=Redux-Saga&logoColor=white"/>
<br>
<br>  
DevDependencies
<br>
<br>
<img alt="Webpack" src ="https://img.shields.io/badge/Webpack-8DD6F9.svg?&style=for-the-badge&logo=Webpack&logoColor=white"/>
<img alt="Babel" src ="https://img.shields.io/badge/Babel-F9DC3E.svg?&style=for-the-badge&logo=Babel&logoColor=white"/>
<img alt="ESLint" src ="https://img.shields.io/badge/ESLint-4B32C3.svg?&style=for-the-badge&logo=ESLint&logoColor=white"/>
<img alt="Prettier" src ="https://img.shields.io/badge/Prettier-F7B93E.svg?&style=for-the-badge&logo=Prettier&logoColor=white"/>
<img alt="Google Chrome" src ="https://img.shields.io/badge/Google Chrome-4285F4.svg?&style=for-the-badge&logo=Google Chrome&logoColor=white"/>
</p>

---

## Preview

|<img src="./como_gif/COMO_마켓선택.gif"/>|<img src="./como_gif/COMO_거래소.gif"  />|
|:---:|:---:|
|KRW / BTC 마켓 지원|업비트 / 빗썸 지원|
|<img src="./como_gif/COMO_즐겨찾기.gif"/>|<img src="./como_gif/COMO_창확장축소.gif"/>|
|코인 즐겨찾기|창 확대 / 축소|
|<img src="./como_gif/COMO_소팅기능.gif"/>|<img src="./como_gif/COMO_검색기능.gif"/>|
|항목별 내림 / 오름차순 소팅|코인 한글 / 영문 검색|

---

## 프로젝트 구조

```jsx
COMO-Chrome-Extension
└─ src                      # webpack의 entry point 입니다.
  └─ pages                  # exentions 기능별 페이지 분류입니다
    └─ popup                # 해당 프로젝트 메인 팝업의 소스코드입니다
      ├─ Api                # Api를 모아놓은 폴더입니다
      ├─ Components         # 컴포넌트들을 모아놓습니다.
      ├─ Reducer            # Redux Reducer를 모아놓고 관리합니다.
      ├─ Utils              # Redux Action의 함수들을 모아놓고 관리합니다.
```

---

## Architecture

<p align="center">
<img src="./como_gif/Architecture.png"/>
</p >
