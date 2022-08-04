import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { onMount, For } from 'solid-js';
import registerAll, { supportedLanguages } from './languages';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

registerAll();

console.log(monaco.languages.getLanguages());

const CodeEditor = () => {

    let container:HTMLDivElement;
    const options: editor.IStandaloneEditorConstructionOptions = {theme:"vs-dark"};

    let editorInstance!:editor.IStandaloneCodeEditor;
    let languageSelect!:HTMLSelectElement;

    onMount(() => {
        editorInstance = editor.create(container, options);
    })

    const languageChange = (e:Event) => {
        editorInstance.getModel()?.dispose();
        editorInstance.setModel(editor.createModel((e.target as HTMLSelectElement).value, (e.target as HTMLSelectElement).value));
    }

    return <>
        <select ref={languageSelect} onChange={languageChange}>
            <For each={supportedLanguages}>
                {(lang) => (<option value={lang}>{lang}</option>)}
            </For>
        </select>
        <div ref={container!} style="width:80vw;height:80vh;">

        </div>
    </>
}

export default CodeEditor;
