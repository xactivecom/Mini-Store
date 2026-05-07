import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('q') || '';
  console.log(searchQuery);

  function updateSearch(newSearchQuery: string) {
    setSearchParams(newSearchQuery ? { q: newSearchQuery } : {});
  }

  return (
    <div>
      <h1>Search</h1>
      <p>Search term: {searchQuery}</p>

      <input type="text" value={searchQuery} onChange={(e) => updateSearch(e.target.value)} />
    </div>
  );
}

export default SearchPage;
