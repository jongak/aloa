### Accordion

SPA(single page Application)으로 웹페이지를 만들때 게시판 기능을 만들고 싶으면
아무래도 Accordion 이 필요할순 있다.(보통은 url에 params으로 전달하는게 편하다.)

하지만 한페이지내에서도 정보가 너무 많을떄 접고싶을떄가 있는데 우리가 딱 그경우였다.

bootstrap 에서 제공하는 Accordion 을 사용하려 했으나, 동작하는 것에 제한이 있어  
react-bootstrap 에서 제공하는 Accordion을 사용하게 되었다.

사용법은 간단했다.

### 페이지

```
<Accordion defaultActiveKey={["select", "color"]} alwaysOpen>
  <Accordion.Item eventKey="select">
    <Accordion.Header>카드 테두리</Accordion.Header>
    <Accordion.Body>
      <div className="userRow color">
        ...
      </div>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="color">
    <Accordion.Header>카드 색상</Accordion.Header>
    <Accordion.Body>
      <div className="userRow color">
        ...
      </div>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```

페이지로 쓰기엔 간단하다.

`defaultActiveKey` 여기에 열려있을 것들의 id을 입력해주면되고,
Accordion의 `eventKey` 여기엔 해당 목록의 id을 입력해두면 된다.

#### CSS

```
.accordion {
  --bs-accordion-color: var(--bs-body-color);
  /* 내부배경 */
  --bs-accordion-bg: var(--my--dark--background);
  --bs-accordion-transition: color 0.3s ease-in-out,
    background-color 0.3s ease-in-out, border-color 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out, border-radius 0.3s ease;
  /* 모든선 */
  --bs-accordion-border-color: var(--my--background);
  /* 각요소들 gap */
  --bs-accordion-border-width: 2px;
  /* 가장조상 border-radius */
  --bs-accordion-border-radius: 0px;
  /* 제일위 아래 자식 border-radius */
  --bs-accordion-inner-border-radius: 0px;
  /* 제목의  padding */
  --bs-accordion-btn-padding-x: 50px;
  --bs-accordion-btn-padding-y: 1rem;
  /* 제목의 색 */
  --bs-accordion-btn-color: var(--my--text);
  /* 활성화 안된 제목의배경 색 */
  --bs-accordion-btn-bg: var(--my--dark--background);
  --bs-accordion-btn-icon: null;
  --bs-accordion-btn-icon-width: 1.25rem;
  --bs-accordion-btn-icon-transform: rotate(-180deg);
  --bs-accordion-btn-icon-transition: transform 0.3s ease-in-out;
  --bs-accordion-btn-active-icon: null;
  --bs-accordion-btn-focus-border-color: var(--my--heading);
  /* 포커스된 제목의 border */
  --bs-accordion-btn-focus-box-shadow: 0 0 0 0px var(--my--heading);
  /* 포커스된 내부의 padding */
  --bs-accordion-body-padding-x: 0px;
  --bs-accordion-body-padding-y: 0px;
  /* 포커스된 제목의 color */
  --bs-accordion-active-color: var(--my--thema);
  /* 포커스된 제목의 background */
  --bs-accordion-active-bg: var(--my--very--dark--background);
}

.accordion-item {
  border: 0px solid;
  border-bottom: var(--bs-accordion-border-width) solid
    var(--bs-accordion-border-color);
}

.accordion-button:not(.collapsed) {
  box-shadow: var(--bs-accordion-border-width) var(--bs-accordion-border-color);
}

.accordion-header button {
  font-size: 18px;
  font-weight: 700;
}

.accordion-header .myToggle {
  width: 250px;
  display: contents;
}
.accordion-header .myToggle .switch {
  top: 16px;
  right: 40px;
}
.accordion-header .myToggle .toggleTitle {
  color: var(--my--very--dark--text);
  font-weight: 500;
}
.accordion-header .myToggle .toggleTitle.no {
  color: var(--my--no--text);
  font-weight: 500;
}
```

값을 하나하나 찾아서 수정했던거 같다.

### toggle

토글로 사용하기엔 살짝 어려운 감이 있었는데, 지금은 잘 작동한다

```
<Accordion
  defaultActiveKey={["custom"]}
  onSelect={(eventKey) => {
    if (eventKey[0]) {
      dispatch(
        setRarityPreset({
          newRarityPreset: eventKey[0],
        })
      );
    }
  }}
  activeKey={rarityPreset}
  alwaysOpen
>
  <Accordion.Item eventKey="custom">
    <Accordion.Header>
      <ToggleButton
        titleRef={"custom"}
        title={"Custom"}
        isChanged={isChanged}
        setIsChanged={setIsChanged}
      />
    </Accordion.Header>
    <Accordion.Body>
      <div className="userRow">
        <ToggleButton
          titleRef={"isHolo"}
          title={"홀로그램"}
          body={"반짝이는 효과를 설정합니다."}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
        />
        <ToggleButton
          titleRef={"isGlow"}
          title={"글로우"}
          body={"움직임에 따라 반짝이는 효과를 설정합니다."}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
        />

        <ColorToggle
          optionColors={holographicOptionColors}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
          titleRef={"isGlow"}
        />

        <ToggleButton
          titleRef={"isShine"}
          title={"샤인"}
          body={"빛나는 효과를 설정합니다."}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
        />
        <ColorToggle
          optionColors={shineOptionColors}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
          titleRef={"isShine"}
        />

        <ToggleButton
          titleRef={"isShadow"}
          title={"그림자"}
          body={"그림자를 설정합니다."}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
        />

        <ColorToggle
          optionColors={shadowOptionColors}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
          titleRef={"isShadow"}
        />
      </div>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="legendary">
    <Accordion.Header>
      <ToggleButton
        titleRef={"legendary"}
        title={"Legendary"}
        isChanged={isChanged}
        setIsChanged={setIsChanged}
      />
    </Accordion.Header>
  </Accordion.Item>
  <Accordion.Item eventKey="holographic">
    <Accordion.Header>
      <ToggleButton
        titleRef={"holographic"}
        title={"Holographic"}
        isChanged={isChanged}
        setIsChanged={setIsChanged}
      />
    </Accordion.Header>
  </Accordion.Item>
</Accordion>
```
