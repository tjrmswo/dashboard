/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
//libraries
import axios from "axios";
import { CSVLink } from "react-csv";

//css
import "../../font.css";

//styles
import {
  Container,
  Form,
  SelectCategory,
  InputContainer,
  DownloadImg,
  AddressdownloadImg,
  DropdownImg,
  StateDropdownImg,
  UploaddropdownImg,
  SearchIcon,
} from "./styles";

//constants
import { Category } from "../../constans/Catergory";
import { headers } from "../../constans/CSVheader";
import { answerHeaders } from "../../constans/CSVAnswerHeader";

//components
import Paging from "./Paging";

// components
import Paging from "./Paging";

//custom hooks

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
    setSaveImg(data.img);
    setAnswers([
      {
        people_answer: data.people_answer,
        ai_answer: data.ai_answer,
      },
    ]);
    setUserData([
      {
        userId: data.id,
        userName: data.name,
        userPhoneNumber: data.phone,
        userAddress: data.address,
        userNickname: data.nickname,
      },
    ]);
  };

  // Download Img
  const downloadImg = () => {
    const a = document.createElement("a");
    a.href = `${saveImg}`;
    a.download = `${userData[0].userName}_${userData[0].userId}` || "download";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  //Fetch UserList
  const fetchData = async () => {
    try {
      const response = await axios.get("/fetchData");
      const data = response.data;
      if (Array.isArray(data)) {
        setUserList(data);
      } else {
        // 응답이 배열이 아닌 경우 처리
        console.log("Response data is not an array:", data);
        const response = await axios.get("/fetchData");
        setUserList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
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
    const detailSearch = userList.filter((item) => {
      return item[category].includes(searchData);
    });
    console.log("detailSearch: ", detailSearch);
    setSearchData(detailSearch);
  };

  //select category
  const selectCategory = (value) => {
    setCategory(value);
  };

  useEffect(() => {
    fetchData();
  }, [setUserList]);


  // useEffect(() => {
  //   console.log("userList: ", userList);
  //   console.log("category: ", category);
  //   console.log("searchData: ", searchData);
  // }, [userList, searchData, category]);

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
      <div className="categoryRow">
        <div className="categorySmallRow">
          <div className="numberRow">
            <div className="number">번호 </div>
            <div className="divider">|</div>
          </div>
          <div className="uniqueNumberRow">
            <div className="uniqueNumber">고유번호</div>
            <div className="divider">|</div>
          </div>
          <div className="nameRow">
            <div className="name">이름</div>
            <div className="divider">|</div>
          </div>
          <div className="phoneNumberRow">
            <div className="phoneNumberContainer">
              <div className="phoneNumber">전화번호</div>
              <div className="divider">|</div>
            </div>
          </div>
          <div className="nicknameRow">
            <div className="nickname">닉네임</div>
            <div className="nickname_divider">|</div>
          </div>
          <div className="addressRow">
            <div className="addressContainer">
              <div className="address">주소</div>
              <CSVLink
                data={userData}
                headers={headers}
                filename={
                  userData.length > 0
                    ? `${userData[0].userName}_${userData[0].userId}`
                    : "userData.csv"
                }
                target="_blank"
              >
                <AddressdownloadImg src={downloadIcon} onClick={downloadImg} />
              </CSVLink>
              <div className="divider">|</div>
            </div>
          </div>
          <div className="couponRow">
            <div className="coupon">쿠폰번호</div>
            <div className="divider">|</div>
          </div>
          <div className="pakageRow">
            <div className="pakageContainer">
              <div className="pakage">패키지</div>
              <DropdownImg src={arrowDropdownIcon} />
              <div className="divider">|</div>
            </div>
          </div>
          <div className="stateRow">
            <div className="stateContainer">
              <div className="state">상태</div>
              <StateDropdownImg src={arrowDropdownIcon} />
              <div className="divider">|</div>
            </div>
          </div>
          <div className="answeRow">
            <div className="answerContainer">
              <div className="answer">답변&삽화</div>
              <DownloadImg src={downloadIcon} />
              <div className="answerdivider">|</div>
            </div>
          </div>
          <div className="uploadRow">
            <div className="uploadContainer">
              <div className="upload">업로드</div>
              <UploaddropdownImg src={arrowDropdownIcon} />
            </div>
          </div>
        </div>
        {searchData.length > 0 ? (
          <div>
            {searchData.map((user, i) => (
              <div
                className="userListcategoryRow"
                key={i}
                onClick={() => getUserData(user)}
              >
                <div className="userListRow">
                  <div className="numberRow">
                    <div className="number">{user.id}</div>
                    <div className="divider">|</div>
                  </div>
                  <div className="uL_uniqueNumberRow">
                    <div className="uL_uniqueNumber">{user.storyId}</div>
                    <div className="uL_uniqueNumber_divider">|</div>
                  </div>
                  <div className="uL_nameRow">
                    <div className="uL_name">{user.name}</div>
                    <div className="divider">|</div>
                  </div>
                  <div className="uL_phoneNumberRow">
                    <div className="uL_phoneNumberContainer">
                      <div className="uL_phoneNumber">{user.phone}</div>
                      <div className="uL_phoneNumber_divider">|</div>
                    </div>
                  </div>
                  <div className="uL_nicknameRow">
                    <div className="uL_nickname">{user.nickname}</div>
                    <div className="uL_nickname_divider">|</div>
                  </div>
                  <div className="uL_addressRow">
                    <div className="uL_addressContainer">
                      <div className="uL_address">{user.address}</div>
                      <div className="divider">|</div>
                    </div>
                  </div>
                  <div className="uL_couponRow">
                    <div className="uL_coupon">{user.coupon}</div>
                    <div className="divider">|</div>
                  </div>
                  <div className="uL_pakageRow">
                    <div className="uL_pakageContainer">
                      <div className="uL_pakage">{user.pakage}</div>
                      <div className="divider">|</div>
                    </div>
                  </div>
                  <div className="uL_stateRow">
                    <div className="uL_stateContainer">
                      <div className="uL_state">{user.status}</div>
                      <div className="divider">|</div>
                    </div>
                  </div>
                  <div className="uL_answeRow">
                    <CSVLink
                      data={answers}
                      headers={answerHeaders}
                      filename={
                        userData.length > 0
                          ? `${userData[0].userName}_${userData[0].userId}`
                          : "userData.csv"
                      }
                      target="_blank"
                    >
                      <div className="uL_answerContainer">
                        <div className="uL_answer">{user.answer}</div>
                        <div className="divider">|</div>
                      </div>
                    </CSVLink>
                  </div>
                  <div className="uL_uploadRow">
                    <div className="uL_uploadContainer">
                      <input
                        type="file"
                        className="uL_sign"
                        onChange={imgUpload}
                      />
                      <input
                        type="file"
                        className="uL_electron"
                        onChange={imgUpload}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div></div>
      <div className="pageContainer">
        <Paging userList={userList} />
      </div>

    </Container>
  );
};

export default BuyerList;
