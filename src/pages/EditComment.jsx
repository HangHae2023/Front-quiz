import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { __deleteComment, __editComment } from '../redux/modules/quizSlice';

function EditComment({ item }) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [editComment, setEditComment] = useState({
    // commentId : item.commentId, // 실제서버에서 실행
    commentId: item.id,
    editContent: item.content,
  });

  const submitInputHandler = (e) => {
    e.preventDefault();
    dispatch(__editComment(editComment));
    setEdit(!edit);
  };

  const deleteCommentHandler = (id) => {
    dispatch(__deleteComment(id));
  };

  return (
    <div>
      {edit ? (
        <form onSubmit={submitInputHandler}>
          <input
            type="text"
            value={editComment.editContent}
            onChange={(e) =>
              setEditComment({ ...editComment, editContent: e.target.value })
            }
          />
          <button type="submit">수정완료</button>
        </form>
      ) : (
        <>
          {item.nickname} : {item.content}
          <button onClick={() => setEdit(!edit)}>수정</button>
          {/* <button onClick={()=>deleteCommentHandler(item.commentId)}>삭제</button> // 실제서버 */}
          <button onClick={() => deleteCommentHandler(item.id)}>삭제</button>
        </>
      )}
    </div>
  );
}

export default EditComment;
