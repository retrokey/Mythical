import { createRoot } from 'react-dom/client';
import { ConfigManager } from './core/manager/config.manager';
import { Mythical } from './Mythical';
import chalk from 'chalk';

let config: ConfigManager = new ConfigManager();
console.log(chalk.black.bgGreenBright.bold("Mythical v" + config.mythical.version + " || MADE BY RealCosis"));
console.log(chalk.black.bgGreenBright.bold("All rigits reserved || https://discord.gg/gyNWz5k8TV => Discord"));
console.log(chalk.black.bgYellow.bold("WARNING! || If you rename, RealCosis doesn't will help you with issues!"));
createRoot(document.getElementById('root')).render(<Mythical />);