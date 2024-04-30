/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";

// css
import { Container } from "./styles";

//libraries
import { BarChart } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts";
import { DataGrid } from "@mui/x-data-grid";
import { useRecoilState } from "recoil";
import { signupEntireUserList, deleteCellData } from "@/atom/state";

//constants
import { xAxis } from "@/constans/SignupList_Constants/BarChart/BarChartElement";
import { series } from "@/constans/SignupList_Constants/BarChart/BarChartElement";
import { seriesPieChart } from "@/constans/SignupList_Constants/PieChart/PieChartElement";
import { columnData } from "@/constans/SignupList_Constants/Table/tableColumn_user";
import { rowData } from "@/constans/SignupList_Constants/Table/tableData";

const SignupList = () => {
  // Entire user data
  const [recoilSignupUserList, setRecoilSignupUserList] =
    useRecoilState(signupEntireUserList);
  // select row data
  const [recoilDeleteCellData, setRecoilDeleteCellData] =
    useRecoilState(deleteCellData);

  // 삭제를 위한 유저 데이터 전체 저장
  const handleEntireUserData = () => {
    setRecoilSignupUserList(rowData);
  };

  useEffect(() => {
    handleEntireUserData();
  }, []);

  // 추 후 api 도입 시에 사용할 가입자 리스트 상태 변수
  // const [signupList, setSignupList] = useState();

  const deleteRowData = (data) => {
    const { row } = data;
    setRecoilDeleteCellData(row);
  };

  useEffect(() => {
    // console.log("SignupUserList:", recoilSignupUserList);
    // console.log("recoilDeleteCellData: ", recoilDeleteCellData);
  }, [recoilSignupUserList, recoilDeleteCellData]);
  return (
    <Container>
      <div></div>
      <div className="SignupUserList">가입자 리스트</div>
      <div></div>
      <div></div>
      <div className="gender">성별</div>
      <div className="SubscriberHeader">가입자 명단</div>
      <div></div>
      <div className="roundchartContainer">
        <PieChart series={seriesPieChart} width={380} height={200} />
      </div>
      <div className="SubscriberList">
        <DataGrid
          getRowId={(row) => row.ID}
          rows={recoilSignupUserList}
          columns={columnData}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          checkboxSelection
          pageSizeOptions={[5, 10]}
          onCellClick={(data) => {
            deleteRowData(data);
          }}
        />
      </div>
      <div></div>
      <div className="ageHeader">연령</div>
      <div></div>
      <div className="stickChartContainer">
        <BarChart xAxis={xAxis} series={series} width={380} height={220} />
      </div>
    </Container>
  );
};

export default SignupList;
