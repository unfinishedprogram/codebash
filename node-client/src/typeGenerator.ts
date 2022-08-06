import * as fs from "fs"

const removeTS = (name: string): string => name.substring(0, name.length - 3);

const constantTypes = {
    message:  "export interface Message<T extends keyof MessageTypes> {message_type: T, data: MessageTypes[T]}",
    handlerInterface: "export type MessageHandler = {\n\t[key in keyof MessageTypes]: (arg: MessageTypes[key]) => void;\n}",
}

const constantContent = `
${constantTypes.message}
${constantTypes.handlerInterface}`


fs.readdir("./bindings/messageTypes", (_, files) => {
    const header = "// THIS CODE WAS AUTO-GENERATED. DO NOT EDIT MANUALLY.\n"

    files = files
        .filter(f => f.endsWith(".ts"))
        .map(f => removeTS(f))
        .filter(f => f !== 'types');

    if(files.length === 0)
        throw new Error("Message types from rust must be generated first");
    
    const imports = files.map(f => `import {${f}} from './messageTypes/${f}';`).join('\n');

    const messageTypes = 
    `interface MessageTypes {\n ${files.map(f => `\t'${f}' : ${f};`).join('\n')}\n};`

    const final = `${header}${imports}\n\n${messageTypes}\n${constantContent}`;
    fs.writeFileSync('./bindings/types.ts', final);
});