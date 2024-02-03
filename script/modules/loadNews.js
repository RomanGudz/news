import getNews from './APInews.js';
import createElements from './createElements.js';

const {
  createTitleWrapper,
  createCotainerNewsList,
} = createElements;

const main = document.querySelector('main');
const form = document.querySelector('.form-search');


const createListNews = (
  countryNews = 'ru',
  count = 8,
  searchNews = undefined) => {
  const result = new Promise(resolve => {
    const data = getNews({
      postfix: count,
      country: countryNews,
      search: searchNews,
    }, createCotainerNewsList);
    resolve(data);
  });
  return result;
};

const renderPage = async () => {
  const title = await createTitleWrapper();
  const newsList = await createListNews();
  Promise.all([title, newsList]).then((data) => {
    main.append(data[0]);
    main.append(data[1]);
  });
};
renderPage();

const countrySelect = document.querySelector('.choices');
countrySelect.addEventListener('change', async e => {
  e.preventDefault();
  const target = e.target;
  const textOption = target.options[target.selectedIndex].text;
  const createTitle = await createTitleWrapper(`По вашему запросу
     ${textOption}
   найдено 8 результатов`);
  const selectCountryNews = await createListNews(target.value, 8);
  const news = await createListNews('ru', 4);
  Promise.all([createTitle, selectCountryNews, news]).then((data) => {
    main.innerHTML = '';
    main.append(data[0]);
    main.append(data[1]);
    main.append(data[2]);
  });
});


form.addEventListener('submit', async e => {
  e.preventDefault();
  const target = e.target;
  const searchForm = target.search.value;
  let select = target.country.value;
  const textOption = target.country[target.country.selectedIndex].text;
  form.reset();
  const createTitle = await createTitleWrapper(`По вашему запросу
     ${textOption}
   найдено 8 результатов`);
  if (!searchForm.length) {
    select = 'ru';
  }

  const InputCountryNews = await createListNews(select, 8, searchForm);
  const news = await createListNews(select, 4);
  Promise.all([createTitle, InputCountryNews, news]).then((data) => {
    main.innerHTML = '';
    main.append(data[0]);
    main.append(data[1]);
    main.append(data[2]);
  });
});
