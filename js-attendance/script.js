// Initialize arrays to store student data and attendance
var students = [];
var attendance = [];

// Get today's date and display it
var today = new Date();
var formattedDate = today.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
});
document.getElementById('date-value').textContent = formattedDate;

// Sample data for demonstration
function loadSampleData() {
    // Sample students
    students = [
        { id: "S001", name: "John" },
        { id: "S002", name: "Emma" },
        { id: "S003", name: "Darsha" },
        { id: "S004", name: "Priya" },
        { id: "S005", name: "Ranjini" },
        { id: "S006", name: "Abdul" },
        { id: "S007", name: "Raju" },
        { id: "S008", name: "Gokul" },
        { id: "S009", name: "Karthick" },
        { id: "S010", name: "Ranjith" }
      
    ];
    
    // Initialize attendance (all absent by default)
    attendance = [];
    for (var i = 0; i < students.length; i++) {
        attendance[i] = false; // false means absent
    }
    
    // Display the data
    updateAttendanceDisplay();
}

// Add a new student
function addNewStudent() {
    var idInput = document.getElementById('student-id');
    var nameInput = document.getElementById('student-name');
    
    var id = idInput.value.trim();
    var name = nameInput.value.trim();
    
    // Validate inputs
    if (id === "" || name === "") {
        alert("Please enter both ID and name");
        return;
    }
    
    // Check for duplicate ID
    for (var i = 0; i < students.length; i++) {
        if (students[i].id === id) {
            alert("A student with this ID already exists");
            return;
        }
    }
    
    // Add to arrays
    students.push({ id: id, name: name });
    attendance.push(false); // new student is absent by default
    
    // Clear form
    idInput.value = "";
    nameInput.value = "";
    
    // Update display
    updateAttendanceDisplay();
}

// Toggle attendance status
function toggleAttendance(index) {
    attendance[index] = !attendance[index];
    updateAttendanceDisplay();
}

// Update the attendance display
function updateAttendanceDisplay() {
    var attendanceList = document.getElementById('attendance-list');
    attendanceList.innerHTML = "";
    
    // Display each student and their attendance
    for (var i = 0; i < students.length; i++) {
        var row = document.createElement('tr');
        
        var idCell = document.createElement('td');
        idCell.textContent = students[i].id;
        
        var nameCell = document.createElement('td');
        nameCell.textContent = students[i].name;
        
        var statusCell = document.createElement('td');
        statusCell.textContent = attendance[i] ? "Present" : "Absent";
        statusCell.className = attendance[i] ? "present" : "absent";
        
        var actionCell = document.createElement('td');
        var toggleButton = document.createElement('button');
        toggleButton.textContent = attendance[i] ? "Mark Absent" : "Mark Present";
        
        // Use a closure to preserve the correct index
        (function(index) {
            toggleButton.onclick = function() {
                toggleAttendance(index);
            };
        })(i);
        
        actionCell.appendChild(toggleButton);
        
        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(statusCell);
        row.appendChild(actionCell);
        
        attendanceList.appendChild(row);
    }
    
    updateStatistics();
}

// Update statistics
function updateStatistics() {
    var totalStudents = students.length;
    var presentCount = 0;
    
    for (var i = 0; i < attendance.length; i++) {
        if (attendance[i] === true) {
            presentCount++;
        }
    }
    
    var absentCount = totalStudents - presentCount;
    var attendanceRate = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;
    
    document.getElementById('total-students').textContent = totalStudents;
    document.getElementById('present-count').textContent = presentCount;
    document.getElementById('absent-count').textContent = absentCount;
    document.getElementById('attendance-rate').textContent = attendanceRate + '%';
}

// Export attendance data as CSV
function exportData() {
    var csvContent = "data:text/csv;charset=utf-8,";
    
    // Add headers
    csvContent += "Date,Student ID,Student Name,Status\n";
    
    // Add rows
    for (var i = 0; i < students.length; i++) {
        var status = attendance[i] ? "Present" : "Absent";
        csvContent += formattedDate + "," + students[i].id + "," + 
                      students[i].name + "," + status + "\n";
    }
    
    // Create download link
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance_" + today.toISOString().split('T')[0] + ".csv");
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Remove link
    document.body.removeChild(link);
}

// Load sample data when the page loads
window.onload = loadSampleData;
    

