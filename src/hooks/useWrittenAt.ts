const useWrittenAt = (createdComment: string) => {
  const date = new Date().getTime() - new Date(createdComment).getTime();
  const seconds = Math.floor(date / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days === 0 && hours === 0 && minutes === 0) return `${seconds}초 전`;
  else if (days === 0 && hours === 0 && minutes !== 0) return `${minutes}분 전`;
  else if (days === 0 && hours !== 0) return `${hours}시간 전`;
  else if (days !== 0) return `${days}일 전`;
};

export default useWrittenAt;
