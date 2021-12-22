import React from "react";

export default function FileFormatTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return <div className="font-size-xxl">user profile</div>;
}
