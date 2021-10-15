import React, { useEffect, useState } from "react";
import { RiBold, RiItalic, RiUnderline } from "react-icons/ri";
// import {
//   MdOutlineFormatListBulleted,
//   MdOutlineFormatListNumbered,
// } from "react-icons/md";
// import { GrBlockQuote } from "react-icons/gr";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import "./editor.css";
import { stateToHTML } from "draft-js-export-html";
import DOMPurify from "dompurify";

const TextEditor = ({ setDescription }) => {
  const size = 20;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    const value = DOMPurify.sanitize(
      stateToHTML(editorState.getCurrentContent()),
      { USE_PROFILES: { html: true } }
    );
    setDescription(value);
  }, [editorState]);

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleToggleClick = (e, inlineStyle) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  // const handleBlockClick = (e, blockType) => {
  //   e.preventDefault();
  //   setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  // };

  return (
    <>
      <div className="w-full flex flex-nowrap justify-evenly border-b border-gray-300">
        <button
          type="button"
          className="m-1.5 p-1"
          onClick={(e) => handleToggleClick(e, "BOLD")}
        >
          <RiBold size={size} />
        </button>
        <button
          type="button"
          className="m-1.5 p-1"
          onClick={(e) => handleToggleClick(e, "ITALIC")}
        >
          <RiItalic size={size} />
        </button>
        <button
          type="button"
          className="m-1.5 p-1"
          onClick={(e) => handleToggleClick(e, "UNDERLINE")}
        >
          <RiUnderline size={size} />
        </button>
        {/* <div className="border-l border-gray-300 mx-1 my-2"></div>
        <button
          type="button"
          className="m-1.5 p-1"
          onClick={(e) => handleBlockClick(e, "unordered-list-item")}
        >
          <MdOutlineFormatListBulleted size={size} />
        </button>
        <button
          type="button"
          className="m-1.5 p-1"
          onClick={(e) => handleBlockClick(e, "ordered-list-item")}
        >
          <MdOutlineFormatListNumbered size={size} />
        </button>
        <div className="border-l border-gray-300 mx-1 my-2"></div>
        <button
          type="button"
          className="m-1.5 p-1"
          onClick={(e) => handleBlockClick(e, "blockquote")}
        >
          <GrBlockQuote size={size} />
        </button> */}
      </div>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
      />
    </>
  );
};

export default TextEditor;
