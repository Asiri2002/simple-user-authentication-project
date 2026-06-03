import axios from 'axios';
import React, { useEffect, useState } from 'react';

function SendPdf() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [allPdf, setAllPdf] = useState([]);
  const [PdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getpdf();
  }, []);

  const getpdf = async () => {
    try {
      const result = await axios.get("http://localhost:5000/getFile");
      setAllPdf(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitPdf = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post(
        "http://localhost:5000/uploadfile",
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      if (result.data.status === 200) {
        alert("Upload Successful");
        setTitle("");
        setFile(null);
        getpdf();
      } else {
        alert("Upload Error");
      }
    } catch (error) {
      alert("Error Uploading");
    }
  };

  return (
    <div style={{
      padding: "30px",
      fontFamily: "Arial",
      backgroundColor: "#f4f6f8",
      minHeight: "100vh"
    }}>

      <h1 style={{ textAlign: "center", color: "#333" }}>Send Pdf</h1>

      {/* FORM CARD */}
      <div style={{
        maxWidth: "400px",
        margin: "0 auto",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>

        <form onSubmit={submitPdf}>
          <label style={{ fontWeight: "bold" }}>PDF Title</label><br />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />

          <br /><br />

          <label style={{ fontWeight: "bold" }}>Select PDF File</label><br />
          <input
            type="file"
            accept="application/pdf"
            required
            onChange={(e) => setFile(e.target.files[0])}
            style={{ marginTop: "5px" }}
          />

          <br /><br />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Upload PDF
          </button>
        </form>
      </div>

      {/* PDF LIST */}
      <div style={{ marginTop: "40px" }}>
        <h2 style={{ textAlign: "center" }}>Uploaded PDFs</h2>

        {allPdf.map((pdf, index) => (
          <div key={index} style={{
            background: "#fff",
            margin: "10px auto",
            padding: "15px",
            maxWidth: "500px",
            borderRadius: "8px",
            boxShadow: "0 0 5px rgba(0,0,0,0.1)"
          }}>
            <p style={{ fontWeight: "bold" }}>{pdf.title}</p>

            <button
              onClick={() =>
                setPdfFile(`http://localhost:5000/files/${pdf.pdf}`)
              }
              style={{
                padding: "6px 12px",
                marginRight: "10px",
                backgroundColor: "green",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Preview
            </button>

            <a
              href={`http://localhost:5000/files/${pdf.pdf}`}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "6px 12px",
                backgroundColor: "#6c757d",
                color: "#fff",
                borderRadius: "5px",
                textDecoration: "none"
              }}
            >
              Open
            </a>
          </div>
        ))}
      </div>

      {/* PDF PREVIEW */}
      {PdfFile && (
        <div style={{
          marginTop: "30px",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ textAlign: "center" }}>PDF Preview</h3>
          <iframe
            src={PdfFile}
            title="PDF Viewer"
            width="100%"
            height="500px"
            style={{ border: "none" }}
          />
        </div>
      )}
    </div>
  );
}

export default SendPdf;