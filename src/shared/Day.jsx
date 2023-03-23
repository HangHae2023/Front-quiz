import dayjs from 'dayjs';

export const Day = (createAt) => {
  const now = dayjs().add(9, 'hour');
  const second = now.diff(createAt, 's');
  const minute = now.diff(createAt, 'm');
  const hour = now.diff(createAt, 'h');
  const day = now.diff(createAt, 'd');
  const week = now.diff(createAt, 'w');
  const month = now.diff(createAt, 'M');
  const year = now.diff(createAt, 'y');

  if (second < 60) return `${second}초 전`;
  else if (minute < 60) return `${minute}분 전`;
  else if (hour < 24) return `${hour}시간 전`;
  else if (day < 7) return `${day}일 전`;
  else if (week < 4) return `${week}주 전`;
  else if (month < 12) return `${month}개월 전`;
  else if (year > 1) return `${year}년 전`;
};
