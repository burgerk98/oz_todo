//리액트 컴포넌트에서 필요한 기능들 불러옴.
import { ChangeEventHandler, useState } from "react";
//리엑트라우터돔 사용해서 불러온거임
import { Link } from "react-router-dom";

//할 일 아이템의 타입지정.
//type으로 타입지정: 복잡한 형태의 데이터 표현(중첩된 구조 같은거)
//interface 객체의 구조를 표현할 때 사용.
type ToDo = {
  id: number;
  title: string;
  content: string;
  isComplete: boolean;
};

//할 일 목록의 타입 정의
//투두리스트는 투두배열 타입을 가짐
type ToDoList = ToDo[];

//안에 들어갈 내용 이니셜 투두리스트-타입은 투두리스트 타입
//초기 할 일 목록 데이터
const initialToDoList: ToDoList = [
  {
    id: 1,
    title: "아침 밥 먹기",
    content: "500kcal 든든히 먹기",
    isComplete: false,
  },
  {
    id: 2,
    title: "점심 밥 먹기",
    content: "700kcal 든든히 먹기",
    isComplete: false,
  },
  {
    id: 3,
    title: "저녁 밥 먹기",
    content: "400kcal 든든히 먹기",
    isComplete: false,
  },
  {
    id: 4,
    title: "야식 먹기",
    content: "1000kcal 든든히 먹기",
    isComplete: false,
  },
];

//홈페이지 안에서 사용할 함수 만들기(홈페이지 컴포넌트)
function HomePage() {
  // 할 일 목록과 입력 필드의 상태를 관리하기 위해 useState 훅 사용

  //이니셜투두리스트(투두리스트 타입을 가진)을 가져옴
  //이니셜 변수를 초기상태로 사용하기 위해 유즈스테이트 훅을 사용할 때 타입을 다시 한번 명시
  //훅을 사용해 초기화? -> 초기 값을 지정해주고 그것을 기반으로 업데이트
  const [toDoList, setToDoList] = useState<ToDoList>(initialToDoList);
  //""를 넣지 않으면 언디파인드가 나오기때문에 넣어줌.
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //클릭하면 리스트 추가하는 버튼(할 일 추가 버튼 클릭 시 호출되는 함수)
  const handleClickAdd = () => {
    //새로운 할 일 객체 생성.
    const newToDo = {
      //랭스의 값이 0부터 시작하기때문에 1을 더해준다. 데이터베이스에서는 일반적으로 1부터 시작하는 아이디 값을 기대하기때문.
      id: toDoList.length + 1,
      title,
      content,
      isComplete: false,
    };

    //깊은복사. 투두리스트를 전개해 뉴투두를 배열의 끝에 추가하는 코드.
    const newToDoList = [...toDoList, newToDo];
    // 투두리스트에 뉴투두를 업데이트 따라서 투두리스트의 배열이 변경되지 않는다.
    setToDoList(newToDoList);
  };

  //타이틀을 작성하기 위한 이벤트 함수. 타입은 온체인지에 마우스를 올렸을 때 떠오르는 타입을 복사해 사용.
  const handleChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    //이벤트가 발생한 요소의 값을 가져와 셋타이틀의 상태를 업데이트해준다.
    setTitle(e.target.value);
  };

  //내용을 작성하기 위한 이벤트 함수. 타입은 온체인지에 마우스를 올렸을 때 떠오르는 타입을 복사해 사용해준다.
  const handleChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  //리스트를 삭제하기 위한 코드. 리스트 삭제, 토글을 위해 toDoId라는 변수 새로 지정.
  const handleClickDelete = (toDoId: number) => {
    //newToDoList가 각 다른 함수에서 사용되므로 새로 선언되어도 된다.
    //새로운 할 일 목록을 필터링해 삭제할 항목을 제외한 새로운 배열을 만든다.
    const newToDoList = toDoList.filter((toDo) => {
      return toDo.id !== toDoId;
    });
    //셋투두에 뉴투두 업데이트.
    setToDoList(newToDoList);
  };

  //리스트 완료 토글버튼 관련 함수
  //위와 다른 함수이기에 toDoId를 새로 지정하고 타입도 새로 명시해준다.
  const handleClicktoggleIsComplete = (toDoId: number) => {
    //find함수: 배열을 순회하면서 주어진 조건을 만족하는 첫번째 요소를 반환. 조건을만족하는 요소가 없으면 언디파인드
    //toDoList에서 toDo.id와 toDoId의 값이 같은것을 찾고
    const targetToDo = toDoList.find((toDo) => toDo.id === toDoId);
    //targetToDo에서 언디파인이 나온다면 함수 종료.
    if (!targetToDo) return;
    //조건이 맞는다면
    //토글표현.
    targetToDo.isComplete = !targetToDo.isComplete;
    //toDoList를 깊은복사해서
    const newToDoList = [...toDoList];
    //셋투두리스트에 업데이트
    setToDoList(newToDoList);
  };

  return (
    <div>
      <h1>할 일 목록</h1>
      <hr />
      {/* 왜 벨류와 온체인지가 들어가는지 정확히 이해하진 못했지만 글쓰는곳엔 들어간다. 타이틀을 잡고있어 타이틀이 표현되는것. */}
      <input value={title} onChange={handleChangeTitle} placeholder="title" />
      <textarea
        value={content}
        onChange={handleChangeContent}
        placeholder="content"
      />
      <button onClick={handleClickAdd}>추가하기</button>
      <hr />

      <ul>
        {toDoList.map((toDo) => (
          <li key={toDo.id}>
            {/* 리액트라우터돔을 이요한 link연결 */}
            <Link to={`/todos/${toDo.id}`}>
              {/* 완료 선택 시 선쳐지는 효과 삼항연산자 표현 */}
              <span
                style={{
                  textDecoration: toDo.isComplete ? "Line-through" : "none",
                }}
              >
                {toDo.title}
              </span>
              <button onClick={() => handleClickDelete(toDo.id)}>삭제</button>
              <button onClick={() => handleClicktoggleIsComplete(toDo.id)}>
                {toDo.isComplete ? "완료취소" : "완료"}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 홈페이지 컴포넌트를 내보냄(대표?컴포넌트 default)
export default HomePage;
