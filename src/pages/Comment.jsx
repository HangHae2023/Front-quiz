import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { __getComment } from '../redux/modules/quizSlice';
import EditComment from './EditComment';

function Comment({ postId, data }) {
  const dispatch = useDispatch();
  const commentData = data?.filter((item) => item.quizId === postId);

  useEffect(() => {
    dispatch(__getComment(postId));
  }, [JSON.stringify(data)]);
  // commentData,
  return (
    <div>
      <h2>댓글</h2>
      {commentData?.map((item) => (
        <div key={item.commentId}>
          <EditComment item={item} />
        </div>
      ))}
    </div>
  );
}

export default Comment;
