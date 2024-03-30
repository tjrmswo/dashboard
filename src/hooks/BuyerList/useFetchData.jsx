import axios from "axios";

const useFetchData = (setUserList) => {
  async function fetchData() {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_ADDRESS + "/admin/buyer"
      );
      const data = response.data.data;

      if (Array.isArray(data)) {
        const addPackage = data.map((item) => {
          if (item.answerCount !== item.questionCount) {
            return {
              ...item,
              package: `${item.answerCount} / ${item.questionCount}`,
              answer: "바로가기",
            };
          } else {
            return {
              ...item,
              package: "제출",
              answer: "바로가기",
            };
          }
        });
        setUserList(addPackage);
      } else {
        // 응답이 배열이 아닌 경우 처리
        console.log("Response data is not an array:", data);

        const addPackage = data.map((item) => {
          // const questionCount =
          if (
            typeof item.answerCount === "number" &&
            typeof item.questionCount === "number"
          ) {
            return {
              ...item,
              package: `${item.answerCount} / ${item.questionCount}`,
              answer: "바로가기",
            };
          } else {
            return {
              ...item,
              package: "제출",
              answer: "바로가기",
            };
          }
        });
        setUserList(addPackage);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return fetchData;
};

export default useFetchData;
