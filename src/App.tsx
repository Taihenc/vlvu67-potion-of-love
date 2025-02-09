import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from 'react-router-dom';
import Game from './components/Game';
import Result from './components/Result';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const PageTransition = ({
    destination,
    isLoading,
    setIsLoading,
}: {
    destination: string;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}) => {
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true); // Start loading process

        // Simulate loading process
        setTimeout(() => {
            navigate(destination);
        }, 1000); // Simulated transition time
    }, [destination, navigate, isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className='fixed z-50 inset-0 flex items-center justify-center bg-white/60 backdrop-blur-lg'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <motion.span
                        className='text-xl font-bold text-gray-800'
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    >
                        🔄 อาจจะเอาโลโก้มาใส่จะได้transitionสมูทๆ
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const useNavigateWithTransition = () => {
    const [transitionDestination, setTransitionDestination] = useState<
        string | null
    >(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigateWithTransition = (destination: string) => {
        setTransitionDestination(destination); // Start transition
        setIsLoading(true); // Start fade-in transition
    };

    return {
        transitionDestination,
        navigateWithTransition,
        isLoading,
        setIsLoading,
    };
};

const AnimatedRoutes = () => {
    const {
        transitionDestination,
        navigateWithTransition,
        isLoading,
        setIsLoading,
    } = useNavigateWithTransition();

    return (
        <AnimatePresence mode='sync'>
            {transitionDestination && (
                <PageTransition
                    destination={transitionDestination}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
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
        </AnimatePresence>
    );
};

const App = () => {
    return (
        <>
            <div className='w-full h-full absolute -z-10 bg-[#e5d5f9]'>
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
