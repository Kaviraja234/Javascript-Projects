document.addEventListener('DOMContentLoaded', function() {
    // Initialize students array from local storage or create empty array
    let students = JSON.parse(localStorage.getItem('artStudents')) || [];
    let editMode = false;
    let currentEditId = null;
    
    // DOM elements
    const studentForm = document.getElementById('studentForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const specializationInput = document.getElementById('specialization');
    const portfolioInput = document.getElementById('portfolio');
    const yearInput = document.getElementById('year');
    const enrollmentInput = document.getElementById('enrollment');
    const submitBtn = document.getElementById('submitBtn');
    const activeTable = document.getElementById('activeTable').querySelector('tbody');
    const inactiveTable = document.getElementById('inactiveTable').querySelector('tbody');
    const activeSearch = document.getElementById('activeSearch');
    const inactiveSearch = document.getElementById('inactiveSearch');
    const notification = document.getElementById('notification');
    
    // Display initial data
    displayStudents();
    
    // Form submission handler
    studentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            showNotification('Please fill all required fields correctly', 'error');
            return;
        }
        
        if (editMode) {
            // Update existing student
            updateStudent();
        } else {
            // Add new student
            addStudent();
        }
        
        // Reset form and display updated data
        studentForm.reset();
        submitBtn.textContent = 'Register Student';
        editMode = false;
        currentEditId = null;
        displayStudents();
    });
    
    // Search functionality
    activeSearch.addEventListener('input', function() {
        filterTable(this.value, 'Active');
    });
    
    inactiveSearch.addEventListener('input', function() {
        filterTable(this.value, 'Inactive');
    });
    
    // Function to add a new student
    function addStudent() {
        const newStudent = {
            id: generateId(),
            name: nameInput.value,
            email: emailInput.value,
            specialization: specializationInput.value,
            portfolio: portfolioInput.value,
            year: yearInput.value,
            enrollment: enrollmentInput.value
        };
        
        students.push(newStudent);
        saveStudents();
        showNotification('Student registered successfully', 'success');
    }
    
    // Function to update an existing student
    function updateStudent() {
        const index = students.findIndex(student => student.id === currentEditId);
        
        if (index !== -1) {
            students[index] = {
                id: currentEditId,
                name: nameInput.value,
                email: emailInput.value,
                specialization: specializationInput.value,
                portfolio: portfolioInput.value,
                year: yearInput.value,
                enrollment: enrollmentInput.value
            };
            
            saveStudents();
            showNotification('Student information updated successfully', 'success');
        }
    }
    
    // Function to display students in appropriate tables
    function displayStudents() {
        // Clear existing table content
        activeTable.innerHTML = '';
        inactiveTable.innerHTML = '';
        
        // Display students in respective tables
        students.forEach(student => {
            const row = createStudentRow(student);
            
            if (student.enrollment === 'Active') {
                activeTable.appendChild(row);
            } else {
                inactiveTable.appendChild(row);
            }
        });
    }
    
    // Function to create a table row for a student
    function createStudentRow(student) {
        const row = document.createElement('tr');
        
        // Create portfolio link or display "Not provided"
        let portfolioDisplay = "Not provided";
        if (student.portfolio && student.portfolio.trim() !== '') {
            portfolioDisplay = `<a href="${student.portfolio}" target="_blank" class="portfolio-link">View Portfolio</a>`;
        }
        
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.specialization}</td>
            <td>${student.year}</td>
            <td>${portfolioDisplay}</td>
            <td class="actions">
                <button class="edit-btn" data-id="${student.id}">Edit</button>
                <button class="delete-btn" data-id="${student.id}">Delete</button>
            </td>
        `;
        
        // Add event listeners for edit and delete buttons
        row.querySelector('.edit-btn').addEventListener('click', function() {
            editStudent(student.id);
        });
        
        row.querySelector('.delete-btn').addEventListener('click', function() {
            deleteStudent(student.id);
        });
        
        return row;
    }
    
    // Function to edit a student
    function editStudent(id) {
        const student = students.find(student => student.id === id);
        
        if (student) {
            // Fill form with student data
            nameInput.value = student.name;
            emailInput.value = student.email;
            specializationInput.value = student.specialization;
            portfolioInput.value = student.portfolio || '';
            yearInput.value = student.year;
            enrollmentInput.value = student.enrollment;
            
            // Switch to edit mode
            editMode = true;
            currentEditId = id;
            submitBtn.textContent = 'Update Student';
            
            // Scroll to form
            studentForm.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Function to delete a student
    function deleteStudent(id) {
        if (confirm('Are you sure you want to remove this student from the registry?')) {
            students = students.filter(student => student.id !== id);
            saveStudents();
            displayStudents();
            showNotification('Student removed successfully', 'success');
        }
    }
    
    // Function to filter tables by search term
    function filterTable(searchTerm, status) {
        searchTerm = searchTerm.toLowerCase();
        
        const filteredStudents = students.filter(student => 
            (student.enrollment === status || 
             (status === 'Inactive' && student.enrollment !== 'Active')) && 
            (student.name.toLowerCase().includes(searchTerm) || 
             student.specialization.toLowerCase().includes(searchTerm) ||
             student.year.toLowerCase().includes(searchTerm))
        );
        
        // Clear appropriate table
        const tableBody = status === 'Active' ? activeTable : inactiveTable;
        tableBody.innerHTML = '';
        
        // Display filtered students
        filteredStudents.forEach(student => {
            const row = createStudentRow(student);
            tableBody.appendChild(row);
        });
    }
    
    // Function to save students to local storage
    function saveStudents() {
        localStorage.setItem('artStudents', JSON.stringify(students));
    }
    
    // Function to generate a unique ID
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
    
    // Function to validate the form
    function validateForm() {
        if (!nameInput.value.trim() || 
            !emailInput.value.trim() || 
            !specializationInput.value.trim() || 
            !yearInput.value.trim()) {
            return false;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            return false;
        }
        
        // Validate URL format if provided
        if (portfolioInput.value.trim() !== '') {
            try {
                new URL(portfolioInput.value);
            } catch (e) {
                return false;
            }
        }
        
        return true;
    }
    
    // Function to show notification
    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
    
    // Add some sample data if no students exist
    if (students.length === 0) {
        students = [
            {
                id: generateId(),
                name: 'Karthick',
                email: 'Karthick@artscollege.edu',
                specialization: ' UI/UX Designer',
                portfolio: 'https://emoretti-portfolio.com',
                year: '1st Year',
                enrollment: 'Active'
            },
            {
                id: generateId(),
                name: 'George',
                email: 'George@artscollege.edu',
                specialization: 'Front End Developer',
                portfolio: 'https://jreyes-arts.net',
                year: '6 Month',
                enrollment: 'Active'
            },
            {
                id: generateId(),
                name: 'Raja',
                email: 'Raja@artscollege.edu',
                specialization: 'Back End Developer',
                portfolio: 'https://amaradigital.com',
                year: '2nd Year',
                enrollment: 'Active'
            },
            {
                id: generateId(),
                name: 'Riyas',
                email: 'Riyas@artscollege.edu',
                specialization: 'Data Analyst',
                portfolio: 'https://tleevisuals.com',
                year: '3rd Year',
                enrollment: 'Certification'
            },
            {
                id: generateId(),
                name: 'Sofia',
                email: 'sofia@artscollege.edu',
                specialization: 'Digital Marketing',
                portfolio: 'https://sofiachen.art',
                year: '1rd Year',
                enrollment: 'On Leave'
            }
        ];
        saveStudents();
        displayStudents();
    }
});
