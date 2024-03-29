const useDownloadImg = (userData) => {
  async function downloadImg() {
    const imgUrl = `${userData.img}`;
    console.log(imgUrl);
    const a = document.createElement("a");

    a.href = `${imgUrl}`;
    a.download =
      `${userData.userData.userName}_${userData.userData.userSubscribeStory}` ||
      "userData.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // try {
    //   const response = await fetch(imgUrl);
    //   const blob = await response.blob();

    //   const url = window.URL.createObjectURL(blob);
    //   const a = document.createElement("a");
    //   a.href = url;
    //   a.download =
    //     `${userData.userData.userName}_${userData.userData.userSubscribeStory}` ||
    //     "userData.csv";
    //   document.body.appendChild(a);
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    //   document.body.removeChild(a);
    // } catch (error) {
    //   console.log("파일 다운로드 에러: ", error);
    // }
  }
  return downloadImg;
};

export default useDownloadImg;
