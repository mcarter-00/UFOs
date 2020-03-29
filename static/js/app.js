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
            // Hack-ish code to address 'html character references' (apostraphes)
            var elem = document.createElement('textarea')
            elem.innerHTML = val
            text = elem.value
            cell.text(text);
        });
    });
}

// Build a function to filter by date
function handleClick() {
    // Grab the datetime value from the filter
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData;
    // Check to see if a date was entered and filter the data
    // using that date
    if (date) {
        // Apply 'filter' to the table data to only keep the rows
        // where the 'datetime' value matches the filter value
        filteredData = filteredData.filter(row => row.datetime === date);
    };
    // Rebuild the table using the filtered data
    // NOTE: If no date was entered, then filteredData will 
    // just be the original tableData
    buildTable(filteredData);
};

// Attach an event to list for the form button
d3.selectAll("#filter-btn").on("click", handleClick);
// Build the table when the page loads
buildTable(tableData);
