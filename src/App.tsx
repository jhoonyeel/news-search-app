import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import ArticleCard from './ArticleCard';
import { NewsArticle } from './types/news';

const fetchNews = async (keyword: string): Promise<NewsArticle[]> => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(keyword)}&apikey=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('뉴스 데이터 요청 실패');

  const data = await res.json();
  return data.articles;
};

const App = () => {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['news', searchTerm],
    queryFn: () => fetchNews(searchTerm),
    enabled: !!searchTerm,
  });

  const handleSearch = () => {
    if (query.trim()) setSearchTerm(query);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <section className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">📰 실시간 뉴스 검색</h1>

        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="검색어를 입력하세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            검색
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {isLoading && <p className="text-center text-gray-500">🔄 검색 중입니다...</p>}
          {isError && (
            <p className="text-center text-red-500">❌ 에러: {(error as Error).message}</p>
          )}
          {data?.length === 0 && !isLoading && (
            <p className="text-center text-gray-400">검색 결과가 없습니다.</p>
          )}
          {data?.map((article, idx) => <ArticleCard key={idx} article={article} />)}
        </div>
      </section>
    </main>
  );
};

export default App;
