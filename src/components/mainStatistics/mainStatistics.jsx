//hooks
import { useCallback, useEffect, useMemo } from "react";

//libraries
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { LineChart } from "@mui/x-charts";

// css
import "../../font.css";
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";

// contants
import { Container, Button, BuyerColor, SigupUserColor } from "./styles";
import { COLUMNS } from "../../constans/MainStatistics_Constants/tableColumn";
import { nodes } from "../../constans/MainStatistics_Constants/data";
import {
  xAxis,
  series,
} from "../../constans/MainStatistics_Constants/LineChartElements";
import { Themes } from "../../constans/MainStatistics_Constants/tableTheme";

//custom hooks
import useGetDate from "../../hooks/useGetDate";

const MainStatistics = () => {
  //slide data
  const slides = useMemo(() => [], []);
  // table data
  const data = { nodes };
  // table Theme
  const theme = useTheme([getTheme(), Themes]);

  const checkDate = useCallback(() => {
    const date = useGetDate(slides);
    console.log(date);
  }, [slides]);

  useEffect(() => {
    checkDate();
  }, [checkDate]);

  return (
    <Container>
      <div></div>
      <h1 className="mainstatistics">INK LINK 메인 통계</h1>
      <div className="buttonRow">
        <Button>월 단위</Button>
        <Button>일 단위</Button>
      </div>
      <div></div>
      <div className="dayContainer">
        {slides.length > 0 ? (
          <Swiper navigation={true} modules={[Navigation]}>
            {slides.map((item, index) => (
              <SwiperSlide key={index}>{item}</SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Swiper navigation={true} modules={[Navigation]}>
            <SwiperSlide>2024.01.01~2024.01.07</SwiperSlide>
            <SwiperSlide>2024.01.08~2024.01.14</SwiperSlide>
            <SwiperSlide>2024.01.15~2024.01.21</SwiperSlide>
            <SwiperSlide>2024.01.22~2024.01.28</SwiperSlide>
            <SwiperSlide>2024.01.29~2024.02.04</SwiperSlide>
          </Swiper>
        )}
      </div>
      <div className="dataTable">
        <CompactTable data={data} columns={COLUMNS} theme={theme} />
      </div>
      <div></div>
      <div className="chartContainer">
        <LineChart xAxis={xAxis} series={series} />
        <div className="row">
          <BuyerColor></BuyerColor>
          <div className="buyer">구매자</div>
          <SigupUserColor></SigupUserColor>
          <div>가입자</div>
        </div>
      </div>
    </Container>
  );
};

export default MainStatistics;
