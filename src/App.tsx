import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className='w-full h-full flex justify-center items-center bg-pink-300'>
                <h1 className='text-6xl'>-Potion of Love-</h1>
            </div>
        </>
    );
}

export default App;
