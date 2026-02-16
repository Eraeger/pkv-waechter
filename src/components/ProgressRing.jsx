import React from 'react';
import { motion } from 'framer-motion';

export const ProgressRing = ({ progress, difference, status }) => {
    const radius = 120;
    const stroke = 12;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    // Color logic based on status
    const colorClass = status === 'EINREICHEN' ? 'text-pkv-win' : 'text-pkv-warten';

    // Format currency
    const formattedDifference = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
    }).format(difference);

    return (
        <div className="flex flex-col items-center justify-center relative my-8">
            <svg
                height={radius * 2}
                width={radius * 2}
                className="relative"
            >
                {/* Background Trace */}
                <circle
                    className="text-gray-700 opacity-20"
                    strokeWidth={stroke}
                    stroke="currentColor"
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                {/* Progress Path */}
                <motion.circle
                    className={`${colorClass} transition-colors duration-500`}
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    transform={`rotate(-90 ${radius} ${radius})`}
                />

                {/* Center Text */}
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".1em"
                    className="text-4xl font-bold fill-white"
                >
                    {formattedDifference}
                </text>
                <text
                    x="50%"
                    y="62%"
                    textAnchor="middle"
                    className="text-sm fill-gray-400 font-medium uppercase tracking-wider"
                >
                    bis Limit
                </text>
            </svg>
        </div>
    );
};
