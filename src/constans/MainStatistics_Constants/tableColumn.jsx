export const COLUMNS = [
  {
    label: "날짜",
    renderCell: (item) =>
      item.date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
  },
  { label: "구매자", renderCell: (item) => item.buyers },
  { label: "가입자", renderCell: (item) => item.signup_User },
];
