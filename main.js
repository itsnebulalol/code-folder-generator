#!/usr/bin/env node
const prompts = require("prompts");
const fs = require("fs-extra");

(async () => {
    let response = {};

    const templates = (await fs.readdir(`${process.mainModule.path}/templates`)).map((template) => {
        let info = require(`${process.mainModule.path}/templates/${template}/template.json`);
        
        if (typeof info === "undefined") info = require(`${process.mainModule.path}/templates/${template}/package.json`);
     
        info.dir = `${process.mainModule.path}/templates/${template}`;
        return info;
    });

    const questions = [{
        type: "text",
        name: "name",
        initial: "project",
        message: "project name?",
        validate: value => value.length < 3 ? `Your project name needs to be longer than 3 characters.` : true
    }];

    if (templates.length > 1) {
        questions.push({
            type: "select",
            name: "template",
            message: "Pick a template",
            choices: templates.map((template) => ({
                title: template.name,
                description: template.description,
                value: template.dir
            })),
            initial: 0
        });
    }

    const onCancel = prompt => {
        console.log("Canceled!", prompt);
        return true;
    }

    response = await prompts(questions, { onCancel });

    if (typeof response.template === "undefined") response.template = templates[0].dir;

    if (await fs.exists(response.name)) {
        const overwrite = await prompts({
            type: 'confirm',
            name: 'value',
            message: 'You already have a project with that name! Do you want to overwrite it?',
            initial: false
        });

        if (overwrite.value === true) {
            await fs.remove(response.name);
            copyTemplate(response.name, response.template);
        }
    } else {
        copyTemplate(response.name, response.template);
    }
})();

async function copyTemplate(name, template) {
    await fs.copy(template, name, {
        filter: (src, dest) => {
            if (!src.includes("template.json")) return true;
        }
    });
}
