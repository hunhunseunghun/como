# **COMO**

![defaultcomologo.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2f71341e-a5d8-44c1-8632-c642dc818ead/defaultcomologo.png)

**Coin Monitoring Chrome Extension**

가상화폐 시세조회 크롬 익스텐션

---

## 프로젝트 구조

```jsx
COMO-Chrome-Extension
└─ src                      # webpack의 entry point 입니다.
    └─ pages                # exentions 기능별 페이지 분류입니다
			   └─ popup           # 해당 프로젝트 메인 팝업의 소스코드입니다
					  ├─ Api          # Api를 모아놓은 폴더입니다
						├─ Components   # 컴포넌트들을 모아놓습니다.
						├─ Reducer      # Redux Reducer를 모아놓고 관리합니다.
						├─ Utils        # Redux Action의 함수들을 모아놓고 관리합니다.
```

## STACK
