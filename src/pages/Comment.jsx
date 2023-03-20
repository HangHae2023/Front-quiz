import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { MainButton } from "../components/style/StyleButton";
import { StInput } from "../components/style/StyleHome";
import { __addComment, __getComment } from "../redux/modules/quizSlice";
import CommentList from "./CommentList";

function Comment({ postId }) {
  const dispatch = useDispatch();
  const [commentInput, setCommentInput] = useState("");
  const data = useSelector((state) => state.quizSlice.comment.comments);
  const commentData = data?.filter((item) => item.quizId === postId);

  useEffect(() => {
    dispatch(__getComment(postId));
  }, [JSON.stringify(commentData)]);

  const submitInputHandler = (e) => {
    e.preventDefault();
    dispatch(__addComment({ postId, commentInput }));
    setCommentInput("");
  };

  const inputRef = () => {
    // inputRef.current.onClick;
    // alert('zz');
  };
  return (
    <div>
      <h2>댓글</h2>
      <form
        onSubmit={submitInputHandler}
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <StInput
          ref={inputRef}
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="댓글을 입력해주세요"
        />&nbsp;&nbsp;
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
