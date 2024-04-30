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
    // sign ebook data
    const signEbook = useGetSignEbookData(data, setBookCover, setSelectedUserData);
    signEbook();

    // ai answer and user answer and img data
    const answerData = useGetAnswerData(
      data,
      setRecoilAnswerDownloadData,
      setUserAnswer,
      userAnswer
    );
    answerData();

    const userData = UseGetUserData(data, setSelectedUserData, setRecoilImgDownloadData);
    userData();
  };

  //Fetch UserList
  const fetchData = async () => {
    const fetch = UseFetchData(setUserList);
    fetch();
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    // console.log('userAnswer: ', userAnswer);
    // console.log('bookCover: ', bookCover);
    // console.log('selectedUserData: ', selectedUserData);
  }, [bookCover, userAnswer, userList, isSign, selectedUserData]);

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
            },
            {
              field: 'name',
              headerName: '패키지',
              width: 120,
            },
            {
              field: 'title',
              headerName: '책 제목',
              width: 140,
            },
            {
              field: 'package',
              headerName: '상태',
              width: 60,
            }, // answerCount + questionCount
            {
              field: 'answer',
              headerName: '답변&삽화',
              width: 100,
              renderCell: (params) => {
                const { row } = params;
                const { imgStatus } = params.row;
                const isSubmitted = row.package === '제출';
                const isCompleted = row.answerCount === row.questionCount;

                // Download Img
                const downloadImg = () => {
                  const download = useDownloadImg(recoilImgDownloadData);
                  download();
                  const { answer } = userAnswer;
                  const get = answer.filter((datas) => {
                    if (datas.ai_answer !== '') {
                      return datas;
                    }
                  });
                  const removeNewLine = answer.map((answer) => {
                    if (answer.includes('\n\n') && answer.includes('\n')) {
                      const remove = answer.replace(/\n/g, '');
                      // console.log(remove);
                      return remove;
                    } else {
                      return answer;
                    }
                  });
                  setUserAnswer(removeNewLine);
                };

                return (
                  <CSVDownloadButton
                    isSign={isSign}
                    iscompleted={isCompleted}
                    imgStatus={imgStatus}
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
              },
            },
            {
              field: 'userSubscribeStory',
              headerName: '업로드',
              width: 120,

              renderCell: (params) => {
                const { row } = params;
                const { imgStatus, ebookStatus, adminImgStatus } = params.row;
                const isSubmitted = row.answerCount === row.questionCount;

                // console.log(isEbookInData);
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
                  if (bookCover.ebook) {
                    const ebook = useDownloadEbook(bookCover, csvFilename);
                    ebook();
                  }
                };

                return (
                  <FileUploadContainer
                    isSign={isSign}
                    ebookStatus={ebookStatus}
                    imgStatus={imgStatus}
                    adminImgStatus={adminImgStatus}
                  >
                    <label htmlFor="sign" className="signTitle">
                      표지
                    </label>
                    {bookCover.sign !== '' ? (
                      <SignBtn
                        id="sign"
                        onClick={() => openModal()}
                        isSign={isSign}
                        ebookStatus={ebookStatus}
                        imgStatus={imgStatus}
                        adminImgStatus={adminImgStatus}
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
                    {bookCover.ebook !== '' ? (
                      <EbookBtn
                        id="ebook"
                        onClick={downloadEbook}
                        isSin={isSign}
                        isSubmitted={isSubmitted}
                        ebookStatus={ebookStatus}
                        imgStatus={imgStatus}
                        adminImgStatus={adminImgStatus}
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
            },
          ]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 7 },
            },
          }}
          pageSizeOptions={[7, 10]}
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
