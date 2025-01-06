import React from "react";

// These styles will make sure the component is not visible, but will still be announced by screen readers.
const hiddenStyles: React.CSSProperties = {
  display: "inline-block",
  position: "absolute",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  height: 1,
  width: 1,
  margin: -1,
  padding: 0,
  border: 0,
};

function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return <span style={hiddenStyles}>{children}</span>;
}

export default VisuallyHidden;
