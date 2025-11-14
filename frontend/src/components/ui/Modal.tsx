"use client";

import React from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-neo-surface rounded-2xl p-6 shadow-soft w-full max-w-md">
        {children}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-neo-primary px-4 py-2 rounded-xl text-sm font-medium text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}