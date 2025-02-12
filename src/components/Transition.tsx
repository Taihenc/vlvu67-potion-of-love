import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PageTransition = ({
    destination,
    isLoading,
}: {
    destination: string;
    isLoading: boolean;
}) => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);
    const [hasNavigated, setHasNavigated] = useState(false); // Flag to track navigation

    useEffect(() => {
        if (!hasNavigated) {
            const timeoutId = setTimeout(() => {
                console.log('Navigating to', destination);
                navigate(destination);
                setHasNavigated(true); // Set flag to true after navigation
            }, 1500); // Simulated transition time

            return () => {
                clearTimeout(timeoutId); // Cleanup timeout on unmount
            };
        }
    }, [destination, hasNavigated, navigate]);

    useEffect(() => {
        if (!isLoading) {
            setIsVisible(false);
        }
    }, [isLoading]);
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className='fixed z-50 inset-0 flex items-center justify-center bg-white/60 backdrop-blur-lg'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <div className='w-[100vw] h-[100vh] absolute -z-10 bg-[url(./bg.webp)] bg-cover bg-center blur-lg'>
                        <div className='semi-circle-top'></div>
                        <div className='square-yellow-move-around'></div>
                        <div className='square-white'></div>
                        <div className='semi-circle-bottom'></div>
                    </div>
                    <img
                        src='/title.webp'
                        alt=''
                        className='w-[15rem] md:w-[30rem] float-animation'
                    />
                    {/* <motion.span
                        className='text-xl font-bold text-gray-800'
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    >
                        🔄 อาจจะเอาโลโก้มาใส่จะได้transitionสมูทๆ
                    </motion.span> */}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const useNavigateWithTransition = () => {
    const [transitionDestination, setTransitionDestination] = useState<
        string | null
    >(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigateWithTransition = (destination: string) => {
        console.log('Setting transition destination to', destination);
        setIsLoading(true); // Start fade-in transition
        setTransitionDestination(destination); // Start transition
    };

    return {
        transitionDestination,
        navigateWithTransition,
        isLoading,
        setIsLoading,
    };
};
