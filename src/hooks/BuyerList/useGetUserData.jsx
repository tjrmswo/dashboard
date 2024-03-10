/* eslint-disable react-hooks/rules-of-hooks */
//libraries
import axios from "axios";

const useGetUserData = (
  data,
  setSelectedUserData,
  setRecoilcsvData,
  setRecoilcsvTitle
) => {
  async function getUserData() {
    const userSubscribe = await getUserSubscribe(
      data.row.userSubscribeStory,
      data.row.userName
    );
    setRecoilcsvData({
      csvFilename: userSubscribe.csvFilename,
      answer: [
        {
          people_answer: userSubscribe.csvData[0],
          ai_answer: userSubscribe.csvData[1],
          etc: userSubscribe.csvData[2],
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
        userPhoneNumber: data.row.phone,
        userAddress: data.row.address,
        userNickname: data.row.userNickname,
        userSubscribeStory: data.row.userSubscribeStory,
        bookCover: userSubscribe.bookCover,
      },
    ]);
  }

  return getUserData;
};
export default useGetUserData;

async function getUserSubscribe(userSubscribeStory, userName) {
  const res = await axios.get(`/api/admin/answers/${userSubscribeStory}`);
  const response = await axios.get(
    `/api/admin/bockcover/${userSubscribeStory}`
  );

  console.log(response);

  const data = res.data.data;
  const bookCover = response.data.data;

  const csvData = data.answers.map((datas) => {
    return `${datas[0]} ` + datas[1];
  });

  const csvFilename =
    userName !== undefined
      ? `${userName}_${userSubscribeStory}`
      : "userData.csv";

  return { Img: res.data.data.imgLink, csvData, csvFilename, bookCover };
}
