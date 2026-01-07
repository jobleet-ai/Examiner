import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmButtonClass = 'bg-red-600 hover:bg-red-700',
  cancelButtonClass = 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  icon = null,
  showIcon = false,
  iconColor = 'text-red-600',
  loading = false
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    if (!loading) {
      onClose();
    }
  };

  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && !loading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, loading, onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              {showIcon && (
                <div className={`flex-shrink-0 ${iconColor}`}>
                  {icon || <AlertCircle className="w-6 h-6" />}
                </div>
              )}
              <h3 
                id="dialog-title" 
                className="text-lg font-bold text-gray-900"
              >
                {title}
              </h3>
            </div>
            {!loading && (
              <button type="button"
                onClick={handleCancel}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {typeof message === 'string' ? (
            <p className="text-gray-700 leading-relaxed">
              {message}
            </p>
          ) : (
            message
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3 justify-end">
          <button type="button"
            onClick={handleCancel}
            disabled={loading}
            className={`px-4 py-2 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed ${cancelButtonClass}`}
          >
            {cancelText}
          </button>
          <button type="button"
            onClick={handleConfirm}
            disabled={loading}
            className={`px-4 py-2 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${confirmButtonClass}`}
          >
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

/* 
USAGE EXAMPLES:

1. Basic Confirm Dialog:
<ConfirmDialog
  isOpen={showDialog}
  onClose={() => setShowDialog(false)}
  onConfirm={handleDelete}
  title="Delete Item"
  message="Are you sure you want to delete this item?"
  confirmText="Delete"
/>

2. Custom Styling:
<ConfirmDialog
  isOpen={showDialog}
  onClose={() => setShowDialog(false)}
  onConfirm={handleAction}
  title="Confirm Action"
  message="This action cannot be undone."
  confirmText="Proceed"
  confirmButtonClass="bg-blue-600 hover:bg-blue-700"
  showIcon={true}
  iconColor="text-blue-600"
/>

3. With Custom Icon:
import { Trash2 } from 'lucide-react';

<ConfirmDialog
  isOpen={showDialog}
  onClose={() => setShowDialog(false)}
  onConfirm={handleDelete}
  title="Delete Permanently"
  message="This will permanently delete all data."
  confirmText="Delete"
  showIcon={true}
  icon={<Trash2 className="w-6 h-6" />}
  iconColor="text-red-600"
/>

4. With Loading State:
<ConfirmDialog
  isOpen={showDialog}
  onClose={() => setShowDialog(false)}
  onConfirm={handleAsyncAction}
  title="Processing"
  message="Please wait..."
  loading={isLoading}
/>

5. With JSX Message:
<ConfirmDialog
  isOpen={showDialog}
  onClose={() => setShowDialog(false)}
  onConfirm={handleAction}
  title="Complex Message"
  message={
    <div>
      <p className="mb-2">First paragraph.</p>
      <ul className="list-disc pl-5">
        <li>Point 1</li>
        <li>Point 2</li>
      </ul>
    </div>
  }
/>
*/