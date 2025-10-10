"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Spinner remains the same
const Spinner = () => (
  <div style={{
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    color: 'white', textAlign: 'center', pointerEvents: 'none'
  }}>
    <div style={{
      width: '24px', height: '24px', border: '3px solid rgba(255, 255, 255, 0.3)',
      borderTop: '3px solid white', borderRadius: '50%',
      animation: 'spin 1s linear infinite', margin: '0 auto 8px'
    }}></div>
    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const VideoThumbnail = ({ videoUrl, className }: { videoUrl: string; className?: string; }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [thumbnailSrc, setThumbnailSrc] = useState<string | null>(null);
  const [isExternalThumbnailFailed, setIsExternalThumbnailFailed] = useState(false); // New state for error

  useEffect(() => {
    setIsLoading(true);
    setThumbnailSrc(null);
    setIsExternalThumbnailFailed(false); // Reset error state

    // --- YouTube Thumbnail Logic ---
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      const videoId = videoUrl.includes("v=") 
        ? videoUrl.split("v=")[1]?.split("&")[0] 
        : videoUrl.split("/").pop()?.split("?")[0];
      
      if (videoId) {
        setThumbnailSrc(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`);
        // We assume it will load, onError will catch failure
        setIsLoading(false); 
      } else {
        setIsExternalThumbnailFailed(true); // If videoId couldn't be parsed
      }
      return;
    }

    // --- Vimeo Thumbnail Logic ---
    if (videoUrl.includes("vimeo.com")) {
      const videoId = videoUrl.split("/").pop()?.split("?")[0];
      if (videoId) {
        fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`)
          .then(res => res.json())
          .then(data => {
            if (data.thumbnail_url) {
              setThumbnailSrc(data.thumbnail_url);
            } else {
              setIsExternalThumbnailFailed(true);
            }
          })
          .catch(err => {
            console.error("Vimeo thumbnail fetch error:", err);
            setIsExternalThumbnailFailed(true);
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsExternalThumbnailFailed(true); // If videoId couldn't be parsed
      }
      return;
    }

    // --- Fallback to Canvas for Direct Video Files or failed external thumbnails ---
    if (isExternalThumbnailFailed || !(videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") || videoUrl.includes("vimeo.com"))) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || !videoUrl) {
            setIsLoading(false); // No video or canvas to draw on
            return;
        };
        const context = canvas.getContext('2d');
        if (!context) {
            setIsLoading(false);
            return;
        };
        
        const drawFallback = () => {
          if (!canvas) return;
          context.fillStyle = '#1a1a1a';
          context.fillRect(0, 0, canvas.width, canvas.height);
          setIsLoading(false);
        };

        video.onloadeddata = () => video.currentTime = 1;
        video.onseeked = () => {
          if (!canvas || !video) return;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          setIsLoading(false);
        };
        video.onerror = () => {
          console.error("Error loading video for canvas thumbnail.");
          drawFallback();
        };
        video.src = videoUrl;

        const timer = setTimeout(() => { if (isLoading) drawFallback(); }, 5000);
        return () => clearTimeout(timer);
    }

  }, [videoUrl, isExternalThumbnailFailed]); // Re-run effect if external thumbnail fails


  const handleImageError = () => {
    console.error(`Failed to load external thumbnail: ${thumbnailSrc}. Falling back to canvas/placeholder.`);
    setThumbnailSrc(null); // Clear the failed thumbnail source
    setIsExternalThumbnailFailed(true); // Trigger the canvas/direct video fallback logic
  };

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#000' }}>
      {isLoading && <Spinner />}
      {thumbnailSrc && !isExternalThumbnailFailed ? (
        <Image 
            src={thumbnailSrc} 
            alt="Video Thumbnail" 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            onLoad={() => setIsLoading(false)}
            onError={handleImageError} // Use the new error handler
        />
      ) : (
        <>
          {/* Render canvas only for direct videos, otherwise a simple div placeholder for embedded fallback */}
          {!(videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") || videoUrl.includes("vimeo.com")) ? (
            <video ref={videoRef} style={{ display: 'none' }} muted crossOrigin="anonymous" preload="metadata" />
          ) : null}
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit', display: (thumbnailSrc && !isExternalThumbnailFailed) ? 'none' : 'block' }} />
        </>
      )}
    </div>
  );
};

export default VideoThumbnail;