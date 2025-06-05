"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  Code,
  Heading1,
  Heading2,
  Quote,
  Undo,
  Redo,
  Code2,
  ChevronDown,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface ToolbarProps {
  editor: Editor | null;
  addImage: () => void;
  setLink: () => void;
}

export function Toolbar({ editor, addImage, setLink }: ToolbarProps) {
  if (!editor) return null;

  const isActive = (type: string, attributes?: any) => {
    if (type === "textAlign") {
      return editor.isActive({ textAlign: attributes?.alignment });
    }
    return editor.isActive(type, attributes);
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-1 border rounded-lg bg-background">
      {/* Headings */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant={isActive("heading") ? "secondary" : "ghost"}
            size="sm"
          >
            <Type className="h-4 w-4" />
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2">
          <Button
            type="button"
            variant={isActive("heading", { level: 1 }) ? "secondary" : "ghost"}
            size="sm"
            className="w-full justify-start"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <Heading1 className="mr-2 h-4 w-4" />
            Heading 1
          </Button>
          <Button
            type="button"
            variant={isActive("heading", { level: 2 }) ? "secondary" : "ghost"}
            size="sm"
            className="w-full justify-start mt-1"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 className="mr-2 h-4 w-4" />
            Heading 2
          </Button>
          <Button
            type="button"
            variant={!isActive("heading") ? "secondary" : "ghost"}
            size="sm"
            className="w-full justify-start mt-1"
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            <span className="mr-2 text-xs">¶</span>
            Paragraph
          </Button>
        </PopoverContent>
      </Popover>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Text Formatting */}
      <Button
        type="button"
        variant={isActive("bold") ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant={isActive("italic") ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant={isActive("underline") ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant={isActive("strike") ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant={isActive("highlight") ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        <Highlighter className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Alignment */}
      <Button
        type="button"
        variant={isActive("textAlign", { alignment: "left" }) ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant={isActive("textAlign", { alignment: "center" }) ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant={isActive("textAlign", { alignment: "right" }) ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant={isActive("textAlign", { alignment: "justify" }) ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      >
        <AlignJustify className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Lists */}
      <Button
        type="button"
        variant={isActive("bulletList") ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant={isActive("orderedList") ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant={isActive("blockquote") ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Links & Images */}
      <Button
        type="button"
        variant={isActive("link") ? "secondary" : "ghost"}
        size="sm"
        onClick={setLink}
      >
        <Link2 className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant={isActive("image") ? "secondary" : "ghost"}
        size="sm"
        onClick={addImage}
      >
        <ImageIcon className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Code */}
      <Button
        type="button"
        variant={isActive("code") ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <Code className="h-4 w-4" />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant={isActive("codeBlock") ? "secondary" : "ghost"}
            size="sm"
          >
            <Code2 className="h-4 w-4 mr-1" />
            <ChevronDown className="h-3 w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2 grid grid-cols-2 gap-1">
          {[
            { label: "Plain Text", value: "plaintext" },
            { label: "HTML", value: "html" },
            { label: "CSS", value: "css" },
            { label: "JS", value: "js" },
            { label: "TS", value: "ts" },
          ].map((lang) => (
            <Button
              key={lang.value}
              type="button"
              variant="ghost"
              size="sm"
              className="justify-start text-xs"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleCodeBlock({ language: lang.value })
                  .run()
              }
            >
              {lang.label}
            </Button>
          ))}
        </PopoverContent>
      </Popover>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* History */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  );
}

// "use client";

// import { Editor } from "@tiptap/react";
// import {
//     Bold,
//     Italic,
//     Strikethrough,
//     Underline,
//     List,
//     ListOrdered,
//     Link2,
//     Image as ImageIcon,
//     Code,
//     Heading1,
//     Heading2,
//     Quote,
//     Undo,
//     Redo,
//     Code2,
//     ChevronDown,
//     Highlighter,
//     AlignLeft,
//     AlignCenter,
//     AlignRight,
//     AlignJustify,
//     Type,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Separator } from "@/components/ui/separator";
// import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

// interface ToolbarProps {
//     editor: Editor | null;
// }

// export function Toolbar({ editor }: ToolbarProps) {
//     if (!editor) {
//         return null;
//     }

//     const isActive = (type: string, attributes?: any) => {
//         if (type === "textAlign") {
//             return editor.isActive({ textAlign: attributes?.alignment });
//         }
//         return editor.isActive(type, attributes);
//     };

//     // image
//     const addImage = () => {
//         const url = window.prompt("Enter the URL of the image:");
//         if (url) {
//             editor.chain().focus().setImage({ src: url }).run();
//         }
//     };

//     const setLink = () => {
//         const previousUrl = editor.getAttributes("link").href;
//         const url = window.prompt("URL", previousUrl);

//         if (url === null) return;

//         if (url === "") {
//             editor.chain().focus().extendMarkRange("link").unsetLink().run();
//             return;
//         }

//         editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
//     };

//     return (
//         <div className="flex flex-wrap items-center gap-1 p-1 border rounded-lg bg-background">
//             {/* Text Formatting */}
//             <Button
//                 type="button"
//                 variant={editor.isActive("bold") ? "secondary" : "ghost"}
//                 size="sm"
//                 onClick={() => editor.chain().focus().toggleBold().run()}
//                 disabled={!editor.can().chain().focus().toggleBold().run()}
//             >
//                 <Bold className="h-4 w-4" />
//             </Button>

//             <Button
//                 type="button"
//                 variant={editor.isActive("italic") ? "secondary" : "ghost"}
//                 size="sm"
//                 onClick={() => editor.chain().focus().toggleItalic().run()}
//                 disabled={!editor.can().chain().focus().toggleItalic().run()}
//             >
//                 <Italic className="h-4 w-4" />
//             </Button>

//             <Button
//                 type="button"
//                 variant={editor.isActive("underline") ? "secondary" : "ghost"}
//                 size="sm"
//                 onClick={() => editor.chain().focus().toggleUnderline().run()}
//             >
//                 <Underline className="h-4 w-4" />
//             </Button>

//             <Button
//                 type="button"
//                 variant={editor.isActive("strike") ? "secondary" : "ghost"}
//                 size="sm"
//                 onClick={() => editor.chain().focus().toggleStrike().run()}
//                 disabled={!editor.can().chain().focus().toggleStrike().run()}
//             >
//                 <Strikethrough className="h-4 w-4" />
//             </Button>

//             <Button
//                 type="button"
//                 variant={editor.isActive("highlight") ? "secondary" : "ghost"}
//                 size="sm"
//                 onClick={() => editor.chain().focus().toggleHighlight().run()}
//             >
//                 <Highlighter className="h-4 w-4" />
//             </Button>

//             <Separator orientation="vertical" className="h-6 mx-1" />

//             {/* Headings */}
//             {/* <Popover>
//                 <PopoverTrigger asChild>
//                     <Button type="button" variant="ghost" size="sm">
//                         <Heading1 className="h-4 w-4" />
//                         <ChevronDown className="h-3 w-3 ml-1" />
//                     </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-48 p-2">
//                     <Button
//                         type="button"
//                         variant={editor.isActive("heading", { level: 1 }) ? "secondary" : "ghost"}
//                         size="sm"
//                         className="w-full justify-start"
//                         onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//                     >
//                         <Heading1 className="mr-2 h-4 w-4" />
//                         Heading 1
//                     </Button>
//                     <Button
//                         type="button"
//                         variant={editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"}
//                         size="sm"
//                         className="w-full justify-start mt-1"
//                         onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//                     >
//                         <Heading2 className="mr-2 h-4 w-4" />
//                         Heading 2
//                     </Button>
//                 </PopoverContent>
//             </Popover> */}

//             {/* Headings */}
//             <Popover>
//                 <PopoverTrigger asChild>
//                     <Button
//                         type="button"
//                         variant={isActive("heading") ? "secondary" : "ghost"}
//                         size="sm"
//                     >
//                         <Type className="h-4 w-4" />
//                         <ChevronDown className="h-3 w-3 ml-1" />
//                     </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-48 p-2">
//                     <Button
//                         type="button"
//                         variant={isActive("heading", { level: 1 }) ? "secondary" : "ghost"}
//                         size="sm"
//                         className="w-full justify-start"
//                         onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//                     >
//                         <Heading1 className="mr-2 h-4 w-4" />
//                         Heading 1
//                     </Button>
//                     <Button
//                         type="button"
//                         variant={isActive("heading", { level: 2 }) ? "secondary" : "ghost"}
//                         size="sm"
//                         className="w-full justify-start mt-1"
//                         onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//                     >
//                         <Heading2 className="mr-2 h-4 w-4" />
//                         Heading 2
//                     </Button>
//                     <Button
//                         type="button"
//                         variant={!isActive("heading") ? "secondary" : "ghost"}
//                         size="sm"
//                         className="w-full justify-start mt-1"
//                         onClick={() => editor.chain().focus().setParagraph().run()}
//                     >
//                         <span className="mr-2 text-xs">¶</span>
//                         Paragraph
//                     </Button>
//                 </PopoverContent>
//             </Popover>


//             {/* Text Alignment */}
//             <Separator orientation="vertical" className="h-6 mx-1" />

//             <Button
//                 type="button"
//                 variant={editor.isActive({ textAlign: "left" }) ? "secondary" : "ghost"}
//                 size="sm"
//                 onClick={() => editor.chain().focus().setTextAlign("left").run()}
//             >
//                 <AlignLeft className="h-4 w-4" />
//             </Button>

//             <Button
//                 type="button"
//                 variant={editor.isActive({ textAlign: "center" }) ? "secondary" : "ghost"}
//                 size="sm"
//                 onClick={() => editor.chain().focus().setTextAlign("center").run()}
//             >
//                 <AlignCenter className="h-4 w-4" />
//             </Button>

//             <Button
//                 type="button"
//                 variant={editor.isActive({ textAlign: "right" }) ? "secondary" : "ghost"}
//                 size="sm"
//                 onClick={() => editor.chain().focus().setTextAlign("right").run()}
//             >
//                 <AlignRight className="h-4 w-4" />
//             </Button>

//             <Button
//                 type="button"
//                 variant={editor.isActive({ textAlign: "justify" }) ? "secondary" : "ghost"}
//                 size="sm"
//                 onClick={() => editor.chain().focus().setTextAlign("justify").run()}
//             >
//                 <AlignJustify className="h-4 w-4" />
//             </Button>

//             <Separator orientation="vertical" className="h-6 mx-1" />

//             {/* Lists */}
//             <Button
//                 type="button"
//                 variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
//                 size="sm"
//                 onClick={() => editor.chain().focus().toggleBulletList().run()}
//             >
//                 <List className="h-4 w-4" />
//             </Button>

//             <Button
//                 type="button"
//                 variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
//                 size="sm"
//                 onClick={() => editor.chain().focus().toggleOrderedList().run()}
//             >
//                 <ListOrdered className="h-4 w-4" />
//             </Button>

//             <Button
//                 type="button"
//                 variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
//                 size="sm"
//                 onClick={() => editor.chain().focus().toggleBlockquote().run()}
//             >
//                 <Quote className="h-4 w-4" />
//             </Button>

//             <Separator orientation="vertical" className="h-6 mx-1" />

//             {/* Code Blocks */}
//             <Popover>
//                 <PopoverTrigger asChild>
//                     <Button
//                         type="button"
//                         variant={editor.isActive("codeBlock") ? "secondary" : "ghost"}
//                         size="sm"
//                     >
//                         <Code2 className="h-4 w-4 mr-1" />
//                         <ChevronDown className="h-3 w-3" />
//                     </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-48 p-2 grid grid-cols-2 gap-1">
//                     {[
//                         { label: "Plain Text", value: "plaintext" },
//                         { label: "HTML", value: "html" },
//                         { label: "CSS", value: "css" },
//                         { label: "JavaScript", value: "js" },
//                         { label: "TypeScript", value: "ts" },
//                     ].map((lang) => (
//                         <Button
//                             key={lang.value}
//                             type="button"
//                             variant="ghost"
//                             size="sm"
//                             className="justify-start text-xs"
//                             onClick={() =>
//                                 editor
//                                     .chain()
//                                     .focus()
//                                     .toggleCodeBlock({ language: lang.value })
//                                     .run()
//                             }
//                         >
//                             {lang.label}
//                         </Button>
//                     ))}
//                 </PopoverContent>
//             </Popover>

//             {/* Inline Code */}
//             <Button
//                 type="button"
//                 variant={editor.isActive("code") ? "secondary" : "ghost"}
//                 size="sm"
//                 onClick={() => editor.chain().focus().toggleCode().run()}
//             >
//                 <Code className="h-4 w-4" />
//             </Button>

//             <Separator orientation="vertical" className="h-6 mx-1" />

//             {/* Links & Images */}
//             <Button
//                 type="button"
//                 variant={editor.isActive("link") ? "secondary" : "ghost"}
//                 size="sm"
//                 onClick={setLink}
//             >
//                 <Link2 className="h-4 w-4" />
//             </Button>

//             <Button
//                 type="button"
//                 variant="ghost"
//                 size="sm"
//                 onClick={addImage}
//             >
//                 <ImageIcon className="h-4 w-4" />
//             </Button>

//             <Separator orientation="vertical" className="h-6 mx-1" />

//             {/* History */}
//             <Button
//                 type="button"
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => editor.chain().focus().undo().run()}
//                 disabled={!editor.can().chain().focus().undo().run()}
//             >
//                 <Undo className="h-4 w-4" />
//             </Button>

//             <Button
//                 type="button"
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => editor.chain().focus().redo().run()}
//                 disabled={!editor.can().chain().focus().redo().run()}
//             >
//                 <Redo className="h-4 w-4" />
//             </Button>
//         </div>
//     );
// }
