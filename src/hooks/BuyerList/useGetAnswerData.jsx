// libraries
import axios from 'axios';

const useGetAnswerData = (data, setRecoilImgDownloadData, setUserAnswer, userAnswer) => {
  async function useGetAnswerData() {
    const answerData = await answerDownloadData(data.row.userSubscribeStory, data.row.userName);
    // console.log(answerData);

    // answer
    const { answers } = answerData.userAnswer;

    // file name
    const { csvFilename } = answerData;

    // imgLink
    const { imgLink } = answerData.userAnswer;

    // console.log(answers);
    // const removeNewLint = answers.map((answer) => {
    //   answer.map((a) => {
    //     if (a.includes('\n\n') && a.includes('\n')) {
    //       const remove = a.replace('\n\n', '');
    //       const removeA = remove.replace('\n', '');
    //       console.log(removeA);
    //       return removeA;
    //     } else {
    //       return a;
    //     }
    //   });
    // });

    const removeNewLine = answers.map((answer) =>
      answer.map((a) => {
        if (a.includes('\n\n') && a.includes('\n')) {
          const remove = a.replace(/\n/g, '');
          // console.log(remove);
          return remove;
        } else {
          return a;
        }
      })
    );

    // console.log(removeNewLine);

    if (userAnswer.csvFilename !== csvFilename) {
      setUserAnswer((prev) => ({
        ...prev,
        answer: [],
      }));
      removeNewLine.map((answer) => {
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
        removeNewLine.map((answer) => {
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
    import.meta.env.VITE_INKINK_ADDRESS + `/admin/answers/${userSubscribeStory}`
  );
  const userAnswer = answer.data.data;

  const csvFilename = userName !== undefined ? `${userName}_${userSubscribeStory}` : 'userData.csv';

  return { userAnswer, csvFilename };
}
