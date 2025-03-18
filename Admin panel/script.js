let cars = JSON.parse(localStorage.getItem('cars')) || [];
let currentPage = 1;
const carsPerPage = 5;
let currentSort = { column: 'id', direction: 'asc' };

document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    populateYearFilter();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('search').addEventListener('input', renderTable);
    document.getElementById('yearFilter').addEventListener('change', renderTable);
    document.getElementById('priceFilter').addEventListener('input', renderTable);
}

function populateYearFilter() {
    const yearFilter = document.getElementById('yearFilter');
    const years = [...new Set(cars.map(car => car.year))].sort();
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
}

function renderTable() {
    const tableBody = document.getElementById('carsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    
    let filteredCars = applyFilters(cars);
    filteredCars = sortCars(filteredCars);
    const paginatedCars = paginate(filteredCars);
    
    paginatedCars.forEach(car => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${car.image || 'placeholder.jpg'}" class="img-thumbnail"></td>
            <td>${car.model}</td>
            <td>${car.brand}</td>
            <td>${car.year}</td>
            <td>$${car.price.toLocaleString()}</td>
            <td>${car.color}</td>
            <td>
                <button class="btn btn-sm btn-warning me-2" onclick="editCar(${car.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteCar(${car.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    renderPagination(filteredCars.length);
}

function applyFilters(cars) {
    const search = document.getElementById('search').value.toLowerCase();
    const yearFilter = document.getElementById('yearFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    
    return cars.filter(car => {
        return (
            car.model.toLowerCase().includes(search) ||
            car.brand.toLowerCase().includes(search) ||
            car.description.toLowerCase().includes(search)
        ) && 
        (yearFilter === '' || car.year == yearFilter) &&
        (priceFilter === '' || car.price <= priceFilter);
    });
}

function sortCars(cars) {
    return cars.sort((a, b) => {
        let modifier = 1;
        if(currentSort.direction === 'desc') modifier = -1;
        
        if(a[currentSort.column] < b[currentSort.column]) return -1 * modifier;
        if(a[currentSort.column] > b[currentSort.column]) return 1 * modifier;
        return 0;
    });
}

function sortTable(column) {
    if(currentSort.column === column) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.column = column;
        currentSort.direction = 'asc';
    }
    renderTable();
}

function paginate(cars) {
    const startIndex = (currentPage - 1) * carsPerPage;
    return cars.slice(startIndex, startIndex + carsPerPage);
}

function renderPagination(total) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    
    const pageCount = Math.ceil(total / carsPerPage);
    
    for(let i = 1; i <= pageCount; i++) {
        const btn = document.createElement('button');
        btn.className = `btn ${i === currentPage ? 'btn-primary' : 'btn-light'} mx-1`;
        btn.textContent = i;
        btn.addEventListener('click', () => {
            currentPage = i;
            renderTable();
        });
        pagination.appendChild(btn);
    }
}

function submitForm() {
    const car = {
        id: document.getElementById('carId').value || Date.now(),
        model: document.getElementById('model').value,
        brand: document.getElementById('brand').value,
        year: document.getElementById('year').value,
        price: document.getElementById('price').value,
        color: document.getElementById('color').value,
        description: document.getElementById('description').value,
        image: document.getElementById('image').files[0] 
            ? URL.createObjectURL(document.getElementById('image').files[0])
            : null
    };

    if(document.getElementById('carId').value) {
        const index = cars.findIndex(c => c.id == car.id);
        cars[index] = car;
    } else {
        cars.push(car);
    }

    localStorage.setItem('cars', JSON.stringify(cars));
    renderTable();
    bootstrap.Modal.getInstance(document.getElementById('addCarModal')).hide();
}

function editCar(id) {
    const car = cars.find(c => c.id == id);
    document.getElementById('carId').value = car.id;
    document.getElementById('model').value = car.model;
    document.getElementById('brand').value = car.brand;
    document.getElementById('year').value = car.year;
    document.getElementById('price').value = car.price;
    document.getElementById('color').value = car.color;
    document.getElementById('description').value = car.description;
    
    const modal = new bootstrap.Modal(document.getElementById('addCarModal'));
    modal.show();
}

function deleteCar(id) {
    if(confirm('Are you sure?')) {
        cars = cars.filter(c => c.id != id);
        localStorage.setItem('cars', JSON.stringify(cars));
        renderTable();
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}