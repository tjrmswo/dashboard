const useDownloadImg = (saveImg, userData) => {
  function downloadImg() {
    const a = document.createElement("a");
    console.log("saveImg: ", saveImg, "userData: ", userData);
    a.href = `${saveImg}`;
    a.download = `${userData[0].userName}_${userData[0].userId}` || "download";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  return downloadImg;
};

export default useDownloadImg;
