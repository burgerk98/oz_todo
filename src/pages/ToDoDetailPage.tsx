//리액트라우터돔에서 URL 매개변수를 추출하기 위해 useParams 훅을 사용
import { useParams } from "react-router-dom";

function ToDoDetailPage() {
  //유즈파람스를 호출해 URL매개변수를 가져온다.
  //(URL값을 가져온다.)
  const params = useParams();
  // URL매개변수 중에서 toDoId값을 추출한다
  //(파람스에서 toDoId값을 받아 경로의 뒷부분을 페이지에 표현.)
  const toDoId = params.toDoId;

  //클릭하면 투두와 함께 투두아이디가 적힌 창으로 이동.
  return <div>투두 {toDoId}</div>;
}

export default ToDoDetailPage;
