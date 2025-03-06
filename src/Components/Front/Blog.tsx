import { useState, useEffect } from "react";

// 定義文章類型
interface Article {
  guid: string;
  thumbnail: string;
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

function Blog() {
  const mediumRssFeed =
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/moonshinevfx";
  const MAX_ARTICLES = 10;
  const [articles, setArticles] = useState<Article[] | null>(null);
  // 讀取 medium 文章
  useEffect(() => {
    const loadArticles = async () => {
      fetch(mediumRssFeed, { headers: { Accept: "application/json" } })
        .then((res) => res.json())
        .then((data) => data.items.filter((item: any) => item.title.length > 0))
        .then((newArticles) => newArticles.slice(0, MAX_ARTICLES))
        .then((articles) => setArticles(articles))
        .catch((error) => console.log(error));
    };
    loadArticles();
  }, [MAX_ARTICLES]);
  return (
    <div className="w-10/12 mx-auto pt-[50px] text-white">
      <div className="flex flex-wrap justify-between mt-[30px]">
        {articles ? (
          articles.map((item: any, index: number) => {
            console.log(item);
            const { guid, thumbnail, title, link, description, pubDate } = item;
            return (
              <div
                className="w-[48%] mb-[20px] pb-[20px] border-b border-[#454545] animate__animated animate__fadeIn"
                key={guid + index}
              >
                <a
                  href={link}
                  className="block w-full h-[258px] bg-no-repeat bg-center bg-cover transition-all duration-300 filter brightness-[0.8] hover:brightness-[1.2]"
                  style={{ backgroundImage: `url(${thumbnail})` }}
                  target="_blank"
                  rel="noreferrer"
                ></a>
                <div>
                  <h5 className="mt-[10px] mb-[10px]">
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="no-underline text-[#ddd] text-[20px] hover:text-white"
                    >
                      {title}
                    </a>
                  </h5>
                  <div className="text-[14px] text-[#a9a8a8] mb-[15px]">
                    {description.replace(/(<([^>]+)>)/gi, "").substr(0, 120)}...
                  </div>
                  <div className="text-[14px] text-[#ddd] mb-[15px]">
                    {pubDate.substr(0, 10)}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>目前還沒有文章</div>
        )}
      </div>
    </div>
  );
}

export default Blog;
