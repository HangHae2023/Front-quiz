import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../components/style/StyleButton';
import { StInput } from '../components/style/StyleHome';
import { __addComment, __getComment } from '../redux/modules/quizSlice';
import { cookies } from '../shared/cookie';
import CommentList from './CommentList';


function Comment({ postId }) {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const [commentInput, setCommentInput] = useState("");
  const data = useSelector((state) => state.quizSlice.comment.comments);
  const commentData = data?.filter((item) => item.quizId === postId);
  const isToken = cookies.get('mytoken');

  useEffect(() => {
    dispatch(__getComment(postId));
  }, [JSON.stringify(commentData)]);

  const submitInputHandler = (e) => {
    e.preventDefault();
    if (isToken) {
      dispatch(__addComment({ postId, commentInput }));
      setCommentInput('');
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  const clickInputHandler = () => {
    if (!isToken) {
      window.confirm('로그인이 필요합니다.') && navi('/login');
    }
  };

  return (
    <div>
      <h2>댓글</h2>
      <form
        onSubmit={submitInputHandler}
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <StInput
          onClick={clickInputHandler}
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder={isToken ? '댓글을 작성해주세요' : '로그인 후 이용해주세요'}
        />
        <MainButton type="submit">댓글 작성</MainButton>
      </form>

      {commentData?.map((item) => (
        <div key={item.commentId}>
          <CommentList item={item} />
        </div>
      ))}
    </div>
  );
}

export default Comment;
