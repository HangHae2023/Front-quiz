import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { __getComment } from '../redux/modules/quizSlice';

function Comment({ id, data }) {
  const dispatch = useDispatch();
  const commentData = data.filter((item) => item.postId === id);

  useEffect(() => {
    dispatch(__getComment());
  }, []);

  return (
    <div>
      <h2>댓글</h2>
      {commentData?.map((item) => (
        <div key={item.commentId}>
          {item.nickname} : {item.content}
        </div>
      ))}
    </div>
  );
}

export default Comment;
