import styled from "styled-components";

// div
export const Container = styled.div`
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
  // Category --------------------
  .categoryRow {
    height: 6vh;
    display: grid;
    grid-template-rows: 0.3fr 4fr;
    grid-column: 2 / span 3;
    font-family: "GmarketSans-Medium";
    margin-top: 1rem;
  }
  .categorySmallRow {
    display: flex;
    flex-direction: row;
  }
  .divider {
  }
  .numberRow {
    display: flex;
    flex-direction: row;
  }
  .number {
    width: 2.5vw;
    margin-right: 0.5rem;
  }
  .uniqueNumberRow {
    width: 6.4vw;
    display: flex;
    flex-direction: row;
  }
  .uniqueNumber {
    text-align: center;
    width: 100%;
  }
  .nameRow {
    width: 5vw;
    display: flex;
    flex-direction: row;
  }
  .name {
    text-align: center;
    width: 100%;
  }
  .phoneNumberRow {
    width: 11.2vw;
  }
  .phoneNumberContainer {
    display: flex;
    flex-direction: row;
  }
  .phoneNumber {
    width: 100%;
    text-align: center;
  }
  .nicknameRow {
    width: 6.6vw;
    display: flex;
    flex-direction: row;
  }
  .nickname {
    width: 100%;
    text-align: center;
  }
  .nickname_divider {
  }
  .addressRow {
    width: 11vw;
  }
  .addressContainer {
    display: flex;
    flex-direction: row;
  }
  .address {
    width: 100%;
    text-align: center;
  }
  .couponRow {
    width: 8vw;
    display: flex;
    flex-direction: row;
  }
  .coupon {
    width: 100%;
    text-align: center;
  }
  .pakageRow {
    width: 6vw;
  }
  .pakageContainer {
    display: flex;
    flex-direction: row;
  }
  .pakage {
    width: 100%;
    text-align: center;
  }
  .stateRow {
    width: 5vw;
  }
  .stateContainer {
    display: flex;
    flex-direction: row;
  }
  .state {
    width: 100%;
    text-align: center;
  }
  .answeRow {
    width: 8vw;
  }
  .answerContainer {
    display: flex;
    flex-direction: row;
  }
  .answer {
    width: 100%;
    text-align: center;
  }
  .uploadRow {
    width: 7vw;
  }
  .uploadContainer {
    display: flex;
    flex-direction: row;
  }
  .upload {
    width: 100%;
    text-align: center;
  }

  //userList --------------------------------
  .userList {
    display: flex;
  }
  .userListRow {
    display: flex;
    flex-direction: row;
    margin-top: 2rem;
    align-items: center;
  }
  .userListcategoryRow {
    display: grid;
    grid-column: 2 / span 3;
    font-family: "GmarketSans-Medium";
  }
  .uL_uniqueNumberRow {
    display: flex;
    flex-direction: row;
    width: 6.4vw;
  }
  .uL_uniqueNumber {
    width: 100%;
    text-align: center;
  }
  .uL_nameRow {
    display: flex;
    flex-direction: row;
    width: 5vw;
  }
  .uL_name {
    text-align: center;
    width: 100%;
  }
  .uL_phoneNumberRow {
    width: 11.2vw;
  }
  .uL_phoneNumberContainer {
    display: flex;
    flex-direction: row;
  }
  .uL_phoneNumber {
    text-align: center;
    width: 100%;
  }
  .uL_nicknameRow {
    display: flex;
    flex-direction: row;
    width: 6.6vw;
  }
  .uL_nickname {
    text-align: center;
    width: 100%;
  }
  .uL_addressRow {
    width: 11vw;
  }
  .uL_addressContainer {
    display: flex;
    flex-direction: row;
  }
  .uL_address {
    padding-left: 0.4rem;
    width: 100%;
  }
  .uL_couponRow {
    display: flex;
    flex-direction: row;
    width: 8vw;
  }
  .uL_coupon {
    text-align: center;
    width: 100%;
  }
  .uL_pakageRow {
    width: 6vw;
  }
  .uL_pakageContainer {
    display: flex;
    flex-direction: row;
  }
  .uL_pakage {
    text-align: center;
    width: 100%;
  }
  .uL_stateRow {
    width: 5vw;
  }
  .uL_stateContainer {
    display: flex;
    flex-direction: row;
  }
  .uL_state {
    text-align: center;
    width: 100%;
  }
  .uL_answeRow {
    width: 8vw;
  }
  .uL_answerContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .uL_answer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 2.9vh;
    background-color: #dcebc9;
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    border-radius: 0.3rem;
  }
  .uL_uploadRow {
    width: 11vw;
  }
  .uL_uploadContainer {
    display: flex;
    flex-direction: row;
  }
  .uL_sign {
    color: #dcebc9;
    margin-left: 0.4rem;
  }
  .uL_electron {
    color: #dcebc9;
    margin-left: 0.4rem;
  }
  .pageContainer {
    display: grid;
    grid-column: 2 / span 3;
    margin-top: 1rem;
  }
`;

//input

export const InputContainer = styled.div`
  width: 10vw;
  display: grid;

  .input {
    outline: white;
    border: 1px solid white;
    margin: 0.3rem;
  }
  .row {
    display: flex;
    flex-direction: row;
    background-color: #49b65e;
  }
`;

//form

export const Form = styled.form`
  width: 10vw;
`;

//select

export const SelectCategory = styled.select`
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

//img

export const DownloadImg = styled.img`
  position: relative;
  bottom: 0.4rem;
  right: 0.5rem;
`;

export const AddressdownloadImg = styled.img`
  position: relative;
  bottom: 0.3rem;
  right: 3.2rem;
`;

export const DropdownImg = styled.img`
  position: relative;
  bottom: 0.3rem;
`;

export const StateDropdownImg = styled.img`
  position: relative;
  bottom: 0.3rem;
`;

export const UploaddropdownImg = styled.img`
  position: relative;
  bottom: 0.3rem;
`;

export const SearchIcon = styled.img`
  width: 2vw;
  height: 4vh;
  background-color: #49b65e;
  padding: 0.2rem 0.3rem 0.2rem 0.2rem;
`;
