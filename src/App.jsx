import React, { useState, useEffect } from 'react';
import { getStatus } from './api/status';
import { uploadReceipt, confirmReceiptData } from './api/upload';
import { StatusCard } from './components/StatusCard';
import { ProgressRing } from './components/ProgressRing';
import { UploadButton } from './components/UploadButton';
import { VerificationForm } from './components/VerificationForm';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [feedback, setFeedback] = useState(null); // 'success' | 'duplicate' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async () => {
    try {
      const statusData = await getStatus();
      setData(statusData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpload = async (file) => {
    console.log('Upload started for file:', file.name);
    setIsUploading(true);
    setCurrentFile(file);
    setFeedback(null);
    setErrorMessage('');
    try {
      const result = await uploadReceipt(file);
      console.log('Extraction result:', result);

      const invoiceData = result.extracted_invoice_data || result;

      if (invoiceData.doctor_name || invoiceData.invoice_amount) {
        // We got data back from Gemini (nested or flat)
        setExtractedData(invoiceData);
      } else if (result.status === 'duplicate_file') {
        setFeedback('duplicate');
        setTimeout(() => setFeedback(null), 3000);
      } else {
        setFeedback('error');
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      console.error(err);
      setFeedback('error');
      setErrorMessage(err.message || 'Extraktion fehlgeschlagen. Bitte erneut versuchen.');
      setTimeout(() => {
        setFeedback(null);
        setErrorMessage('');
      }, 5000);
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirm = async (formData) => {
    setIsConfirming(true);
    try {
      const result = await confirmReceiptData(formData, currentFile);
      if (result.status === 'stored' || result.success) {
        setFeedback('success');
        setExtractedData(null);
        setCurrentFile(null);
        fetchData();
      } else {
        throw new Error('Speichern fehlgeschlagen');
      }
    } catch (err) {
      console.error(err);
      setFeedback('error');
      setErrorMessage('Bestätigung fehlgeschlagen.');
    } finally {
      setIsConfirming(false);
      setTimeout(() => {
        setFeedback(null);
        setErrorMessage('');
      }, 3000);
    }
  };

  const handleCancel = () => {
    setExtractedData(null);
    setCurrentFile(null);
  };

  // Shake animation variants for the whole container if duplicate
  const containerVariants = {
    idle: { x: 0 },
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center p-6 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
      <motion.div
        className="w-full max-w-md flex flex-col items-center gap-8 py-4"
        variants={containerVariants}
        animate={feedback === 'duplicate' ? 'shake' : 'idle'}
      >
        <header className="w-full flex justify-between items-center px-2">
          <h1 className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase">PKV Rendite Wächter</h1>
          <div className={`h-2 w-2 rounded-full ${loading ? 'bg-zinc-700 animate-pulse' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`} />
        </header>

        {loading && !data ? (
          <div className="flex-1 flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : extractedData ? (
          <VerificationForm
            data={extractedData}
            file={currentFile}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            isConfirming={isConfirming}
          />
        ) : (
          <>
            {data?.status && data.status !== 'WARTEN' && <StatusCard status={data.status} />}

            {data && (
              <ProgressRing
                progress={data.fortschritt_prozent}
                difference={data.differenz}
                status={data.status}
              />
            )}

            <UploadButton onUpload={handleUpload} isUploading={isUploading} />
          </>
        )}

      </motion.div>

      {/* Feedback Overlay / Toast */}
      <AnimatePresence>
        {feedback === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-12 left-0 right-0 mx-auto w-max max-w-[90%] px-6 py-4 bg-emerald-600/90 backdrop-blur-md text-white rounded-2xl shadow-2xl flex items-center gap-4 z-50 border border-emerald-400/30"
          >
            <div className="bg-white/20 p-2 rounded-full">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-lg">Gespeichert!</p>
              <p className="text-xs text-emerald-100">Dein Fortschritt wurde aktualisiert.</p>
            </div>
          </motion.div>
        )}
        {feedback === 'duplicate' && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-12 left-0 right-0 mx-auto w-max max-w-[90%] px-6 py-4 bg-amber-600/90 backdrop-blur-md text-white rounded-2xl shadow-2xl flex items-center gap-4 z-50 border border-amber-400/30"
          >
            <div className="bg-white/20 p-2 rounded-full">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-lg">Duplikat erkannt</p>
              <p className="text-xs text-amber-100">Dieser Beleg wurde bereits hochgeladen.</p>
            </div>
          </motion.div>
        )}
        {feedback === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-12 left-0 right-0 mx-auto w-max max-w-[90%] px-6 py-4 bg-red-600/90 backdrop-blur-md text-white rounded-2xl shadow-2xl flex items-center gap-4 z-50 border border-red-400/30"
          >
            <div className="bg-white/20 p-2 rounded-full">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-lg">Fehler</p>
              <p className="text-xs text-red-100">{errorMessage || 'Upload fehlgeschlagen. Bitte erneut versuchen.'}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
