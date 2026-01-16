import React from 'react'
import { ICustomMessageProps } from '../types/component.types';

const CustomMessage: React.FC<ICustomMessageProps> = ({ title, description }) => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-3">
            <div className="flex flex-col bg-slate-100 py-10 px-20 rounded-lg items-center gap-2">
                <p className="text-4xl font-bold text-neutral-700">
                    {title}
                </p>
                <p className="text-sm text-neutral-500">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default CustomMessage;