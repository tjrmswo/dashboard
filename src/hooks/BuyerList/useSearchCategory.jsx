const useSearchCategory = (searchData, userList, category, setSearchData) => {
  function searchCategory() {
    const detailSearch = userList.filter((item) => {
      return item[category].includes(searchData);
    });
    console.log("detailSearch: ", detailSearch);
    setSearchData(detailSearch);
  }
  return searchCategory;
};

export default useSearchCategory;
