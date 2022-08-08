import { createSignal } from "solid-js";
import CodeEditor from "../components/code-editor/codeEditor";
import MarkdownView from "../components/markdownView";
import style from "../style/markdownEditor.module.css";
import testContent from "../test.md?raw";

const MDWriter = () => {
    const [content, setContent] = createSignal("");
    const test:any = {};

    setTimeout(() => console.log(test), 100);
    return <div class={style['markdown_editor']!}>
        <MarkdownView content={content()}/>
        <CodeEditor content={testContent} lang="markdown" onChange={setContent}/>
    </div>
};

export default MDWriter;