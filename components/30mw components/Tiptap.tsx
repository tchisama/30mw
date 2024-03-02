import React from 'react'
import {Editor, EditorContent, useEditor} from "@tiptap/react"
import StarterKit from '@tiptap/starter-kit'
import { Toggle } from '../ui/toggle'
import { Bold, Heading1, Heading2, Heading3, Italic, Pilcrow, Strikethrough } from 'lucide-react'
import Heading from '@tiptap/extension-heading'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '../ui/button'

type Props = {
  value:string,
  onChange:(richText:string) => void
}

const Tiptap = (props: Props) => {
const editor = useEditor({
  extensions: [
    StarterKit.configure(),
  ],
  content: props.value,
  editorProps: {
    attributes: {
      class: "border rounded-xl bg-white p-4 min-h-[200px]",
    },
  },
  onUpdate: ({ editor }) => {
    props.onChange(editor.getHTML());
  }
});
  return (
    <div className='flex flex-col gap-2 mt-4 relative'>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} className='rich-text' />
      {/* {editor?.getHTML()} */}
    </div>
  )
}










const ToolBar = ({editor}:{editor:Editor|null})=>{
  if(!editor) return null



      const tools = [
        {
          icon: <Pilcrow size={16} />,
          name: "paragraph",
          onClick: () => editor.chain().focus().setParagraph().run(),
          isActive: () => editor.isActive('paragraph'),
        },
        {
          icon: <Heading1 size={16} />,
          name: "heading1",
          onClick: () => editor.chain().focus().toggleHeading({level:1}).run(),
          isActive: () => editor.isActive('heading', {level:1}),
        },
        {
          icon: <Heading2 size={16} />,
          name: "heading2",
          onClick: () => editor.chain().focus().toggleHeading({level:2}).run(),
          isActive: () => editor.isActive('heading', {level:2}),
        },
        {
          icon: <Heading3 size={16} />,
          name: "heading3",
          onClick: () => editor.chain().focus().toggleHeading({level:3}).run(),
          isActive: () => editor.isActive('heading', {level:3}),
        },
        {
          icon: <Bold size={16} />,
          name: "bold",
          onClick: () => editor.chain().focus().toggleBold().run(),
          isActive: () => editor.isActive('bold'),
        },
        {
          icon: <Italic size={16} />,
          name: "italic",
          onClick: () => editor.chain().focus().toggleItalic().run(),
          isActive: () => editor.isActive('italic'),
        },
        {
          icon: <Strikethrough size={16} />,
          name: "strike",
          onClick: () => editor.chain().focus().toggleStrike().run(),
          isActive: () => editor.isActive('strike'),
        }
      ]


  return (
    <div className='border p-1 sticky -top-2 flex gap-1 rounded-xl z-10 bg-slate-50 '>
      
      


      {
        tools.map((t) => {
          return (
              <Toggle 
                key={t.name}
                className='bg-white'
                pressed={t.isActive()}
                variant={"outline"}
                size={"sm"}
                
                onPressedChange={t.onClick}
              >
                {t.icon}
              </Toggle>
          )
        })
      }





    </div>
  )
}

export default Tiptap