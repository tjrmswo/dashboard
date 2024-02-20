const UseOnChange = (e, state, setState) => {
  function useOnchange() {
    const { value, name } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  }
  return useOnchange;
};
export default UseOnChange;
