'use client'

import { User } from "@prisma/client"

interface AvatarGroupProps {
    users?: User[]
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users }) => {
    return (
        <div>

        </div>
    )
}

export default AvatarGroup