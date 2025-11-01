import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <StartPage />,
            },
            {
                path: 'game',
                element: <GamePage />,
            },
            {
                path: 'results',
                element: <ResultsPage />,
            },
        ],
    },
]);