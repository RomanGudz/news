// const URL = 'https://newsapi.org/v2/top-headlines';
const APIKey = '29784ad6d6b34548b1c61d181845931d';
const URL = 'headlines.json';

const getNews = async ({
  postfix,
  country,
  search,
}, calback) => {
  try {
    const response = await fetch(`${URL}
    ?country=${country}?pageSize=${postfix}?q=${search}`, {
      method: 'get',
      headers: {
        'X-Api-Key': APIKey,
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (calback) return calback(null, data.articles);
      return;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return calback(err);
  }
};

export default getNews;
