// css
import { Container } from "./styles";

//libraries
import { BarChart } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts";
import { DataGrid } from "@mui/x-data-grid";

//constants
import { xAxis } from "../../constans/SignupList_Constants/BarChart/BarChartElement";
import { series } from "../../constans/SignupList_Constants/BarChart/BarChartElement";
import { seriesPieChart } from "../../constans/SignupList_Constants/PieChart/PieChartElement";
import { columnData } from "../../constans/SignupList_Constants/Table/tableColumn_user";
import { rowData } from "../../constans/SignupList_Constants/Table/tableData";

const SignupList = () => {
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
          rows={rowData}
          columns={columnData}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          checkboxSelection
          pageSizeOptions={[5, 10]}
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
