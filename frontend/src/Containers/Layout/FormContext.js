import React, { useState, createContext } from "react";

export const FormContext = createContext();

export const FormProvider = (props) => {
  const [formDetails, setFormDetails] = useState({
    title: "",
    tags: [],
    links: [],
    description: "",
  });

  return (
    <FormContext.Provider value={{ formDetails, setFormDetails }}>
      {props.children}
    </FormContext.Provider>
  );
};
