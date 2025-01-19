import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { typeDefs, resolvers } from './schemas/index.js';



dotenv.config();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
app.use(cors({
  origin: 'http://localhost:5000', // Replace with your client origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientBuildPath));

  app.get('*', (_, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
} else {
  app.get('/', (_, res) => {
    res.send('API running. Switch to production to serve client.');
  });
}

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: req.user }),
  });

  await server.start();
  server.applyMiddleware({ app: app as any }); // Cast app as any to resolve type conflict

  mongoose.connect(MONGO_URI, { dbName: 'mydatabase' });

  mongoose.connection.once('open', () => {
    console.log('🌟 Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🌍 Server running on http://localhost:${PORT}`);
      console.log(`🚀 GraphQL endpoint available at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });

  mongoose.connection.on('error', (err) => {
    console.error('Database connection error:', err);
  });
};

startApolloServer();
