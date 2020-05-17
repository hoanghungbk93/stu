import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    justifyContent: "center"

  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    alignItems: 'center'
  }
});

// Create Document Component
const MyDocument = (props) => {
  const {data, isOut} = props
  return (
  
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{isOut ? `Phiếu xuất kho` : `Phiếu nhập kho`}</Text>
      </View>
      {/* <View style={styles.section}>
        <Text>Section #2</Text>
      </View> */}
    </Page>
  </Document>
);}
const PDFView = (props) => {
  const {data} =props
  return(
  <PDFViewer width={'100%'} height={'100%'}>
    <MyDocument data = {data}/>
  </PDFViewer>
);}
export default PDFView