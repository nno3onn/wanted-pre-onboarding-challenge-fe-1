import { useState } from "react";

const useInput = (initial = "") => {
  const [value, setValue] = useState(initial);
  const changeValue = ({ target: { value } }) => setValue(value);

  return [value, setValue, changeValue];
};

export default useInput;
