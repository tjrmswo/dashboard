/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";

// components
import {
  ModalContainer,
  CancelButton,
  SignImg,
  EditButton,
} from "./modalStyles";

//libraries
import {
  signModalState,
  selectBuyerListData,
  EbookModalState,
} from "@/atom/state";

import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { db } from "@/mocks/db";

const Modal = () => {
  // sign Img
  const [user, setUser] = useRecoilState(selectBuyerListData);
  const [isSign, setIsSign] = useRecoilState(signModalState);

  // img
  const [img, setImg] = useState("");
  // close modal
  const closeModal = () => {
    setIsSign(false);
  };

  const modifySign = async (e) => {
    const { files } = e.target;

    try {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64Data = reader.result.split(",")[1];
        setImg(base64Data);
        const response = db.sign.update({
          where: {
            userSubscribeStoryId: {
              equals: `${user[0].userSubscribeStory}`,
            },
          },
          data: {
            sign: base64Data, // 파일 데이터를 문자열로 할당
          },
        });

        console.log(response);
      };
      reader.readAsDataURL(file); // 파일을 읽어서 Base64로 인코딩
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const res = db.sign.getAll();
    console.log(res);
    console.log("user: ", user);
    console.log("img: ", img);
  }, [user, img]);

  return (
    <ModalContainer>
      <div className="CancelHeader">
        <div className="title">표지</div>
        <CancelButton onClick={closeModal}>X</CancelButton>
      </div>
      <div className="imgContainer">
        <SignImg
          src={img.length > 0 ? `data:image/jpeg;base64, ${img}` : user[0].sign}
        />
      </div>
      <div className="buttonContainer">
        <label htmlFor="edit" className="editButton">
          수정
        </label>
        <EditButton
          onChange={(e) => modifySign(e)}
          accept="image/jpeg"
          id="edit"
          type="file"
        />
      </div>
    </ModalContainer>
  );
};

export default Modal;
