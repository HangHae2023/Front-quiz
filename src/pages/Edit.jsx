import { useInput } from '../components/hooks/useInput';
import { Flexdiv } from '../components/page';
import { MainButton } from '../components/style/StyleButton';
import { StInput, StLabel } from '../components/style/StyleHome';
import { __editQuiz } from '../redux/modules/quizSlice';

function Edit({ item }) {
  const edit = {
    id: item.quizId,
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
    <Flexdiv>
      <form style={{ gap: '10px' }} onSubmit={submitInputHandler}>
        <StLabel>
          어떤 퀴즈로 바꾸시나요 ?
          <StInput
            type="text"
            name="title"
            value={inputValue.title}
            onChange={onChangeHandler}
            required
          />
        </StLabel>
        <StLabel>
          바뀐 퀴즈의 정답은 !?
          <StInput
            type="text"
            name="answer"
            value={inputValue.answer}
            onChange={onChangeHandler}
            required
          />
        </StLabel>
        <StLabel>
          퀴즈에 대한 설명을 적어주세요
          <StInput
            type="text"
            name="explain"
            value={inputValue.explain}
            onChange={onChangeHandler}
            required
          />
        </StLabel>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={fileInputHandler}
        />
        <MainButton type="submit">수정완료</MainButton>
      </form>
    </Flexdiv>
  );
}

export default Edit;
