const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')

const dbHost = encodeURIComponent(process.env.DB_HOST)
const dbUser = encodeURIComponent(process.env.DB_USERNAME)
const dbPw = encodeURIComponent(process.env.DB_PASSWORD)
const dbCluster = encodeURIComponent(process.env.DB_CLUSTER)

const uri = `mongodb+srv://${dbUser}:${dbPw}@${dbCluster}.${dbHost}/?retryWrites=true&w=majority`

export async function query (filter = {}) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
  })
  await client.connect()
  const collection = client.db('food').collection('recipes')
  const results = await collection.find(filter).toArray()
  client.close()
  return results.map((doc) => {
    return {
      ...doc,
      _id: doc._id.toString()
    }
  })
}

export const exampleRecipes = [{
  _id: 'asdfsgadfsdgfn',
  name: 'Flanc de Porc'
}, {
  _id: 'dafsgdsadfgdgf',
  name: 'Bouillabaise'
}]

export async function getAllRecipes() {
  return process.env.DB_STUB
    ? exampleRecipes
    : query()
}

export async function getRecipe (id) {
  return process.env.DB_STUB
    ? exampleRecipes.filter(({ _id }) => _id === id)[0]
    : query({ _id: new ObjectId(id) })
}
