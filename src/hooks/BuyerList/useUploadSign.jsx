import axios from 'axios';

const useUploadSign = (data, isSign, setIsSign, user, setUser) => {
  async function uploadSign() {
    if (data.userName !== '최종 제출 전') {
      const { files } = data.target;
      console.log(user);
      const formdata = new FormData();
      formdata.append('file', files[0]);
      try {
        const res = await axios.post(
          import.meta.env.VITE_API_SERVER_ADDRESS + `/admin/bockcover/${user.userSubscribeStory}`,
          formdata,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log(res);
        setUser((prev) => ({
          ...prev,
          sign: res.data.data,
        }));
      } catch (err) {
        console.log(err);
      }
    }

    setIsSign(!isSign);
  }

  return uploadSign;
};

export default useUploadSign;
