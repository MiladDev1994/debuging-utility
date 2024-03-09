import { readdirSync, writeFileSync } from 'fs';

const iconDirectory = './src/assets/icons'
const iconNames = readdirSync(iconDirectory);
let IconNameFileText = `
const svgsNames = [
`;
iconNames.forEach((item: any) => {
  IconNameFileText += ` '${item.replace(".svg", "")}',\n`;
});
IconNameFileText += `] as const

export type SvgsNames = typeof svgsNames[number];`
writeFileSync('./src/Components/Common/Icon/IconName.ts', IconNameFileText)
