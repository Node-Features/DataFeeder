const XLSX = require('xlsx')

const path = require('path')

const getXlData = async(file) => {

   return await new Promise((resolve, reject) => {

    try {

        const workbook = XLSX.readFile(path.join(__dirname, `./assets/xlsx/${file}.xlsx`))

        // iterate over each worksheet in the workbook
        const result = {}
        
        workbook.SheetNames.forEach(sheetName => {
        
          const worksheet = workbook.Sheets[sheetName]
          
          // convert the worksheet data into a JSON object
          const data = XLSX.utils.sheet_to_json(worksheet)
          
          // add the data to the result object
          result[sheetName] = data
          
        })

        resolve(result)

    } catch(error) {

        reject(error.message)
    }

   }).catch(error => {

    return error.message

   })
}

module.exports = getXlData