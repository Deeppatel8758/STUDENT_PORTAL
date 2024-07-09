const fs = require("fs");
const path = require("path");
const Docxtemplater = require("docxtemplater");
const pizZip = require("pizzip");
const mammoth = require("mammoth");
const puppeteer = require('puppeteer');
const { PDFDocument, rgb } = require('pdf-lib');
const studentQueries = require("../Queries/StudentQueries")
const ImageModule = require('docxtemplater-image-module');
async function createPDF(htmlTemplatePath, data, outputPdfPath) {

  let htmlContent = fs.readFileSync(htmlTemplatePath, 'utf8');
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      htmlContent = htmlContent.replace(regex, data[key]);
    }
  }

  // Launch Puppeteer in headful mode with increased timeout
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setContent(htmlContent);


  const pdfBuffer = await page.pdf({ path: outputPdfPath, format: 'A4' });
  await browser.close();

  console.log('PDF file has been saved!');
  return pdfBuffer;
}

// Function to convert HTML to PDF
async function convertHTMLToPDF(html) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const pdfBuffer = await page.pdf({
    format: 'Letter',
    printBackground: true,
  });
  await browser.close();
  return pdfBuffer;
}





const generate = async (filename, values, res) => {

  // // Convert your image to base64
  const newdata = (await studentQueries.getAllCertificateRequests(values.enrollment)).rows[0].dataValues.certificateid;

  

  console.log(newdata)
  console.log(values)
 const  profile = path.join(__dirname, `../uploads/${values.profileUrl}`);

 console.log(profile)
 const signature =path.join(__dirname, `../uploads/${values.signatireUrl}`)
  console.log(values.profileUrl);
  data = {
    enrollment: values.enrollment,
    name: values.firstName + " " + values.lastName,
    residentalAddress: values.residentalAddress,
    permanentAddress1: values.permanentAddress1,
    contactNumber: values.contactNumber,
    branch: values.branch,
    profile: `data:image/jpg;base64,${fs.readFileSync(profile, { encoding: 'base64' })}`,
    signature: `data:image/jpg;base64,${fs.readFileSync(signature, { encoding: 'base64' })}`,
    Id: newdata,
  }
  const indexPath = path.join(__dirname, '../uploads/certificateFormat/bonafide_certificate.html');
  const pdfBuffer = createPDF(indexPath, data, 'output.pdf');
  return pdfBuffer;
};



const generate1 = async (filename, values, enrollment, requestId) => {
  console.log("generate function called");
  console.log(values);
  const filesFolderPath = path.join(__dirname, "../uploads/certificateFormat/");
  const filePath = path.join(filesFolderPath, filename);
  const content = fs.readFileSync(
    filePath, "binary"
  );

  // console.log(content);
  const zip = new pizZip(content);

  const doc = new Docxtemplater(zip);
  console.log("doc created");
  doc.setData(values);
  console.log("data set");

  try {
    doc.render();
  } catch (error) {
    const e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties,
    };
    console.log(JSON.stringify({ error: e }));
    throw error;
  }
  console.log("doc rendered");
  const publicFolder = path.join(__dirname, "../public")
  const filePaths = path.join(publicFolder, `${enrollment}-${requestId}.docx`);

  const buf = doc.getZip().generate({ type: "nodebuffer" });
  console.log("buf generated");
  fs.writeFile(filePaths, buf, (err) => {
    console.log(err)
  })
  return buf


  //  console.log(output)
  // fs.writeFileSync("./write.pdf",output.data)
  //  return output  


};

module.exports = { generate, generate1 };
