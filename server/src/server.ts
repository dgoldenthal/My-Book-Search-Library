// server.ts
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import { authenticateToken as authMiddleware } from './services/auth.js';
import { typeDefs, resolvers } from './schemas/index.js';

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user }),
});

// Apply Apollo middleware
server.start().then(() => {
  server.applyMiddleware({ app: app as any }); // Explicit cast to handle type mismatch

  const PORT = process.env.PORT || 3001;

  app.listen(PORT, () => {
    console.log(`🌍 Server running on http://localhost:${PORT}`);
    console.log(`🚀 GraphQL endpoint available at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
