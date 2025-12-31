import React from "react";
import { motion } from "framer-motion";

export default function ProgressBar({ progress }) {
  return (
    <motion.div
      key="progress-bar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-950 text-white"
    >
      <div className="w-64 md:w-80">
        <div className="flex justify-between text-xs font-mono text-gray-400 mb-2 uppercase tracking-widest">
            <span>System Loading</span>
            {/* Pastikan angka mentok di 100 */}
            <span>{Math.min(100, progress)}%</span>
        </div>
        
        {/* Track Bar */}
        <div className="w-full h-[2px] bg-gray-800 relative rounded-full overflow-hidden">
            {/* Moving Bar */}
            <motion.div 
                className="absolute left-0 top-0 h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                // 🔥 UBAH TRANSITION:
                // Gunakan easeOut agar gerakannya smooth tapi responsif,
                // tidak memantul (spring) yang bikin terlihat tidak akurat.
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
        </div>
      </div>
    </motion.div>
  );
}