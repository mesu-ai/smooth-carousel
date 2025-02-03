// import { addRow, removeRow, addColumn, removeColumn } from '../../utils/commands';

// describe('Table Commands', () => {
//   beforeEach(() => {
//     document.body.innerHTML = `
//       <table id="editor-custom-table">
//         <tr><td>1,1</td><td>1,2</td></tr>
//         <tr><td>2,1</td><td>2,2</td></tr>
//       </table>
//     `;
//   });

//   it('adds a new row correctly', () => {
//     const table = document.getElementById('editor-custom-table') as HTMLTableElement;
//     const initialRows = table.rows.length;
    
//     addRow();
    
//     expect(table.rows.length).toBe(initialRows + 1);
//   });

//   it('removes a row correctly', () => {
//     const table = document.getElementById('editor-custom-table') as HTMLTableElement;
//     const initialRows = table.rows.length;
    
//     removeRow();
    
//     expect(table.rows.length).toBe(initialRows - 1);
//   });
// });