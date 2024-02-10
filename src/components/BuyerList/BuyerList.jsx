import { useEffect, useState } from "react";
//libraries
import axios from "axios";

//css
import "../../font.css";

//styles
import {
  Container,
  Form,
  SelectCategory,
  InputContainer,
  DownloadImg,
  AddressdownloadImg,
  DropdownImg,
  StateDropdownImg,
  UploaddropdownImg,
} from "./styles";

//constants
import { Category } from "../../constans/Catergory";

//img
import searchIcon from "../../assets/searchIcon.png";
import downloadIcon from "../../assets/download_Icon.png";
import arrowDropdownIcon from "../../assets/arrow_drop_down_Icon.png";

const BuyerList = () => {
  const [userList, setUserList] = useState([]);

  async function fetchData() {
    try {
      const res = await axios.get("fetchData");
      setUserList(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <div></div>
      <h1 className="buyerList">구매자 리스트</h1>
      <div className="SearchContainer">
        <Form>
          <SelectCategory>
            {Category.map((user, i) => (
              <option key={i} value={user.id}>
                {user.category}
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
      <div className="categoryRow">
        <div className="categorySmallRow">
          <div className="numberRow">
            <div className="number">번호 </div>
            <div className="divider">|</div>
          </div>
          <div className="uniqueNumberRow">
            <div className="uniqueNumber">고유번호</div>
            <div className="divider">|</div>
          </div>
          <div className="nameRow">
            <div className="name">이름</div>
            <div className="divider">|</div>
          </div>
          <div className="phoneNumberRow">
            <div className="phoneNumberContainer">
              <div className="phoneNumber">전화번호</div>
              <div className="divider">|</div>
            </div>
          </div>
          <div className="nicknameRow">
            <div className="nickname">닉네임</div>
            <div className="nickname_divider">|</div>
          </div>
          <div className="addressRow">
            <div className="addressContainer">
              <div className="address">주소</div>
              <AddressdownloadImg src={downloadIcon} />
              <div className="divider">|</div>
            </div>
          </div>
          <div className="couponRow">
            <div className="coupon">쿠폰번호</div>
            <div className="divider">|</div>
          </div>
          <div className="pakageRow">
            <div className="pakageContainer">
              <div className="pakage">패키지</div>
              <DropdownImg src={arrowDropdownIcon} />
              <div className="divider">|</div>
            </div>
          </div>
          <div className="stateRow">
            <div className="stateContainer">
              <div className="state">상태</div>
              <StateDropdownImg src={arrowDropdownIcon} />
              <div className="divider">|</div>
            </div>
          </div>
          <div className="answeRow">
            <div className="answerContainer">
              <div className="answer">답변&삽화</div>
              <DownloadImg src={downloadIcon} />
              <div className="answerdivider">|</div>
            </div>
          </div>
          <div className="uploadRow">
            <div className="uploadContainer">
              <div className="upload">업로드</div>
              <UploaddropdownImg src={arrowDropdownIcon} />
            </div>
          </div>
        </div>
        {userList && (
          <div>
            {userList.map((user, i) => (
              <div className="userListcategoryRow" key={i}>
                <div className="userListRow">
                  <div className="numberRow">
                    <div className="number">{user.id}</div>
                    <div className="divider">|</div>
                  </div>
                  <div className="uL_uniqueNumberRow">
                    <div className="uL_uniqueNumber">{user.storyId}</div>
                    <div className="uL_uniqueNumber_divider">|</div>
                  </div>
                  <div className="uL_nameRow">
                    <div className="uL_name">{user.name}</div>
                    <div className="divider">|</div>
                  </div>
                  <div className="uL_phoneNumberRow">
                    <div className="uL_phoneNumberContainer">
                      <div className="uL_phoneNumber">{user.phone}</div>
                      <div className="uL_phoneNumber_divider">|</div>
                    </div>
                  </div>
                  <div className="uL_nicknameRow">
                    <div className="uL_nickname">{user.nickname}</div>
                    <div className="uL_nickname_divider">|</div>
                  </div>
                  <div className="uL_addressRow">
                    <div className="uL_addressContainer">
                      <div className="uL_address">{user.address}</div>
                      <div className="divider">|</div>
                    </div>
                  </div>
                  <div className="uL_couponRow">
                    <div className="uL_coupon">{user.coupon}</div>
                    <div className="divider">|</div>
                  </div>
                  <div className="uL_pakageRow">
                    <div className="uL_pakageContainer">
                      <div className="uL_pakage">{user.pakage}</div>
                      <div className="divider">|</div>
                    </div>
                  </div>
                  <div className="uL_stateRow">
                    <div className="uL_stateContainer">
                      <div className="uL_state">{user.status}</div>
                      <div className="divider">|</div>
                    </div>
                  </div>
                  <div className="uL_answeRow">
                    <div className="uL_answerContainer">
                      <div className="uL_answer">{user.answer}</div>
                      <div className="divider">|</div>
                    </div>
                  </div>
                  <div className="uL_uploadRow">
                    <div className="uL_uploadContainer">
                      <div className="uL_sign">{user.sign}</div>
                      <div className="uL_electron">{user.electron}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default BuyerList;
