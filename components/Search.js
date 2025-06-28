"use client";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();
  const searchRef = useRef();

  useEffect(() => {
    const searches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(searches);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedSearches = [username, ...recentSearches.filter((s) => s !== username)].slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);

    router.push(`/${username}`);
    setShow(false);
    searchRef.current.reset();
    setUsername("");
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setUsername(value);

    if (value.length > 2) {
      const res = await fetch(`/api/searchmission?q=${value}`);
      const data = await res.json();
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name) => {
    setUsername(name);
    router.push(`/${name}`);
    setShow(false);
  };

  const handleDeleteRecent = (index) => {
    const updated = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <>
      <div className="relative inline-block">
        <button
          type="button"
          className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 mb-2 shadow-md hover:opacity-90 transition duration-300"
          style={{ background: 'linear-gradient(to bottom right, #2774AE, #002E5D)' }}
          onClick={() => setShow(!show)}
        >
          <svg
            className="size-4 mb-1 md:mb-1.5 font-bold"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>

        <div
          className={`${
            show ? "" : "hidden"
          } fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen backdrop-blur-sm bg-gray-100 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50`}
        >
          <div className="relative top-20 p-4 w-full max-w-3xl mx-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Find your Mission</h3>
                <button
                  type="button"
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setShow(false)}
                >
                  <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-4 md:p-5">
                <form ref={searchRef} className="space-y-4" onSubmit={handleSubmit}>
                  <div className="relative">
                    <input
                      type="search"
                      id="uName"
                      name="uName"
                      value={username}
                      onChange={handleChange}
                      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Search by username or mission..."
                      required
                    />
                    <button
                      type="submit"
                      className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
                    >
                      Search
                    </button>
                  </div>
                </form>

                {suggestions.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-2">Results</h4>
                    <ul className="max-h-40 overflow-y-auto">
                      {suggestions.map((s) => (
                        <li
                          key={s._id}
                          className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                          onClick={() => handleSuggestionClick(s.username)}
                        >
                          {s.username} - <span className="italic">{s.mission}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {recentSearches.length > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-md font-semibold text-gray-800 dark:text-white">Recent Searches</h4>
                      <button
                        onClick={handleClearAll}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {recentSearches.map((r, index) => (
                        <li
                          key={index}
                          className="flex items-center bg-blue-100 dark:bg-gray-600 px-3 py-1 rounded-full text-sm"
                        >
                          <span
                            className="cursor-pointer"
                            onClick={() => handleSuggestionClick(r)}
                          >
                            {r}
                          </span>
                          <button
                            onClick={() => handleDeleteRecent(index)}
                            className="ml-2 text-gray-500 hover:text-red-600"
                            title="Remove"
                          >
                            &times;
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
