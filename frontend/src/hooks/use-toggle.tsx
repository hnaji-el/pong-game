import React from "react";

// useToggle custom hook is a replacement for useState hook for
// state variables that toggles between true and false values.

type InitialValueType = boolean | (() => boolean);

function useToggle(initialValue: InitialValueType = false) {
  const [value, setValue] = React.useState(initialValue);

  const toggleValue = React.useCallback(() => {
    setValue((currentValue) => !currentValue);
  }, []);

  return [value, toggleValue];
}

export default useToggle;
