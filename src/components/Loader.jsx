
/**
 * @param {boolean} fullScreen - If true, covers the entire screen with a backdrop
 * @param {string} size - 'sm', 'md', 'lg', 'xl'
 * @param {string} className - Additional custom classes
 */
const Loader = ({ fullScreen = false, size = 'md', className = '', message = "Loading..." }) => {
  // Size mapping
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  };

  // Base spinner styling
  // border-current allows the spinner to take the text-color of the parent or specific class
  // border-t-transparent creates the "spinning gap" effect
  const spinnerClasses = `
    rounded-full 
    animate-spin 
    border-gray-200 
    border-t-blue-600 
    ${sizeClasses[size] || sizeClasses.md} 
    ${className}
  `;

  // The actual Spinner Element
  const Spinner = () => (
    <div className="flex flex-col items-center gap-2">
      <div
        role="status"
        aria-label="loading"
        className={spinnerClasses}
      >
        <span className="sr-only">{message}</span>
      </div>
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );


  // If fullScreen, wrap in a fixed overlay
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity">
        <Spinner />
      </div>
    );
  }

  // Otherwise, return just the inline spinner
  return <Spinner />;
};

export default Loader;