import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { AVATARS } from '../constants';

interface AvatarPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (avatar: string) => void;
  currentAvatar: string;
}

export default function AvatarPicker({ isOpen, onClose, onSelect, currentAvatar }: AvatarPickerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 glass rounded-t-[2.5rem] sm:rounded-t-[3rem] p-6 sm:p-8 z-[70] border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div className="flex flex-col">
                <h3 className="text-xl sm:text-2xl font-black text-white">अवतार छान्नुहोस्</h3>
                <span className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest font-bold">Select Avatar</span>
              </div>
              <button onClick={onClose} className="p-2 sm:p-3 bg-white/5 rounded-2xl border border-white/10 text-white/40">
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3 sm:gap-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {AVATARS.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => {
                    onSelect(avatar);
                    onClose();
                  }}
                  className={`text-3xl sm:text-4xl p-3 sm:p-4 rounded-2xl sm:rounded-3xl transition-all border-2 ${
                    currentAvatar === avatar 
                      ? 'bg-primary border-primary text-white shadow-lg scale-110' 
                      : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
