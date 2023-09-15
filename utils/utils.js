const STATUS = {
  SUCCESS: {
    code: 200,
    message: 'Request Fulfiled Successfully'
  },
  CREATED: {
    code: 201,
    message: 'Posts Successfully Created!'
  },
  NO_CONTENT: {
    code: 204,
    message: 'Post Removed Successfully!'
  },
  NOT_FOUND: {
    code: 404,
    message: 'Posts Not Found!'
  },
  NOT_MODIFIED: {
    code: 304,
    message: 'Could Not Update Post!'
  },
  BAD_REQUEST: {
    code: 400,
    message: 'Fields Cannot Be Blank!'
  },
  UNAUTHORIZED: {
    code: 401,
    message: 'Sorry! You Are Not Authorized!'
  },
  SERVER_ERROR: {
    code: 500,
    message: 'Server Not Responding!'
  }
}

module.exports = { STATUS }
