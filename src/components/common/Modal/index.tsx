import type { ReactNode } from 'react';
import React from 'react';

interface ModalProps {
  content: ReactNode;
  showModal: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  showTitle?: boolean;
  showSecondButton?: boolean;
  showSubmitButton?: boolean;
  title?: string;
  textSecondButton?: string;
  textSubmitButton?: string;
  onSubmit?: () => void;
  onClose: () => void;
}

export default function Modal(props: ModalProps) {
  const {
    content,
    showModal = false,
    showHeader = true,
    showFooter = true,
    showTitle = true,
    showSecondButton = true,
    showSubmitButton = true,
    title,
    textSecondButton = 'cancel',
    textSubmitButton = 'submit',
    onSubmit,
    onClose,
  } = props;
  return (
    <div
      className={`fixed top-0 left-0 z-10 ${
        showModal ? '' : 'hidden'
      } w-full overflow-y-auto`}
      id="modal"
    >
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle">
          &#8203;
        </span>
        <div
          className="absolute top-1/2 left-1/2 m-0 inline-block -translate-x-1/2 -translate-y-1/2 items-center overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg sm:align-middle"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {showHeader && (
            <div className="bg-gray-200 px-4 py-3 text-right">
              <div>{showTitle && title}</div>
              <button className="rounded-full" onClick={onClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {content}
          </div>
          {showFooter && (
            <div className="bg-gray-200 px-4 py-3 text-right">
              {showSecondButton && (
                <button
                  type="button"
                  className="mr-2 rounded bg-gray-500 py-2 px-4 text-white hover:bg-gray-700"
                  onClick={onClose}
                >
                  {textSecondButton}
                </button>
              )}
              {showSubmitButton && (
                <button
                  type="button"
                  className="mr-2 rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
                  onClick={onSubmit}
                >
                  {textSubmitButton}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
