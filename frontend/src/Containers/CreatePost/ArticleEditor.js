import React from "react";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { BiBold, BiStrikethrough } from "react-icons/bi";
import {
  FiItalic,
  //  FiUnderline
} from "react-icons/fi";
import { FaHeading } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa";
import { useFormContext } from "../Layout/FormContext";

const ArticleEditor = ({ onChange }) => {
  const { value: formDetails } = useFormContext();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "w-full px-4 py-2 mt-2 text-base border border-gray-300 text-black transition duration-500 ease-in-out transform rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 prose",
      },
    },
  });

  React.useEffect(() => {
    if (editor === null) {
      return;
    }
    editor.on("update", () => onChange(editor.getHTML()));
    //eslint-disable-next-line
  }, [editor]);

  React.useEffect(() => {
    if (editor === null) {
      return;
    }
    editor.commands.setContent(formDetails.description);
  }, [formDetails.description, editor]);

  return (
    <div>
      {editor && (
        <BubbleMenu
          className="flex p-1 bg-white border border-gray-400 rounded-lg backdrop-blur-md no-wrap gap-x-1"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1 rounded hover:bg-gray-200 cursor-pointer focus:outline-none focus:bg-gray-300 ${
              editor.isActive("bold")
                ? "text-gray-900 bg-gray-200"
                : " text-gray-700"
            }`}
          >
            <BiBold />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1 rounded hover:bg-gray-200 cursor-pointer focus:outline-none focus:bg-gray-300 ${
              editor.isActive("italic")
                ? "text-gray-900 bg-gray-200"
                : " text-gray-700"
            }`}
          >
            <FiItalic />
          </button>
          {/* <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1 rounded hover:bg-gray-200 cursor-pointer focus:outline-none focus:bg-gray-300 ${
              editor.isActive("underline")
                ? "text-gray-900 bg-gray-200"
                : " text-gray-700"
            }`}
          >
            <FiUnderline />
          </button> */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1 rounded hover:bg-gray-200 cursor-pointer focus:outline-none focus:bg-gray-300 ${
              editor.isActive("strike")
                ? "text-gray-900 bg-gray-200"
                : " text-gray-700"
            }`}
          >
            <BiStrikethrough />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1 rounded hover:bg-gray-200 cursor-pointer focus:outline-none focus:bg-gray-300 ${
              editor.isActive("blockquote")
                ? "text-gray-900 bg-gray-200"
                : " text-gray-700"
            }`}
          >
            <FaQuoteLeft />
          </button>
        </BubbleMenu>
      )}

      {editor && (
        <FloatingMenu
          className="flex p-1 bg-white border border-gray-400 rounded-lg no-wrap gap-x-1"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`px-1 py-0.5 rounded hover:bg-gray-200 cursor-pointer focus:outline-none focus:bg-gray-300  ${
              editor.isActive("heading", { level: 2 })
                ? "text-gray-900 bg-gray-200"
                : " text-gray-700"
            }`}
          >
            <FaHeading size={15} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-1 py-0.5  rounded hover:bg-gray-200 cursor-pointer focus:outline-none focus:bg-gray-300  ${
              editor.isActive("bulletList")
                ? "text-gray-900 bg-gray-200"
                : " text-gray-700"
            }`}
          >
            <MdFormatListBulleted />
          </button>
        </FloatingMenu>
      )}
      {/* <MenuBar editor={editor} /> */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default ArticleEditor;
