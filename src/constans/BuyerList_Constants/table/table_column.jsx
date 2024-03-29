/* eslint-disable react-hooks/rules-of-hooks */
// 총 길이 1195
// libraries
import { CSVLink } from "react-csv";
import {
  csvData,
  csvTitle,
  signModalState,
  selectBuyerListData,
  EbookModalState,
  bookCovers,
} from "@/atom/state";
import { useRecoilValue, useRecoilState } from "recoil";

// constants
import { answerHeaders } from "@/constans/BuyerList_Constants/csv/CSVAnswerHeader";

// styles
import {
  CSVDownloadButton,
  SignButton,
  EbookButton,
  FileUploadContainer,
  SignBtn,
  EbookBtn,
} from "./styles";

// custom hooks
import useDownloadImg from "@/hooks/BuyerList/useDownloadImg";
import useUploadEbook from "@/hooks/BuyerList/useUploadEbook";
import useUploadSign from "@/hooks/BuyerList/useUploadSign";

export const columnBuyerList = [
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
  { field: "name", headerName: "패키지", width: 120, disableExport: true }, // name +
  { field: "package", headerName: "상태", width: 40, disableExport: true }, // answerCount + questionCount
  {
    field: "answer",
    headerName: "답변&삽화",
    width: 100,
    renderCell: () => {
      const signState = useRecoilValue(signModalState);
      const ebookState = useRecoilValue(EbookModalState);
      const data = useRecoilValue(csvData);
      const title = useRecoilValue(csvTitle);
      // Download Img
      const downloadImg = () => {
        const download = useDownloadImg(title);
        download();
      };
      return (
        <CSVDownloadButton isSign={signState} isEbook={ebookState}>
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
    },
    disableExport: true,
  },
  {
    field: "userSubscribeStory",
    headerName: "업로드",
    width: 150,
    disableExport: true,
    renderCell: () => {
      // 모달 상태
      const [signState, setSignState] = useRecoilState(signModalState);
      const [ebookState, setEbookState] = useRecoilState(EbookModalState);

      // 선택된 유저 데이터
      const [user, setUser] = useRecoilState(selectBuyerListData);

      // 이미지 url 추출
      const cover = useRecoilValue(bookCovers);

      // bookCover에 값이 없을 때 표지 업로드 함수 호출
      const handleSign = async (data) => {
        const uploadSign = useUploadSign(
          data,
          signState,
          setSignState,
          user,
          setUser
        );
        uploadSign();
      };

      const openModal = (data) => {
        const { id } = data.target;
        setUser((prevUser) => ({
          ...prevUser,
          uploadtype: id,
        }));
        if (id === "sign") {
          setSignState(!signState);
        } else {
          setEbookState(!ebookState);
        }
      };

      // bookCover에 값이 없을 때  전자책 업로드 함수
      const handleEbook = async (data) => {
        const uplodaEbook = useUploadEbook(
          data,
          ebookState,
          setEbookState,
          user,
          setUser
        );
        uplodaEbook();
      };

      return (
        <FileUploadContainer isSign={signState} isEbook={ebookState}>
          <label htmlFor="sign" className="signTitle">
            표지
          </label>
          {cover ? (
            <SignBtn
              id="sign"
              onClick={(e) => openModal(e)}
              isvisible={signState}
            />
          ) : (
            <SignButton
              id="sign"
              type="file"
              onChange={(e) => handleSign(e)}
              isvisible={signState}
            />
          )}

          <label htmlFor="ebook" className="ebookTitle">
            전자
          </label>
          {cover ? (
            <EbookBtn
              id="ebook"
              onClick={(e) => openModal(e)}
              isvisible={ebookState}
            />
          ) : (
            <EbookButton
              id="ebook"
              type="file"
              onChange={(e) => handleEbook(e)}
              isvisible={ebookState}
            />
          )}
        </FileUploadContainer>
      );
    },
  },
];
