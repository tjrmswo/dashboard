import styled from "styled-components";

export const Container = styled.div`
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

  .mainStatistics {
    margin-bottom: 2rem;
    border-bottom: 2px solid gray;
    width: 5.4vw;
    font-family: "GmarketSans-Medium";
    color: ${(props) =>
      props.isclicked === "mainStatistics" ? "gray" : "black"};
    font-size: 1.2rem;
  }
  .SignupList {
    margin-bottom: 2rem;
    border-bottom: 2px solid gray;
    width: 7.6vw;
    font-family: "GmarketSans-Medium";
    color: ${(props) => (props.isclicked === "SignupList" ? "gray" : "black")};
    font-size: 1.2rem;
  }
  .BuyerList {
    margin-bottom: 2rem;
    border-bottom: 2px solid gray;
    width: 7.6vw;
    font-family: "GmarketSans-Medium";
    color: ${(props) => (props.isclicked === "BuyerList" ? "gray" : "black")};
    font-size: 1.2rem;
  }
`;
