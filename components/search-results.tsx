"use client";
import { useEffect, useState } from "react";

interface SearchResultsProps {
  name: string;
  current_price: number;
  market_cap: number;
}

function SearchResults() {
  const [data, setData] = useState<SearchResultsProps[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false",
          {
            headers: {
              "Content-Type": "application/json",
              "x-cg-api-key": "CG-dBGjc3yHUo6s5a2FxS5vrZFV",
            },
          }
        );
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        const data = await res.json();
        await setData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      }
    };

    fetchData();
  }, [data]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data && data.length > 0 ? (
        data.map((item: SearchResultsProps, index) => (
          <div key={index}>
            <h3>{item.name}</h3>
            <p>Current Price: ${item.current_price}</p>
            <p>Market Cap: ${item.market_cap}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SearchResults;
