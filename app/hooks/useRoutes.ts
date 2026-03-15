import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUsers} from 'react-icons/hi2'
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";

const useRoutes = () => {
    const pathname = usePathname();
    const {conversationId} = useConversation();

    const routes =  useMemo(()=>[
        {
            label:'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations' || !!conversationId
        },
        {
            label: 'Users',
            href:'/users',
            icon: HiUsers,
            active: pathname === '/users'
        },
        {
            label:'Logout',
            href:'#',
            onClick:()=>signOut(),
            icon: HiArrowLeftOnRectangle
        },
    ],[pathname,conversationId])

    return routes;
}
//checking if the pathname is equal to /conversations or if there is a conversationId, then the chat route will be active. This allows the chat route to be active even when the user is viewing a specific conversation. The users route will be active only when the pathname is exactly /users. The logout route does not have an active state since it is an action rather than a page.
export default useRoutes
