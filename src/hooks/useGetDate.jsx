import moment from "moment";

const useGetDate = (slides, setSlides) => {
  let firstTime = moment(new Date(2024, 0, 1), "YYYY.MM.DD").format(
    "YYYY.MM.DD"
  );
  let secondTime = moment(new Date(2024, 0, 1))
    .add(6, "days")
    .format("YYYY.MM.DD");
  let lengths = 5;
  while (lengths > 0) {
    if (slides.length === 0) {
      setSlides((prev) => [...prev, `${firstTime}~${secondTime}`]);
      firstTime = moment(secondTime, "YYYY.MM.DD")
        .add(1, "days")
        .format("YYYY.MM.DD");
      console.log(firstTime, secondTime);
      secondTime = "";
    } else {
      secondTime = moment(firstTime, "YYYY.MM.DD")
        .add(6, "days")
        .format("YYYY.MM.DD");
      console.log(firstTime, secondTime);
      setSlides((prev) => [...prev, `${firstTime}~${secondTime}`]);
      firstTime = moment(secondTime, "YYYY.MM.DD")
        .add(1, "days")
        .format("YYYY.MM.DD");
      secondTime = "";
    }
    lengths -= 1;
  }
  console.log(slides);
  return slides;
};

export default useGetDate;
