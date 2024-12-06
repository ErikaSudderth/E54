import React, { useEffect, useState } from "react";
import CountryChart from "../CountryChart/CountryChart";

function Summary() {
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch("http://147.182.166.163:3000/countryData");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setCountryData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching country data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCountryData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="summary" role="main" aria-labelledby="summary_heading">
      <h1 id="summary_heading" tabIndex="0">
        Summary
      </h1>

      <section aria-labelledby="chart_heading">
        <h2 id="chart_heading" tabIndex="0">
          Geographical Distribution of Innovations
        </h2>
        <CountryChart data={countryData} aria-describedby="chart_description" />
        <p id="chart_description">
          This chart shows the locations of the universities that produced the
          17 top healthcare innovations listed in the article. It gives the
          percentage of these universities per geographical area. Some of the
          universities include the Texas Tech University System, Georgia State
          University, Cornell University, and the University of Sussex.
        </p>
      </section>

      <section aria-labelledby="source_heading">
        <h2 id="source_heading" tabIndex="0">
          Source Information
        </h2>
        <p>
          Source:{" "}
          <a
            href="https://www.inpart.io/blog/17-top-healthcare-innovations-2023"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source article on top healthcare innovations of 2023"
          >
            Top Healthcare Innovations
          </a>
        </p>
      </section>
    </div>
  );
}

export default Summary;
