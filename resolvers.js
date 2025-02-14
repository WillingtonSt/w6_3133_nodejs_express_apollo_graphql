const Movie = require('./models/Movie');

const resolvers = {
    Query: {
        getMovies: async () => await Movie.find(),
        getMovieById: async (_, { id }) => await Movie.findById(id),
    },
    Mutation: {
        addMovie: async (_, args) => {
            const movie = new Movie(args);
            await movie.save();
            return movie;
        },
        updateMovie: async (_, { id, ...updates }) => {
            return await Movie.findByIdAndUpdate(id, updates, { new: true });
        },
        deleteMovie: async (_, { id }) => {
            await Movie.findByIdAndDelete(id);
            return "Movie deleted successfully!";
        }
    }
};

module.exports = resolvers;
