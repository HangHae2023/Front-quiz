import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { __getComment } from '../redux/modules/quizSlice';

function Comment({ id, data }) {
  const dispatch = useDispatch();
  // const [comment, setComment] = useState();

  // {
  //   "commentId": 1,
  //   "postId": 1,
  //   "nickname": "testuser1",
  //   "comment": "댓글 입니다.",
  //   "createdAt": "2022년 7월 25일",
  //   "updatedAt": "2022년 7월 25일"
  // }
  const commentData = data.filter((item) => item.postId === id);

  useEffect(() => {
    dispatch(__getComment());
  }, []);

  return (
    <div>
      <h2>댓글</h2>
      {commentData?.map((item) => (
        <div key={item.commentId}>
          {item.nickname} : {item.comment}
        </div>
      ))}
    </div>
  );
}

export default Comment;
