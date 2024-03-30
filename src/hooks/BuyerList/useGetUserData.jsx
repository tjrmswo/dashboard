/* eslint-disable react-hooks/rules-of-hooks */
//libraries
import axios from "axios";

const useGetUserData = (
  data,
  setSelectedUserData,
  setRecoilcsvData,
  setRecoilcsvTitle,
  setBookCover
) => {
  async function getUserData() {
    const userSubscribe = await getUserSubscribe(
      data.row.userSubscribeStory,
      data.row.userName
    );
    console.log(userSubscribe);
    setRecoilcsvData({
      csvFilename: userSubscribe.csvFilename,
      answer: [
        {
          people_answer: userSubscribe.userAnswer.answers[0][0],
          ai_answer: userSubscribe.userAnswer.answers[0][1],
        },
      ],
    });
    setRecoilcsvTitle({
      img: userSubscribe.Img,
      userData: {
        userName: data.row.userName,
        userSubscribeStory: data.row.userSubscribeStory,
      },
    });
    setSelectedUserData([
      {
        userId: data.row.userId,
        userName: data.row.userName,
        userPhoneNumber: data.row.userPhoneNumber,
        userAddress: data.row.userAddress,
        userNickname: data.row.userNickname,
        userSubscribeStory: data.row.userSubscribeStory,
        bookCover: userSubscribe.bookCover,
        sign: userSubscribe.sign,
        ebook: userSubscribe.ebook,
        package: data.row.package,
      },
    ]);
    setBookCover([
      {
        sign: userSubscribe.sign,
        ebook: userSubscribe.ebook,
      },
    ]);
  }

  return getUserData;
};
export default useGetUserData;

async function getUserSubscribe(userSubscribeStory, userName) {
  // recent api
  // 답변 & 삽화
  const answer = await axios.get(
    import.meta.env.VITE_API_ADDRESS + `/admin/answers/${userSubscribeStory}`
  );
  const userAnswer = answer.data.data;
  console.log(userAnswer);

  // 표지
  const sign = await axios.get(
    import.meta.env.VITE_API_ADDRESS + `/admin/bockcover/${userSubscribeStory}`
  );
  const Sign = sign.data.data;
  console.log(Sign);

  // 전자책
  const ebook = await axios.get(
    import.meta.env.VITE_API_ADDRESS + `/admin/adminImage/${userSubscribeStory}`
  );
  const Ebook = ebook.data.data;
  console.log(Ebook);

  // recent api
  const csvFilename =
    userName !== undefined
      ? `${userName}_${userSubscribeStory}`
      : "userData.csv";

  return {
    Img: userAnswer.imgLink,
    userAnswer,
    csvFilename,
    sign: Sign,
    ebook: Ebook,
  };
}
