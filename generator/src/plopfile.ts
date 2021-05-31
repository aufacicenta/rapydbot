import { NodePlopAPI } from "plop";

export default function (plop: NodePlopAPI) {
  plop.setGenerator("service", {
    description: "Create a new service",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Input the name of your service",
      },
    ],
    actions: [
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/src/service/controller.ts`,
        templateFile: "template/src/service/controller.hbs",
      },
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/src/service/error.ts`,
        templateFile: "template/src/service/error.hbs",
      },
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/src/service/container.ts`,
        templateFile: "template/src/service/container.hbs",
      },
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/src/server/create.ts`,
        templateFile: "template/src/server/create.hbs",
      },
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/src/server/context.ts`,
        templateFile: "template/src/server/context.hbs",
      },
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/src/server/config.ts`,
        templateFile: "template/src/server/config.hbs",
      },
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/src/server/protos/schema.proto`,
        templateFile: "template/src/server/protos/schema.hbs",
      },
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/src/server/interface/IContext.ts`,
        templateFile: "template/src/server/interface/IContext.hbs",
      },
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/src/database/index.ts`,
        templateFile: "template/src/database/index.hbs",
      },
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/src/database/docker-compose.yml`,
        templateFile: "template/src/database/docker-compose.hbs",
      },
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/src/database/model/{{pascalCase name}}Model.ts`,
        templateFile: "template/src/database/model/Model.hbs",
      },
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/src/database/model/index.ts`,
        templateFile: "template/src/database/model/index.hbs",
      },
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/src/database/dao/{{pascalCase name}}DAO.ts`,
        templateFile: "template/src/database/dao/DAO.hbs",
      },
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/src/client/index.ts`,
        templateFile: "template/src/client/index.hbs",
      },
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/src/index.ts`,
        templateFile: "template/src/index.hbs",
      },
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/install.sh`,
        templateFile: "template/install.hbs",
      },
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/jest.config.js`,
        templateFile: "template/jest.config.hbs",
      },
      {
        type: "add",
        skipIfExists: false,
        force: true,
        path: `{{name}}/package.json`,
        templateFile: "template/package.hbs",
      },
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/server.sh`,
        templateFile: "template/server.hbs",
      },
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/tsconfig.json`,
        templateFile: "template/tsconfig.hbs",
      },
      {
        type: "add",
        skipIfExists: true,
        path: `{{name}}/.env`,
        templateFile: "template/.env.hbs",
      },
    ],
  });
}
