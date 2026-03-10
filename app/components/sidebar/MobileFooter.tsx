'use client'

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes"
import MobileItem from "./MobileItem";

const MobileFooter = () => {
    const routes = useRoutes();
    const { isOpen } = useConversation();

    if (isOpen) {
        return null;
    }
    return (
        <div
            className="fixed justify-between w-full bottom-0 z-40 lg:hidden bg-white flex border-t">
            {routes.map((route) => (
                <MobileItem
                    key={route.href}
                    href={route.href}
                    icon={route.icon}
                    active={route.active}
                    onClick={route.onClick}
                />
            ))}
        </div>
    )
}

export default MobileFooter