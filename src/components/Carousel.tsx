import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Children,
  useMemo,
} from 'react';
import '../styles/carousel.css';
import PrevIcon from '../assets/icons/PrevIcon';
import NextIcon from '../assets/icons/NextIcon';


export interface CarouselProps {
  children: React.ReactNode;
  slidesPerView?: number;
  cardWidth?: number;
  gap?: number;
  autoplayInterval?: number;
  autoplayEnabled?: boolean;
  className?: string;
}


const Carousel: React.FC<CarouselProps> = ({
  children,
  slidesPerView,
  cardWidth,
  gap = 20,
  autoplayInterval = 3000,
  autoplayEnabled = true,
  className = '',
}) => {
  const [position, setPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayTimeoutRef = useRef<number | null>(null);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Memoize slides array
  const slides = useMemo(() => Children.toArray(children), [children]);
  const displayedSlides = useMemo(
    () => [...slides, ...slides, ...slides],
    [slides]
  );
  const resetPoint = useMemo(
    () => slides.length * (slideWidth + gap),
    [slides.length, slideWidth, gap]
  );

  const updateSlideWidth = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const newSlideWidth = cardWidth
        ? cardWidth
        : slidesPerView
        ? (containerWidth - gap * (slidesPerView - 1)) / slidesPerView
        : (containerWidth - gap * (Math.floor(containerWidth / (200 + gap)) - 1)) /
          Math.floor(containerWidth / (200 + gap));

      setSlideWidth(newSlideWidth);
      setPosition(0);
    }
  }, [slidesPerView, cardWidth, gap]);

  useEffect(() => {
    updateSlideWidth();
    const resizeObserver = new ResizeObserver(updateSlideWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [updateSlideWidth]);


  // console.log({resetPoint, slideWidth, gap});

  const moveToSlide = useCallback(
    (newPosition: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setPosition(newPosition);
    },
    [isTransitioning]
  );

  const moveToNextSlide = useCallback(
    () => moveToSlide(position + slideWidth + gap),
    [position, slideWidth, gap, moveToSlide]
  );
  const moveToPrevSlide = useCallback(() => {
    if (position === 0) {
      moveToSlide(resetPoint - slideWidth - gap);
    } else {
      moveToSlide(position - slideWidth - gap);
    }
  }, [position, slideWidth, gap, moveToSlide, resetPoint]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    if (position >= resetPoint) {
      console.log('position >= resetPoint', position, resetPoint);
      setPosition(0); // Loop back smoothly
    } else if (position <= 0) {
      console.log('position < 0', position, resetPoint);
      setPosition(resetPoint - (slideWidth + gap)); // Loop to the last item
    }
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const touchDiff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(touchDiff) > minSwipeDistance) {
      if (touchDiff > 0) {
        moveToNextSlide();
      } else {
        moveToPrevSlide();
      }
    }
  };

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (document.activeElement?.closest('#smooth-carousel')) {
          if (e.key === 'ArrowLeft') {
            moveToPrevSlide();
          } else if (e.key === 'ArrowRight') {
            moveToNextSlide();
          }
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [moveToNextSlide, moveToPrevSlide]);

  useEffect(() => {
    if (autoplayEnabled && !isHovered && !isTransitioning) {
      autoplayTimeoutRef.current = setTimeout(
        moveToNextSlide,
        autoplayInterval
      );
    }
    return () => {
      if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);
    };
  }, [position, isHovered, autoplayEnabled, autoplayInterval, moveToNextSlide, isTransitioning]);

  return (
    <div
      id="smooth-carousel"
      className={`carousel-container ${className}`}
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="slides-track"
        ref={trackRef}
        style={{
          gap: `${gap}px`,
          transform: `translateX(-${position}px)`,
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {displayedSlides.map((slide, index) => (
          <div
            key={index}
            style={{ flex: `0 0 ${slideWidth}px`, width: `${slideWidth}px` }}
          >
            {slide}
          </div>
        ))}
      </div>

      <div className="slides-controller">
        <button
          type="button"
          onClick={moveToPrevSlide}
          className="navigarion-button prev"
          aria-label="Previous slide"
        >
          <PrevIcon width={20} height={20} />
        </button>
        <button
          type="button"
          onClick={moveToNextSlide}
          className="navigarion-button next"
          aria-label="Next slide"
        >
          <NextIcon width={20} height={20} />
        </button>
        <div className="dots-container">
          {slides.map((_, index) => (
            <button
              type="button"
              key={index}
              className={`dot-button ${Math.floor(position / (slideWidth + gap)) % slides.length === index ? 'active' : ''}`}
              onClick={() => moveToSlide(index * (slideWidth + gap))}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
