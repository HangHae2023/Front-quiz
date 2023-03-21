import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Flexdiv } from '../components/page';
import { MainButton } from '../components/style/StyleButton';
import { StInput } from '../components/style/StyleHome';
import { __addComment, __getComment } from '../redux/modules/quizSlice';
import { cookies } from '../shared/cookie';
import CommentList from './CommentList';

function Comment() {
  console.log('comment rendering');

  const param = useParams();
  const token = cookies.get('mytoken');
  const navi = useNavigate();
  const dispatch = useDispatch();
  const [comment, setComment] = useState({
    commentId: parseInt(param.id),
    quizId: parseInt(param.id),
    content: '',
  });
  const data = useSelector((state) => state.quizSlice.comment);
  
  const commentData = data?.filter((item) => item.quizId === parseInt(param.id));

  useEffect(() => {
    dispatch(__getComment(param.id));
  }, [JSON.stringify(commentData)]);

  const submitInputHandler = (e) => {
    e.preventDefault();
    if (token) {
      dispatch(__addComment(comment));
      setComment('');
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  const clickInputHandler = () => {
    if (!token) {
      window.confirm('로그인이 필요합니다.') && navi('/login');
    }
  };

  return (
    <div>
      <h2>댓글</h2>
      <form
        onSubmit={submitInputHandler}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <StInput
          onClick={clickInputHandler}
          type="text"
          value={comment.content}
          onChange={(e) => setComment({ ...comment, content: e.target.value })}
          placeholder={token ? '댓글을 작성해주세요' : '로그인 후 이용해주세요'}
        />
        <MainButton type="pupple">댓글 작성</MainButton>
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
