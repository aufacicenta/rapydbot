const promptDirectory = require("inquirer-directory");
const path = require("path");

const generatorTypes = {
  REACT_COMPONENT: "React component",
  CUSTOM_HOOK: "Custom hook",
  PAGE: "Next.js page",
};

const customHookGenerator = () => ({
  description: generatorTypes.CUSTOM_HOOK,
  prompts: [
    {
      type: "directory",
      name: "directory",
      message: "select directory",
      basePath: "./src",
    },
    {
      type: "input",
      name: "name",
      message: "hook name",
    },
  ],
  actions: () => {
    const actions = [
      {
        type: "add",
        path: "src/{{directory}}/{{name}}/{{camelCase name}}.tsx",
        templateFile: "plop-templates/hook/hook.hbs",
      },
      {
        type: "add",
        path: "src/{{directory}}/{{name}}/{{camelCase name}}.test.tsx",
        templateFile: "plop-templates/hook/hook.test.hbs",
      },
    ];

    return actions;
  },
});

const reactComponentGenerator = (plop) => ({
  description: generatorTypes.REACT_COMPONENT,
  prompts: [
    {
      type: "list",
      name: "baseDir",
      message: "base directory",
      choices: ["ui", "app"],
      default: 1,
    },
    {
      type: "directory",
      name: "directory",
      message: "select directory",
      basePath: "./src/ui",
      when: (answers) => answers.baseDir === "ui",
    },
    {
      type: "directory",
      name: "directory",
      message: "select directory",
      basePath: "./src/app",
      when: (answers) => answers.baseDir === "app",
    },
    {
      type: "input",
      name: "name",
      message: "component name",
    },
    {
      type: "confirm",
      name: "addStyles",
      message: "add styles",
      default: true,
    },
    {
      type: "confirm",
      name: "addContainer",
      message: "add container",
      default: false,
    },
    {
      type: "confirm",
      name: "addStory",
      message: "add story",
      default: false,
    },
  ],
  actions: (data) => {
    const actions = [
      {
        type: "add",
        path: `src/${data.baseDir}/{{directory}}/{{name}}/{{pascalCase name}}.tsx`,
        templateFile: "plop-templates/component/Component.hbs",
      },
      {
        type: "add",
        path: `src/${data.baseDir}/{{directory}}/{{name}}/{{pascalCase name}}.test.tsx`,
        templateFile: "plop-templates/component/Component.test.hbs",
      },
      {
        type: "add",
        path: `src/${data.baseDir}/{{directory}}/{{name}}/{{pascalCase name}}.types.ts`,
        templateFile: "plop-templates/component/Component.types.hbs",
      },
    ];

    if (data.addStyles) {
      const baseFilePath = path
        .relative(`src/${data.baseDir}/{{directory}}/{{name}}`, "src/theme/_base.scss")
        .replace("../", "")
        .replace(".scss", "");

      plop.setHelper("baseFilePath", baseFilePath);

      actions.push({
        type: "add",
        path: `src/${data.baseDir}/{{directory}}/{{name}}/{{pascalCase name}}.module.scss`,
        templateFile: "plop-templates/component/Component.module.scss.hbs",
      });
    }

    if (data.addContainer) {
      actions.push({
        type: "add",
        path: `src/${data.baseDir}/{{directory}}/{{name}}/{{pascalCase name}}Container.tsx`,
        templateFile: "plop-templates/component/ComponentContainer.hbs",
      });
    }

    if (data.addStory) {
      actions.push({
        type: "add",
        path: `src/${data.baseDir}/{{directory}}/{{name}}/{{pascalCase name}}.story.tsx`,
        templateFile: "plop-templates/component/Component.story.hbs",
      });
    }

    return actions;
  },
});

const pageGenerator = () => ({
  description: generatorTypes.PAGE,
  prompts: [
    {
      type: "directory",
      name: "directory",
      message: "select directory",
      basePath: "./src/pages",
    },
    {
      type: "input",
      name: "name",
      message: "page name",
    },
  ],
  actions: () => {
    const actions = [
      {
        type: "add",
        path: "src/pages/{{directory}}/{{name}}.tsx",
        templateFile: "plop-templates/page/page.hbs",
      },
    ];

    return actions;
  },
});

module.exports = (plop) => {
  plop.setPrompt("directory", promptDirectory);
  plop.setGenerator(generatorTypes.REACT_COMPONENT, reactComponentGenerator(plop));
  plop.setGenerator(generatorTypes.CUSTOM_HOOK, customHookGenerator());
  plop.setGenerator(generatorTypes.PAGE, pageGenerator());
};
