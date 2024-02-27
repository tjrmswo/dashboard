import { atom } from "recoil";

export const csvData = atom({
  key: "imgData",
  default: {
    csvFilename: "csvData.csv",
    answer: [
      {
        people_answer: "",
        ai_answer: "",
        etc: "",
      },
    ],
  },
});

export const csvTitle = atom({
  key: "csvHeader",
  default: {
    img: "",
    userData: {
      userName: "",
      userSubscribeStory: 0,
    },
  },
});
