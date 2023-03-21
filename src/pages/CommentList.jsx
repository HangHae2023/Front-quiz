import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MainButton } from '../components/style/StyleButton';
import { __deleteComment, __editComment } from '../redux/modules/quizSlice';

function CommentList({ item }) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [editComment, setEditComment] = useState({
    commentId: item.commentId,
    content: item.content,
  });
  const date = item?.createdAt.split('T')[0];
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
            value={editComment.content}
            onChange={(e) => setEditComment({ ...editComment, content: e.target.value })}
          />
          <MainButton type="submit">수정완료</MainButton>
        </form>
      ) : (
        <>
          <p>작성일 : {date}</p>
          {item.nickname} : {item.content}
          <MainButton onClick={() => setEdit(!edit)}>수정</MainButton>
          <MainButton type="blue" onClick={() => deleteCommentHandler(item.commentId)}>
            삭제
          </MainButton>
        </>
      )}
    </div>
  );
}

export default CommentList;
