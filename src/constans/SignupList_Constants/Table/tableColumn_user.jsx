/* eslint-disable react-hooks/rules-of-hooks */
// libraries
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteCellData } from "../../../atom/state";
import { useRecoilValue, useRecoilState } from "recoil";
import { signupEntireUserList } from "../../../atom/state";

//custom hooks
import useDeleteUserData from "../../../hooks/SignupList/useDeleteUserData";

export const columnData = [
  { field: "id", headerName: "ID", width: 30, editable: true },
  { field: "name", headerName: "이름", width: 70, editable: true },
  { field: "email", headerName: "이메일", width: 150, editable: true },
  { field: "phoneNumber", headerName: "전화번호", width: 130, editable: true },
  { field: "ID", headerName: "아이디", width: 100, editable: true },
  { field: "password", headerName: "비밀번호", width: 100, editable: true },
  {
    field: "deleteUser",
    headerName: "탈퇴",
    width: 100,
    renderCell: () => {
      const deletCellData = useRecoilValue(deleteCellData);
      const [userEntireData, setUserEntireData] =
        useRecoilState(signupEntireUserList);

      const deleteUserData = () => {
        const deleteData = useDeleteUserData(
          deletCellData,
          userEntireData,
          setUserEntireData
        );
        deleteData();
      };
      return (
        <div onClick={deleteUserData}>
          <DeleteOutlineIcon />
        </div>
      );
    },
  },
];
