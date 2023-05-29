import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CastMember = () => {
  const [castMembers, setCastMembers] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => setCastMembers(data.cast))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div className="cast-grid">
      {castMembers.slice(0, 6).map((castMember) => (
        <div className="cast-member" key={castMember.id}>
          <img
            src={`https://image.tmdb.org/t/p/w185${castMember.profile_path}`}
            alt={castMember.name}
            className="cast-member-image"
          />
          <div className="cast-member-name">{castMember.name}</div>
        </div>
      ))}
    </div>
  );
};

export default CastMember;
