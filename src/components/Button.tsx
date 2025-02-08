import { twMerge } from 'tailwind-merge';

type ButtonsProps = {
    className?: string;
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseUp?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
};

// accept children & text props
const Button: React.FC<ButtonsProps> = (props) => {
    const _className = twMerge(
        'bg-blue-500 hover:brightness-75 text-white font-bold py-3 px-3 rounded-xl cursor-pointer default-shadow',
        props.className
    );

    return (
        <div>
            <button
                className={_className}
                onClick={props.onClick}
                onMouseDown={props.onMouseDown}
                onMouseUp={props.onMouseUp}
                onMouseLeave={props.onMouseLeave}
                disabled={props.disabled}
            >
                {props.children}
            </button>
        </div>
    );
};

export default Button;
