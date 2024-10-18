import Quill from "quill";
import { type QuillOptions } from "quill";
import { Delta , Op} from "quill/core";
import { PiTextAa } from "react-icons/pi";
import { MdSend } from "react-icons/md";

import "quill/dist/quill.snow.css";
import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ImageIcon, Keyboard, Smile } from "lucide-react";

import { Hint } from "./hint";
import { cn } from "@/lib/utils";

type EditorValue={
  image : File |null;
  body: string;
}

interface EditorProps {
  onSubmit:({image,body}:EditorValue)=>void;
  onCancel?:()=> void;
  placeholder?:string;
  defaultValue?:Delta| Op[];
  disabled?:boolean;
  innerRef?:MutableRefObject<Quill | null>;
  variant?: "create" | "update";
}

const Editor = ({ 
  onCancel,
  onSubmit,
  placeholder="Write Something...",  
  defaultValue=[],
  disabled= false,
  innerRef,
  variant = "create"
}: EditorProps) => {
  
  const [text , setText] = useState("");
  const [isToolbarVisible , setIsToolbarVisible] = useState(true);

  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled); 

  useLayoutEffect(()=>{
    submitRef.current = onSubmit;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,

      modules:{

        toolbar:[
          ["bold","italic","strike"],
          ["link"],
          [{list: "ordered"},{list: "bullet"}]
        ],
        Keyboard:{
          bindings:{
            enter:{
              key:"Enter",
              handler: () =>{
                //TODO: Submit Form
                return ;
              }
            },
            shift_enter:{
              key:"Enter",
              shiftKey: true,
              handler: () =>{
                quill.insertText(quill.getSelection()?.index || 0 ,"\n");
              },

            },
             
          }
        }
      }

    };
    const quill = new Quill(editorContainer, options);

    quillRef.current =quill;
    quillRef.current.focus();

    if(innerRef){
      innerRef.current=quill;
    }

    quill.setContents(defaultValueRef.current);
    setText(quill.getText());

    quill.on(Quill.events.TEXT_CHANGE,()=>{
      setText(quill.getText());
    })

    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      if (container) {
        container.innerHTML = "";
      }
      if(quillRef.current
      ){
        quillRef.current= null;
      }
      if(innerRef){
        innerRef.current = null;
      }

    };
  }, [innerRef]);

  const toggleToolbar =() =>{
    setIsToolbarVisible((current) => !current);
    const toolbarElement = containerRef.current?.querySelector(".ql-toolbar");

    if(toolbarElement){
      toolbarElement.classList.toggle("hidden");
    }

  };

  const isEmpty = text.replace(/<(.|\n)*?/g,"").trim().length === 0;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col  border border-slate-200 rounded-md overflow-hidden focus-within::border-slate-300 focus-within:shadow-sm transition bg-white">
        <div
          ref={containerRef}
          className="h-full ql-toolbar ql-formats ql-container ql-renderer ql-editor"
        >
          <div className="flex px-2 pb-2 z-[10]">
            <Hint label={isToolbarVisible?"Hide Formatting":"Show Formatting"}>
              <Button
                disabled={disabled}
                size="iconsm"
                variant="ghost"
                onClick={toggleToolbar}
              >
                <PiTextAa className="size-4" />
              </Button>
            </Hint>
            <Hint label="Emoji's">
              <Button
                disabled={disabled}
                size="iconsm"
                variant="ghost"
                onClick={() => {}}
              >
                <Smile className="size-4" />
              </Button>
            </Hint>
            {variant === "create" && (
              <Hint label="Upload Media Files">
                <Button
                  disabled={disabled}
                  size="iconsm"
                  variant="ghost"
                  onClick={() => {}}
                >
                  <ImageIcon className="size-4" />
                </Button>
              </Hint>
            )}

            {variant === "create" && 
            <div>
              <Button
                variant="outline"
                size="sm"
                onClick={()=>{}}
                disabled={disabled}
                className="  hover:bg-[#007a5a]/80 text-[#007a5a]"
              >
                  Cancel
              </Button>
              <Button
               onClick={()=>{}}
               disabled={disabled || isEmpty}
               size="sm"
               className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              >
                Save
              </Button>
              </div>}

            {variant === "create" && (
              <Hint label="Send the message">
                <Button
                  size="iconsm"
                  disabled={disabled || isEmpty}
                  onClick={() => {}}
                  className={cn("ml-auto" ,
                    isEmpty
                    ?" bg-white hover:bg-white text-muted-foreground"
                  :" bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
                  )}
                >
                  <MdSend className="size-4" />
                </Button>
              </Hint>
            )}
          </div>
        </div>
        <div className="p-2 text-[10px] text-muted-foreground flex justify-end">
          <p>
            <strong> Shift + return</strong> to add a new Line
          </p>
        </div>
      </div>
    </div>
  );
};

export default Editor;
