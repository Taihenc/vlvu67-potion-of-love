import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from 'react-router-dom';
import Game from './components/Game';
import Result from './components/Result';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const PageTransition = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsVisible(true);
        const timeout = setTimeout(() => setIsVisible(false), 1000); // Hide after 1 sec
        return () => clearTimeout(timeout);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className='fixed z-50 inset-0 flex items-center justify-center bg-[#e5d5f9] backdrop-blur-lg'
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    <motion.span className='text-xl font-bold text-gray-800'>
                        🔄 ตรงนี้อาจจะเอาโลโก้มาใส่ ให้มันเปลี่ยนหน้าแบบสมูทๆๆๆๆ
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode='wait'>
            <PageTransition key={location.pathname} />
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<Game result='/result' />} />
                <Route path='/result' element={<Result />} />
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
