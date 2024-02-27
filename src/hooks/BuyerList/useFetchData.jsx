import axios from "axios";

const useFetchData = (setUserList) => {
  async function fetchData() {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_ADDRESS + "admin/buyer"
      );
      const data = response.data;
      // const response = await axios.get("/fetchData");
      // const data = response.data;

      // console.log(data);
      if (Array.isArray(data)) {
        const addPackage = data.map((item) => ({
          ...item,
          package: `${item.answerCount} / ${item.questionCount}`,
          answer: "바로가기",
        }));
        console.log(addPackage);
        setUserList(addPackage);
      } else {
        // 응답이 배열이 아닌 경우 처리
        console.log("Response data is not an array:", data);
        // const response = await axios.get(
        //   import.meta.env.VITE_API_ADDRESS + "admin/buyer"
        // );
        // setUserList(response.data.data);

        const addPackage = data.data.map((item) => ({
          ...item,
          package: `${item.answerCount} / ${item.questionCount}`,
          answer: "바로가기",
        }));
        setUserList(addPackage);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return fetchData;
};

export default useFetchData;