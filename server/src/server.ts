// server.ts
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import dotenv from 'dotenv';

import { typeDefs, resolvers } from './schemas/index.js';
import { authMiddleware } from './services/auth.js';
import routes from './routes/index.js';

dotenv.config();

// Initialize Express application
const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use API routes
app.use('/api', routes);

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: { req: express.Request }) => authMiddleware({ req }),
});

// Start the server
const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app: app as any }); // Force compatibility

  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`🌍 Server running at http://localhost:${PORT}`);
    console.log(`🚀 GraphQL available at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();
