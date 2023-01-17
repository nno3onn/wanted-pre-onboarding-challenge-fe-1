import { useState } from "react";

const useInput = (initial = "") => {
  const [value, setValue] = useState(initial);
  const changeValue = ({ target: { value } }) => setValue(value);
  const resetValue = () => setValue("");

  return [value, changeValue, resetValue];
};

export default useInput;
