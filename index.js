const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const typeDefs = require('./schema'); // Import GraphQL Schema
const resolvers = require('./resolvers'); // Import Resolvers

dotenv.config();

const mongodb_atlas_url = process.env.MONGODB_URL;

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(mongodb_atlas_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error(`❌ Unable to connect to DB: ${error.message}`);
    }
};

// Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(express.json());
app.use(cors());

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: process.env.PORT }, () => {
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
        connectDB();
    });
}

startServer();
