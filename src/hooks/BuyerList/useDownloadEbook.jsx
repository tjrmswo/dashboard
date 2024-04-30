const useDownloadEbook = (bookCover, csvFilename) => {
  async function downloadEbook() {
    const imgURL = `${bookCover.ebook}`;
    try {
      const response = await fetch(imgURL);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      // 추 후 선택된 유저 이름을 넣을 수 있게 변경
      a.download = `${csvFilename}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (e) {
      console.log(e);
    }
  }
  return downloadEbook;
};

export default useDownloadEbook;
