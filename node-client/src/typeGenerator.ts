import * as fs from "fs"

const removeTS = (name: string): string => name.substring(0, name.length - 3);

fs.readdir("./bindings/enums", (_, files) => {
    const header = "// THIS CODE WAS AUTO-GENERATED. DO NOT EDIT MANUALLY.\n\n\n\n"
    const enums = files
        .filter(f => f.endsWith(".ts"))
        .map(f => removeTS(f))
        .filter(f => f !== 'types');
<<<<<<< HEAD

    if(files.length === 0){
        throw new Error("Message types from rust must be generated first");
    }

    const imports = files.map(f => `import {${f}} from './messageTypes/${f}';`).join('\n');
    
    let typeNames = "type TypeName = " + files.map(f => `'${f}'`).join(" | ")
=======
>>>>>>> d42d591829254d8f270a70657ba0ea4921ce7e89

    let imports = enums.map(f => `import {${f}} from './enums/${f}';`).join('\n');
    let messageTypes = "";

    let stringTypes = "";

    enums.forEach(e => {
        const types = fs.readdirSync("./bindings/messageTypes/" + e)
            .filter(f => f.endsWith(".ts"))
            .map(f => removeTS(f))
            .filter(f => f !== 'types');
        imports += types.map(f => `import {${f}} from './messageTypes/${e}/${f}';`).join('\n');

        messageTypes += `export type ${e}Of<T> = \n`;
        messageTypes += types.map(t =>`\tT extends '${t}'? ${t} : `).join("\n");
        messageTypes += "\n\tnever;" 

        stringTypes += `export type ${e}Type = `
        stringTypes += types.map(t => `'${t}'`).join(' | ') + ";\n";
    })


    const handlerInterfaces = enums.map(f => `export type ${f}Handler = {\n\t[key in ${f}Type]: (arg: ${f}Of<key>) => void;\n}`).join("\n")

    const final = `${header}${imports}\n${stringTypes}\n${messageTypes}\n${handlerInterfaces}`;
    fs.writeFileSync('./bindings/types.ts', final);
});