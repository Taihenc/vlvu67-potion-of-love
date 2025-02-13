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
                            setLoading={isLoading ? setIsLoading : undefined}
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
            <div className='w-[100vw] h-[100vh] absolute -z-10 bg-[url(/bg.webp)] bg-cover bg-center blur-lg'>
                <div className='semi-circle-top'></div>
                <div className='square-mid'></div>
                <div className='semi-circle-bottom'></div>
            </div>
            <div className='w-[100vw] h-[100vh] absolute -z-10'>
                <img
                    src='/cloud.png'
                    alt=''
                    className='-bottom-10 -right-10 md:-bottom-5 md:-right-5 fixed w-[30rem] opacity-50 float-animation'
                />
                <img
                    src='/moon.png'
                    alt=''
                    className='-top-10 -left-[30%] md:top-5 md:left-0 fixed w-[30rem] opacity-60'
                />
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
