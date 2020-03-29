// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
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

// Keep track of all filters
var filters = {
  date: "",
  city: "",
  state: "",
  country: "",
  shape: "",
};

// This function will replace your handleClick function
function updateFilters() {

  // Save the element, value, and id of the filter that was changed
  let date = d3.select("#datetime").property("value");
  let city = d3.select("#city").property("value");
  let state = d3.select("#state").property("value");
  let country = d3.select("#country").property("value");
  let shape = d3.select("#shape").property("value");

  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object
  if (date) {
    filters["date"] = date; 
  }
  if (city) {
    filters["city"] = city; 
  }
  if (state) {
    filters["state"] = state; 
  }
  if (country) {
    filters["country"] = country; 
  }
  if (shape) {
    filters["shape"] = shape; 
  }
  // Call function to apply all filters and rebuild the table
  filterTable(filters);
};

function filterTable(filters) {

  // Set the filteredData to the tableData
  let filteredData = tableData;

  // Loop through all of the filters and keep any data that
  // matches the filter values
  let filteredRows = [];

  if (filters.date !== "") {
    Array.prototype.push.apply(filteredRows, filteredData.filter(row => row.datetime === filters.date));
  }
  if (filters.city !== "") {
    Array.prototype.push.apply(filteredRows, filteredData.filter(row => row.city === filters.city));
  }
  if (filters.state !== "") { 
    Array.prototype.push.apply(filteredRows, filteredData.filter(row => row.state === filters.state));
  }
  if (filters.country !== "") { 
    Array.prototype.push.apply(filteredRows, filteredData.filter(row => row.country === filters.country));
  }
  if (filters.shape !== "") { 
    Array.prototype.push.apply(filteredRows, filteredData.filter(row => row.shape === filters.shape));
  }
 
  // Finally, rebuild the table using the filtered Data
  buildTable(filteredRows);
};

// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
d3.selectAll("#filter-btn").on("click", updateFilters);

// Build the table when the page loads
buildTable(tableData);
