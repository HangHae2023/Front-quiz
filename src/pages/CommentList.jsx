import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Flexdiv } from '../components/page';
import { MainButton } from '../components/style/StyleButton';
import { StContent, StInput } from '../components/style/StyleHome';
import { __deleteComment, __editComment } from '../redux/modules/quizSlice';
import api from '../axios/api';

function CommentList({ item }) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState({
    editModal: false,
    editAuth: false,
  });

  const [editComment, setEditComment] = useState({
    commentId: item.commentId,
    content: item.content,
  });
  const date = item?.createdAt?.split('T')[0];
  const submitInputHandler = (e) => {
    e.preventDefault();
    dispatch(__editComment(editComment));
    setEdit(!edit);
  };

  const deleteCommentHandler = (id) => {
    dispatch(__deleteComment(id));
  };

  const comentAuthCk = async () => {
    try {
      await api.get(`/api/comment/authChk/${item.commentId}`);
      setEdit(!edit.editAuth);
    } catch (error) {}
  };
  return (
    <div>
      {edit ? (
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
          <p style={{ fontSize: '13px', marginLeft: '17px' }}>{date}</p>
          <Flexdiv ai="center" jc="space-between">
            <div>
              <p>{item.User?.nickname}</p>
              {item.content}
            </div>

            <Flexdiv ai="center">
              <MainButton onClick={() => setEdit(!edit.editModal)}>수정</MainButton>
              <MainButton
                type="blue"
                onClick={() => deleteCommentHandler(item.commentId)}
              >
                삭제
              </MainButton>
            </Flexdiv>
          </Flexdiv>
        </StContent>
      )}
    </div>
  );
}

export default CommentList;
