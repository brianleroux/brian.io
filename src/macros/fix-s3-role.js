// rewrite arc static policy to include everythin in the bucket
module.exports = function beginDataMacro(arc, cfn) {
  //cfn.Resources.StaticBucket.Properties.AccessControl = 'BucketOwnerFullControl'
  let policies = cfn.Resources.Role.Properties.Policies.slice(0)
  cfn.Resources.Role.Properties.Policies = policies.map(function fix(policy) {
    if (policy.PolicyName === 'ArcStaticBucketPolicy') {
      policy.PolicyDocument.Statement[0].Action.push('s3:PutObjectAcl')
      policy.PolicyDocument.Statement[0].Resource = [{
        'Fn::Sub': [
          'arn:aws:s3:::${bukkit}',
          {
            bukkit: {
              Ref: 'StaticBucket'
            }
          }
        ]
      },
      {
        'Fn::Sub': [
          'arn:aws:s3:::${bukkit}/*',
          {
            bukkit: {
              Ref: 'StaticBucket'
            }
          }
        ]
      }]
    }
    return policy
  })
  return cfn
}

