const eventsData = {
    '2024-01-15': [
        { title: 'Team Meeting', time: '10:00 AM' },
        { title: 'Project Deadline', time: '3:00 PM' }
    ],
    '2024-01-17': [
        { title: 'Client Call', time: '11:00 AM' }
    ]
};

class WeekCalendar {
    constructor(containerId, callback) {
        this.container = document.getElementById(containerId);
        this.callback = callback;
        this.currentDate = new Date();
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        const { startOfWeek, weekDates } = this.getWeekDates(this.currentDate);
        
        this.createHeader(startOfWeek);
        this.createWeekView(weekDates);
    }

    getWeekDates(date) {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        const startOfWeek = new Date(date.setDate(diff));
        
        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(startOfWeek);
            d.setDate(d.getDate() + i);
            weekDates.push(d);
        }
        
        return { startOfWeek, weekDates };
    }

    createHeader(startDate) {
        const header = document.createElement('div');
        header.className = 'calendar-header';
        
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '← Previous';
        prevBtn.addEventListener('click', () => {
            this.currentDate.setDate(this.currentDate.getDate() - 7);
            this.render();
        });
        
        const title = document.createElement('div');
        title.textContent = `${this.formatDate(startDate)} - ${this.formatDate(new Date(startDate.getTime() + 6*24*60*60*1000))}`;
        
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next →';
        nextBtn.addEventListener('click', () => {
            this.currentDate.setDate(this.currentDate.getDate() + 7);
            this.render();
        });
        
        header.appendChild(prevBtn);
        header.appendChild(title);
        header.appendChild(nextBtn);
        this.container.appendChild(header);
    }

    createWeekView(weekDates) {
        const weekContainer = document.createElement('div');
        weekContainer.className = 'calendar-week';
        
        weekDates.forEach(date => {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day';
            
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';
            dayHeader.textContent = `${this.getDayName(date)}, ${this.formatDate(date)}`;
            
            const eventsContainer = document.createElement('div');
            
            const events = eventsData[this.formatDate(date)] || [];
            if (events.length === 0) {
                const emptySlot = document.createElement('div');
                emptySlot.className = 'event-slot empty';
                emptySlot.textContent = 'No events';
                eventsContainer.appendChild(emptySlot);
            } else {
                events.forEach(event => {
                    const eventDiv = document.createElement('div');
                    eventDiv.className = 'event-slot';
                    eventDiv.textContent = `${event.time} - ${event.title}`;
                    eventsContainer.appendChild(eventDiv);
                });
            }
            
            dayDiv.appendChild(dayHeader);
            dayDiv.appendChild(eventsContainer);
            dayDiv.addEventListener('click', () => this.callback(date, events));
            
            weekContainer.appendChild(dayDiv);
        });
        
        this.container.appendChild(weekContainer);
    }

    formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    getDayName(date) {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return days[date.getDay() === 0 ? 6 : date.getDay() - 1];
    }
}

// Callback function example
function handleDayClick(date, events) {
    alert(`Selected date: ${date.toDateString()}\nEvents: ${JSON.stringify(events)}`);
}

// Initialize calendar
const calendar = new WeekCalendar('calendar', handleDayClick);