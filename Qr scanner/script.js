let qrContentInput = document.getElementById("qr-content");
let qrGenerationForm = 
document.getElementById("qr-generation-form");
let qrCode;

function generateQrCode(qrContent) {
  return new QRCode("qr-code", {
    text: qrContent,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}

document.getElementById('qr-generation-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting

  const qrContent = document.getElementById('qr-content').value;
  const fileInput = document.getElementById('file-input');
  const qrCodeDiv = document.getElementById('qr-code');

  // Clear any previously generated QR code
  qrCodeDiv.innerHTML = '';

  // Check if a file is uploaded
  if (fileInput.files.length > 0) {
      const file = fileInput.files[0];

      // Create a URL for the uploaded file
      const fileURL = URL.createObjectURL(file);

      // Generate QR code for the file URL
      new QRCode(qrCodeDiv, {
          text: fileURL,
          width: 256,
          height: 256,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
      });
  // } else if (qrContent) {
  //     // Generate QR code for the text content
  //     new QRCode(qrCodeDiv, {
  //         text: qrContent,
  //         width: 256,
  //         height: 256,
  //         colorDark: "#000000",
  //         colorLight: "#ffffff",
  //         correctLevel: QRCode.CorrectLevel.H
  //     });
  // } else {
      alert('Please enter some content or upload a file to generate the QR code.');
  }
});

// Event listener for form submit event
qrGenerationForm.addEventListener("submit", function (event) {
  // Prevent form submission
  event.preventDefault();
  let qrContent = qrContentInput.value;
  if (qrCode == null) {
      
    // Generate code initially
    qrCode = generateQrCode(qrContent);
  } else {
      
    // If code already generated then make 
    // again using same object
    qrCode.makeCode(qrContent);
  }
});