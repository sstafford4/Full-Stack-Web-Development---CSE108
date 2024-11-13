// ctrl + shift + J to open the dev view on Chrome
console.log("If you can see this in the console, then the file is hooked up correctly!")
//--------------------------------------------------------
// this is the Fetch API.
fetch('https://amhep.pythonanywhere.com/grades')
    //.then(res => console.log(res)) // logging the response object to make sure that its connected to the api correctly
    .then(res => res.json()) // returning the information in JSON
    .then(data => console.log(data)) // logging the data that is now in JSON
    .catch(error => console.log("Something went wrong!", error)) // catching an error in the event we fetch the wrong thing

//--------------------------------------------------------
// this is where im going to be making my functions
//--------------------------------------------------------

// THE ASSIGNMENT IS FEATURE COMPLETE!

// THIS FUNCTION ACTUALLY WORKS TO ADD A STUDENT NAME AND GRADE TO THE API
    function addStudent(){
        const stud_name = document.getElementById('addName').value.toLowerCase()
        const stud_grade = document.getElementById('addGrade').value
        if (stud_name && stud_grade){
            fetch('https://amhep.pythonanywhere.com/grades', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    name: stud_name, 
                    grade: stud_grade
                })
            })
            .then(res => res.json())
            .then(data => console.log(`Student Added: ${stud_name}`, data))
        }
    }

// OK THIS FUNCTION NOW DELETES NAMES FROM THE API! FUNCTIONS CORRECTLY!
    function deleteStudent(){
        const stud_name = document.getElementById('delName').value.toLowerCase()
        if (stud_name){
            const confirmation = confirm(`Are you sure you want to delete user ${stud_name}?`)
            if (confirmation){
                fetch(`https://amhep.pythonanywhere.com/grades/${stud_name}`, {
                    method: 'DELETE',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({name: stud_name})
                })
                .then(res => res.json())
                .then(data => console.log(`Student Profile deleted: ${stud_name}`, data))
            }
        }
    }

// THIS DOES WORK. I initially had the wrong path for the fetch statement
    function editStudent(){
        const stud_name = document.getElementById('editName').value.toLowerCase()
        const new_grade = document.getElementById('editGrade').value

        if (stud_name && new_grade){
            fetch(`https://amhep.pythonanywhere.com/grades/${stud_name}`, {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    name: stud_name, 
                    grade: new_grade
                })
            })
            .then(res => res.json())
            .then(data => console.log(`Student Updated: ${stud_name}`, data))
        }
    }

    async function fetchDataAndPopulateTable() {
        try {
          const response = await fetch("https://amhep.pythonanywhere.com/grades");
          const data = await response.json();
      
          const table = document.getElementById("profTable");
          const thead = table.querySelector('thead');
          const tbody = table.querySelector('tbody');

          thead.innerHTML = ''
          tbody.innerHTML = ''
      
          // Create table header row with "Name" and "Grade" columns
          const headerRow = document.createElement('tr');
          const nameTh = document.createElement('th');
          nameTh.textContent = "Name";
          headerRow.appendChild(nameTh);
          const gradeTh = document.createElement('th');
          gradeTh.textContent = "Grade";
          headerRow.appendChild(gradeTh);
          thead.appendChild(headerRow);
      
          // Create table body rows with name and grade values
          for (const key in data) {
            if (key.startsWith("'/&quot;") || key.startsWith("*/")) {
              continue; // Skip keys starting with specific patterns
            }
            const row = document.createElement('tr');
            const nameTd = document.createElement('td');
            nameTd.textContent = key;
            row.appendChild(nameTd);
            const gradeTd = document.createElement('td');
            gradeTd.textContent = data[key];
            row.appendChild(gradeTd);
            tbody.appendChild(row);
          }
        } catch (error) {
          console.error('Error fetching or processing data:', error);
        }
      }

    function viewAll(){
        fetchDataAndPopulateTable()
    }

    async function fetchAndDisplaySpecificNameGrade(name) {
        try {
          const response = await fetch("https://amhep.pythonanywhere.com/grades");
          const data = await response.json();
      
          const table = document.getElementById("studTable");
          const thead = table.querySelector('thead');
          const tbody = table.querySelector('tbody');

          thead.innerHTML = ''
          tbody.innerHTML = ''
      
          // Create table header row
          const headerRow = document.createElement('tr');
          const nameTh = document.createElement('th');
          nameTh.textContent = "Name";
          headerRow.appendChild(nameTh);
          const gradeTh = document.createElement('th');
          gradeTh.textContent = "Grade";
          headerRow.appendChild(gradeTh);
          thead.appendChild(headerRow);
      
          // Find the matching name and create a new row
          for (const key in data) {
            if (key === name || key.toLowerCase() === name || key.toUpperCase() === name) {
              const row = document.createElement('tr');
              const nameTd = document.createElement('td');
              nameTd.textContent = key;
              row.appendChild(nameTd);
              const gradeTd = document.createElement('td');
              gradeTd.textContent = data[key];
              row.appendChild(gradeTd);
              tbody.appendChild(row);
              break; // Exit the loop once a match is found
            }
          }
        } catch (error) {
          console.error('Error fetching or processing data:', error);
        }
      }

      function viewStudent(){
        const nameInput = document.getElementById("viewName");
        const button = document.getElementById("singleTable");

        button.addEventListener("click", () => {
            const name = viewName.value;
            fetchAndDisplaySpecificNameGrade(name);
        });
      }