import { useInput } from '../components/hooks/useInput';
import { MainButton } from '../components/style/StyleButton';
import { StForm, StInput, StLabel } from '../components/style/StyleHome';
import { __editQuiz } from '../redux/modules/quizSlice';

function Edit({ item }) {
  // console.log(item);
  const edit = {
    id: item.quizId,
    // id: item.id,
    title: item.title,
    answer: item.answer,
    explain: item.explain,
    resourceUrl: null,
  };

  const [inputValue, onChangeHandler, fileInputHandler, submitInputHandler] = useInput(
    edit,
    __editQuiz,
    edit.id
  );
  return (
    <StForm onSubmit={submitInputHandler}>
      <StLabel>
        어떤 퀴즈로 바꾸시나요 ?
        <StInput
          type="text"
          name="title"
          value={inputValue.title}
          onChange={onChangeHandler}
        />
      </StLabel>
      <StLabel>
        바뀐 퀴즈의 정답은 !?
        <StInput
          type="text"
          name="answer"
          value={inputValue.answer}
          onChange={onChangeHandler}
        />
      </StLabel>
      <StLabel>
        퀴즈에 대한 설명을 적어주세요
        <StInput
          type="text"
          name="explain"
          value={inputValue.explain}
          onChange={onChangeHandler}
        />
      </StLabel>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={fileInputHandler}
      />
      <MainButton type="submit">수정완료</MainButton>
    </StForm>
  );
}

export default Edit;
