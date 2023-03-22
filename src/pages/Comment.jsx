import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { __addComment, __getComment } from '../redux/modules/quizSlice';
import AddComment from './AddComment';
import CommentList from './CommentList';

function Comment() {
  console.log('comment rendering');

  const param = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.quizSlice.comment);
  const commentData = data?.filter((item) => item.quizId === parseInt(param.id));

  useEffect(() => {
    dispatch(__getComment(param.id));
  }, [JSON.stringify(commentData)]);

  return (
    <div>
      <AddComment param={param} />
      {commentData?.map((item) => (
        <div key={item.commentId}>
          <CommentList item={item} />
        </div>
      ))}
    </div>
  );
}

export default Comment;
