import React from 'react';

function CastMember({ name, image }) {
  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 rounded-full object-cover border-2 border-tmovies-green mb-2"
      />
      <p className="text-sm text-tmovies-text-light">{name}</p>
    </div>
  );
}

export default CastMember;