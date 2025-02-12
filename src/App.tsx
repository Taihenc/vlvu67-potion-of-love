import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './components/Game';
import Result from './components/Result';
import {
    PageTransition,
    useNavigateWithTransition,
} from './components/Transition';

const AnimatedRoutes = () => {
    const {
        transitionDestination,
        navigateWithTransition,
        isLoading,
        setIsLoading,
    } = useNavigateWithTransition();

    return (
        <>
            {transitionDestination && (
                <PageTransition
                    destination={transitionDestination}
                    isLoading={isLoading}
                    key={transitionDestination}
                />
            )}
            <Routes>
                <Route
                    path='/'
                    element={
                        <Game
                            result='/result'
                            navigate={navigateWithTransition}
                            setLoading={setIsLoading}
                        />
                    }
                />
                <Route
                    path='/result'
                    element={
                        <Result
                            navigate={navigateWithTransition}
                            setLoading={setIsLoading}
                        />
                    }
                />
            </Routes>
        </>
    );
};

const App = () => {
    return (
        <>
            <div className='w-[100vw] h-[100vh] absolute -z-10 bg-[url(./bg.webp)] bg-cover bg-center blur-lg'>
                <div className='semi-circle-top'></div>
                <div className='square-mid'></div>
                <div className='semi-circle-bottom'></div>
            </div>
            <div className='w-full h-full'>
                <Router>
                    <AnimatedRoutes />
                </Router>
            </div>
        </>
    );
};

export default App;
