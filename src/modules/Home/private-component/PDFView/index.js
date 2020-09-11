import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { exportPDF } from '../../reducer'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
function PDFView(props) {
  const [numPages, setNumPages] = useState(null);
  const [base64, setBase64] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const {exportPDF} = props
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  useEffect(()=>{
    exportPDF(props.match && props.match.params && props.match.params.id, setBase64)
  }, [])
  useEffect(() => {
    if(base64 && base64.pdfBase64){
      setBase64(base64.pdfBase64)
      // window.open("data:application/pdf," + encodeURI(base64.pdfBase64)); 

    }
  },[base64])
  return (
    <div>
      {base64 ? <Document
        file={base64}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document> : null}
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      exportPDF
    },
    dispatch
  )
}

export default connect(
  null,
  mapDispatchToProps
)(PDFView) 