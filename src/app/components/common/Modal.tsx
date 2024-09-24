import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  size: "sm" | "md" | "lg";
  content: ReactNode;
  toggleButtonRef: React.RefObject<HTMLDivElement>;
  className?: string;
}

export default function Modal({ open, onClose, size, content, toggleButtonRef, className }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      toggleButtonRef.current &&
      !toggleButtonRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const sizeClasses = {
    sm: "max-w-[160px]",
    md: "max-w-[320px]",
    lg: "max-w-[480px]",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`absolute ${className || ''}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        >
          <div
            className={`${sizeClasses[size]} w-full bg-white shadow-modal py-4 rounded-lg`}
            ref={modalRef}
          >
            {content}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
