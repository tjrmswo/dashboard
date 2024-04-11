/* eslint-disable no-unused-vars */
// libraries
import axios from 'axios';

const useModifySign = (e, user, setUser, setDownloadData) => {
  async function modifySign() {
    const { files } = e.target;

    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      const response = await axios.post(
        import.meta.env.VITE_INKINK_ADDRESS + `/admin/bockcover/${user.userSubscribeStory}`,
        formData
      );
      // console.log(response);
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await axios.get(
        import.meta.env.VITE_INKINK_ADDRESS + `/admin/bockcover/${user.userSubscribeStory}`
      );
      // console.log(response.data.data);
      setUser((prev) => ({
        ...prev,
        sign: response.data.data,
        userSubscribeStory: user.userSubscribeStory,
      }));
      setDownloadData((prev) => [
        {
          ...prev[0],
          sign: response.data.data,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }
  return modifySign;
};

export default useModifySign;
