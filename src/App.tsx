import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './components/Game';
import Result from './components/Result';

const App = () => {
    return (
        <Router>
            <div className='w-full h-full absolute -z-10 bg-[#e5d5f9]'>
                <div className='semi-circle-top'></div>
                <div className='square-mid'></div>
                <div className='semi-circle-bottom'></div>
            </div>
            <div className='w-full h-full'>
                <Routes>
                    <Route path='/' element={<Game result='/result' />} />
                    <Route path='/result' element={<Result />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
