// 리액트라우터돔에서 필요한거 불러옴
import { BrowserRouter, Route, Routes } from "react-router-dom";
// 앱css불러옴
import "./App.css";
//홈페이지 컴포넌트 불러옴
import HomePage from "./pages/HomePage";
// 투두디테일페이지 불러옴
import ToDoDetailPage from "./pages/ToDoDetailPage";

function App() {
  return (
    //페이지 만들기 위한 감싸기.
    <BrowserRouter>
      <Routes>
        {/* 페이지로 들어갈 아이들 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/todos/:toDoId" element={<ToDoDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// 앱컴포넌트 내보내기
export default App;

//라우터를 통해 주소 뒤에 들어가는 경로를 지정. 그 경로로 이동하면 각각의 컴포넌트가 실행되어 화면이 나타남.
