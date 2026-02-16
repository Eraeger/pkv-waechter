import React, { useRef } from 'react';
import { Camera, Loader2, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

export const UploadButton = ({ onUpload, isUploading }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onUpload(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full max-w-sm mt-8">
            <input
                type="file"
                accept="image/*,.pdf"
                capture="environment"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={handleClick}
                disabled={isUploading}
                className={`
          w-full py-4 px-6 rounded-xl flex items-center justify-center gap-3
          font-semibold text-lg shadow-lg
          ${isUploading
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/30'}
          transition-all duration-300
        `}
            >
                {isUploading ? (
                    <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Upload läuft...</span>
                    </>
                ) : (
                    <>
                        <Camera className="w-6 h-6" />
                        <span>Beleg scannen</span>
                    </>
                )}
            </motion.button>

            <p className="text-center text-xs text-gray-500 mt-3">
                Tipp: Foto direkt aufnehmen oder aus Galerie wählen
            </p>
        </div>
    );
};
