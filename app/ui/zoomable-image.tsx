import React, { useRef, useState, useEffect, useCallback } from 'react';

const ZoomableImage = (props: { src: string; alt?: string }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    setIsDragging(true);
    updateTransformOrigin(event.nativeEvent);
  };

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (isDragging) {
      updateTransformOrigin(event);
    }
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const updateTransformOrigin = (event: MouseEvent | React.MouseEvent<HTMLImageElement>) => {
    const img = imgRef.current;
    if (img) {
      const rect = img.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const originX = (offsetX / rect.width) * 100;
      const originY = (offsetY / rect.height) * 100;
      img.style.transformOrigin = `${originX}% ${originY}%`;
    }
  };

  useEffect(() => {
    const handleMouseMoveDocument = (event: MouseEvent) => handleMouseMove(event);
    const handleMouseUpDocument = () => handleMouseUp();

    document.addEventListener('mousemove', handleMouseMoveDocument);
    document.addEventListener('mouseup', handleMouseUpDocument);

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveDocument);
      document.removeEventListener('mouseup', handleMouseUpDocument);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <img
      ref={imgRef}
      className="relative w-auto h-auto aspect-video zoom-image cursor-zoom-in object-contain"
      src={props.src}
      alt={props.alt || ''}
      onMouseDown={handleMouseDown}
    />
  );
};

export default ZoomableImage;