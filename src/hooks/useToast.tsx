import { useState, useEffect } from 'react';

type ToastType = 'success' | 'error';

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: ToastType = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts(prev => prev.slice(1));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const ToastContainer = () => (
    <div className= "fixed bottom-5 right-5 z-50 space-y-2" >
    {
      toasts.map(toast => (
        <div
          key= { toast.id }
          className = {`px-4 py-2 rounded-lg shadow-lg text-white ${toast.type === 'success' ? 'bg-success' : 'bg-error'
          }`}
    >
    { toast.message }
    </div>
      ))}
</div>
  );

return { showToast, ToastContainer };
};

export default useToast;
