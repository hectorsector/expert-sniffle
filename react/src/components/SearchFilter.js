import React, { useState, useEffect } from 'react';

const SearchFilter = ({ items = [], onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    let filtered = items;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
    if (onFilter) {
      onFilter(filtered);
    }
  }, [searchTerm, selectedCategory, items, onFilter]);

  const categories = ['all', ...new Set(items.map(item => item.category))];

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  return (
    <div className="search-filter" data-testid="search-filter">
      <h3>Search & Filter</h3>
      
      <div className="search-section">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          data-testid="search-input"
        />
      </div>

      <div className="filter-section">
        <label htmlFor="category-select">Category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          data-testid="category-select"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="actions">
        <button 
          onClick={clearFilters}
          data-testid="clear-filters-btn"
        >
          Clear Filters
        </button>
      </div>

      <div className="results" data-testid="search-results">
        <p>Showing {filteredItems.length} of {items.length} items</p>
        {filteredItems.map(item => (
          <div key={item.id} className="item" data-testid={`item-${item.id}`}>
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <span className="category-badge">{item.category}</span>
          </div>
        ))}
        {filteredItems.length === 0 && items.length > 0 && (
          <p data-testid="no-results">No items match your criteria</p>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;