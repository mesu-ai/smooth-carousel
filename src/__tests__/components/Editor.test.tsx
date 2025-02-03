// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';


// describe('Editor Component', () => {
//   const mockOnChange = jest.fn();
//   const defaultProps = {
//     value: '',
//     onChange: mockOnChange,
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('renders with initial content', () => {
//     const initialContent = '<p>Initial content</p>';
//     render(<Editor {...defaultProps} value={initialContent} />);

//     const editorElement = screen.getByRole('textbox');
//     expect(editorElement).toHaveProperty('innerHTML', initialContent);
//   });

//   it('calls onChange when content changes', () => {
//     render(<Editor {...defaultProps} />);
//     const editorElement = screen.getByRole('textbox');

//     fireEvent.input(editorElement, {
//       target: { innerHTML: '<p>New content</p>' }
//     });

//     expect(mockOnChange).toHaveBeenCalledWith('<p>New content</p>');
//   });

//   it('handles image drag and drop', async () => {
//     render(<Editor {...defaultProps} />);
//     const editorElement = screen.getByRole('textbox');

//     const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

//     // Mock DataTransfer
//     const dataTransfer = {
//       files: [file],
//       items: {
//         add: jest.fn()
//       },
//       types: ['Files']
//     };

//     // Mock FileReader
//     const fileReaderMock = {
//       readAsDataURL: jest.fn(),
//       onload: jest.fn(),
//       result: 'data:image/png;base64,dummy',
//     };

//     jest.spyOn(window, 'FileReader').mockImplementation(() => fileReaderMock as unknown as FileReader);

//     fireEvent.drop(editorElement, { dataTransfer });

//     // Call the onload callback manually to simulate the FileReader behavior
//     fileReaderMock.onload({
//       target: {
//         result: fileReaderMock.result
//       }
//     } as any);

//     // Wait for FileReader
//     await new Promise(resolve => setTimeout(resolve, 0));

//     expect(mockOnChange).toHaveBeenCalledWith(expect.stringContaining('<img src="data:image/png;base64,dummy"'));
//   });
// });