import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { __addComment, __getComment } from '../redux/modules/quizSlice';
import EditComment from './EditComment';

function Comment({ postId, data }) {
  const dispatch = useDispatch();
  const [commentInput, setCommentInput] = useState('');
  const commentData = data?.filter((item) => item.quizId === postId);
  console.log('commentData', commentData);

  useEffect(() => {
    dispatch(__getComment(postId));
  }, [JSON.stringify(commentData)]);
  // commentData,

  const submitInputHandler = (e) => {
    e.preventDefault();
    dispatch(__addComment({ postId, commentInput }));
    setCommentInput('');
  };
  return (
    <div>
      <h2>댓글</h2>
      <div>댓글 입력</div>
      <form onSubmit={submitInputHandler}>
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button type="submit">댓글 작성</button>
      </form>

      {commentData?.map((item) => (
        <div key={item.commentId}>
          <EditComment item={item} />
        </div>
      ))}
    </div>
  );
}

export default Comment;
