import { useInput } from '../components/hooks/useInput';
import { MainButton } from '../components/style/StyleButton';
import { StForm, StInput, StLabel } from '../components/style/StyleHome';
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
    __addQuiz
  );

  return (
    <StForm onSubmit={submitInputHandler}>
      <StLabel>
        퀴즈는 무엇인가요?
        <StInput
          type="text"
          name="title"
          placeholder="질문을 입력하세요"
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
    </StForm>
  );
}

export default AddQuiz;
