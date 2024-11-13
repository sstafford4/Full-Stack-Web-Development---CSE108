// ctrl + shift + J to open the dev view on Chrome
console.log("If you can see this in the console, then the file is hooked up correctly!")
//--------------------------------------------------------
// this is the Fetch API.

const apiUrl = 'http://localhost:5000'
fetch(`${apiUrl}/students`)
    //.then(res => console.log(res)) // logging the response object to make sure that its connected to the api correctly
    .then(res => res.json()) // returning the information in JSON
    .then(data => console.log(data)) // logging the data that is now in JSON
    .catch(error => console.log("Something went wrong!", error)) // catching an error in the event we fetch the wrong thing


    // for Lab 6: changed both FetchDataAndPopulateTable() functions to work with the REST API i built. 
    // other functions did not need changing outside of the DB url route. 
    // Lab 6: COMPLETE
    function addStudent(){
        const stud_name = document.getElementById('addName').value.toLowerCase()
        const stud_grade = document.getElementById('addGrade').value
        if (stud_name && stud_grade){
            fetch(`${apiUrl}/students`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    name: stud_name, 
                    grade: stud_grade
                })
            })
            .then(res => res.json())
            .then(data => console.log(`Student Added: ${stud_name}`, data))
            fetchAllStudents()
        }
    }

// OK THIS FUNCTION NOW DELETES NAMES FROM THE API! FUNCTIONS CORRECTLY!
    function deleteStudent(){
        const stud_name = document.getElementById('delName').value.toLowerCase()
        if (stud_name){
            const confirmation = confirm(`Are you sure you want to delete user ${stud_name}?`)
            if (confirmation){
                fetch(`${apiUrl}/students/${stud_name}`, {
                    method: 'DELETE',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({name: stud_name})
                })
                .then(res => res.json())
                .then(data => console.log(`Student Profile deleted: ${stud_name}`, data))
                fetchAllStudents()
            }
        }
    }

// THIS DOES WORK. I initially had the wrong path for the fetch statement
    function editStudent(){
        const stud_name = document.getElementById('editName').value.toLowerCase()
        const new_grade = document.getElementById('editGrade').value

        if (stud_name && new_grade){
            fetch(`${apiUrl}/students/${stud_name}`, {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    name: stud_name, 
                    grade: new_grade
                })
            })
            .then(res => res.json())
            .then(data => console.log(`Student Updated: ${stud_name}`, data))
            fetchAllStudents()
        }
    }
    async function fetchDataAndPopulateTable() {
      try {
          const response = await fetch(`${apiUrl}/students`);
          const data = await response.json();
  
          const table = document.getElementById("profTable");
          const thead = table.querySelector('thead');
          const tbody = table.querySelector('tbody');
  
          thead.innerHTML = '';
          tbody.innerHTML = '';
  
          // Create table header row with "Name" and "Grade" columns
          const headerRow = document.createElement('tr');
          const nameTh = document.createElement('th');
          nameTh.textContent = "Name";
          headerRow.appendChild(nameTh);
          const gradeTh = document.createElement('th');
          gradeTh.textContent = "Grade";
          headerRow.appendChild(gradeTh);
          thead.appendChild(headerRow);
  
          // Loop through each student object and add rows to the table
          data.forEach(student => {
              const row = document.createElement('tr');
              const nameTd = document.createElement('td');
              const gradeTd = document.createElement('td');
  
              // Access 'name' and 'grade' correctly
              nameTd.textContent = student.name;  // student's name
              gradeTd.textContent = student.grade;  // student's grade
  
              row.appendChild(nameTd);
              row.appendChild(gradeTd);
              tbody.appendChild(row);
          });
      } catch (error) {
          console.error('Error fetching or processing data:', error);
      }
    }

    function viewAll(){
        fetchDataAndPopulateTable()
    }

    async function fetchAndDisplaySpecificNameGrade(name) {
      try {
          const response = await fetch(`${apiUrl}/students`);
          const data = await response.json();
  
          const table = document.getElementById("studTable");
          const thead = table.querySelector('thead');
          const tbody = table.querySelector('tbody');
  
          thead.innerHTML = '';
          tbody.innerHTML = '';
  
          // Create table header row
          const headerRow = document.createElement('tr');
          const nameTh = document.createElement('th');
          nameTh.textContent = "Name";
          headerRow.appendChild(nameTh);
          const gradeTh = document.createElement('th');
          gradeTh.textContent = "Grade";
          headerRow.appendChild(gradeTh);
          thead.appendChild(headerRow);
  
          // Find the matching student by name and display
          data.forEach(student => {
              if (student.name.toLowerCase() === name.toLowerCase()) {
                  const row = document.createElement('tr');
                  const nameTd = document.createElement('td');
                  const gradeTd = document.createElement('td');
  
                  nameTd.textContent = student.name;
                  gradeTd.textContent = student.grade;
  
                  row.appendChild(nameTd);
                  row.appendChild(gradeTd);
                  tbody.appendChild(row);
              }
          });
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

      function fetchAllStudents(){
        fetch(`${apiUrl}/students`)
        .then(res => res.json())
        .then(data => console.log('Updated Student List:', data))
        .catch(error => console.log("Something went wrong while fetching students!", error));
    }