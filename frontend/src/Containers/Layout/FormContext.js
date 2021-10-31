import React, { useState, createContext } from "react";

export const FormContext = createContext();

export const initialValues = {
  title: "",
  tags: [],
  links: [],
  description: "",
};

export const FormProvider = (props) => {
  const [formDetails, setFormDetails] = useState(initialValues);

  return (
    <FormContext.Provider value={{ formDetails, setFormDetails }}>
      {props.children}
    </FormContext.Provider>
  );
};
