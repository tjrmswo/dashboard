import axios from 'axios';

const useUploadEbook = (data, user, setUser) => {
  async function uploadEbook() {
    if (data.userName !== '최종 제출 전') {
      const { files } = data.target;

      const formdata = new FormData();
      formdata.append('file', files[0]);
      try {
        const res = await axios.post(
          import.meta.env.VITE_API_SERVER_ADDRESS + `/admin/ebooks/${user.userSubscribeStory}`,
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
          ebook: res.data.data,
        }));
      } catch (err) {
        console.log(err);
      }
    }
  }

  return uploadEbook;
};

export default useUploadEbook;
