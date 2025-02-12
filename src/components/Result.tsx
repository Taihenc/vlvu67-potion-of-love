import { useSearchParams } from 'react-router-dom';
import Button from './Button';
import { ResultData, results } from '../config/variables';
import { useEffect } from 'react';
import imagesLoaded from 'imagesloaded';

type ResultProps = {
    setLoading: (loading: boolean) => void;
    navigate: (path: string) => void;
};

const Result: React.FC<ResultProps> = (props) => {
    const [searchParams] = useSearchParams();
    const urtype = searchParams.get('urtype'); // Get the 'urtype' param
    const player_name = searchParams.get('pname'); // Get the 'player_name' param

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

    useEffect(() => {
        // Define the listener function
        const handleImagesLoaded = () => {
            props.setLoading(false); // All images have loaded
        };

        // Set up the imagesLoaded listener
        const imgLoad = imagesLoaded(document.body, handleImagesLoaded);

        // Cleanup function to remove the listener
        return () => {
            if (imgLoad) {
                imgLoad.off('done', handleImagesLoaded); // Pass both event name and listener
            }
        };
    }, [props.setLoading]); // Add props.setLoading as a dependency

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='h-[43rem] w-[22rem] max-w-[80%] max-h-[80%]  flex flex-col gap-2 justify-between items-center  text-center'>
                <div className='w-full border-white border-[1rem] rounded-lg'>
                    <img src={`/ref/${result?.image}`} alt='' />
                </div>
                <div className='w-full'>
                    <h1 className='text-nowrap relative text-[1.4rem] md:text-2xl font-black text-[#fff4ba] h1-shadow-yellow drop-shadow-md'>
                        A Scent That Defines You, <br />"
                        {player_name ? player_name : 'You'}"
                    </h1>
                    <p className='mt-5 text-justify indent-[3ch] relative h1-shadow'>
                        {result?.description}
                    </p>
                </div>
                <div className='w-full flex justify-center gap-2'>
                    <Button
                        className='w-[10rem] max-w-[30vw] bg-[#ef67ae]'
                        onClick={() => props.navigate('/')}
                    >
                        เริ่มต้นใหม่
                    </Button>
                    {/* <Button
                        className='w-[10rem] max-w-[40vw] bg-[#fbf0ab] text-[#bcb374]'
                        onClick={() => props.navigate('/')}
                    >
                        กลับสู่หน้าหลัก
                    </Button> */}
                </div>
            </div>
        </div>
    );
};

export default Result;
