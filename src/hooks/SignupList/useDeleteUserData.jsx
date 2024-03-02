const useDeleteUserData = (
  row,
  recoilDeleteSignupList,
  setRecoilDeleteSignupList
) => {
  function deleteUserData() {
    const deleteRowData = recoilDeleteSignupList.filter(
      (userData) => userData.ID !== row.ID
    );
    setRecoilDeleteSignupList(deleteRowData);
  }

  return deleteUserData;
};

export default useDeleteUserData;
