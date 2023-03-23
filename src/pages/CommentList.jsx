import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Flexdiv } from '../components/page';
import { MainButton } from '../components/style/StyleButton';
import { StContent, StInput } from '../components/style/StyleHome';
import { __deleteComment, __editComment } from '../redux/modules/quizSlice';
import api from '../axios/api';
import { cookies } from '../shared/cookie';
import { useSelector } from 'react-redux';
import { Day } from '../shared/Day';
// import dayjs from 'dayjs';

function CommentList({ item }) {
  const dispatch = useDispatch();
  const token = cookies.get('mytoken');
  const isToken = useSelector((state) => state.quizSlice.istoken);
  const [edit, setEdit] = useState({
    editInput: false,
    editAuth: false,
  });

  const [editComment, setEditComment] = useState({
    commentId: item.commentId,
    content: item.content,
  });

  const submitInputHandler = (e) => {
    e.preventDefault();
    dispatch(__editComment(editComment));
    setEdit({ ...edit, editInput: false });
  };

  const deleteCommentHandler = (id) => {
    dispatch(__deleteComment(id));
  };

  const comentAuthCk = async () => {
    try {
      await api.get(`/api/comment/authChk/${item.commentId}`);
      setEdit({ ...edit, editAuth: true });
    } catch (error) {
      setEdit({ ...edit, editAuth: false });
    }
  };

  useEffect(() => {
    if (token) {
      comentAuthCk();
    } else {
      setEdit({ ...edit, editAuth: false });
    }
  }, [isToken]);

  return (
    <div>
      {edit.editInput ? (
        <Flexdiv fd="column" jc="space-between">
          <StContent>
            <form
              onSubmit={submitInputHandler}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: '20px',
              }}
            >
              <StInput
                type="text"
                value={editComment.content}
                onChange={(e) =>
                  setEditComment({ ...editComment, content: e.target.value })
                }
              />
              <Flexdiv ai="center" jc="space-between" style={{ margin: '10px 0' }}>
                <MainButton type="submit">수정완료</MainButton>
              </Flexdiv>
            </form>
          </StContent>
        </Flexdiv>
      ) : (
        <StContent>
          <Flexdiv jc="flex-end" style={{ fontSize: '13px', paddingTop: '10px' }}>
            {Day(item?.createAt)}
          </Flexdiv>
          <Flexdiv ai="center" jc="space-between">
            <div>
              <p>{item.User?.nickname}</p>
              {item.content}
            </div>
            {edit.editAuth && (
              <Flexdiv ai="center" style={{ gap: '7px' }}>
                <MainButton onClick={() => setEdit({ ...edit, editInput: true })}>
                  수정
                </MainButton>
                <MainButton
                  type="blue"
                  onClick={() => deleteCommentHandler(item.commentId)}
                >
                  삭제
                </MainButton>
              </Flexdiv>
            )}
          </Flexdiv>
        </StContent>
      )}
    </div>
  );
}

export default CommentList;
