import React from 'react';

const InternationalTrailerSection = ({ trailerUrl }) => {
  return (
    <section className="px-4 md:px-20 py-10">
      <h2 className="text-xl font-semibold mb-4">International Trailer</h2>
      <div className="aspect-video w-full max-w-5xl mx-auto shadow-lg">
        <iframe
          className="w-full h-full rounded-lg"
          src={trailerUrl}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default InternationalTrailerSection;
