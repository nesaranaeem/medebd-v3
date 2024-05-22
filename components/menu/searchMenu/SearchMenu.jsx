import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import { apiBaseURL } from "@/utils/api/Api";

const SearchMenu = () => {
  const [selectedItem, setSelectedItem] = useState("Medicine");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const menuItems = ["Medicine", "Symptoms", "Generics"];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleSuggestionClick = (link) => {
    window.location.href = link;
  };

  const handleViewAll = () => {
    // Implement your "View All" functionality here based on the selected item and searchQuery
  };

  const renderNoResultsFound = () => {
    if (!isSearching && suggestions.length === 0 && searchQuery.trim() !== "") {
      return (
        <span className="block p-2 text-gray-900 cursor-pointer hover:bg-gray-300">
          No results found for {searchQuery}
        </span>
      );
    }
    return null;
  };

  const fetchSuggestions = useCallback(async () => {
    if (!searchQuery) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      let apiUrl = "";
      const apikey = process.env.NEXT_PUBLIC_API_KEY;

      if (selectedItem === "Symptoms") {
        apiUrl = `${apiBaseURL}medicine/search?apikey=${apikey}&symptom=${encodeURIComponent(
          searchQuery
        )}&page=1&limit=9`;
      } else if (selectedItem === "Generics") {
        apiUrl = `${apiBaseURL}medicine/generic?apikey=${apikey}&search=${encodeURIComponent(
          searchQuery
        )}&page=1&limit=9`;
      } else {
        apiUrl = `${apiBaseURL}medicine?apikey=${apikey}&medicineName=${encodeURIComponent(
          searchQuery
        )}&page=1&limit=9`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status) {
        let suggestionsData;
        if (selectedItem === "Generics") {
          suggestionsData = data.details.map((item) => {
            const text = item.generic_name;
            const link = `/medicines/generics/${item.generic_id}`;
            return { text, link };
          });
        } else {
          suggestionsData = data.details.map((item) => {
            const formattedName = item?.brand_name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-");
            const link = `/medicine/${formattedName}-${item?.brand_id}`;
            const text = (
              <span>
                <strong>{item?.brand_name}</strong>
                {item?.form && (
                  <>
                    {" "}
                    <span className="font-semibold">{item?.form}</span>
                  </>
                )}
                {item?.strength && (
                  <>
                    {" "}
                    <span className="text-sm">{item?.strength}</span>
                  </>
                )}
              </span>
            );
            return { text, link };
          });
        }

        setSuggestions(suggestionsData);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
    setIsSearching(false);
  }, [selectedItem, searchQuery]);

  useEffect(() => {
    let typingTimer;
    const debounceInterval = 1000;

    setIsSearching(true);
    clearTimeout(typingTimer);
    typingTimer = setTimeout(fetchSuggestions, debounceInterval);

    return () => {
      clearTimeout(typingTimer);
    };
  }, [selectedItem, searchQuery, fetchSuggestions]);

  const inputProps = {
    placeholder: `Search By ${selectedItem}`,
    value: searchQuery,
    onChange: (event) => setSearchQuery(event.target.value),
    className:
      "w-full py-2 px-4 rounded-md bg-white text-gray-900 focus:outline-none",
    onFocus: () => setIsInputFocused(true),
    onBlur: () => setIsInputFocused(false),
  };

  const renderSuggestion = (suggestion) => (
    <div
      className="block p-2 text-gray-900 cursor-pointer hover:bg-gray-300"
      onMouseDown={(e) => {
        e.preventDefault();
        handleSuggestionClick(suggestion.link);
      }}
    >
      {suggestion.text}
    </div>
  );

  const renderLoading = () => (
    <div className="mt-2 z-50 bg-white rounded-md border border-gray-300 w-full left-0 flex flex-row items-center">
      <p className="text-gray-900 p-4">Loading</p>
      <LoadingSpinner />
    </div>
  );

  const renderSuggestionsContainer = ({ containerProps, children }) => {
    return (
      <div
        {...containerProps}
        className="mt-2 z-50 bg-white w-full left-0 rounded-md border border-gray-300"
        style={{
          top: "calc(100% + 8px)",
          display: searchQuery.trim() === "" ? "none" : "block",
        }}
      >
        {isSearching ? renderLoading() : children}
      </div>
    );
  };

  return (
    <div className="border-t-2 border-blue-600 bg-gray-200 flex flex-col md:flex-row items-center py-2 px-4 relative">
      <select
        className="px-3 py-2 text-sm font-medium text-gray-900 rounded-md bg-white focus:outline-none mb-2 md:mb-0"
        value={selectedItem}
        onChange={(e) => handleItemClick(e.target.value)}
      >
        {menuItems.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <div className="flex-grow mx-4 relative w-full md:w-auto">
        <div className="relative">
          <input
            {...inputProps}
            className="w-full py-2 px-4 rounded-md bg-white text-gray-900 focus:outline-none"
          />
          {isInputFocused && (isSearching || suggestions.length > 0) && (
            <div className="absolute left-0 right-0 bg-white rounded-md border border-gray-300 mt-1 z-50">
              {isSearching ? (
                <div className="flex items-center p-2 bg-gray-100">
                  <LoadingSpinner />
                  <p className="ml-2 text-gray-900">Loading...</p>
                </div>
              ) : (
                suggestions.map((suggestion, index) => (
                  <div key={index} className="p-2 bg-gray-100">
                    {renderSuggestion(suggestion)}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        {renderNoResultsFound()}
      </div>

      <button
        onClick={handleViewAll}
        className={`p-2 rounded-md text-gray-600 ${
          selectedItem === "Medicine" || !searchQuery.trim() || isSearching
            ? "cursor-not-allowed"
            : "hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 cursor-pointer"
        }`}
        disabled={
          selectedItem === "Medicine" || !searchQuery.trim() || isSearching
        }
      >
        <FaSearch className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
};

export default SearchMenu;
