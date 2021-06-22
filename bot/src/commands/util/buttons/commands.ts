import { generateButtonGroups } from "./button-groups";

export function getCommandButtons({
  commandButtonsString,
}: {
  commandButtonsString: string;
}) {
  if (!Boolean(commandButtonsString)) return [];

  const commandButtonsJson = JSON.parse(commandButtonsString);

  const commandButtons = generateButtonGroups({
    buttonsInfo: commandButtonsJson,
    groupSize: 2,
  });

  return commandButtons;
}
