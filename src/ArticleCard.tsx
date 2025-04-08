import { NewsArticle } from './types/news';

const ArticleCard = ({ article }: { article: NewsArticle }) => {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition p-4"
    >
      <img
        src={article.image}
        alt={article.title}
        className="w-32 h-20 object-cover rounded-md flex-shrink-0"
      />
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{article.title}</h2>
        <p className="text-sm text-gray-500">{article.description}</p>
        <p className="text-xs text-gray-400 mt-1">{article.source.name}</p>
      </div>
    </a>
  );
};

export default ArticleCard;
