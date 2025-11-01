import { Outlet } from 'react-router-dom';
import './styles/main.css';

function App() {
    // Тепер App не керує станом. Стан живе у сторі Zustand.
    return (
        <div className="app-container">
            <Outlet />
        </div>
    );
}

export default App;