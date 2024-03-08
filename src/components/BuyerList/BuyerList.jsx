/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

//libraries
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useRecoilState } from "recoil";
import {
  csvData,
  csvTitle,
  signModalState,
  selectBuyerListData,
  EbookModalState,
} from "@/atom/state";

//css
import "@/font.css";

//styles
import { Container } from "./styles";

//constants
import { Category } from "@/constans/BuyerList_Constants/selectTag/Catergory";
import { headers } from "@/constans/BuyerList_Constants/csv/CSVheader";
import { answerHeaders } from "@/constans/BuyerList_Constants/csv/CSVAnswerHeader";
import { columnBuyerList } from "@/constans/BuyerList_Constants/table/table_column";

//components
import Modal from "./Modal";

//custom hooks
import UseGetUserData from "@/hooks/BuyerList/useGetUserData";
import UseSearchCategory from "@/hooks/BuyerList/useSearchCategory";
import UseFetchData from "@/hooks/BuyerList/useFetchData";

//img

const BuyerList = () => {
  // modal status
  const [isSign, setIsSign] = useRecoilState(signModalState);
  const [isEbook, setIsEbook] = useRecoilState(EbookModalState);
  //user entire data
  const [userList, setUserList] = useState([]);
  // select user data
  const [selectedUserData, setSelectedUserData] =
    useRecoilState(selectBuyerListData);
  // ai answer and manager answer
  const [recoilcsvData, setRecoilcsvData] = useRecoilState(csvData);
  const [recoilcsvTitle, setRecoilcsvTitle] = useRecoilState(csvTitle);
  // search data(input)
  const [searchData, setSearchData] = useState([]);
  // select category(input)
  const [category, setCategory] = useState("");

  //Get userData
  const getUserData = (data) => {
    const GetUserData = UseGetUserData(
      data,
      setSelectedUserData,
      setRecoilcsvData,
      setRecoilcsvTitle
    );
    GetUserData();
  };

  //Fetch UserList
  const fetchData = async () => {
    const fetch = UseFetchData(setUserList);
    fetch();
  };

  //Upload Img
  const imgUpload = (e) => {
    // const { files } = e.target;
    // const uploadFile = files[0];
    // const reader = new FileReader();
    // reader.readAsDataURL(uploadFile);
    // reader.onload = async () => {
    //   console.log(reader.result);
    //   const imgData = reader.result;
    //   try {
    //     const response = await axios.post("/upload", {
    //       picture: imgData,
    //     });
    //     console.log(response);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
  };

  // search category
  const searchCategory = (searchData) => {
    const SearchCategory = UseSearchCategory(
      searchData,
      userList,
      category,
      setSearchData
    );
    SearchCategory();
  };

  //select category
  const selectCategory = (value) => {
    setCategory(value);
  };

  useEffect(() => {
    fetchData();
  }, [setUserList]);

  useEffect(() => {
    // console.log("userList: ", userList);
    console.log("selectedUserData: ", selectedUserData);
    // console.log("recoilcsvData: ", recoilcsvData);
    // console.log("csvData: ", csvData);
  }, [userList, selectedUserData, recoilcsvData]);

  return (
    <Container isSign={isSign} isEbook={isEbook}>
      <div></div>
      <h1 className="buyerList">구매자 리스트</h1>
      <div className="SearchContainer"></div>
      <div></div>
      <div className="buyListHeader">구매자 명단</div>
      <div></div>
      <div className="dataContainer">
        <DataGrid
          getRowId={(row) => row.userSubscribeStory}
          rows={userList}
          columns={columnBuyerList}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 7 },
            },
          }}
          pageSizeOptions={[8, 10]}
          checkboxSelection
          onCellClick={(cell) => {
            getUserData(cell);
          }}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </div>
      <div></div>
      <div>
        {isSign === true || isEbook === true ? (
          <Modal signState={isSign} ebookState={isEbook} />
        ) : null}
      </div>
    </Container>
  );
};

export default BuyerList;
