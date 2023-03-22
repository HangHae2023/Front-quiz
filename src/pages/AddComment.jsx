import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../axios/api';
import { MainButton } from '../components/style/StyleButton';
import { StInput } from '../components/style/StyleHome';
import { __addComment } from '../redux/modules/quizSlice';
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
  const [isToken, setIsToken] = useState(false);

  const onChangeInputHandler = (e) => setComment({ ...comment, content: e.target.value });
  const submitInputHandler = (e) => {
    e.preventDefault();
    if (isToken) {
      dispatch(__addComment(comment));
      setComment({
        commentId: parseInt(param.id),
        quizId: parseInt(param.id),
        content: '',
      });
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  const loginck = async () => {
    try {
      // await api.get(`/user/loginck`); // 로그인 유효성검사
      setIsToken(true);
    } catch (error) {
      // cookies.remove('mytoken', { path: '/' });
      // window.confirm('다시 로그인이 필요합니다.') && navi('/login'); // 유효성검사 구현되면 지우기
    }
  };

  useEffect(() => {
    if (token) {
      loginck();
    }
  }, []);

  // const clickInputHandler = async () => {
  //   try {
  //     // await api.get(`/user/loginck`); // 로그인 유효성검사
  //     setIsToken(true);
  //   } catch {
  //     // cookies.remove('mytoken', { path: '/' });
  //     // setIsToken(false);
  //     // window.confirm('다시 로그인이 필요합니다.') && navi('/login'); // 유효성검사 구현되면 지우기
  //   }
  // };

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
