const STATUS = {
  SUCCESS: {
    code: 200,
    message: 'Request Has Successfull Been Fulfiled'
  },
  CREATED: {
    code: 201,
    message: 'Posts Successfully Created'
  },
  UPDATED: {
    code: 204,
    message: 'Post Successfully Updated'
  },
  NOT_FOUND: {
    code: 404,
    message: 'Posts Not Found'
  },
  NOT_MODIFIED: {
    code: 304,
    message: 'Could Not Update Post'
  },
  BAD_REQUEST: {
    code: 400,
    message: 'All Fields Are Required Except "tag"'
  },
  SERVER_ERROR: {
    code: 500,
    message: 'Server Not Responding'
  }
}

module.exports = { STATUS }
