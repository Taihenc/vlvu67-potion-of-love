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

const matchResult = (statCounter: Record<Options, number>) => {
    let max = 0;
    let best_result: ResultData | undefined = undefined;

    // change stat_couter to percentage
    let sum = 0;
    for (const value of Object.values(statCounter)) {
        sum += value;
    }
    for (const [name, value] of Object.entries(statCounter)) {
        statCounter[name as Options] = (value / sum) * 100;
    }
    // find the highest percentage
    for (const result of results) {
        let sum = 0;

        for (const [name, value] of Object.entries(result.score)) {
            sum += Math.min(value, statCounter[name as Options]);
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
    const [, forceUpdate] = useState(0); // Dummy state to force re-render

    const [statCounter, setStatCounter] = useState<Record<Options, number>>(
        Object.fromEntries(
            Object.values(Options).map((option) => [option, 0])
        ) as Record<Options, number>
    );
    const [final_result, setFinalResult] = useState<ResultData | undefined>(
        undefined
    );
    const [player_name, setPlayerName] = useState<string>('');

    const startIncreasingHeight = (option: Options) => {
        isIncreasing = true;

        const increaseHeight = () => {
            if (divRef.current && isIncreasing) {
                const currentHeight = parseInt(
                    divRef.current.style.height || '0'
                );
                if (currentHeight >= config.gauge_height) return;
                divRef.current.style.transition = 'height 0s'; // Remove transition
                divRef.current.style.height = `${currentHeight + 1}px`; // Increase height by 1px
                // Update state to trigger re-render
                setStatCounter((prev) => ({
                    ...prev,
                    [option]:
                        (prev[option] || 0) + (1 / config.gauge_height) * 100,
                }));
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
        const currentHeight = parseInt(divRef.current?.style.height || '0');
        if (currentHeight >= config.gauge_height) {
            setFinalResult(matchResult(statCounter));
            return;
        }
    };

    const resetHeight = () => {
        if (divRef.current) {
            divRef.current.style.transition = 'height 0.5s';
            divRef.current.style.height = '0px';
        }
        for (const key in statCounter) {
            statCounter[key as Options] = 0;
        }
        setFinalResult(undefined);
        forceUpdate((prev) => prev + 1);
    };

    // set loading to false after the component is mounted
    useEffect(() => {
        props.setLoading(false);
    }, []);

    return (
        <>
            <div className='w-full h-full flex justify-center items-center'>
                <div className='w-full h-[42rem] max-h-[80%] relative flex flex-col items-center justify-between gap-2'>
                    <h1 className='relative text-3xl text-nowrap font-black text-[#fff4ba] h1-shadow'>
                        Bouquet of Scents
                    </h1>
                    <div className='w-[24rem] max-w-[80%] flex gap-1'>
                        <input
                            className='w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-purple-500 hover:border-purple-300 shadow-sm focus:shadow'
                            placeholder='ใส่ใจ>.<'
                            value={player_name || ''}
                            onChange={(e) => {
                                setPlayerName(e.target.value);
                            }}
                        />
                        <Button className='bg-[#7750df] w-[5rem]'>
                            ยืนยัน
                        </Button>
                    </div>
                    <div
                        className='w-[27rem] max-w-[85vw] flex text-sm justify-between items-center gap-2'
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
                                        className={
                                            option.color +
                                            ' max-w-[33vw] w-[10rem] text-nowrap relative'
                                        }
                                        key={index}
                                        onMouseDown={() =>
                                            startIncreasingHeight(option.id)
                                        }
                                        onMouseUp={stopIncreasingHeight}
                                        onMouseLeave={stopIncreasingHeight}
                                    >
                                        {option.text}
                                        {
                                            <p
                                                className={
                                                    option.color +
                                                    ' px-2 absolute -bottom-2 default-shadow left-1/2 -translate-x-1/2 rounded'
                                                }
                                            >
                                                {statCounter[
                                                    option.id as Options
                                                ].toFixed(0)}
                                                %
                                            </p>
                                        }
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
                                            ' max-w-[33vw] w-[10rem] text-nowrap relative'
                                        }
                                        key={index}
                                        onMouseDown={() =>
                                            startIncreasingHeight(option.id)
                                        }
                                        onMouseUp={stopIncreasingHeight}
                                        onMouseLeave={stopIncreasingHeight}
                                    >
                                        {option.text}
                                        {
                                            <p
                                                className={
                                                    option.color +
                                                    ' px-2 absolute -bottom-2 default-shadow left-1/2 -translate-x-1/2 rounded'
                                                }
                                            >
                                                {statCounter[
                                                    option.id as Options
                                                ].toFixed(0)}
                                                %
                                            </p>
                                        }
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
                                              `${props.result}?urtype=${final_result?.id}&pname=${player_name}`
                                          );
                                      }
                                    : undefined
                            }
                            disabled={!final_result || !player_name}
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
