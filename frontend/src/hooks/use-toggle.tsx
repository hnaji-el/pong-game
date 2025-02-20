import React from "react";

// useToggle custom hook is a replacement for useState hook for
// state variables that toggles between true and false values.

function useToggle(
  initialValue: boolean | (() => boolean) = false,
): [boolean, () => void] {
  const [value, setValue] = React.useState(initialValue);

  const toggleValue = React.useCallback(() => {
    setValue((currentValue) => !currentValue);
  }, []);

  return [value, toggleValue];
}

export default useToggle;
