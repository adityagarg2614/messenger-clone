'use client'
import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

interface DesktopItemProps{
    label: string;
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;

}

const DesktopItem: React.FC<DesktopItemProps> = ({
    label,
    icon,
    href,
    onClick,
    active
}) => {

    const handleClick = () => {
        if(onClick){
            return onClick();
        }
    };

  return (
    <li onClick={handleClick}>
        <Link href={href}> 
            <span>
                {label}
            </span>
        </Link>
    </li>
  )
}

export default DesktopItem
