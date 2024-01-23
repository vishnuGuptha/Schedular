import { useState, ChangeEvent } from "react";

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: string | ChangeEvent<HTMLInputElement>) => {
    if (typeof e === "string") {
      setValue(e);
    } else {
      setValue(e.target.value);
    }
  };

  return [value, handleChange] as const;
};

export default useInput;
