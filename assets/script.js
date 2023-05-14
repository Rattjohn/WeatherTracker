const apiKEY = "10d6e35f53d0281c0ddd7a75c5ff1148"

// Get the search bar and search button elements
var searchBar = document.querySelector('input[type="text"]');
var searchButton = document.querySelector('button[type="submit"]');

// Get the button elements
var buttons = document.querySelectorAll('button:not([type="submit"])');

// Initialize the index to 0
var index = 0;

// Add an event listener to the search button
searchButton.addEventListener('click', function() {
  // Get the user's input
  var input = searchBar.value;

  // If the input is not empty
  if (input !== '') {
    // Update the button text
    buttons[index].textContent = input;

    // Increment the index
    index++;

    // If the index is greater than or equal to 8, reset it to 0
    if (index >= 8) {
      index = 0;
    }

    // Clear the search bar
    searchBar.value = '';
  }
});