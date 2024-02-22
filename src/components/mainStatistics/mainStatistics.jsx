//hooks
import { useEffect, useState } from "react";

//libraries
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { LineChart } from "@mui/x-charts";
import moment from "moment";

// css
import "../../font.css";
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";

// contants
import { Container, Button, BuyerColor, SigupUserColor } from "./styles";
import { COLUMNS } from "../../constans/MainStatistics_Constants/table/tableColumn";
import { nodes } from "../../constans/MainStatistics_Constants/table/data";
import {
  xAxis,
  series,
} from "../../constans/MainStatistics_Constants/LineChart/LineChartElements";
import { Themes } from "../../constans/MainStatistics_Constants/table/tableTheme";
import { dateSwiper } from "../../constans/MainStatistics_Constants/Swiper/Swiperdata";

//custom hooks
// import useGetDate from "../../hooks/useGetDate";

const MainStatistics = () => {
  //slide data
  const [slides, setSlides] = useState([]);

  // table data
  const data = { nodes };
  // table Theme
  const theme = useTheme([getTheme(), Themes]);

  const checkDate = () => {
    let firstTime = moment(new Date(2024, 0, 1)).format("YYYY.MM.DD");
    let secondTime = moment(new Date(2024, 0, 1))
      .add(6, "days")
      .format("YYYY.MM.DD");
    let lengths = 5;
    while (lengths > 0) {
      if (slides.length === 0) {
        setSlides((prev) => [...prev, `${firstTime}~${secondTime}`]);
        firstTime = moment(secondTime).add(1, "days").format("YYYY.MM.DD");
        console.log(firstTime, secondTime);
        secondTime = "";
        console.log(firstTime, secondTime);
      } else {
        secondTime = moment(firstTime).add(6, "days").format("YYYY.MM.DD");
        console.log(firstTime, secondTime);
        setSlides((prev) => [...prev, `${firstTime}~${secondTime}`]);
        firstTime = moment(secondTime).add(1, "days").format("YYYY.MM.DD");
        secondTime = "";
        console.log(firstTime, secondTime);
      }
      lengths -= 1;
      console.log(slides);
    }
  };

  useEffect(() => {
    checkDate();
  }, []);

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
        {/* {slides.length > 0 ? (
          <Swiper navigation={true} modules={[Navigation]}>
            {slides.map((item, index) => (
              <SwiperSlide key={index}>{item}</SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div>null</div>
        )} */}

        <Swiper navigation={true} modules={[Navigation]}>
          {dateSwiper.map((item, index) => (
            <SwiperSlide key={index}>{item}</SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="dataTable">
        <CompactTable data={data} columns={COLUMNS} theme={theme} />
      </div>
      <div></div>
      <div className="chartContainer">
        <LineChart xAxis={xAxis} series={series} height={500} />
        <div className="row">
          <BuyerColor></BuyerColor>
          <div className="buyer">구매자</div>
          <SigupUserColor></SigupUserColor>
          <div>가입자</div>
          <button
            onClick={() => {
              console.log(slides);
            }}
          >
            클릭
          </button>
        </div>
      </div>
    </Container>
  );
};

export default MainStatistics;
