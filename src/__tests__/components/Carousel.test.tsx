// import React from 'react';
// import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import Carousel from '../../components/Carousel';

// // Mock the icon components
// jest.mock('../../assets/icons/PrevIcon', () => () => <div data-testid="prev-icon" />);
// jest.mock('../../assets/icons/NextIcon', () => () => <div data-testid="next-icon" />);

// describe('Carousel Component', () => {
//   const mockChildren = [
//     <div key="1" data-testid="slide-1">Slide 1</div>,
//     <div key="2" data-testid="slide-2">Slide 2</div>,
//     <div key="3" data-testid="slide-3">Slide 3</div>,
//   ];

//   beforeEach(() => {
//     // Mock container width for responsive calculations
//     Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
//       configurable: true,
//       value: 1000, // Mock width
//     });

//     jest.useFakeTimers(); // Use fake timers for autoplay tests
//   });

//   afterEach(() => {
//     jest.clearAllTimers();
//     jest.useRealTimers();
//   });

//   it('renders without crashing', () => {
//     render(<Carousel>{mockChildren}</Carousel>);
//     expect(screen.getByTestId('slide-1')).toBeInTheDocument();
//   });

//   it('renders the correct number of slides', () => {
//     render(<Carousel>{mockChildren}</Carousel>);
//     expect(screen.getAllByText('Slide 1')).toHaveLength(3); // Cloned slides
//   });

//   it('renders navigation buttons', () => {
//     render(<Carousel>{mockChildren}</Carousel>);
//     expect(screen.getByLabelText('Previous slide')).toBeInTheDocument();
//     expect(screen.getByLabelText('Next slide')).toBeInTheDocument();
//   });

//   it('moves to the next slide when next button is clicked', async () => {
//     render(<Carousel>{mockChildren}</Carousel>);
//     const nextButton = screen.getByLabelText('Next slide');

//     await act(async () => {
//       fireEvent.click(nextButton);
//     });

//     await waitFor(() => {
//       const track = document.querySelector('.slides-track');
//       expect(track).toHaveStyle({ transform: expect.stringContaining('translateX(-') });
//     });
//   });

//   it('moves to the previous slide when prev button is clicked', async () => {
//     render(<Carousel>{mockChildren}</Carousel>);
//     const prevButton = screen.getByLabelText('Previous slide');

//     await act(async () => {
//       fireEvent.click(prevButton);
//     });

//     await waitFor(() => {
//       const track = document.querySelector('.slides-track');
//       expect(track).toHaveStyle({ transform: expect.stringContaining('translateX(') });
//     });
//   });

//   it('autoplays to the next slide when enabled', async () => {
//     render(<Carousel autoplayEnabled autoplayInterval={3000}>{mockChildren}</Carousel>);

//     await act(async () => {
//       jest.advanceTimersByTime(3000); // Simulate autoplay interval
//     });

//     await waitFor(() => {
//       const track = document.querySelector('.slides-track');
//       expect(track).toHaveStyle({ transform: expect.stringContaining('translateX(-') });
//     });
//   });

//   it('stops autoplay when hovered', async () => {
//     render(<Carousel autoplayEnabled autoplayInterval={3000}>{mockChildren}</Carousel>);

//     const carousel = screen.getByTestId('smooth-carousel');

//     await act(async () => {
//       fireEvent.mouseEnter(carousel);
//       jest.advanceTimersByTime(3000);
//     });

//     await waitFor(() => {
//       const track = document.querySelector('.slides-track');
//       expect(track).not.toHaveStyle({ transform: expect.stringContaining('translateX(-') });
//     });
//   });

//   it('resumes autoplay when mouse leaves', async () => {
//     render(<Carousel autoplayEnabled autoplayInterval={3000}>{mockChildren}</Carousel>);

//     const carousel = screen.getByTestId('smooth-carousel');

//     await act(async () => {
//       fireEvent.mouseEnter(carousel);
//       jest.advanceTimersByTime(3000);
//       fireEvent.mouseLeave(carousel);
//       jest.advanceTimersByTime(3000);
//     });

//     await waitFor(() => {
//       const track = document.querySelector('.slides-track');
//       expect(track).toHaveStyle({ transform: expect.stringContaining('translateX(-') });
//     });
//   });

//   it('handles touch swipe left to move to the next slide', async () => {
//     render(<Carousel>{mockChildren}</Carousel>);
//     const carousel = screen.getByTestId('smooth-carousel');

//     await act(async () => {
//       fireEvent.touchStart(carousel, { touches: [{ clientX: 200 }] });
//       fireEvent.touchMove(carousel, { touches: [{ clientX: 100 }] }); // Swipe left
//       fireEvent.touchEnd(carousel);
//     });

//     await waitFor(() => {
//       const track = document.querySelector('.slides-track');
//       expect(track).toHaveStyle({ transform: expect.stringContaining('translateX(-') });
//     });
//   });

//   it('handles touch swipe right to move to the previous slide', async () => {
//     render(<Carousel>{mockChildren}</Carousel>);
//     const carousel = screen.getByTestId('smooth-carousel');

//     await act(async () => {
//       fireEvent.touchStart(carousel, { touches: [{ clientX: 100 }] });
//       fireEvent.touchMove(carousel, { touches: [{ clientX: 200 }] }); // Swipe right
//       fireEvent.touchEnd(carousel);
//     });

//     await waitFor(() => {
//       const track = document.querySelector('.slides-track');
//       expect(track).toHaveStyle({ transform: expect.stringContaining('translateX(') });
//     });
//   });

//   it('navigates with keyboard arrow keys', async () => {
//     render(<Carousel>{mockChildren}</Carousel>);
//     const carousel = screen.getByTestId('smooth-carousel');

//     await act(async () => {
//       fireEvent.keyDown(carousel, { key: 'ArrowRight' });
//     });

//     await waitFor(() => {
//       const track = document.querySelector('.slides-track');
//       expect(track).toHaveStyle({ transform: expect.stringContaining('translateX(-') });
//     });

//     await act(async () => {
//       fireEvent.keyDown(carousel, { key: 'ArrowLeft' });
//     });

//     await waitFor(() => {
//       const track = document.querySelector('.slides-track');
//       expect(track).toHaveStyle({ transform: expect.stringContaining('translateX(') });
//     });
//   });

//   it('changes slide when clicking pagination dots', async () => {
//     render(<Carousel>{mockChildren}</Carousel>);
//     const dots = screen.getAllByRole('button', { name: /Go to slide/i });

//     await act(async () => {
//       fireEvent.click(dots[1]);
//     });

//     await waitFor(() => {
//       const track = document.querySelector('.slides-track');
//       expect(track).toHaveStyle({ transform: expect.stringContaining('translateX(-') });
//     });
//   });
// });
