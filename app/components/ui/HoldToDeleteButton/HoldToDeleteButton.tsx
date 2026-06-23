"use client";

import React, { useEffect, useRef, useState } from "react";

interface HoldToDeleteButtonProps {
  onComplete: () => void;
  duration?: number;
  className?: string;
  ariaLabel?: string;
}

const PERIMETER = 80;

const HoldToDeleteButton = ({
  onComplete,
  duration = 1200,
  className = "",
  ariaLabel = "Hold to delete",
}: HoldToDeleteButtonProps) => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);
  const isActive = useRef(false);

  const reset = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    startTime.current = null;
    isActive.current = false;
    setIsHolding(false);
    setProgress(0);
  };

  const complete = () => {
    reset();
    onComplete();
  };

  const animate = (timestamp: number) => {
    if (startTime.current === null) {
      startTime.current = timestamp;
    }

    const elapsed = timestamp - startTime.current;
    const nextProgress = Math.min(100, (elapsed / duration) * 100);
    setProgress(nextProgress);

    if (nextProgress >= 100) {
      complete();
      return;
    }

    rafId.current = requestAnimationFrame(animate);
  };

  const startHold = () => {
    if (isActive.current) return;
    isActive.current = true;
    setIsHolding(true);
    startTime.current = performance.now();
    rafId.current = requestAnimationFrame(animate);
  };

  const stopHold = () => {
    if (!isActive.current) return;
    reset();
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

    return (
    <button
        type="button"
        aria-label={ariaLabel}
        className={`relative inline-flex h-full w-full items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 ${className}`}
        style={{ touchAction: "none" }}
      onPointerDown={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.button !== 0) return;
        startHold();
        if (event.currentTarget.setPointerCapture) {
          event.currentTarget.setPointerCapture(event.pointerId);
        }
      }}
      onPointerUp={(event) => {
        event.stopPropagation();
        stopHold();
      }}
      onPointerLeave={(event) => {
        event.stopPropagation();
        stopHold();
      }}
      onPointerCancel={(event) => {
        event.stopPropagation();
        stopHold();
      }}
      onTouchStart={(event) => {
        event.preventDefault();
        event.stopPropagation();
        startHold();
      }}
      onTouchEnd={(event) => {
        event.stopPropagation();
        stopHold();
      }}
      onTouchCancel={(event) => {
        event.stopPropagation();
        stopHold();
      }}
    >
      <div className="relative flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-sm bg-transparent transition-all duration-200 pointer-events-none">
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="2"
            className="stroke-gray-200 dark:stroke-neutral-800"
            strokeWidth="2"
            fill="none"
          />
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="2"
            className="stroke-red-500"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={PERIMETER}
            strokeDashoffset={PERIMETER - (progress / 100) * PERIMETER}
            style={{
              transition: isHolding ? "none" : "stroke-dashoffset 0.15s ease-out",
            }}
          />
        </svg>

        <svg className="relative h-[14px] w-[14px] text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18" />
          <path d="M8 6V4h8v2" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" />
        </svg>
      </div>
    </button>
  );
};

export default HoldToDeleteButton;