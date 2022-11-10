import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb'

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
  name: 'Chilli Déshy',
  img: 'https://www.hairybikers.com/uploads/images/_opengraphTwitterImage/ChilliConCarne.jpg',
  portions: 2,
  ingredients: [
    ['onion', '1'],
    ['ail', '1', 'gousse'],
    ['poivron', '1'],
    ["huile d'olive", '15', 'ml'],
    ['boeuf haché maigre', '0.5', 'kg'],
    ['chorizo', '0.3', 'kg'],
    ['poudre de chilli', '1', 'pincée'],
    ['sel', '1', 'pincée'],
    ['poivre noir fraîchement moulu', '1', 'pincée'],
    ['bouillon de poulet', '0.5', 'L']
  ],
  instructions: {
    advance: [
      "Dans une grande poêle, faire revenir l'oignon et les poivrons dans un filet d'huile d'olive, jusqu'à ce que le tout soit attendri. Ajouter l'ail, poursuivre la cuisson pendant 2 minutes puis bien assaisonner. Réserver.",
      'Dans une grande casserole, faire dorer la viande et le chorizo.',
      'Ajouter la poudre de chili, saler et poivrer puis bien mélanger.',
      'Ajouter le reste des ingrédients ainsi que l’oignon et les poivrons.',
      'Porter à ébullition puis baisser le feu afin de laisser mijoter pendant 3 à 4 heures. Rectifier l’assaisonnement au besoin'
    ],
    transport: [
      "Déshydrater et emballer"
    ],
    prep: [
      "Faire réhydrater dans l'eau chaude",
      "Réhydrater la coriandre dans l'eau froide séparément"
    ],
    serve: [
      "Servir chaud et garni d'une splouch de lait de coco et de coriandre hachée réhydratée pour décorer"
    ]
  },
  tags: ['supper']
}, {
  _id: 'dafsgdsadfgdgf',
  name: 'Soupe de lentilles',
  img: 'https://wholefoodsoulfoodkitchen.com/wp-content/uploads/2021/03/red-lentil-dahl-with-coconut-milk.jpg',
  portions: 2,
  ingredients: [
    ['onion', '1'],
    ['ail', '3', 'gousses'],
    ['gingembre', '30', 'ml'],
    ['lentilles corail crue', '200', 'g'],
    ['bouillon de poulet', '250', 'ml'],
    ['lait de coco', '250', 'ml'],
    ['coriandre séchée au goût']
  ],
  instructions: {
    advance: [
      "Dans une casserole épaisse, faire revenir l'onion quelques minutes, jusqu'à ce qu'il soit translucide",
      "Ajouter l'ail et cuire encore 1 minute"
    ],
    transport: [
      "Déshydrater et emballer"
    ],
    prep: [
      "Faire réhydrater les arômates et mijoter les lentilles dans le bouillon pendant 20 minutes",
      "Réhydrater la coriandre dans l'eau froide séparément"
    ],
    serve: [
      "Servir chaud et garni d'une splouch de lait de coco et de coriandre hachée réhydratée pour décorer"
    ]
  },
  tags: ['supper']
}]

export async function getAllRecipes() {
  return process.env.DB_STUB
    ? exampleRecipes
    : query()
}

export async function getRecipe (id) {
  return process.env.DB_STUB
    ? exampleRecipes.filter(({ _id }) => _id === id)[0]
    : (await query({ _id: new ObjectId(id) }))[0]
}
