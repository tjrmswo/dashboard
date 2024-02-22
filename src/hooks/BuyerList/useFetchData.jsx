import axios from "axios";

const useFetchData = (setUserList) => {
  async function fetchData() {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_ADDRESS + "admin/buyer"
      );
      const data = response.data;
      console.log(data);
      if (Array.isArray(data)) {
        setUserList(data);
      } else {
        // 응답이 배열이 아닌 경우 처리
        console.log("Response data is not an array:", data);
        const response = await axios.get(
          import.meta.env.VITE_API_ADDRESS + "admin/buyer"
        );
        setUserList(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return fetchData;
};

export default useFetchData;
