/**
 * fixes begin/data for architect 6.x apps
 */
module.exports = function beginDataMacro(arc, cfn) {
  if (!cfn.Resources.DataTable) {
    // adds a dynamodb table for begin/data if @tables is missing 'data'
    // adds a CRUD policy to Role for data table
  }
  let lambdas = Object.keys(cfn.Resources).filter(function isLambda(Name) {
    let resource = cfn.Resources[Name]
    return resource.Type === 'AWS::Serverless::Function' || resource.Type === 'AWS::Lambda::Function'
  })
  // adds BEGIN_DATA_TABLE_NAME env var to all Lambdas
  lambdas.forEach(Lambda=> {
    let env = cfn.Resources[Lambda].Properties.Environment.Variables
    env.BEGIN_DATA_TABLE_NAME = {Ref: 'DataTable'}
  })
  return cfn
}
