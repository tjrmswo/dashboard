/* eslint-disable react-refresh/only-export-components */
import { atom } from 'recoil';

// 답변&삽화 데이터
export const csvData = atom({
  key: 'imgData',
  default: {
    csvFilename: 'csvData.csv',
    answer: [
      {
        people_answer: '',
        ai_answer: '',
      },
    ],
  },
});

// csv파일 이름
export const csvTitle = atom({
  key: 'csvHeader',
  default: {
    img: '',
    userData: '',
  },
});

// 구매자 전체 유저 데이터
export const signupEntireUserList = atom({
  key: 'signupList',
  default: [],
});

// 삭제할 셀 데이터
export const deleteCellData = atom({
  key: 'deleteCellData',
  default: [],
});

// 표지 모달 상태
export const signModalState = atom({
  key: 'modalState',
  default: false,
});

export const EbookModalState = atom({
  key: 'ebookModalState',
  default: false,
});

// 구매자 리스트 선택된 유저 데이터
export const selectBuyerListData = atom({
  key: 'selectBuyerListData',
  default: {
    userId: 0,
    userName: '',
    userPhoneNumber: '',
    userAddress: '',
    userNickname: '',
    userSubscribeStory: 0,
    sign: '',
    ebook: '',
  },
});

export const checkUserData = atom({
  key: 'bookCovers',
  default: {
    sign: '',
    ebook: '',
  },
});
