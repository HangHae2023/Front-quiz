import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { modalOnOff } from '../../redux/modules/quizSlice';

export const useInput = (initialValue, action, id) => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.quizSlice.modal);
  const [inputValue, setInputValue] = useState(initialValue);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  // formdata는 특수한 객체 형태로서 배열처럼 사용한다.
  const fileInputHandler = (e) => {
    setInputValue({ ...inputValue, resourceUrl: e.target.files[0] });
  };

  const submitInputHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', inputValue.title);
    formData.append('answer', inputValue.answer);
    formData.append('explain', inputValue.explain);
    formData.append('resourceUrl', inputValue.resourceUrl);
    dispatch(action({ formData, inputValue }));
    dispatch(modalOnOff(modalState));
  };

  return [inputValue, onChangeHandler, fileInputHandler, submitInputHandler];
};
