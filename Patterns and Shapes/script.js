// Right Angled Triangle
function generateRightAngledTriangle() {
    const rows = document.getElementById('rightAngleInput').value;
    let output = '';
    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= i; j++) {
        output += j + ' ';
      }
      output += '\n';
    }
    document.getElementById('rightAngleOutput').textContent = output;
  }

  // Inverted Right Angled Triangle
  function generateInvertedRightAngledTriangle() {
    const rows = document.getElementById('invertedRightAngleInput').value;
    let output = '';
    for (let i = rows; i >= 1; i--) {
      for (let j = 1; j <= i; j++) {
        output += j + ' ';
      }
      output += '\n';
    }
    document.getElementById('invertedRightAngleOutput').textContent = output;
  }

  // Pyramid Triangle
  function generatePyramidTriangle() {
    const rows = document.getElementById('pyramidInput').value;
    let output = '';
    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= rows - i; j++) {
        output += '  ';
      }
      for (let k = 1; k <= 2 * i - 1; k++) {
        output += k + ' ';
      }
      output += '\n';
    }
    document.getElementById('pyramidOutput').textContent = output;
  }

  // Diamond Triangle
  function generateDiamondTriangle() {
    const rows = document.getElementById('diamondInput').value;
    let output = '';

    // Upper part
    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= rows - i; j++) {
        output += '  ';
      }
      for (let k = 1; k <= 2 * i - 1; k++) {
        output += k + ' ';
      }
      output += '\n';
    }

    // Lower part
    for (let i = rows - 1; i >= 1; i--) {
      for (let j = 1; j <= rows - i; j++) {
        output += '  ';
      }
      for (let k = 1; k <= 2 * i - 1; k++) {
        output += k + ' ';
      }
      output += '\n';
    }

    document.getElementById('diamondOutput').textContent = output;
  }

  // Pascal's Triangle
  function generatePascalsTriangle() {
    const rows = document.getElementById('pascalInput').value;
    let output = '';
    for (let i = 0; i < rows; i++) {
      let row = '';
      let value = 1;
      for (let j = 0; j <= i; j++) {
        row += value + ' ';
        value = (value * (i - j)) / (j + 1);
      }
      output += row.trim() + '\n';
    }
    document.getElementById('pascalOutput').textContent = output;
  }

  // Floyd's Triangle
  function generateFloydsTriangle() {
    const rows = document.getElementById('floydInput').value;
    let output = '';
    let num = 1;
    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= i; j++) {
        output += num + ' ';
        num++;
      }
      output += '\n';
    }
    document.getElementById('floydOutput').textContent = output;
  }

  // Equilateral Triangle
  function generateEquilateralTriangle() {
    const rows = document.getElementById('equilateralInput').value;
    let output = '';
    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= rows - i; j++) {
        output += '  ';
      }
      for (let k = 1; k <= i; k++) {
        output += k + ' ';
      }
      for (let l = i - 1; l >= 1; l--) {
        output += l + ' ';
      }
      output += '\n';
    }
    document.getElementById('equilateralOutput').textContent = output;
  }