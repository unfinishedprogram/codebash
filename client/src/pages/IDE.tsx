import CodeEditor from "../components/code-editor/codeEditor";
import ProblemView from "../components/problemView";
import style from "../style/ide.module.css";

const IDE = () => {
    return <div class={style["ide"]!}>
        <ProblemView/>
        <CodeEditor lang="javascript" />
    </div>
};

export default IDE;
