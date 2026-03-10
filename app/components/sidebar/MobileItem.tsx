'use client'

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
    href: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
}


const MobileItem: React.FC<MobileItemProps> = ({
    href,
    icon: Icon,
    active,
    onClick
}) => {

    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    };


    return (
        <Link href={href}
            onClick={handleClick}
            className={clsx("group flex items-center gap-x-3 rounded-md leading-6 font-semibold text-sm text-gray-500 hover:text-gray-700 p-3 ", active && "bg-gray-100 text-black")}>
            <Icon className="h-6 w-6 shrink-0" />
            <span className='sr-only'>

            </span>
        </Link>
    )
}

export default MobileItem