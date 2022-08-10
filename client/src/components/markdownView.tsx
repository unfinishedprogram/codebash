import { Component, createMemo } from "solid-js";
import style from "./markdownView.module.scss";
import MarkdownIt from "markdown-it";

interface MarkdownViewProps {
    content:string;
}

const MarkdownView:Component<MarkdownViewProps> = (props) => {
    const md = new MarkdownIt();
    const rendered = createMemo( () => md.render(props.content));
    return <div class={style.markdown} innerHTML={rendered()}></div>
};

export default MarkdownView
