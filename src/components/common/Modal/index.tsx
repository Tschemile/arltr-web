import type { ReactNode } from 'react';
import React from 'react';

import Close from '@/components/Icons/Close';

import Button from '../Button';
import Divider from '../Divider';

interface ModalProps {
  loading?: boolean;
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
    loading = false,
    content,
    showModal = false,
    showHeader = true,
    showFooter = true,
    showTitle = true,
    showSecondButton = true,
    showSubmitButton = true,
    title,
    textSecondButton = 'Cancel',
    textSubmitButton = 'Submit',
    onSubmit,
    onClose,
  } = props;
  return (
    <div
      className={`fixed top-0 left-0 z-10 ${
        showModal ? 'visible opacity-100' : 'invisible opacity-0'
      } w-full overflow-y-auto transition-all duration-300`}
      id="modal"
    >
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0 ">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle">
          &#8203;
        </span>
        <div
          className={`absolute top-1/2 left-1/2 m-0 inline-block w-full -translate-x-1/2 -translate-y-1/2 items-center overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg sm:align-middle`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {showHeader && (
            <>
              <div className="flex items-center justify-between px-4 py-2">
                <div className="font-medium">{showTitle && title}</div>
                <button className="rounded-full" onClick={onClose}>
                  <Close />
                </button>
              </div>
              <Divider />
            </>
          )}
          <div className="px-4 py-2">{content}</div>
          {showFooter && (
            <>
              <Divider />
              <div className="flex justify-end px-4 pb-4 text-base">
                {showSecondButton && (
                  <Button
                    type="button"
                    className="mr-2"
                    onSubmit={onClose}
                    background="secondary"
                  >
                    {textSecondButton}
                  </Button>
                )}
                {showSubmitButton && (
                  <Button
                    type="button"
                    // className="mr-2 rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
                    onSubmit={onSubmit}
                    loading={loading}
                  >
                    {textSubmitButton}
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
