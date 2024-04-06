// libraries
import axios from 'axios';

const useGetSignEbookData = (data, setBookCover, setSelectedUserData) => {
  async function getGetSignEbookData() {
    // 병렬 실행을 위해 Promise.all 사용(전자책, 표지 GET)

    if (data.userName !== '최종 제출 전') {
      const [signData, ebookData] = await Promise.all([
        getSignData(data.row.userSubscribeStory, data.userName),
        getEbookData(data.row.userSubscribeStory, data.userName),
      ]);

      // console.log("SignData: ", signData);
      // console.log("EbookData: ", ebookData);

      setBookCover([
        {
          sign: signData,
          ebook: ebookData,
        },
      ]);
      setSelectedUserData((prev) => [
        {
          ...prev,
          sign: signData ? signData : '데이터가 없습니다.',
          ebook: ebookData ? ebookData : '데이터가 없습니다.',
        },
      ]);
    }
  }
  return getGetSignEbookData;
};

export default useGetSignEbookData;

async function getSignData(userSubscribeStory, userName) {
  if (userName !== '최종 제출 전') {
    const sign = await axios.get(
      import.meta.env.VITE_API_SERVER_ADDRESS + `/admin/bockcover/${userSubscribeStory}`
    );
    const Sign = sign.data.data;
    // console.log("Sign: ",Sign);
    return Sign;
  }
}

async function getEbookData(userSubscribeStory, userName) {
  if (userName !== '최종 제출 전') {
    const ebook = await axios.get(
      import.meta.env.VITE_API_SERVER_ADDRESS + `/admin/adminImage/${userSubscribeStory}`
    );
    const Ebook = ebook.data.data;
    // console.log("Ebook: ",Ebook)
    return Ebook;
  }
}
