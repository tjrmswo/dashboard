import BuyerList from "../components/BuyerList/BuyerList";
import styled from "styled-components";
import "../font.css";
const Mainpage = () => {
  return (
    <Container>
      <div className="drawer">
        <div className="tinyContainer">
          <div className="element">메인 통계</div>
          <div className="element2">가입자 리스트</div>
          <div className="element3">구매자 리스트</div>
        </div>
      </div>
      <BuyerList />
    </Container>
  );
};

export default Mainpage;

const Container = styled.div`
  color: black;

  .drawer {
    display: grid;
    justify-content: center;
    position: absolute;
    left: 0;
    width: 15vw;
    height: 100vh;
    background-color: #dcebc9;
  }
  .tinyContainer {
    width: 8vw;
    height: 15vh;
    margin-top: 6rem;
  }

  .element {
    margin-bottom: 2rem;
    border-bottom: 2px solid gray;
    width: 5.4vw;
    font-family: "GmarketSans-Medium";
    color: black;
    font-size: 1.2rem;
  }
  .element2 {
    margin-bottom: 2rem;
    border-bottom: 2px solid gray;
    width: 7.6vw;
    font-family: "GmarketSans-Medium";
    color: black;
    font-size: 1.2rem;
  }
  .element3 {
    margin-bottom: 2rem;
    border-bottom: 2px solid gray;
    width: 7.6vw;
    font-family: "GmarketSans-Medium";
    color: black;
    font-size: 1.2rem;
  }
`;
