const createTitleWrapper = async (title) => {
  const titleWrapper = document.createElement('div');
  const containerDiv = document.createElement('div');
  const createH2 = document.createElement('h2');
  titleWrapper.classList.add('title-wrapper');
  containerDiv.classList.add('container');
  createH2.classList.add('title');
  const createH1 = document.createElement('h1');
  createH1.textContent = 'Агрегатор новостей';
  if (title) {
    createH1.classList.add('visually-hidden');
    createH2.textContent = title;
  } else {
    createH2.textContent = 'Свежие новости';
  }
  containerDiv.append(createH1, createH2);
  titleWrapper.append(containerDiv);

  return titleWrapper;
};

const cardNews = async (err, newsAll) => {
  if (err) {
    console.warn(err, newsAll);
    return;
  }

  const createNewsAll = Promise.all(
    newsAll.map(async (news) => {
      const createLi = document.createElement('li');
      const createH3 = document.createElement('h3');
      const createA = document.createElement('a');
      const createP = document.createElement('p');
      const footerDiv = document.createElement('div');
      const createTime = document.createElement('time');
      const createSpan = document.createElement('span');
      const createFooterAuthor = document.createElement('p');
      createLi.classList.add('news-item');
      const createImg = document.createElement('img');
      const imgLoaded = new Promise((resolve) => {
        createImg.addEventListener('load', () => {
          resolve();
        });
        createImg.addEventListener('error', () => {
          createImg.src = 'css/nofoto.png';
          resolve();
        });
      });

      createImg.src = `${news.urlToImage}`;
      createImg.height = '200';
      createImg.classList.add('news-image');
      await imgLoaded;

      createH3.classList.add('news-title');
      createA.classList.add('news-link');
      createA.textContent = news.title;
      createA.href = '#';
      createA.target = '_blank';
      createP.classList.add('news-description');
      createP.textContent = news.description;
      footerDiv.classList.add('news-footer');
      createTime.classList.add('news-datetime');
      createTime.setAttribute('datetime', news.publishedAt);
      createSpan.classList.add('news-date');
      createSpan.textContent = news.publishedAt;
      createFooterAuthor.classList.add('news-author');
      createFooterAuthor.textContent = news.author;
      createH3.append(createA);
      createTime.append(createSpan);
      footerDiv.append(createTime, createFooterAuthor);

      createLi.append(createImg, createH3, createP, footerDiv);

      return createLi;
    })
  );
  return createNewsAll;
};


const createCotainerNewsList = async (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }
  const createSection = document.createElement('section');
  const visuallyHidden = document.createElement('h2');
  const containerUl = document.createElement('div');
  const newsList = document.createElement('ul');

  createSection.classList.add('news');
  // visuallyHidden.classList.add('visually-hidden');
  containerUl.classList.add('container');
  newsList.classList.add('news-list');
  visuallyHidden.textContent = 'Список новостей';
  containerUl.append(newsList);
  createSection.append(visuallyHidden, containerUl);
  const list = await cardNews(err, data);
  newsList.append(...list);
  return createSection;
};

export default {
  createTitleWrapper,
  createCotainerNewsList,
  cardNews,
};
