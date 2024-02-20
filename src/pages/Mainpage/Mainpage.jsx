import { useEffect, useState } from "react";
import BuyerList from "../../components/BuyerList/BuyerList";
import "../../font.css";
import { Container } from "./styles";
const Mainpage = () => {
  const [clicked, setClicked] = useState("");

  const handlePage = (e) => {
    const { className } = e.target;
    setClicked(className);
  };

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
      <BuyerList />
    </Container>
  );
};

export default Mainpage;
