/* eslint-disable react-hooks/rules-of-hooks */
//libraries
import axios from 'axios';

const useGetUserData = (data, setSelectedUserData, setRecoilImgDownloadData) => {
  async function getUserData() {
    const userSubscribe = await getUserSubscribe(data.row.userSubscribeStory, data.row.userName);
    // console.log('get row data: ', data.row);
    if (data.row.userName !== '최종 제출 전') {
      setRecoilImgDownloadData({
        img: userSubscribe.Img,
        userData: {
          userName: data.row.userName,
          userSubscribeStory: data.row.userSubscribeStory,
        },
      });
      setSelectedUserData({
        userId: data.row.userId,
        userName: data.row.userName,
        userPhoneNumber: data.row.phone,
        userAddress: data.row.address,
        userNickname: data.row.userNickname,
        userSubscribeStory: data.row.userSubscribeStory,
        bookCover: userSubscribe.Img,
        sign: '',
        ebook: '',
        package: data.row.package,
        userEmail: data.row.userEmail,
      });
    }
  }

  return getUserData;
};
export default useGetUserData;

async function getUserSubscribe(userSubscribeStory, userName) {
  // console.log(userName);
  // 답변 & 삽화
  if (userName !== '최종 제출 전') {
    const answer = await axios.get(
      import.meta.env.VITE_INKINK_ADDRESS + `/admin/answers/${userSubscribeStory}`
    );
    const userAnswer = answer.data.data;
    // console.log("userAnswer: ", userAnswer);

    // recent api
    const csvFilename =
      userName !== undefined ? `${userName}_${userSubscribeStory}` : 'userData.csv';

    return {
      Img: userAnswer.imgLink,
      userAnswer,
      csvFilename,
    };
  }
}
