import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Result: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className='w-full h-full flex flex-col gap-[3rem] justify-center items-center'>
            <div className='w-[22rem] border-white border-[1rem] rounded-lg'>
                <img src='../../public/ref/477994_0.jpg' alt='' />
            </div>
            <h1 className='relative text-3xl font-black text-[#fff4ba] h1-shadow-yellow drop-shadow-md'>
                You value honestly!
            </h1>
            <div className='flex gap-5'>
                <Button
                    className='w-[10rem] bg-[#ef67ae]'
                    onClick={() => navigate('/')}
                >
                    เริ่มต้นใหม่
                </Button>
                <Button
                    className='w-[10rem] bg-[#fbf0ab] text-[#bcb374]'
                    onClick={() => navigate('/')}
                >
                    กลับสู่หน้าหลัก
                </Button>
            </div>
        </div>
    );
};

export default Result;
