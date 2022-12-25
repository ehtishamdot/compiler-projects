import React, { useRef, useState } from "react";
// import AceEditor from "react-ace";

// import "ace-builds/src-noconflict/mode-typescript";
// import "ace-builds/src-noconflict/theme-monokai";

const CodeEditor = (props: { lexicalHandler: (value: any) => void }) => {
  const editorRef = useRef(null);

  return (
    <textarea
      style={{
        fontFamily: "monospace",
        backgroundColor: "#fafafa",
        border: "1px solid #ccc",
        padding: "0.5em",
        width: "400px",
        height: "300px",
      }}
    />
    // <AceEditor
    //   ref={editorRef}
    //   mode="typescript"
    //   theme="monokai"
    //   onChange={props.lexicalHandler}
    //   fontSize={14}
    //   showPrintMargin={true}
    //   showGutter={true}
    //   highlightActiveLine={true}
    //   value={`int a = 3; \n if(a == b){
    //       printf("Hello, World! \n");\n else if(b!=c)
    //       {
    //           printf("Hello, World! \n Hello, World!");
    //       }else{
    //           printf("Hello\n");
    //       }`}
    //   setOptions={{
    //     enableBasicAutocompletion: true,
    //     enableLiveAutocompletion: true,
    //     enableSnippets: false,
    //     showLineNumbers: true,
    //     tabSize: 2,
    //   }}
    // />
  );
};

export default CodeEditor;
