import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

/**
 * A wrapper around the native img tag that provides:
 * 1. Automatic referrerPolicy="no-referrer" (crucial for Unsplash)
 * 2. crossOrigin="anonymous" (prevents tainted canvas issues and helps with certain CDN configs)
 * 3. Fallback image on error
 * 4. Loading state with pulse animation
 * 5. Lazy loading by default
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  fallbackSrc = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800', 
  className,
  ...props 
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    if (!error) {
      setError(true);
    }
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse z-0" />
      )}
      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'} z-10`}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
