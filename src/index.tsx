import { createRoot } from 'react-dom/client';
import { ConfigManager } from './core/manager/config.manager';
import { Mythical } from './Mythical';

createRoot(document.getElementById('root')).render(<Mythical />);