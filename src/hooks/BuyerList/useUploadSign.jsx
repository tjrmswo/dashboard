import axios from "axios";

const useUploadSign = (data, isSign, setIsSign, user, setUser) => {
  async function uploadSign() {
    const { id, files } = data.target;

    const formdata = new FormData();
    formdata.append("file", files[0]);
    // console.log(user);
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_ADDRESS +
          `/admin/bockcover/${user[0].userSubscribeStory}`,
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

    setUser((prev) => ({
      ...prev,
      uploadtype: id,
    }));
    setIsSign(!isSign);
  }

  return uploadSign;
};

export default useUploadSign;
