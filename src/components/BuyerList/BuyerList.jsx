/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

//libraries
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  csvData,
  csvTitle,
  signModalState,
  selectBuyerListData,
  EbookModalState,
  checkUserData,
} from '@/atom/state';
import { CSVLink } from 'react-csv';

//css
import '@/font.css';

//styles
import { Container } from './styles';
import {
  CSVDownloadButton,
  SubmittedCSVDownloadButton,
  SignButton,
  EbookButton,
  FileUploadContainer,
  SignBtn,
  EbookBtn,
} from '@/constans/BuyerList_Constants/table/styles';

//constants
import { answerHeaders } from '@/constans/BuyerList_Constants/csv/CSVAnswerHeader';

//components
import SignModal from './Modal';

//custom hooks
import UseGetUserData from '@/hooks/BuyerList/useGetUserData';
import UseFetchData from '@/hooks/BuyerList/useFetchData';
import useDownloadImg from '@/hooks/BuyerList/useDownloadImg';
import useUploadEbook from '@/hooks/BuyerList/useUploadEbook';
import useUploadSign from '@/hooks/BuyerList/useUploadSign';
import useDownloadEbook from '@/hooks/BuyerList/useDownloadEbook';
import useGetSignEbookData from '@/hooks/BuyerList/useGetSignEbookData';
import useGetAnswerData from '@/hooks/BuyerList/useGetAnswerData';

const BuyerList = () => {
  // modal status
  const [isSign, setIsSign] = useRecoilState(signModalState);
  const [isEbook, setIsEbook] = useRecoilState(EbookModalState);

  //user entire data
  const [userList, setUserList] = useState([]);

  // select user data
  const [selectedUserData, setSelectedUserData] = useRecoilState(selectBuyerListData);

  // ai answer and manager answer
  const [recoilAnswerDownloadData, setRecoilAnswerDownloadData] = useRecoilState(csvData);
  const [recoilImgDownloadData, setRecoilImgDownloadData] = useRecoilState(csvTitle);
  const [userAnswer, setUserAnswer] = useState({
    csvFilename: 'csvData.csv',
    answer: [
      {
        people_answer: '',
        ai_answer: '',
      },
    ],
  });

  const { csvFilename } = userAnswer;

  // book cover
  const [bookCover, setBookCover] = useRecoilState(checkUserData);

  //Get userData
  const getUserData = (data) => {
    const userData = UseGetUserData(data, setSelectedUserData, setRecoilImgDownloadData);
    userData();

    // sign ebook data
    const signEbook = useGetSignEbookData(data, setBookCover, setSelectedUserData);
    signEbook();

    // ai answer and user answer and img data
    const answerData = useGetAnswerData(
      data,
      setRecoilAnswerDownloadData,
      setRecoilImgDownloadData,
      recoilAnswerDownloadData,
      setUserAnswer,
      userAnswer
    );
    answerData();
  };

  // const get = (data) => {
  //   console.log(data);
  // }

  //Fetch UserList
  const fetchData = async () => {
    const fetch = UseFetchData(setUserList);
    fetch();
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    // console.log("selectedUserData: ", selectedUserData);
    // console.log('recoilAnswerDownloadData: ', recoilAnswerDownloadData);
    // console.log('answerHeaders: ', answerHeaders);
    // console.log('datass: ', datass);
    console.log('userAnswer: ', userAnswer);
    console.log('bookCover: ', bookCover);
    console.log('userList: ', userList);
  }, [bookCover, userAnswer]);

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
            { field: 'userId', headerName: '번호', width: 100 },
            { field: 'userName', headerName: '이름', width: 120 },
            { field: 'phone', headerName: '전화번호', width: 145 },
            { field: 'userNickname', headerName: '닉네임', width: 100 },
            {
              field: 'address',
              headerName: '주소',
              width: 220,
            },
            {
              field: 'couponNumber',
              headerName: '쿠폰번호',
              width: 100,
              disableExport: true,
            },
            {
              field: 'name',
              headerName: '패키지',
              width: 120,
              disableExport: true,
            },
            {
              field: 'title',
              headerName: '책 제목',
              width: 140,
              disableExport: true,
            },
            {
              field: 'package',
              headerName: '상태',
              width: 60,
              disableExport: true,
            }, // answerCount + questionCount
            {
              field: 'answer',
              headerName: '답변&삽화',
              width: 100,
              renderCell: (params) => {
                const { row } = params;
                const isSubmitted = row.package === '제출';
                const isCompleted = row.answerCount === row.questionCount;

                // Download Img
                const downloadImg = () => {
                  const download = useDownloadImg(recoilImgDownloadData);
                  download();
                  const { answer } = userAnswer;
                  const get = answer.filter((datas) => {
                    console.log(datas.ai_answer);
                    if (datas.ai_answer !== '') {
                      return datas;
                    }
                  });
                };

                if (isSubmitted) {
                  return (
                    <SubmittedCSVDownloadButton
                      style={{ backgroundColor: '#949591' }}
                      imgLink={row.imgLink}
                      iscompleted={isCompleted}
                    >
                      <CSVLink
                        data={userAnswer.answer}
                        headers={answerHeaders}
                        filename={userAnswer.csvFilename}
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
                        data={userAnswer.answer}
                        headers={answerHeaders}
                        filename={userAnswer.csvFilename}
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
              field: 'userSubscribeStory',
              headerName: '업로드',
              width: 120,
              disableExport: true,
              renderCell: (params) => {
                const { row } = params;
                const { imgStatus } = params.row;
                const isSubmitted = row.answerCount === row.questionCount;
                const isEbookInData = bookCover[0].ebook.length > 0;
                // 선택된 유저 데이터
                const [user, setUser] = useRecoilState(selectBuyerListData);
                // console.log(user);
                // 이미지 url 추출
                const cover = useRecoilValue(checkUserData);

                // bookCover에 값이 없을 때 표지 업로드 함수 호출
                const handleSign = (data) => {
                  const uploadSign = useUploadSign(data, isSign, setIsSign, user, setUser);
                  uploadSign();
                };

                const openModal = () => {
                  setIsSign(true);
                };

                // bookCover에 값이 없을 때  전자책 업로드 함수
                const handleEbook = (data) => {
                  const uplodaEbook = useUploadEbook(data, user, setUser);
                  uplodaEbook();
                };

                // 전자책 다운로드
                const downloadEbook = () => {
                  const ebook = useDownloadEbook(bookCover, csvFilename);
                  ebook();
                };

                return (
                  <FileUploadContainer isSign={isSign} isEbook={isEbook} imgStatus={imgStatus}>
                    <label htmlFor="sign" className="signTitle">
                      표지
                    </label>
                    {bookCover[0].sign !== '' ? (
                      <SignBtn id="sign" onClick={(e) => openModal(e)} isvisible={isSign} />
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
                    {bookCover[0].ebook.length > 0 ? (
                      <EbookBtn
                        id="ebook"
                        type="file"
                        onClick={downloadEbook}
                        isvisible={isEbook}
                        isEbookInData={isEbookInData}
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
              },
            },
            {
              field: 'userEmail',
              headerName: 'Email',
              width: 200,
              disableExport: true,
            },
          ]}
          initialState={{
            pagination: {
              paginationModel: { page: 3, pageSize: 7 },
            },
          }}
          pageSizeOptions={[8, 10]}
          checkboxSelection
          isRowSelectable={(params) => params.row.phone !== '최종 제출 전'}
          onCellClick={(cell) => {
            getUserData(cell);
            // get(cell);
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
