// libraries
import axios from 'axios';

const useModifySign = (e, user, setUser) => {
  async function modifySign() {
    const { files } = e.target;

    const formData = new FormData();
    formData.append('file', files[0]);

    console.log(user);

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_SERVER_ADDRESS + `/admin/bockcover/${user.userSubscribeStory}`,
        formData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_SERVER_ADDRESS + `/admin/bockcover/${user.userSubscribeStory}`
      );
      console.log(response.data.data);
      setUser((prev) => ({
        ...prev,
        sign: response.data.data,
        userSubscribeStory: user.userSubscribeStory,
      }));
    } catch (error) {
      console.log(error);
    }
  }
  return modifySign;
};

export default useModifySign;
