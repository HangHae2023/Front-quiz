import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { modalOnOff, __editQuiz } from '../redux/modules/quizSlice';

function Edit({ item }) {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.quizSlice.modal);
  const [edit, setEdit] = useState({
    // id: item.postId, // 실제 서버에서 사용
    id: item.id,
    title: item.title,
    answer: item.answer,
    explain: item.explain,
    resourceUrl: null,
  });

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  const fileInputHandler = (e) => {
    setEdit({ ...edit, resourceUrl: e.target.files[0] });
  };

  const submitInputHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', edit.title);
    formData.append('answer', edit.answer);
    formData.append('explain', edit.explain);
    formData.append('resourceUrl', edit.resourceUrl);
    setEdit({ ...edit, resourceUrl: formData });
    // const finishEdit = { edit, formData };
    dispatch(__editQuiz(edit));
    dispatch(modalOnOff(modalState));
  };
  return (
    <form onSubmit={submitInputHandler}>
      <input type="text" name="title" value={edit.title} onChange={changeInputHandler} />
      <input
        type="text"
        name="answer"
        value={edit.answer}
        onChange={changeInputHandler}
      />
      <input
        type="text"
        name="explain"
        value={edit.explain}
        onChange={changeInputHandler}
      />
      <input type="file" onChange={fileInputHandler} />
      <button type="submit">수정완료</button>
    </form>
  );
}

export default Edit;
