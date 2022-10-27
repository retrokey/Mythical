import { createRoot } from 'react-dom/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Mythical } from './Mythical';

library.add(fas);
createRoot(document.getElementById('root')).render(<Mythical />);