import {conf as cpp_conf, language as cpp_language } from "./basic-languages/cpp";
import {conf as csharp_conf, language as csharp_language } from "./basic-languages/csharp"
import {conf as go_conf, language as go_language } from "./basic-languages/go"
import {conf as java_conf, language as java_language } from "./basic-languages/java"
import {conf as javascript_conf, language as javascript_language } from "./basic-languages/javascript"
import {conf as lua_conf, language as lua_language } from "./basic-languages/lua"
import {conf as python_conf, language as python_language } from "./basic-languages/python"
import {conf as rust_conf, language as rust_language } from "./basic-languages/rust"
import {conf as typescript_conf, language as typescript_language } from "./basic-languages/typescript"

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

const languages:Record<string, [monaco.languages.LanguageConfiguration, monaco.languages.IMonarchLanguage]> = {
    "cpp":[cpp_conf, cpp_language],
    "csharp":[csharp_conf, csharp_language],
    "go":[go_conf, go_language],
    "java":[java_conf, java_language],
    "javascript":[javascript_conf, javascript_language],
    "lua":[lua_conf, lua_language],
    "python":[python_conf, python_language],
    "rust":[rust_conf, rust_language],
    "typescript":[typescript_conf, typescript_language]
}

function registerLanguage(id:string, conf:any, lang:any) {
    monaco.languages.register({id});
    monaco.languages.setLanguageConfiguration(id, conf);
    monaco.languages.setMonarchTokensProvider(id, lang);
}

// Register one language per frame, nice n slow no lag, since we have 70ish, they will all still register in one second.
export default async function registerAll() {
    // Only register once
    if(monaco.languages.getLanguages().length > 1) return;
    console.log("Loading languages")
    const ids = Object.keys(languages);
    const registerNext = () => {
        const id = ids.pop()!;
        registerLanguage(id, ...languages[id]!);
        if(ids.length){
            requestAnimationFrame(registerNext);
        }
    }
    registerNext();
}

export const supportedLanguages = Object.keys(languages);
