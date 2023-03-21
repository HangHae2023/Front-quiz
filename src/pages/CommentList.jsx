import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Flexdiv } from '../components/page';
import { MainButton } from '../components/style/StyleButton';
import { StContent, StForm, StInput } from '../components/style/StyleHome';
import { __deleteComment, __editComment } from '../redux/modules/quizSlice';

function CommentList({ item }) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
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
              <p>{item.User.nickname}</p>
              {item.content}
            </div>

            <Flexdiv ai="center">
              <MainButton onClick={() => setEdit(!edit)}>수정</MainButton>
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
