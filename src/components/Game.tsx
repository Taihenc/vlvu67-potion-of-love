import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import {
    config,
    Options,
    options,
    results,
    ResultData,
} from '../config/variables';

type GameProps = {
    result?: string;
    navigate?: (destination: string) => void;
    setLoading: (loading: boolean) => void;
};

const matchResult = (stat_counter: Map<Options, number>) => {
    let max = 0;
    let best_result: ResultData | undefined = undefined;

    // change stat_couter to percentage
    let sum = 0;
    for (const value of stat_counter.values()) {
        sum += value;
    }
    for (const [name, value] of stat_counter) {
        stat_counter.set(name, (value / sum) * 100);
    }

    // find the highest percentage
    for (const result of results) {
        let sum = 0;

        for (const [name, value] of Object.entries(result.score)) {
            sum += Math.min(value, stat_counter.get(name as Options) || 0);
        }

        if (max < sum) {
            max = sum;
            best_result = result; // Assuming bestResult is a variable to store the best match
        }
    }

    return best_result;
};

const Game: React.FC<GameProps> = (props) => {
    const divRef = useRef<HTMLDivElement>(null);
    let isIncreasing = false;
    const [intervalId, setIntervalId] = useState<number | null>(null);

    const stat_counter = useRef(new Map<Options, number>());
    const [final_result, setFinalResult] = useState<ResultData | undefined>(
        undefined
    );

    const startIncreasingHeight = (option: Options) => {
        isIncreasing = true;

        const increaseHeight = () => {
            if (divRef.current && isIncreasing) {
                const currentHeight = parseInt(
                    divRef.current.style.height || '0'
                );
                if (currentHeight >= config.gauge_height) {
                    setFinalResult(matchResult(stat_counter.current));
                    return;
                }
                divRef.current.style.transition = 'height 0s'; // Remove transition
                divRef.current.style.height = `${currentHeight + 100}px`; // Increase height by 1px
                stat_counter.current.set(
                    option,
                    (stat_counter.current.get(option) || 0) + 1
                );
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
        stat_counter.current = new Map<Options, number>();
        setFinalResult(undefined);
    };

    // set loading to false after the component is mounted
    useEffect(() => {
        props.setLoading(false);
    }, []);

    return (
        <>
            <div className='w-full h-full flex justify-center items-center'>
                <div className='relative flex flex-col items-center gap-17'>
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
                    <div
                        className='flex text-sm gap-5 justify-center items-center'
                        style={{ height: `${config.gauge_height}px` }}
                    >
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
                                        onMouseDown={() =>
                                            startIncreasingHeight(option.id)
                                        }
                                        onMouseUp={stopIncreasingHeight}
                                        onMouseLeave={stopIncreasingHeight}
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
                                        onMouseDown={() =>
                                            startIncreasingHeight(option.id)
                                        }
                                        onMouseUp={stopIncreasingHeight}
                                        onMouseLeave={stopIncreasingHeight}
                                    >
                                        {option.text}
                                    </Button>
                                ))}
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <Button
                            className='w-[10rem] bg-[#ef67ae] disabled:bg-gray-400 disabled:cursor-not-allowed'
                            onClick={
                                final_result
                                    ? () => {
                                          props.navigate!(
                                              `${props.result}?urtype=${final_result?.id}`
                                          );
                                      }
                                    : undefined
                            }
                            disabled={!final_result}
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
