import styled from "styled-components";

export const CSVDownloadButton = styled.div`
  width: 5vw;
  border: none;
  &:focus {
    outline: none;
  }
  background-color: ${(props) =>
    props.isSign === true || props.isEbook === true ? "#dcebc91a" : "#dcebc9"};
  text-align: center;
`;

export const FileUploadContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  .signTitle {
    width: 3vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) =>
      props.isSign === true || props.isEbook === true
        ? "#dcebc91a"
        : "#dcebc9"};
    margin-right: 0.5rem;
  }
  .ebookTitle {
    width: 3vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) =>
      props.isSign === true || props.isEbook === true
        ? "#dcebc91a"
        : "#dcebc9"};
  }
`;
export const SignButton = styled.input`
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;

  &:focus {
    outline: none;
  }
  display: none;

  background-color: ${(props) =>
    props.isSign === true || props.isEbook === true ? "#dcebc91a" : "#dcebc9"};
`;

export const EbookButton = styled.input`
  border: none;
  &:focus {
    outline: none;
  }
  display: none;
`;
