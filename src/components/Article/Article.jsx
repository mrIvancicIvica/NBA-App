import React, { useEffect, useState } from "react";
import { URL_POSTS } from "../utils/Paths";
import Axios from "axios";

const Article = (props) => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      const { data } = await Axios(`${URL_POSTS}/${props.match.params.id}`);

      setArticle(data);
    };
    getArticles();
  }, [props]);

  console.log(article);

  return (
    <div>
       <div className="container article_post">
        {article ? (
          <div className="top">
            <div
              className="block_image"
              style={{
                background: `url(/images/blocks/${article.image}) no-repeat`,
              }}
            ></div>
            <h1>{article.title}</h1>
            <span></span>
            <div
              className="article_content"
              dangerouslySetInnerHTML={{
                __html: article.content,
              }}
            ></div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Article;
