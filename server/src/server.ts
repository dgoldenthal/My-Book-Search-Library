// server.ts
import express, { Application } from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { typeDefs, resolvers } from './schemas/index.js';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '../client'));
});

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