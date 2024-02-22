/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

//libraries
import axios from "axios";
import { CSVLink } from "react-csv";
import { DataGrid } from "@mui/x-data-grid";
import { DataGridPremium } from "@mui/x-data-grid-premium";

//css
import "../../font.css";

//styles
import {
  Container,
  Form,
  SelectCategory,
  InputContainer,
  SearchIcon,
} from "./styles";

//constants
import { Category } from "../../constans/BuyerList_Constants/selectTag/Catergory";
import { headers } from "../../constans/BuyerList_Constants/csv/CSVheader";
import { answerHeaders } from "../../constans/BuyerList_Constants/csv/CSVAnswerHeader";
import { columnBuyerList } from "../../constans/BuyerList_Constants/table/table_column";

//components
import Paging from "./Paging";

//custom hooks
import UseDownloadImg from "../../hooks/BuyerList/useDownloadImg";
import UseGetUserData from "../../hooks/BuyerList/useGetUserData";
import UseSearchCategory from "../../hooks/BuyerList/useSearchCategory";
import UseFetchData from "../../hooks/BuyerList/useFetchData";

//img
import downloadIcon from "../../assets/download_Icon.png";
import arrowDropdownIcon from "../../assets/arrow_drop_down_Icon.png";
import searchWhite from "../../assets/search_white.png";

const BuyerList = () => {
  const [userList, setUserList] = useState([]);
  const [userData, setUserData] = useState([]);
  const [saveImg, setSaveImg] = useState();
  const [answers, setAnswers] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [category, setCategory] = useState("");

  //Get userData
  const getUserData = (data) => {
    const GetUserData = UseGetUserData(
      data,
      setSaveImg,
      setAnswers,
      setUserData
    );
    GetUserData();
  };

  // Download Img
  const downloadImg = () => {
    const download = UseDownloadImg(saveImg, userData);
    download();
  };

  //Fetch UserList
  const fetchData = async () => {
    const fetch = UseFetchData(setUserList);
    fetch();
  };

  //Upload Img
  const imgUpload = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onload = async () => {
      console.log(reader.result);
      const imgData = reader.result;
      try {
        const response = await axios.post("/upload", {
          picture: imgData,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
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
    // console.log("userData: ", userData);
    // console.log("category: ", category);
    // console.log("searchData: ", searchData);
  }, [userList, userData]);

  return (
    <Container>
      <div></div>
      <h1 className="buyerList">구매자 리스트</h1>
      <div className="SearchContainer">
        <Form>
          <SelectCategory
            name="category"
            onChange={(e) => selectCategory(e.target.value)}
          >
            {Category.map((user, i) => (
              <option key={i} value={user.id}>
                {user.category}
              </option>
            ))}
          </SelectCategory>
        </Form>
        <InputContainer>
          <div className="row">
            <input
              className="input"
              name="category_value"
              onChange={(e) => searchCategory(e.target.value)}
            />
            <SearchIcon src={searchWhite} />
          </div>
        </InputContainer>
      </div>
      <div></div>
      <div className="buyListHeader">구매자 명단</div>
      <div></div>
      <div className="dataContainer">
        <DataGridPremium
          getRowId={(row) => row.userSubscribeStory}
          rows={userList}
          columns={columnBuyerList}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
      <div></div>
    </Container>
  );
};

export default BuyerList;
