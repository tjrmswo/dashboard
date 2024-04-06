import axios from 'axios';

const useFetchData = (setUserList) => {
  async function fetchData() {
    try {
      const response = await axios.get(import.meta.env.VITE_API_SERVER_ADDRESS + '/admin/buyer');
      const data = response.data.data;
      // console.log(data);
      if (Array.isArray(data)) {
        const addPackage = data.map((item) => {
          if (item.answerCount !== item.questionCount) {
            return {
              ...item,
              package: `${item.answerCount} / ${item.questionCount}`,
              answer: '바로가기',
            };
          } else {
            return {
              ...item,
              package: '제출',
              answer: '바로가기',
            };
          }
        });
        const changeName = addPackage.map((userData) => {
          let newName = '';

          if (userData.name.includes('행복')) {
            newName = '행복';
          } else if (userData.name.includes('꿈')) {
            newName = '꿈';
          } else if (userData.name.includes('감정')) {
            newName = '감정';
          } else if (userData.name.includes('사랑')) {
            newName = '사랑';
          }

          let optionNumber = 0;
          if (userData.option === 'APP') {
            optionNumber = 1;
          } else if (userData.option === '전자책') {
            optionNumber = 2;
          } else if (userData.option === '실물책') {
            optionNumber = 3;
          }

          const finalName = newName + ' ' + optionNumber;

          return {
            ...userData,
            name: finalName,
          };
        });
        setUserList(changeName);
      } else {
        // 응답이 배열이 아닌 경우 처리
        console.log('Response data is not an array:', data);

        const addPackage = data.map((item) => {
          // const questionCount =
          if (typeof item.answerCount === 'number' && typeof item.questionCount === 'number') {
            return {
              ...item,
              package: `${item.answerCount} / ${item.questionCount}`,
              answer: '바로가기',
            };
          } else {
            return {
              ...item,
              package: '제출',
              answer: '바로가기',
            };
          }
        });
        setUserList(addPackage);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return fetchData;
};

export default useFetchData;
