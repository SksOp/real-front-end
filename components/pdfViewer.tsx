"use client";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { version as pdfjsVersion } from "pdfjs-dist";

// Set the workerSrc using the local worker from pdfjs-dist
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;

type PDFViewerProps = {
  fileUrl: string;
};

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState<number>(5);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "downloaded.pdf";
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md border rounded-lg shadow-lg">
        <Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={downloadPDF}
      >
        Download PDF
      </button>
    </div>
  );
};

export default PDFViewer;
