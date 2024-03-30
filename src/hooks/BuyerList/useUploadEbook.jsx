import axios from "axios";

const useUploadEbook = (data, isEbook, setIsEbook, user) => {
  async function uploadEbook() {
    const { files } = data.target;

    const formdata = new FormData();
    formdata.append("file", files[0]);
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_ADDRESS +
          `/admin/ebooks/${user[0].userSubscribeStory}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return uploadEbook;
};

export default useUploadEbook;
