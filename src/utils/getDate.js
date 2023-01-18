const getTime = (time) => {
  if (time < 60 * 1000) return "방금 전";
  if (time < 60 * 60 * 1000) return `${parseInt(time / (60 * 1000))}분 전`;
  if (time < 24 * 60 * 60 * 1000) return `${parseInt(time / (60 * 60 * 1000))}시간 전`;
  return null;
};

const getDate = (updatedAt) => {
  const date = new Date(updatedAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const time = Date.now() - Number(new Date(updatedAt));
  const timeString = getTime(time) || date;
  return timeString;
};

export default getDate;
