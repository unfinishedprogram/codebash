import fs from "fs"

const removeTS = (name: string): string => name.substring(0, name.length - 3);

fs.readdir("./bindings/enums", (_, files) => {
    const header = "// THIS CODE WAS AUTO-GENERATED. DO NOT EDIT MANUALLY.\n\n\n\n"
    files = files
        .filter(f => f.endsWith(".ts"))
        .map(f => removeTS(f))
        .filter(f => f !== 'types');
    const imports = files.map(f => `import {${f}} from './enums/${f}';`).join('\n');
    
    let messageTypes = files.map(f => `export type ${f}Of<T> = T extends keyof ${f}? ${f}[T]: never;`).join("\n");
    const handlerInterfaces = files.map(f => `export type ${f}Handler = {\n\t[key in keyof ${f}]: (arg: ${f}Of<key>) => void;\n}`).join("\n")

    const final = `${header}${imports}\n${messageTypes}\n${handlerInterfaces}`;
    fs.writeFileSync('./bindings/types.ts', final);
});