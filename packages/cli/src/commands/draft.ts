import { Command } from "commander";

export default new Command()
  .name("draft")
  .description("draft a component")
  .argument("<component>", "component name")
  .action((component) => {
    console.log(createDraft(component));
  });

function createDraft(component: string) {
  const name = component.toLowerCase();
  return [
    `components/ui/${name}/`,
    "├── index.ts",
    `├── ${name}.tsx`,
    `├── ${name}.types.ts`,
    `└── ${name}.recipe.json`,
  ];
}
