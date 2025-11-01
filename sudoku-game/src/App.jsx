import { Outlet } from 'react-router-dom';
import './styles/main.css';

function App() {

    return (
        <div className="app-container">
            <Outlet />
        </div>
    );
}

export default App;