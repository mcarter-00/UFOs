// Import data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

// Build table and pass data as the argument
function buildTable(data) {
    // First, clear existing data to create a fresh table
    tbody.html("");
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        // Create a variable that appends a row to the table body
        let row = tbody.append("tr");
        // Loop through each object in the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => { 
            let cell = row.append("td"); 
            cell.text(val);
            }
        );
    });
}