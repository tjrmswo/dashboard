import moment from "moment";

const useGetDate = (slides) => {
  const startDate = moment(new Date(2024, 0, 1)).format("YYYY.MM.DD");
  let firstTime = startDate;
  let secondeTime = moment(new Date(2024, 0, 1))
    .add({ days: 6 })
    .format("YYYY.MM.DD");
  let lengths = 48;
  while (lengths > 0) {
    if (slides.length === 0) {
      slides.push(`${firstTime}~${secondeTime}`);
      firstTime = moment(secondeTime).add({ days: 1 }).format("YYYY.MM.DD");
      secondeTime = "";
    } else {
      secondeTime = moment(firstTime).add({ days: 6 }).format("YYYY.MM.DD");
      slides.push(`${firstTime}~${secondeTime}`);
      firstTime = moment(secondeTime).add({ days: 1 }).format("YYYY.MM.DD");
      secondeTime = "";
    }
    lengths -= 1;
  }
  console.log(slides);
  return slides;
};

export default useGetDate;
