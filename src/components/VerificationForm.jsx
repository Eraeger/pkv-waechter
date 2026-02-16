import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Building2, Stethoscope, Euro, Hash, Calendar, FileText } from 'lucide-react';

export const VerificationForm = ({ data, onConfirm, onCancel, isConfirming }) => {
    const [formData, setFormData] = useState({
        doctor_name: data.doctor_name || '',
        doctor_type: data.doctor_type || '',
        invoice_amount: data.invoice_amount || '',
        invoice_id: data.invoice_id || '',
        invoice_date: data.invoice_date || '',
        treatment: data.treatment || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(formData);
    };

    const inputClasses = "w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm";
    const labelClasses = "text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 flex items-center gap-2";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 shadow-2xl"
        >
            <h2 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                Beleg prüfen
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className={labelClasses}><Building2 className="w-3 h-3" /> Rechnungssteller</label>
                    <input
                        name="doctor_name"
                        value={formData.doctor_name}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="z.B. EuroEyes"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClasses}><Stethoscope className="w-3 h-3" /> Fachrichtung</label>
                        <input
                            name="doctor_type"
                            value={formData.doctor_type}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="z.B. Augenheilkunde"
                        />
                    </div>
                    <div>
                        <label className={labelClasses}><Euro className="w-3 h-3" /> Betrag (€)</label>
                        <input
                            name="invoice_amount"
                            type="number"
                            step="0.01"
                            value={formData.invoice_amount}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="0,00"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClasses}><Hash className="w-3 h-3" /> Rechnungs-ID</label>
                        <input
                            name="invoice_id"
                            value={formData.invoice_id}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="ID"
                        />
                    </div>
                    <div>
                        <label className={labelClasses}><Calendar className="w-3 h-3" /> Datum</label>
                        <input
                            name="invoice_date"
                            value={formData.invoice_date}
                            onChange={handleChange}
                            className={inputClasses}
                            placeholder="TT.MM.JJJJ"
                        />
                    </div>
                </div>

                <div>
                    <label className={labelClasses}><FileText className="w-3 h-3" /> Behandlung</label>
                    <textarea
                        name="treatment"
                        value={formData.treatment}
                        onChange={handleChange}
                        className={`${inputClasses} h-24 resize-none`}
                        placeholder="Beschreibung der Leistung..."
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                        <X className="w-4 h-4" /> Verwerfen
                    </button>
                    <button
                        type="submit"
                        disabled={isConfirming}
                        className="flex-[2] py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50"
                    >
                        {isConfirming ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                        ) : (
                            <><Check className="w-4 h-4" /> Bestätigen</>
                        )}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};
