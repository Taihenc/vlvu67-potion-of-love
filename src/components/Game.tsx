import { useRef, useState } from 'react';
import Button from './Button';
import { options } from '../config/variables';
import { useNavigate } from 'react-router-dom';

type GameProps = {
    result?: string;
};

const Game: React.FC<GameProps> = (props) => {
    const navigate = useNavigate();
    const divRef = useRef<HTMLDivElement>(null);
    let isIncreasing = false;
    const [intervalId, setIntervalId] = useState<number | null>(null);

    const startIncreasingHeight = () => {
        isIncreasing = true;

        const increaseHeight = () => {
            if (divRef.current && isIncreasing) {
                divRef.current.style.transition = 'height 0s'; // Remove transition
                const currentHeight = parseInt(
                    divRef.current.style.height || '0'
                );
                divRef.current.style.height = `${currentHeight + 1}px`; // Increase height by 1px
            }
        };

        if (intervalId == null) {
            const id = setInterval(increaseHeight, 10);
            setIntervalId(id);
        }
    };

    const stopIncreasingHeight = () => {
        isIncreasing = false;
        if (intervalId !== null) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    const resetHeight = () => {
        if (divRef.current) {
            divRef.current.style.transition = 'height 0.5s';
            divRef.current.style.height = '0px';
        }
    };

    return (
        <>
            <div className='w-full h-full flex justify-center items-center'>
                <div className='flex flex-col items-center gap-17'>
                    <h1 className='relative text-3xl font-black text-[#fff4ba] h1-shadow'>
                        Bouquet of Scents
                    </h1>
                    <div className='w-[24rem] flex gap-1'>
                        <input
                            className='w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-purple-500 hover:border-purple-300 shadow-sm focus:shadow'
                            placeholder='ใส่ใจ>.<'
                        />
                        <Button className='bg-[#7750df] w-[5rem]'>
                            ยืนยัน
                        </Button>
                    </div>
                    <div className='h-[20rem] flex text-sm gap-5 justify-center items-center'>
                        <div
                            id='option-left'
                            className='h-full flex flex-col justify-between'
                        >
                            {options
                                .slice(0, Math.ceil(options.length / 2))
                                .map((option, index) => (
                                    <Button
                                        className={option.color + ' w-[10rem]'}
                                        key={index}
                                        onMouseDown={startIncreasingHeight}
                                        onMouseUp={stopIncreasingHeight}
                                    >
                                        {option.text}
                                    </Button>
                                ))}
                        </div>
                        <div
                            id='gauge'
                            className='h-full w-[4.5rem] relative rounded-xl overflow-hidden bg-white gauge-shadow'
                        >
                            <div
                                ref={divRef}
                                className='w-full h-0 absolute bottom-0 bg-[#ef67ae]'
                                style={{ height: '0px' }}
                            ></div>
                        </div>
                        <div
                            id='option-right'
                            className='h-full flex flex-col justify-between'
                        >
                            {options
                                .slice(
                                    Math.ceil(options.length / 2),
                                    options.length
                                )
                                .map((option, index) => (
                                    <Button
                                        className={
                                            option.color +
                                            ' w-[10rem] transition-all duration-300'
                                        }
                                        key={index}
                                        onMouseDown={startIncreasingHeight}
                                        onMouseUp={stopIncreasingHeight}
                                    >
                                        {option.text}
                                    </Button>
                                ))}
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <Button
                            className='w-[10rem] bg-[#ef67ae]'
                            onClick={
                                props.result
                                    ? () => navigate(`${props.result}`)
                                    : undefined
                            }
                        >
                            ผลลัพธ์
                        </Button>
                        <Button
                            className='w-[7rem] bg-[#fbf0ab] text-[#bcb374]'
                            onClick={resetHeight}
                        >
                            รีเซ็ต
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Game;
