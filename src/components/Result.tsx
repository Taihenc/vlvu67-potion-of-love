import { useSearchParams } from 'react-router-dom';
import Button from './Button';
import { ResultData, results } from '../config/variables';
import { useEffect } from 'react';

type ResultProps = {
    setLoading: (loading: boolean) => void;
    navigate: (path: string) => void;
};

const Result: React.FC<ResultProps> = (props) => {
    const [searchParams] = useSearchParams();
    const urtype = searchParams.get('urtype'); // Get the 'urtype' param

    let result: ResultData | undefined = undefined;
    for (const res of results) {
        if (res.id === urtype) {
            result = res;
            break;
        }
    }
    useEffect(() => {
        if (!result) {
            console.error('Invalid urtype');
            props.navigate('/'); // ✅ Navigates correctly inside useEffect
        }
    }, [result, props.navigate]);

    // set loading to false after the component is mounted
    useEffect(() => {
        props.setLoading(false);
    }, []);

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='w-[22rem] flex flex-col gap-[3rem] justify-center items-center  text-center'>
                <div className='w-full border-white border-[1rem] rounded-lg'>
                    <img src={`/ref/${result?.image}`} alt='' />
                </div>
                <div>
                    <h1 className='text-nowrap relative text-3xl font-black text-[#fff4ba] h1-shadow-yellow drop-shadow-md'>
                        You value {result!.most_value}!
                    </h1>
                    <p className='mt-3 text-justify indent-[3ch]'>
                        {result?.description}
                    </p>
                </div>
                <div className='flex gap-5'>
                    <Button
                        className='w-[10rem] bg-[#ef67ae]'
                        onClick={() => props.navigate('/')}
                    >
                        เริ่มต้นใหม่
                    </Button>
                    <Button
                        className='w-[10rem] bg-[#fbf0ab] text-[#bcb374]'
                        onClick={() => props.navigate('/')}
                    >
                        กลับสู่หน้าหลัก
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Result;
