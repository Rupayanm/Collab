import React, { createContext, useReducer, useContext } from "react";

export const FormContext = createContext();

export const initialValues = {
  title: "",
  tags: [],
  links: [],
  description: "",
};

const actionTypes = {
  reset: "RESET",
  set_initial: "SET_INITIAL",
  set_title: "SET_TITLE",
  set_description: "SET_DESCRIPTION",
  add_tag: "ADD_TAG",
  remove_tag: "REMOVE_TAG",
  add_link: "ADD_LINK",
  remove_link: "REMOVE_LINK",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.reset:
      return initialValues;

    case actionTypes.set_initial:
      return { ...initialValues, ...action.payload };

    case actionTypes.set_title: {
      return { ...state, title: action.payload };
    }

    case actionTypes.set_description:
      return { ...state, description: action.payload };

    case actionTypes.add_tag:
      return { ...state, tags: [...state.tags, action.payload] };

    case actionTypes.remove_tag:
      return {
        ...state,
        tags: state.tags.filter((item) => item !== action.payload),
      };

    case actionTypes.add_link:
      return { ...state, links: [...state.links, action.payload] };

    case actionTypes.remove_link: {
      const links = state.links;
      links.splice(action.payload, 1);
      return { ...state, links };
    }

    default:
      throw new Error("Action Type not found in useFormContext reducer");
  }
};

export const FormProvider = (props) => {
  const [value, dispatch] = useReducer(formReducer, initialValues);

  return (
    <FormContext.Provider value={[value, dispatch]}>
      {props.children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const [value, dispatch] = useContext(FormContext);

  const resetValue = () => {
    dispatch({ type: actionTypes.reset });
  };

  const setInitialValue = (data) => {
    dispatch({ type: actionTypes.set_initial, payload: data });
  };

  const setTitle = (title) => {
    dispatch({ type: actionTypes.set_title, payload: title });
  };

  const setDescription = (description) => {
    dispatch({ type: actionTypes.set_description, payload: description });
  };

  const addTag = (value) => {
    dispatch({ type: actionTypes.add_tag, payload: value.toLowerCase() });
  };

  const removeTag = (value) => {
    dispatch({ type: actionTypes.remove_tag, payload: value.toLowerCase() });
  };

  const addLink = (value) => {
    dispatch({ type: actionTypes.add_link, payload: value });
  };

  const removeLink = (index) => {
    dispatch({ type: actionTypes.remove_link, payload: index });
  };

  return {
    value,
    resetValue,
    setInitialValue,
    setTitle,
    setDescription,
    addTag,
    removeTag,
    addLink,
    removeLink,
  };
};
