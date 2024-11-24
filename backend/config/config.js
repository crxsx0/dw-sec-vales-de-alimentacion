import 'dotenv/config';

const MONGODB_URL = process.env.MONGODB_URL
const JWT_SECRET = process.env.JWT_SECRET
const PORT_API_SERVER = process.env.PORT_API_SERVER
const PORT_GRAPHQL_SERVER = process.env.PORT_GRAPHQL_SERVER

export default { MONGODB_URL, JWT_SECRET, PORT_API_SERVER, PORT_GRAPHQL_SERVER };