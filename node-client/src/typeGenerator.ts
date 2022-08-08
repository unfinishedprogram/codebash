import * as fs from "fs"

const removeTS = (name: string): string => name.replace('.ts', '');

fs.readdir("./bindings/enums", (_, files) => {
    const header = "// THIS CODE WAS AUTO-GENERATED. DO NOT EDIT MANUALLY.\n\n"
    const enums = files
        .filter(f => f.endsWith(".ts"))
        .map(f => removeTS(f))
        .filter(f => f !== 'types');

    let imports:string[] = enums.map(f => `import {${f}} from './enums/${f}';`);

    let messageTypes = "";

    enums.forEach(e => {
        const types = fs.readdirSync("./bindings/messageTypes/" + e)
            .filter(f => f.endsWith(".ts"))
            .map(f => removeTS(f))
            .filter(f => f !== 'types');
        
        imports.push(...types.map(f => `import {${f}} from './messageTypes/${e}/${f}';`));

        messageTypes += `export interface ${e}Types { \n`;
        messageTypes += types.map(t =>`\t'${t}' : ${t};`).join("\n");
        messageTypes += '\n}\n';
        messageTypes += `export type ClientMessageType = Pick<ClientMessageTypes, keyof ClientMessageTypes>;\n`
    })


    const handlerInterfaces = enums.map(f => `export type ${f}Handler = {\n\t[key in keyof ${f}Types]: (arg: ${f}Types[key]) => void;\n}`).join("\n")

    const final = `${header}${imports.join('\n')}\n\n${messageTypes}\n\n${handlerInterfaces}`;
    fs.writeFileSync('./bindings/types.ts', final);
});