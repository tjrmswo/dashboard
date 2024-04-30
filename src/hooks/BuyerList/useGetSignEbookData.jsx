// libraries
import axios from 'axios';

const useGetSignEbookData = (data, setBookCover, setSelectedUserData) => {
  async function getGetSignEbookData() {
    // 병렬 실행을 위해 Promise.all 사용(전자책, 표지 GET)

    if (data.row.userName !== '최종 제출 전') {
      const signData = await getSignData(data.row.userSubscribeStory, data.row.userName);
      const ebookData = await getEbookData(data.row.userSubscribeStory, data.row.userName);

      // console.log('SignData: ', signData);
      // console.log('EbookData: ', ebookData);

      setBookCover((prev) => ({
        sign: signData,
        ebook: ebookData,
      }));
      setSelectedUserData((prev) => ({
        ...prev,
        sign: signData,
        ebook: ebookData,
      }));
    }
  }
  return getGetSignEbookData;
};

export default useGetSignEbookData;

async function getSignData(userSubscribeStory, userName) {
  if (userName !== '최종 제출 전') {
    const sign = await axios.get(
      import.meta.env.VITE_INKINK_ADDRESS + `/admin/bockcover/${userSubscribeStory}`
    );
    const Sign = sign.data.data;
    // console.log('Sign: ', Sign);
    return Sign;
  }
}

async function getEbookData(userSubscribeStory, userName) {
  if (userName !== '최종 제출 전') {
    const ebook = await axios.get(
      import.meta.env.VITE_INKINK_ADDRESS + `/admin/adminImage/${userSubscribeStory}`
    );
    const Ebook = ebook.data.data;
    // console.log('Ebook: ', Ebook);
    return Ebook;
  }
}
