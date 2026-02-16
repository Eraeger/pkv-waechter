import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const StatusCard = ({ status }) => {
    const isWin = status === 'EINREICHEN';

    const variants = {
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.9, opacity: 0 }
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            className={`
        relative overflow-hidden rounded-2xl p-6 w-full max-w-sm
        ${isWin ? 'bg-emerald-900/40 border border-emerald-500/50' : 'bg-amber-900/40 border border-amber-500/50'}
        backdrop-blur-xl shadow-lg transition-all duration-500
      `}
        >
            <div className="flex flex-col items-center gap-4 text-center">
                {isWin ? (
                    <div className="p-3 bg-emerald-500/20 rounded-full">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                ) : (
                    <div className="p-3 bg-amber-500/20 rounded-full">
                        <AlertCircle className="w-8 h-8 text-amber-400" />
                    </div>
                )}

                <div>
                    <h2 className={`text-2xl font-bold tracking-tight mb-1 ${isWin ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {status}
                    </h2>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {isWin
                            ? "Ab jetzt machst du Plus! Rechnungen schnell einreichen."
                            : "Noch Geduld. Sammle Belege, aber reiche sie noch nicht ein."}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};
