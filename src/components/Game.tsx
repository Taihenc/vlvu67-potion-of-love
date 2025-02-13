import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import {
    config,
    Options,
    options,
    results,
    ResultData,
} from '../config/variables';
import InputName from './InputName';

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

const colorMix = (statCounter: Record<Options, number>) => {
    // single color
    if (Object.values(statCounter).filter((value) => value > 0).length === 1) {
        return Object.entries(statCounter).reduce(
            (acc, [name, value]) =>
                value > 0
                    ? options.find((option) => option.id === name)?.color || ''
                    : acc,
            ''
        );
    }
    // multiple color (#rrggbb)
    let color_mix = '';
    let sum = 0;

    for (const [_, value] of Object.entries(statCounter)) {
        if (value > 0) {
            sum += value;
        }
    }

    for (const [name, value] of Object.entries(statCounter)) {
        if (value > 0) {
            const option = options.find((option) => option.id === name);
            if (option) {
                const weight = value / sum;
                const color = option.color;
                const r = parseInt(color.slice(1, 3), 16) * weight;
                const g = parseInt(color.slice(3, 5), 16) * weight;
                const b = parseInt(color.slice(5, 7), 16) * weight;
                const toHex = (num: number) =>
                    Math.round(num).toString(16).padStart(2, '0');
                if (color_mix === '') {
                    const new_color = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
                    color_mix = new_color;
                    continue;
                } else {
                    color_mix = `#${toHex(
                        Math.round(parseInt(color_mix.slice(1, 3), 16) + r)
                    )}${toHex(
                        Math.round(parseInt(color_mix.slice(3, 5), 16) + g)
                    )}${toHex(
                        Math.round(parseInt(color_mix.slice(5, 7), 16) + b)
                    )}`;
                }
            }
        }
    }

    return color_mix;
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
                    <InputName name={player_name} setName={setPlayerName} />
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
                                            'bg-[' +
                                            option.color +
                                            '] max-w-[33vw] w-[10rem] text-[#3e5466] text-nowrap relative'
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
                                                    'bg-[' +
                                                    option.color +
                                                    '] px-2 absolute -bottom-2 default-shadow left-1/2 -translate-x-1/2 rounded'
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
                                style={{
                                    height: '0px',
                                    backgroundColor: colorMix(statCounter),
                                }}
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
                                            'bg-[' +
                                            option.color +
                                            '] max-w-[33vw] w-[10rem] text-[#3e5466] text-nowrap relative'
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
                                                    'bg-[' +
                                                    option.color +
                                                    '] px-2 absolute -bottom-2 default-shadow left-1/2 -translate-x-1/2 rounded'
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
