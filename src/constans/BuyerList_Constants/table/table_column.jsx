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
} from "./styles";

// custom hooks
import useDownloadImg from "@/hooks/BuyerList/useDownloadImg";
import axios from "axios";
// 1 표지 혹은 전자에 값이 있으면 값을 보여준다
// 2 값이 없으면 업데이트를 한다
// 3 모달창 로직은 클릭하면 해당하는 상태변수는 true로 변환하고
// 이미지를 보여준다. X를 누르면 창이 종료되고
// 만약 모달 창이 켜져있는 상태로 다른 모달 혹은 유저의 다른
// 이미지를 누르면 현재 모달은 종료되고 다른 모달을 화면에
// 출력한다.
// 1. 정상적으로 하나의 모달만 키고 끈 경우. 현재의 로직으로 처리 가능 -----------------해결
// 2. 표지를 누르고 현재 유저의 전자 버튼을 누른 경우 => userSubscribeStoryId를
// 검사하여 같은 유저라면 표지 boolean값만 false로 조정 -----------------해결
// 3. 표지를 누르고 다른 유저의 표지를 누른 경우 => userSubscribeStoryId를
// 검사하여 다른 유저인 경우 boolean값은 그대로 유지하고
// api 호출하여 값을 불러오는 로직 수행
// 4. 표지를 누르고 다른 유저의 전자를 누른 경우
// 표지 boolean값 false로 조정하고 전자 boolean값 true로 조정
// and 값 불러오는 로직 수행 -----------------해결

export const columnBuyerList = [
  { field: "userId", headerName: "번호", width: 100 },
  { field: "userName", headerName: "이름", width: 120 },
  { field: "phone", headerName: "전화번호", width: 145 },
  { field: "userNickname", headerName: "닉네임", width: 100 },
  { field: "address", headerName: "주소", width: 220 },
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
  }, // userSubscribeStory를 통해 조회
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
      // 전자책 업로드 함수
      const handleEbook = async (data) => {
        const { id, files } = data.target;
        if (user[0].bookCover === "") {
          setEbookState(!ebookState);
          const formdata = new FormData();
          formdata.append("file", files[0]);
          try {
            const res = await axios.post(
              `http://inklnk.kro.kr:8085/admin/ebooks/95`,
              formdata,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log(res);
          } catch (err) {
            console.log(err);
          }
        } else {
          setUser((prev) => ({
            ...prev,
            uploadtype: id,
          }));
          setEbookState(!ebookState);
        }
      };
      // 표지 업로드 함수
      const handleSign = async (data) => {
        const { id, files } = data.target;
        if (user[0].bookCover === "") {
          setSignState(!signState);
          const formdata = new FormData();
          formdata.append("file", files[0]);
          try {
            const res = await axios.post(
              import.meta.env.VITE_API_ADDRESS +
                `admin/bockcover/${user[0].userSubscribeStory}`,
              formdata,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log(res);
          } catch (err) {
            console.log(err);
          }
        }
        setUser((prev) => ({
          ...prev,
          uploadtype: id,
        }));
        setSignState(!signState);
      };
      return (
        <FileUploadContainer isSign={signState} isEbook={ebookState}>
          <label htmlFor="sign" className="signTitle">
            표지
          </label>
          <SignButton
            id="sign"
            type="file"
            onChange={(e) => handleSign(e)}
            isvisible={signState}
            accept="image/*"
          />
          <label htmlFor="ebook" className="ebookTitle">
            전자
          </label>
          <EbookButton
            id="ebook"
            type="file"
            onChange={(e) => handleEbook(e)}
            isvisible={ebookState}
            accept="image/*"
          />
        </FileUploadContainer>
      );
    },
  },
];
