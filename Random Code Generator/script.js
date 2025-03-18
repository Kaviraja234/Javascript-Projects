function generateCode() {
    const components = [generateButton, generateCard, generateNavbar];
    const randomComponent = components[Math.floor(Math.random() * components.length)];
    
    const { html, css, js } = randomComponent();
    
    document.getElementById('htmlCode').textContent = html;
    document.getElementById('cssCode').textContent = css;
    document.getElementById('jsCode').textContent = js;
}

function generateButton() {
    const bgColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    const textColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    const padding = `${Math.floor(Math.random() * 15 + 10)}px ${Math.floor(Math.random() * 30 + 20)}px`;
    const borderRadius = `${Math.floor(Math.random() * 20 + 5)}px`;
    
    return {
        html: `<button class="rnd-btn">Click Me!</button>`,
        css: `.rnd-btn {\n  background: ${bgColor};\n  color: ${textColor};\n  padding: ${padding};\n  border: none;\n  border-radius: ${borderRadius};\n  cursor: pointer;\n  font-size: 16px;\n  transition: all 0.3s ease;\n}\n\n.rnd-btn:hover {\n  transform: scale(1.05);\n  box-shadow: 0 0 10px rgba(0,0,0,0.2);\n}`,
        js: `document.querySelector('.rnd-btn').addEventListener('click', () => {\n  alert('Button clicked!');\n});`
    };
}

function generateCard() {
    const cardBg = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    const titleColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    const contentColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    
    return {
        html: `<div class="rnd-card">\n  <h3>Card Title</h3>\n  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>\n  <button>Learn More</button>\n</div>`,
        css: `.rnd-card {\n  background: ${cardBg};\n  padding: 20px;\n  border-radius: 10px;\n  box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n  max-width: 300px;\n}\n\n.rnd-card h3 {\n  color: ${titleColor};\n  margin-bottom: 10px;\n}\n\n.rnd-card p {\n  color: ${contentColor};\n  margin: 10px 0;\n}\n\n.rnd-card button {\n  background: #4CAF50;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 5px;\n  cursor: pointer;\n}`,
        js: `document.querySelector('.rnd-card button').addEventListener('click', () => {\n  alert('Card button clicked!');\n});`
    };
}

function generateNavbar() {
    const navBg = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    const linkColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    
    return {
        html: `<nav class="rnd-nav">\n  <div class="logo">Logo</div>\n  <ul class="nav-links">\n    <li><a href="#">Home</a></li>\n    <li><a href="#">About</a></li>\n    <li><a href="#">Contact</a></li>\n  </ul>\n  <button class="mobile-menu">☰</button>\n</nav>`,
        css: `.rnd-nav {\n  background: ${navBg};\n  padding: 10px 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.nav-links {\n  list-style: none;\n  display: flex;\n  gap: 20px;\n}\n\n.nav-links a {\n  color: ${linkColor};\n  text-decoration: none;\n  font-weight: bold;\n}\n\n.mobile-menu {\n  display: none;\n  background: none;\n  border: none;\n  color: ${linkColor};\n  font-size: 24px;\n  cursor: pointer;\n}\n\n@media (max-width: 768px) {\n  .nav-links {\n    display: none;\n    flex-direction: column;\n    position: absolute;\n    top: 60px;\n    left: 0;\n    width: 100%;\n    background: ${navBg};\n  }\n  \n  .nav-links.active {\n    display: flex;\n  }\n  \n  .mobile-menu {\n    display: block;\n  }\n}`,
        js: `document.querySelector('.mobile-menu').addEventListener('click', () => {\n  document.querySelector('.nav-links').classList.toggle('active');\n});`
    };
}

function copyCode(type) {
    const codeElement = document.getElementById(`${type}Code`);
    const textArea = document.createElement('textarea');
    textArea.value = codeElement.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert(`${type.toUpperCase()} code copied to clipboard!`);
}