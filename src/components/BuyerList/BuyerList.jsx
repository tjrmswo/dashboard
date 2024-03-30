/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

//libraries
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  csvData,
  csvTitle,
  signModalState,
  selectBuyerListData,
  EbookModalState,
  checkUserData,
} from "@/atom/state";
import { CSVLink } from "react-csv";

//css
import "@/font.css";

//styles
import { Container } from "./styles";
import {
  CSVDownloadButton,
  SubmittedCSVDownloadButton,
  SignButton,
  EbookButton,
  FileUploadContainer,
  SignBtn,
  EbookBtn,
} from "@/constans/BuyerList_Constants/table/styles";

//constants
import { answerHeaders } from "@/constans/BuyerList_Constants/csv/CSVAnswerHeader";

//components
import SignModal from "./Modal";

//custom hooks
import UseGetUserData from "@/hooks/BuyerList/useGetUserData";
import UseSearchCategory from "@/hooks/BuyerList/useSearchCategory";
import UseFetchData from "@/hooks/BuyerList/useFetchData";
import useDownloadImg from "@/hooks/BuyerList/useDownloadImg";
import useUploadEbook from "@/hooks/BuyerList/useUploadEbook";
import useUploadSign from "@/hooks/BuyerList/useUploadSign";
import axios from "axios";

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

  // book cover
  const [bookCover, setBookCover] = useRecoilState(checkUserData);

  //Get userData
  const getUserData = (data) => {
    const GetUserData = UseGetUserData(
      data,
      setSelectedUserData,
      setRecoilcsvData,
      setRecoilcsvTitle,
      setBookCover
    );
    GetUserData();
  };

  //Fetch UserList
  const fetchData = async () => {
    const fetch = UseFetchData(setUserList);
    fetch();
  };

  useEffect(() => {
    fetchData();
  }, [setUserList]);

  useEffect(() => {
    console.log("selectedUserData: ", selectedUserData);
  }, [selectedUserData]);

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
          columns={[
            { field: "userId", headerName: "번호", width: 100 },
            { field: "userName", headerName: "이름", width: 120 },
            { field: "phone", headerName: "전화번호", width: 145 },
            { field: "userNickname", headerName: "닉네임", width: 100 },
            {
              field: "address",
              headerName: "주소",
              width: 220,
            },
            {
              field: "couponNumber",
              headerName: "쿠폰번호",
              width: 100,
              disableExport: true,
            },
            {
              field: "name",
              headerName: "패키지",
              width: 120,
              disableExport: true,
            },
            {
              field: "package",
              headerName: "상태",
              width: 40,
              disableExport: true,
            }, // answerCount + questionCount
            {
              field: "answer",
              headerName: "답변&삽화",
              width: 100,
              renderCell: (params) => {
                const { row } = params;
                const isSubmitted = row.package === "제출";
                const isCompleted = row.answerCount === row.questionCount;
                // 답변
                const data = useRecoilValue(csvData);
                // 삽화
                const title = useRecoilValue(csvTitle);
                const [user, setUser] = useRecoilState(selectBuyerListData);
                // Download Img
                const downloadImg = () => {
                  const download = useDownloadImg(title);
                  download();
                };

                if (isSubmitted) {
                  return (
                    <SubmittedCSVDownloadButton
                      style={{ backgroundColor: "#949591" }}
                    >
                      <CSVLink
                        data={data.answer}
                        headers={answerHeaders}
                        filename={data.csvFilename}
                        onClick={downloadImg}
                      >
                        바로가기
                      </CSVLink>
                    </SubmittedCSVDownloadButton>
                  );
                } else {
                  return (
                    <CSVDownloadButton
                      isSign={isSign}
                      isEbook={isEbook}
                      imgLink={row.imgLink}
                      iscompleted={isCompleted}
                    >
                      <CSVLink
                        data={data.answer}
                        headers={answerHeaders}
                        filename={data.csvFilename}
                        onClick={downloadImg}
                      >
                        바로가기
                      </CSVLink>
                    </CSVDownloadButton>
                  );
                }
              },
              disableExport: true,
            },
            {
              field: "userSubscribeStory",
              headerName: "업로드",
              width: 150,
              disableExport: true,
              renderCell: (params) => {
                const { row } = params;
                const { imgStatus } = params.row;
                const isSubmitted =
                  row.answerCount === row.questionCount ? "제출" : null;
                // 선택된 유저 데이터
                const [user, setUser] = useRecoilState(selectBuyerListData);
                // console.log(user);
                // 이미지 url 추출
                const cover = useRecoilValue(checkUserData);

                // bookCover에 값이 없을 때 표지 업로드 함수 호출
                const handleSign = async (data) => {
                  const uploadSign = useUploadSign(
                    data,
                    isSign,
                    setIsSign,
                    user,
                    setUser
                  );
                  uploadSign();
                };

                const openModal = () => {
                  setIsSign(true);
                };

                // bookCover에 값이 없을 때  전자책 업로드 함수
                const handleEbook = async (data) => {
                  const uplodaEbook = useUploadEbook(
                    data,
                    isEbook,
                    setIsEbook,
                    user
                  );
                  uplodaEbook();
                };

                // 전자책 다운로드
                const downloadEbook = async () => {
                  console.log(bookCover[0].ebook);
                  const imgURL = `${bookCover[0].ebook}`;
                  try {
                    const response = await fetch(imgURL);
                    const blob = await response.blob();

                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");

                    a.href = url;
                    // 추 후 선택된 유저 이름을 넣을 수 있게 변경
                    a.download = `${recoilcsvData.csvFilename}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                  } catch (e) {
                    console.log(e);
                  }
                };

                if (isSubmitted) {
                  return (
                    <FileUploadContainer
                      isSign={isSign}
                      isEbook={isEbook}
                      imgStatus={imgStatus}
                      isSubmitted={isSubmitted}
                    >
                      <label htmlFor="sign" className="signTitle">
                        표지
                      </label>
                      {bookCover[0].sign ? (
                        <SignBtn
                          id="sign"
                          onClick={openModal}
                          isvisible={isSign}
                        />
                      ) : (
                        <SignBtn
                          id="sign"
                          type="file"
                          onChange={(e) => handleSign(e)}
                          isvisible={isSign}
                        />
                      )}
                      <label htmlFor="ebook" className="ebookTitle">
                        전자
                      </label>
                      {bookCover[0].ebook ? (
                        <EbookBtn
                          id="ebook"
                          onClick={downloadEbook}
                          isvisible={isEbook}
                        />
                      ) : (
                        <EbookBtn
                          id="ebook"
                          type="file"
                          onChange={(e) => handleEbook(e)}
                          isvisible={isEbook}
                        />
                      )}
                    </FileUploadContainer>
                  );
                } else {
                  return (
                    <FileUploadContainer
                      isSign={isSign}
                      isEbook={isEbook}
                      imgStatus={imgStatus}
                    >
                      <label htmlFor="sign" className="signTitle">
                        표지
                      </label>
                      {bookCover[0].sign ? (
                        <SignBtn
                          id="sign"
                          onClick={(e) => openModal(e)}
                          isvisible={isSign}
                        />
                      ) : (
                        <SignButton
                          id="sign"
                          type="file"
                          onChange={(e) => handleSign(e)}
                          isvisible={isSign}
                        />
                      )}
                      <label htmlFor="ebook" className="ebookTitle">
                        전자
                      </label>
                      {bookCover[0].ebook ? (
                        <EbookBtn
                          id="ebook"
                          type="file"
                          onClick={downloadEbook}
                          isvisible={isEbook}
                        />
                      ) : (
                        <EbookButton
                          id="ebook"
                          type="file"
                          onChange={(e) => handleEbook(e)}
                          isvisible={isEbook}
                        />
                      )}
                    </FileUploadContainer>
                  );
                }
              },
            },
          ]}
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
      <div>{isSign === true && <SignModal />}</div>
    </Container>
  );
};

export default BuyerList;
