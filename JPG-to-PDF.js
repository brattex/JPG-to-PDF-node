/*

		Basic nodejs PDF generator using `pdfkit`.

		Takes an input image (JPG) and generates a PDF.

*/

// file system module
const fs = require('fs');

// pdfkit module
const PDFDocument = require('pdfkit');
const JPEG = require('jpeg-js');

// const inputImage = 'test.png';
const inputImage = 'Elon Musk.jpg';
const outputPDF = './JPG-as-PDF-output.pdf';

// Pipe the PDF content to a writable stream (a file in this case)
const outputStream = fs.createWriteStream(outputPDF);

// Create a new PDF document
const doc = new PDFDocument();

// Pipe PDF document to file stream
doc.pipe(outputStream);

// Load PNG image data
const jpegData = fs.readFileSync(inputImage);
const jpeg = new JPEG.decode(jpegData);

// Get image width and height
const imageWidth = jpeg.width;
const imageHeight = jpeg.height;

// Set the PDF size based on the image dimensions
// doc.page.size([imageWidth, imageHeight]);

// Add the JPEG image to the PDF
doc.image(jpegData, 0, 0, { width: imageWidth, height: imageHeight });

// Finalize the PDF document
doc.end();

// Log a message when the PDF is successfully created
outputStream.on('finish', () => {
	console.log('PDF created successfully!');
});

// Handle errors during PDF creation
outputStream.on('error', (err) => {
	console.error('Error creating PDF:', err);
});
