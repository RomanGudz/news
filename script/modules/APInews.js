const APIKey = '29784ad6d6b34548b1c61d181845931d';
// const URL = 'headlines.json';
// ${ URL }
//     ?country = ${ country }?pageSize = ${ postfix }?q = ${ search }`,
const getNews = async ({
  postfix,
  country,
  search,
}, calback) => {
  let URL = 'https://newsapi.org/v2/top-headlines?';
  try {
    if (search) {
      URL = `https://newsapi.org/v2/top-headlines?q=${search}&pageSize=${postfix}`;
    } else {
      URL = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${postfix}`;
    }
    const response = await fetch(URL, {
      method: 'get',
      headers: {
        'X-Api-Key': APIKey,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log('data: ', data);
      if (calback) return calback(null, data.articles);
      return;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return calback(err);
  }
};

export default getNews;
