document.addEventListener('DOMContentLoaded', () => {
    const courses = [];
    let currentEditIndex = null;

    // Form Submission
    document.getElementById('courseForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const studentId = document.getElementById('studentId').value.trim();
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const courseId = document.getElementById('courseId').value.trim();
        const courseName = document.getElementById('courseName').value.trim();
        const department = document.getElementById('department').value;
        const semester = document.getElementById('semester').value;
        const credits = document.getElementById('credits').value;
        const notes = document.getElementById('notes').value.trim();

        // Validation
        let isValid = true;
        
        // Student ID validation
        if (!studentId) {
            showError('studentIdError', 'Student ID is required');
            isValid = false;
        } else {
            hideError('studentIdError');
        }

        // Full Name validation
        if (!fullName) {
            showError('fullNameError', 'Full Name is required');
            isValid = false;
        } else {
            hideError('fullNameError');
        }

        // Email validation
        if (!email) {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            showError('emailError', 'Invalid email format');
            isValid = false;
        } else {
            hideError('emailError');
        }

        // Phone validation
        if (!phone) {
            showError('phoneError', 'Phone number is required');
            isValid = false;
        } else if (!/^\d{10}$/.test(phone)) {
            showError('phoneError', 'Invalid phone number (10 digits)');
            isValid = false;
        } else {
            hideError('phoneError');
        }

        // Course ID validation
        if (!courseId) {
            showError('courseIdError', 'Course ID is required');
            isValid = false;
        } else {
            hideError('courseIdError');
        }

        // Course Name validation
        if (!courseName) {
            showError('courseNameError', 'Course Name is required');
            isValid = false;
        } else {
            hideError('courseNameError');
        }

        // Department validation
        if (!department) {
            showError('departmentError', 'Please select a department');
            isValid = false;
        } else {
            hideError('departmentError');
        }

        // Semester validation
        if (!semester) {
            showError('semesterError', 'Please select a semester');
            isValid = false;
        } else {
            hideError('semesterError');
        }

        // Credits validation
        if (!credits) {
            showError('creditsError', 'Please select credits');
            isValid = false;
        } else {
            hideError('creditsError');
        }

        if (!isValid) return;

        // Create course object
        const course = {
            id: currentEditIndex !== null ? courses[currentEditIndex].id : Date.now(),
            studentId,
            fullName,
            email,
            phone,
            courseId,
            courseName,
            department,
            semester,
            credits,
            notes
        };

        // Update or add course
        if (currentEditIndex !== null) {
            courses[currentEditIndex] = course;
            currentEditIndex = null;
            document.getElementById('submitBtn').textContent = 'Register Course';
        } else {
            courses.push(course);
        }

        // Show success message
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);

        // Reset form and update table
        document.getElementById('courseForm').reset();
        document.querySelectorAll('.error').forEach(el => el.style.display = 'none');
        renderTable(courses);
    });

    // Reset button
    document.getElementById('resetBtn').addEventListener('click', () => {
        document.getElementById('courseForm').reset();
        document.querySelectorAll('.error').forEach(el => el.style.display = 'none');
        currentEditIndex = null;
        document.getElementById('submitBtn').textContent = 'Register Course';
    });

    // Render table
    function renderTable(data) {
        const tbody = document.getElementById('tableBody');
        tbody.innerHTML = '';

        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="10" class="no-data">No registrations yet. Fill out the form to register.</td></tr>';
            return;
        }

        data.forEach((course, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${course.studentId}</td>
                <td>${course.fullName}</td>
                <td>${course.email}</td>
                <td>${course.phone}</td>
                <td>${course.courseId}</td>
                <td>${course.courseName}</td>
                <td>${course.department}</td>
                <td>${course.semester}</td>
                <td>${course.credits}</td>
                <td class="actions">
                    <button class="edit-btn" onclick="editCourse(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteCourse(${index})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Edit course
    window.editCourse = (index) => {
        const course = courses[index];
        currentEditIndex = index;
        
        document.getElementById('studentId').value = course.studentId;
        document.getElementById('fullName').value = course.fullName;
        document.getElementById('email').value = course.email;
        document.getElementById('phone').value = course.phone;
        document.getElementById('courseId').value = course.courseId;
        document.getElementById('courseName').value = course.courseName;
        document.getElementById('department').value = course.department;
        document.getElementById('semester').value = course.semester;
        document.getElementById('credits').value = course.credits;
        document.getElementById('notes').value = course.notes;
        
        document.getElementById('submitBtn').textContent = 'Update Registration';
        
        // Scroll to form
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    };

    // Delete course
    window.deleteCourse = (index) => {
        if (confirm('Are you sure you want to delete this registration?')) {
            courses.splice(index, 1);
            renderTable(courses);
        }
    };

    // Error handling
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function hideError(elementId) {
        document.getElementById(elementId).style.display = 'none';
    }
});

