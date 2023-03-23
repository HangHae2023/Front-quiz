import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../axios/api';
import { MainButton } from '../components/style/StyleButton';
import { StInput } from '../components/style/StyleHome';
import { mytoken, __addComment } from '../redux/modules/quizSlice';
import { cookies } from '../shared/cookie';

function AddComment({ param }) {
  const dispatch = useDispatch();
  const token = cookies.get('mytoken');
  const navi = useNavigate();
  const [comment, setComment] = useState({
    commentId: parseInt(param.id),
    quizId: parseInt(param.id),
    content: '',
  });

  const isToken = useSelector((state) => state.quizSlice.istoken);
  const loginck = async () => {
    try {
      await api.get(`/user/loginck`);
      dispatch(mytoken(true));
    } catch (error) {
      dispatch(mytoken(false));
      cookies.remove('mytoken', { path: '/' });
    }
  };

  useEffect(() => {
    if (token) {
      loginck();
    }
  }, [isToken]);

  const onChangeInputHandler = (e) => setComment({ ...comment, content: e.target.value });
  const submitInputHandler = (e) => {
    e.preventDefault();
    dispatch(__addComment(comment));
    setComment({
      commentId: parseInt(param.id),
      quizId: parseInt(param.id),
      content: '',
    });
  };

  const clickPleaseLogin = () => {
    window.confirm('로그인이 필요합니다.') && navi('/login');
  };

  return (
    <div>
      <h2>댓글</h2>
      <form
        onSubmit={submitInputHandler}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        {isToken ? (
          <>
            <StInput
              type="text"
              value={comment.content}
              onChange={onChangeInputHandler}
              placeholder="댓글을 작성해주세요"
            />
            <MainButton type="pupple">댓글 작성</MainButton>
          </>
        ) : (
          <div onClick={clickPleaseLogin}>
            <StInput
              style={{ backgroundColor: 'transparent' }}
              placeholder="로그인 후 이용해주세요"
              disabled
            />
          </div>
        )}
      </form>
    </div>
  );
}

export default AddComment;
