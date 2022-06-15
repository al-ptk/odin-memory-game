function createImagePromises(number) {
  const promises = [];
  for (let i = 0; i < number; i++) {
    promises.push(fetch(`https://picsum.photos/200/300?random=${i}`));
  }
  return promises;
}

async function getImages(size, callback, className = 'card-img') {
  const promises = createImagePromises(12);
  const responses = await Promise.all(promises);
  const urls = responses.map((res) => res.url);
  const images = urls.map((url) => (
    <img className={className} src={url} alt="A pretty landscape" />
  ));
  callback(images);
}

function createCaptionPromises(number) {
  const promises = [];
  for (let i = 0; i < number; i++) {
    promises.push(fetch('https://api.kanye.rest', { cache: 'no-store' }));
  }
  return promises;
}

const jsonfyResponses = (responses) => {
  return Promise.all(responses.map((res) => res.json()));
};

const extractQuotes = (objs) => objs.map((obj) => obj.quote);

async function getCaptions(number, callback) {
  const promises = createCaptionPromises(12);
  const responses = await Promise.all(promises);
  const jsonObjs = await jsonfyResponses(responses);
  const quotes = await extractQuotes(jsonObjs);
  callback(quotes);
}

export { getCaptions, getImages };
