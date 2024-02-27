const useDownloadImg = (userData) => {
  async function downloadImg() {
    const imgUrl = `${userData.img}`;

    console.log(imgUrl);

    fetch(imgUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download =
          `${userData.userName}_${userData.userSubscribeStory}` || "download";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.log("파일 다운로드 에러: ", error);
      });

    // const a = document.createElement("a");
    // // console.log("userData: ", userData);
    // a.href = `${userData.img}`;
    // a.download =
    //   `${userData.userName}_${userData.userSubscribeStory}` || "download";
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
  }
  return downloadImg;
};

export default useDownloadImg;
