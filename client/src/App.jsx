import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './styles/global.styles.scss';

const App = () => <BrowserRouter><AppRoutes /></BrowserRouter>;
export default App;
