import React, { ReactNode } from 'react'

interface AuthCardProps {
    children: ReactNode
}

const AuthCard = ({ children }:AuthCardProps) => {
    return (
        <div className='h-full flex items-center justify-start w-[35%] '>
            {children}
        </div>
    )
}

export default AuthCard
