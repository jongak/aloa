import { useMemo, useEffect, useState, useRef } from "react";

function App() {
  const number = useRef(1);
  const [isKorea, setIsKorea] = useState(true);

  // 1번 location
  const location = {
    country: isKorea ? "한국" : "일본",
  };

  // 2번 location
  // const location = useMemo(() => {
  //   return {
  //     country: isKorea ? '한국' : '일본'
  //   }
  // }, [isKorea])

  useEffect(() => {
    console.log("useEffect 호출!");
  }, [location]);

  return (
    <header className="App-header">
      <h2>하루에 몇 끼 먹어요?</h2>
      <input type="number" ref={number} />
      <hr />

      <h2>내가 있는 나라는?</h2>
      <p>나라: {location.country}</p>
      <button onClick={() => setIsKorea(!isKorea)}>Update</button>
    </header>
  );
}

export default App;
