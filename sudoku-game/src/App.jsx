import { Outlet } from 'react-router-dom';
import { useGameSettings } from './hooks/useGameSettings';
import './styles/main.css';

function App() {

    const [settings, setSettings] = useGameSettings();

    return (
        <div className="app-container">
            <Outlet context={{ settings, setSettings }} />
        </div>
    );
}

export default App;