//libraries
import styled from "styled-components";

//css
import "../font.css";

//constants
import { Category } from "../constans/Catergory";

//img
import searchIcon from "../assets/searchIcon.png";

const BuyerList = () => {
  return (
    <Container>
      <div></div>
      <h1 className="buyerList">구매자 리스트</h1>
      <div className="SearchContainer">
        <Form>
          <SelectCategory>
            {Category.map((item, i) => (
              <option key={i} value={item.id}>
                {item.category}
              </option>
            ))}
          </SelectCategory>
        </Form>
        <InputContainer>
          <div className="row">
            <input className="input" />
            <img src={searchIcon} />
          </div>
        </InputContainer>
      </div>
      <div></div>
      <div className="buyListHeader">구매자 명단</div>
      <div></div>
      <div>번호 | 이름 | 전화번호 | 닉네임 | 주소 | 쿠폰번호 | 패키지 | </div>
      <div></div>
    </Container>
  );
};

export default BuyerList;

const Container = styled.div`
  display: grid;
  grid-template-columns: 18vw 5fr 3.5fr;
  grid-template-rows: 0.6fr 0.4fr 2fr;
  color: black;

  height: 100vh;
  .buyerList {
    display: grid;
    align-items: end;
    justify-content: start;
    font-family: "GmarketSans-Bold";
    font-size: 1.8rem;
    margin-bottom: 2rem;
    margin-left: 2rem;
  }
  .SearchContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    align-items: end;
    justify-content: start;
  }
  .buyListHeader {
    display: grid;
    align-items: center;
    justify-content: center;
    background-color: #dcebc9;
    grid-column: 2 / span 3;
    margin-right: 1rem;
    font-size: 1.9rem;
    font-family: "GmarketSans-Medium";
  }
`;

const Form = styled.form`
  width: 10vw;
`;

const SelectCategory = styled.select`
  text-align: center;
  width: 13vw;
  height: 4vh;
  border: none;
  background-color: #dcebc9;
  & :hover {
    outline: none;
  }
  font-family: "GmarketSans-Medium";
`;

const InputContainer = styled.div`
  width: 10vw;
  display: grid;
  .input {
    border-radius: 0.5rem;
    outline: none;
  }
  .row {
    display: flex;
    flex-direction: row;
  }
`;
