import { useEffect } from 'react';
import { useStore } from '../store';
import { CheckCircle, XCircle, Info } from 'lucide-react';

export function Toast() {
  const { toasts, removeToast } = useStore();

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        removeToast(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts, removeToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={index}
          className={`flex items-center space-x-2 rounded-lg px-4 py-2 text-white ${
            toast.type === 'success'
              ? 'bg-green-600'
              : toast.type === 'error'
              ? 'bg-red-600'
              : 'bg-blue-600'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : toast.type === 'error' ? (
            <XCircle className="h-5 w-5" />
          ) : (
            <Info className="h-5 w-5" />
          )}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}