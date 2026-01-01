import React, { useEffect } from "react";

function SuccessIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ErrorIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function AlertMessage({ type = "error", message, onClose }) {
  if (!message) return null;

  const isSuccess = type === "success";

  // Auto dismiss only for success alerts
  useEffect(() => {
    if (type !== "success") return;

    const timer = setTimeout(() => {
      onClose?.();
    }, 5000);

    return () => clearTimeout(timer);
  }, [type, onClose]);


  const styles = isSuccess
    ? {
      container: "bg-green-50 border-green-500 text-green-800",
      icon: "text-green-500",
      closeBtn: "hover:bg-green-100 text-green-600",
    }
    : {
      container: "bg-red-50 border-red-500 text-red-800",
      icon: "text-red-500",
      closeBtn: "hover:bg-red-100 text-red-600",
    };

  return (
    <div
      role="alert"
      className={`relative mb-4 flex w-full items-start rounded-r-lg border-l-4 p-4 shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${styles.container}`}
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        {isSuccess ? (
          <SuccessIcon className={`h-5 w-5 ${styles.icon}`} />
        ) : (
          <ErrorIcon className={`h-5 w-5 ${styles.icon}`} />
        )}
      </div>

      {/* Message */}
      <div className="ml-3 flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>

      {/* Close button */}
      <div className="ml-auto pl-3">
        <button
          onClick={onClose}
          type="button"
          className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles.closeBtn}`}
        >
          <span className="sr-only">Dismiss alert</span>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
