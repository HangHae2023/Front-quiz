import React, { useState } from 'react';

function Edit({ item }) {
  const [edit, setEdit] = useState({
    title: item.title,
    answer: item.answer,
    explain: item.explain,
    // resourceUrl: File {name: '아키텍처 패턴.png', lastModified: 1678502204605, lastModifiedDate: Sat Mar 11 2023 11:36:44 GMT+0900 (한국 표준시), webkitRelativePath: '', size: 162577, …}
  });

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  const fileInputHandler = () => {
    // 아직요..
  };
  return (
    <form>
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
    </form>
  );
}

export default Edit;
