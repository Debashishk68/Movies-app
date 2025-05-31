import React from 'react';

const MovieDetailSection = ({ movie }) => {
  return (
    <section className="flex flex-col md:flex-row gap-8 px-4 md:px-20 py-10">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-[200px] md:w-[250px] rounded-lg shadow-lg"
      />
      <div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{movie.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {movie.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-700 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mb-6 max-w-3xl text-gray-300">{movie.description}</p>

        <h2 className="text-xl font-semibold mb-2">Casts</h2>
        <div className="flex gap-4 overflow-x-auto">
          {movie.cast.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
              <p className="text-sm">{member.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieDetailSection;
