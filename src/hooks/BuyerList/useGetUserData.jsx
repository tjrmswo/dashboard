const useGetUserData = (data, setSaveImg, setAnswers, setUserData) => {
  function getUserData() {
    setSaveImg(data.img);
    setAnswers([
      {
        people_answer: data.people_answer,
        ai_answer: data.ai_answer,
      },
    ]);
    setUserData([
      {
        userId: data.id,
        userName: data.name,
        userPhoneNumber: data.phone,
        userAddress: data.address,
        userNickname: data.nickname,
      },
    ]);
  }

  return getUserData;
};
export default useGetUserData;
