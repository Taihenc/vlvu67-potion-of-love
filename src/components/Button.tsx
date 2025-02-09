import { twMerge } from 'tailwind-merge';

type ButtonsProps = {
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    onMouseLeave?: () => void;
    disabled?: boolean;
};

// accept children & text props
const Button: React.FC<ButtonsProps> = (props) => {
    const _className = twMerge(
        'bg-blue-500 hover:brightness-75 active:translate-y-1 active:brightness-75 text-white font-bold py-3 px-3 rounded-xl cursor-pointer default-shadow select-none',
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
                // support for mobile touch events
                onTouchStart={props.onMouseDown}
                onTouchEnd={props.onMouseUp}
                onTouchCancel={props.onMouseLeave}
            >
                {props.children}
            </button>
        </div>
    );
};

export default Button;
