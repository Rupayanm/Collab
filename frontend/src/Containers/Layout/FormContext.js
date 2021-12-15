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

  const resetValue = () => {
    setFormDetails(initialValues);
  };

  const setInitialValue = (data) => {
    setFormDetails({ ...initialValues, ...data });
  };

  const setTitle = (title) => {
    setFormDetails({ ...formDetails, title });
  };

  const setDescription = (description) => {
    setFormDetails({ ...formDetails, description });
  };

  const addTag = (value) => {
    setFormDetails({ ...formDetails, tags: [...formDetails.tags, value] });
  };

  const removeTag = (value) => {
    const tags = formDetails.tags;
    tags.filter((item) => item !== value);
    setFormDetails({ ...formDetails, tags });
  };

  const addLink = (value) => {
    setFormDetails({ ...formDetails, links: [...formDetails.links, value] });
  };

  const removeLink = (index) => {
    const links = formDetails.links;
    links.splice(index, 1);
    setFormDetails({ ...formDetails, links });
  };

  return (
    <FormContext.Provider
      value={{
        formDetails,
        resetValue,
        setInitialValue,
        setTitle,
        setDescription,
        addLink,
        removeLink,
        addTag,
        removeTag,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};
