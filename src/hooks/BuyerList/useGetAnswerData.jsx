// libraries
import axios from 'axios';

const useGetAnswerData = (
  data,
  setRecoilAnswerDownloadData,
  setRecoilImgDownloadData,
  recoilAnswerDownloadData,
  setUserAnswer,
  userAnswer
) => {
  async function useGetAnswerData() {
    const answerData = await answerDownloadData(data.row.userSubscribeStory, data.row.userName);
    console.log(answerData);

    // answer
    const { answers } = answerData.userAnswer;

    // file name
    const { csvFilename } = answerData;

    // imgLink
    const { imgLink } = answerData.userAnswer;

    if (userAnswer.csvFilename !== csvFilename) {
      setUserAnswer((prev) => ({
        ...prev,
        answer: [],
      }));
      answers.map((answer) => {
        setUserAnswer((prev) => ({
          csvFilename,
          answer: [
            ...prev.answer,
            {
              people_answer: answer[0],
              ai_answer: answer[1],
            },
          ],
        }));
      });
    } else {
      if (userAnswer.answer.length === 1) {
        answers.map((answer) => {
          setUserAnswer((prev) => ({
            csvFilename,
            answer: [
              ...prev.answer,
              {
                people_answer: answer[0],
                ai_answer: answer[1],
              },
            ],
          }));
        });
      }
    }

    setRecoilImgDownloadData({
      img: imgLink,
      userData: csvFilename,
    });
  }
  return useGetAnswerData;
};

export default useGetAnswerData;

async function answerDownloadData(userSubscribeStory, userName) {
  // 답변 & 삽화
  const answer = await axios.get(
    import.meta.env.VITE_API_SERVER_ADDRESS + `/admin/answers/${userSubscribeStory}`
  );
  const userAnswer = answer.data.data;

  const csvFilename = userName !== undefined ? `${userName}_${userSubscribeStory}` : 'userData.csv';

  return { userAnswer, csvFilename };
}
