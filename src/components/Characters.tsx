import { useQuery, gql } from "@apollo/client";
import React, { useState } from "react";

const CHARACTERS_QUERY = gql`
  query Query {
    locations {
      results {
        name
        residents {
          id
          name
          gender
          image
          status
          species
          origin {
            name
            dimension
          }
          location {
            name
            dimension
          }
          episode {
            air_date
          }
        }
      }
    }
  }
`;

const Characters = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const { data, loading, error } = useQuery(CHARACTERS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <pre>{error.message}</pre>;
  }

  const handleBtn = (e: any) => {
    // let filter;

    // console.log(e.target.value);

    // if (e.target.value === "all") {
    //   filter = data.locations.results.map(
    //     (location: any) => location.residents
    //   );
    // } else if (e.target.value === "male") {
    //   filter = data.locations.results.residents.map(
    //     (resident: any) => resident.gender === "male"
    //   );
    // }
  };

  return (
    <div className="space-y-10">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-12 rounded-lg border w-96 focus:border-gray-400 p-3 outline-none"
      />

      <div className="space-x-10">
        <button
          value="All"
          onClick={handleBtn}
          className="border-transparent px-2 rounded-full text-white bg-green-300"
        >
          All
        </button>
        <button
          value="male"
          onClick={handleBtn}
          className="border-transparent px-2 rounded-full text-white bg-blue-300"
        >
          male
        </button>
        <button
          value="female"
          onClick={handleBtn}
          className="border-transparent px-2 rounded-full text-white bg-pink-300"
        >
          female
        </button>
        <button
          value="dead"
          onClick={handleBtn}
          className="border-transparent px-2 rounded-full text-white bg-red-300"
        >
          Dead
        </button>
        <button
          value="alive"
          onClick={handleBtn}
          className="border-transparent px-2 rounded-full text-white bg-purple-300"
        >
          Alive
        </button>
      </div>

      {data.locations.results
        .filter((location: any) => {
          if (searchTerm === "") {
            return location;
          } else if (
            location.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return location;
          }
        })
        .map((location: any) => {
          return (
            <div key={location.name}>
              <h2 className="text-4xl font-bold pb-4">{location.name}</h2>
              <div key={location.name} className="grid grid-cols-5 gap-3">
                {location.residents
                  // .filter((resident: any) => {
                  //   if (searchTerm === "") {
                  //     return resident;
                  //   } else if (
                  //     resident.gender
                  //       .toLowerCase()
                  //       .includes(searchTerm.toLowerCase())
                  //   ) {
                  //     return resident;
                  //   }
                  // })
                  .map((resident: any) => {
                    return (
                      <div className="">
                        <div
                          key={resident.id}
                          className="flex items-start flex-col"
                        >
                          <p>
                            <img src={resident.image} alt={resident.name} />
                          </p>
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold">
                              {resident.name}
                            </h3>
                            <h1>{resident.gender}</h1>
                          </div>
                          <h1>{resident.status}</h1>
                          <h1>{resident.episode.air_date}</h1>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Characters;
