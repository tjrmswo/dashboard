import { useEffect, useState } from "react";

// components
import BuyerList from "../../components/BuyerList/BuyerList";
import SignupList from "../../components/SignupList/SignupList";
import MainStatistics from "../../components/mainStatistics/MainStatistics";

// css
import "../../font.css";
import { Container } from "./styles";

const Mainpage = () => {
  const [clicked, setClicked] = useState("");

  const handlePage = (e) => {
    const { className } = e.target;
    setClicked(className);
  };

  const componentList = {
    BuyerList: <BuyerList />,
    SignupList: <SignupList />,
    MainStatistics: <MainStatistics />,
  };

  const componentToShow = componentList[clicked];
  useEffect(() => {
    console.log(clicked);
  }, [clicked]);
  return (
    <Container isclicked={clicked}>
      <div className="drawer">
        <div className="tinyContainer">
          <div className="mainStatistics" onClick={(e) => handlePage(e)}>
            메인 통계
          </div>
          <div className="SignupList" onClick={(e) => handlePage(e)}>
            가입자 리스트
          </div>
          <div className="BuyerList" onClick={(e) => handlePage(e)}>
            구매자 리스트
          </div>
        </div>
      </div>
      {componentToShow || <MainStatistics />}
    </Container>
  );
};

export default Mainpage;
