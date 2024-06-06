import { gql } from "@apollo/client";

export const GET_EXCEL_DATA = gql`
query GetExcelData {
    excelData {
      title
      firstName
      middleName
      lastName
      mobile
      aadharNumber
      rollNumber
      batchMonth
      batchNo
    }
  }
`