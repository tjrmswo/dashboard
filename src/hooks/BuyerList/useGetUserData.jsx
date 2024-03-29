/* eslint-disable react-hooks/rules-of-hooks */
//libraries
import axios from "axios";
import { db } from "@/mocks/db";

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
  // answer
  // const res = await axios.get(
  //   import.meta.env.VITE_API_ADDRESS + `/admin/answers/${userSubscribeStory}`
  // );
  // const response = await axios.get(
  //   import.meta.env.VITE_API_ADDRESS + `/admin/bockcover/${userSubscribeStory}`
  // );
  // const data = res.data.data;
  // const bookCover = response.data.data;
  // console.log(bookCover);
  // const csvData = data.answers.map((datas) => {
  //   return `${datas[0]} ` + datas[1];
  // });

  // msw api
  // 삽화
  const repo = await axios.get(`/getImg/${userSubscribeStory}`);
  const data = repo.data.data;
  // 표지 검색
  const bookCover = db.sign.findFirst({
    where: {
      userSubscribeStoryId: {
        equals: `${userSubscribeStory}`,
      },
    },
  });
  const { sign } = bookCover;

  // 전자책 검색
  const getEbook = db.ebook.findFirst({
    where: {
      userSubscribeStoryId: {
        equals: `${userSubscribeStory}`,
      },
    },
  });

  const csvData = data[0].answers.map((datas) => {
    return `${datas[0]} ` + datas[1];
  });

  // recent api
  const csvFilename =
    userName !== undefined
      ? `${userName}_${userSubscribeStory}`
      : "userData.csv";

  return {
    Img: data[0].imgLink,
    csvData,
    csvFilename,
    sign: sign,
    ebook: getEbook.ebook,
  };

  // recent api
  // return { Img: res.data.data.imgLink, csvData, csvFilename, bookCover };
}
