import { useInput } from '../components/hooks/useInput';
import { Flexdiv } from '../components/page';
import { MainButton } from '../components/style/StyleButton';
import { StInput, StLabel } from '../components/style/StyleHome';
import { __addQuiz } from '../redux/modules/quizSlice';

function AddQuiz() {
  const newQuiz = {
    title: '',
    answer: '',
    explain: '',
    resourceUrl: null,
  };

  const [inputValue, onChangeHandler, fileInputHandler, submitInputHandler] = useInput(
    newQuiz,
    __addQuiz,
    null
  );

  return (
    <Flexdiv fd="column" ai="flex-start">
      <form style={{ gap: '15px' }} onSubmit={submitInputHandler}>
        <StLabel>
          어떤 퀴즈를 내볼까요?
          <StInput
            type="text"
            name="title"
            placeholder="퀴즈를 입력하세요"
            value={inputValue.title}
            onChange={onChangeHandler}
          />
        </StLabel>

        <StLabel>
          정답은 !?
          <StInput
            type="text"
            name="answer"
            placeholder="정답을 입력하세요"
            value={inputValue.answer}
            onChange={onChangeHandler}
          />
        </StLabel>

        <StLabel>
          퀴즈에 대한 해설을 적어주세요
          <StInput
            type="text"
            name="explain"
            placeholder="해설을 입력하세요"
            value={inputValue.explain}
            onChange={onChangeHandler}
          />
        </StLabel>

        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={fileInputHandler}
        />
        <MainButton type="blue">퀴즈 추가!</MainButton>
      </form>
    </Flexdiv>
  );
}

export default AddQuiz;
