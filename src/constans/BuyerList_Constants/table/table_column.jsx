/* eslint-disable react-hooks/rules-of-hooks */
// 총 길이 1195
// libraries
import { CSVLink } from "react-csv";
import { csvData, csvTitle } from "../../../atom/state";
import { useRecoilValue } from "recoil";

// constants
import { answerHeaders } from "../csv/CSVAnswerHeader";

// styles
import { CSVDownloadButton } from "./styles";

// custom hooks
import useDownloadImg from "../../../hooks/BuyerList/useDownloadImg";

export const columnBuyerList = [
  { field: "userId", headerName: "번호", width: 100 },
  { field: "userName", headerName: "이름", width: 120 },
  { field: "phone", headerName: "전화번호", width: 145 },
  { field: "userNickname", headerName: "닉네임", width: 100 },
  { field: "address", headerName: "주소", width: 200 },
  {
    field: "couponNumber",
    headerName: "쿠폰번호",
    width: 120,
    disableExport: true,
  },
  { field: "name", headerName: "패키지", width: 120, disableExport: true }, // name +
  { field: "package", headerName: "상태", width: 40, disableExport: true }, // answerCount + questionCount
  {
    field: "answer",
    headerName: "답변&삽화",
    width: 100,
    renderCell: () => {
      const data = useRecoilValue(csvData);
      const title = useRecoilValue(csvTitle);
      // Download Img
      const downloadImg = () => {
        const download = useDownloadImg(title);
        download();
      };
      return (
        <CSVDownloadButton>
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
  },
];
