import fs from "fs"

const removeTS = (name: string): string => name.substring(0, name.length - 3);

fs.readdir("./bindings/messageTypes", (_, files) => {
    const header = "// THIS CODE WAS AUTO-GENERATED. DO NOT EDIT MANUALLY.\n\n\n\n"
    files = files
        .filter(f => f.endsWith(".ts"))
        .map(f => removeTS(f))
        .filter(f => f !== 'types');
    const imports = files.map(f => `import {${f}} from './messageTypes/${f}';`).join('\n');
    
    let typeNames = "type TypeName = " + files.map(f => `'${f}'`).join(" | ")

    let messageTypes = "type MessageType<T> = \n";
    files.forEach(f => messageTypes += `\tT extends '${f}' ? ${f} : \n`);
    messageTypes += "\tnever;"

    let getterFunction = "export function caster<T extends TypeName>(type: T, element: any): MessageType<T> { return element as MessageType<T>;}";

    const message =  "export interface Message<T extends TypeName> {message_type: T, data: MessageType<T>}"
    const handlerInterface = "export type MessageHandler = {\n\t[key in TypeName]: (arg: MessageType<key>) => void;\n}";

    const final = `${header}${imports}\n${typeNames}\n${messageTypes}\n${getterFunction}\n${message}\n${handlerInterface}`;
    fs.writeFileSync('./bindings/types.ts', final);
});