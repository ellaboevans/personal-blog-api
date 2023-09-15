const { connect, connection } = require('mongoose')
const createServer = require('../utils/server')
const Post = require('../models/Post')
const supertest = require('supertest')

describe('Testing Server and Endpoints on the -> API', () => {
  const app = createServer()
  let request
  beforeEach(() => {
    connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_SECRET_KEY}@node-course.ina7eck.mongodb.net/${process.env.TEST_DB}`,
      { useNewUrlParser: true }
    )
    request = supertest(app)
  })

  afterEach(() => {
    connection.db.dropDatabase(() => {
      connection.close()
    })
  })

  test('GET all posts from -> /api/v1/posts', async () => {
    const post = await Post.create({
      title: 'Post 1',
      content: 'This is a test post wai',
      author: 'Evans Elabo',
      tag: 'Testing Server 1'
    })
    await request
      .get('/api/v1/posts')
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(1)
        expect(response.body[0]._id).toBe(post.id)
        expect(response.body[0].title).toBe(post.title)
        expect(response.body[0].content).toBe(post.content)
        expect(response.body[0].author).toBe(post.author)
        expect(response.body[0].tag).toBe(post.tag)
      })
  }, 500000)

  test('GET single post from -> /api/v1/posts/:slug', async () => {
    const post = await Post.create({
      title: 'Post 2',
      content: 'This is a test post wai',
      author: 'Evans Elabo',
      tag: 'Testing Server 2'
    })
    await request
      .get(`/api/v1/posts/${post.slug}`)
      .expect(200)
      .then((response) => {
        expect(response.body.slug).toBe(post.slug)
        expect(response.body.title).toBe(post.title)
        expect(response.body.content).toBe(post.content)
      })
  }, 500000)

  test('POST new post to -> /api/v1/posts', async () => {
    const post = {
      title: 'Post 3',
      content: 'This is a test post wai',
      author: 'Evans Elabo',
      tag: 'Testing Server 3'
    }
    await request.post('/api/v1/posts/').send(post).expect(201)
  }, 500000)
  test('PATCH to update post with -> /api/v1/:postId', async () => {
    const post = await Post.create({
      title: 'Post ',
      content: 'This is a test post wai',
      author: 'Evans Elabo',
      tag: 'Testing Server 4'
    })
    let updatingData = {
      title: 'Update test title',
      author: 'Code Concept'
    }
    await request
      .patch(`/api/v1/posts/${post.id}`)
      .send(updatingData)
      .expect(200)
      .then(async () => {
        const updatedPost = await Post.findOne({ _id: post.id })
        expect(updatedPost).toBeTruthy()
        expect(updatedPost.title).toBe(updatingData.title)
        expect(updatedPost.author).toBe(updatingData.author)
      })
  }, 500000)
  test('DELETE post with -> /api/v1/posts/:postId', async () => {
    const post = await Post.create({
      title: 'Post 5',
      content: 'This is a test post wai',
      author: 'Evans Elabo',
      tag: 'Testing Server 5'
    })
    await request
      .delete(`/api/v1/posts/${post.id}`)
      .expect(204)
      .then(async () => {
        expect(await Post.findOne({ _id: post.id })).toBeFalsy()
      })
  }, 500000)
})
