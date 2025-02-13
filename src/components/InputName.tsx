import { useState } from 'react';
import Button from './Button';
import { motion } from 'framer-motion';

type InputNameProps = {
    name: string | null;
    setName: (name: string) => void;
};

const InputName: React.FC<InputNameProps> = (props) => {
    const [temp, setTemp] = useState<string | null>('');
    return (
        <>
            {props.name == '' ? (
                <div className='w-[24rem] max-w-[80%] flex gap-1'>
                    <input
                        className='w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-purple-500 hover:border-purple-300 shadow-sm focus:shadow'
                        placeholder='ใส่ใจ>.<'
                        value={temp || ''}
                        onChange={(e) => {
                            setTemp(e.target.value);
                        }}
                    />
                    <Button
                        className='bg-[#7750df] w-[5rem]'
                        onClick={() => {
                            if (temp) {
                                props.setName(temp);
                            }
                        }}
                    >
                        ยืนยัน
                    </Button>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className='md:-mb-[2rem] px-2 text-center text-xl text-gray-100'>
                        Hi there, Let's find your perfect scent💫, <br />
                        <span className='text-pink-200 max-w-fit text-wrap break-all'>
                            "{props.name}"
                        </span>
                    </h1>
                </motion.div>
            )}
        </>
    );
};

export default InputName;
