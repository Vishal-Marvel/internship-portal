import React from "react";

const SkillsSelect = () => {
  return (
    <ReactSelect
      isMulti
      isDisabled={isLoading}
      onChange={field.onChange}
      onBlur={field.onBlur}
      // defaultValue={skills[0]}
      value={field.value}
      options={skills}
    />
  );
};

export default SkillsSelect;
