import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { onMount, Component } from 'solid-js';
import registerAll from './languages';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import style from "../../style/codeEditor.module.css";

registerAll();

console.log(monaco.languages.getLanguages());

interface IEditorProps {
    lang:string, // TODO, add language type
    onChange: (e:any) => void,
    content:string,
}

const CodeEditor:Component<IEditorProps> = props => {
    let container:HTMLDivElement;

    const options: editor.IStandaloneEditorConstructionOptions = {
        theme:"vs-dark", 
        lineNumbersMinChars:3,
        automaticLayout: true,
        links:false, 
        language:props.lang,
        minimap:{ enabled:false },
        
    };

    let editorInstance!:editor.IStandaloneCodeEditor;

    window.addEventListener("resize", () => {
        editorInstance.layout();
    });

    // Initialize the editor
    onMount(() => {
        editorInstance = editor.create(container, options);
        editorInstance.onDidChangeModelContent(() => props.onChange(editorInstance.getValue()));
        editorInstance.setValue(props.content || "");
    });
    
    return <div class={style["container"]!}>
        <div class={style["editor"]!} ref={container!}>
    </div> </div>
}

export default CodeEditor;
