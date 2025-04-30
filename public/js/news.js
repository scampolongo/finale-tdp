async function loadNews() {
  const res = await fetch('/api/news');
  const json = await res.json();
  const container = document.getElementById('news-container');
  json.articles.forEach((art) => {
    const div = document.createElement('div');
    div.classList.add('mb-4', 'p-3', 'border', 'rounded');
    const title = document.createElement('h5');
    title.textContent = art.title;

    const btnGroup = document.createElement('div');
    btnGroup.classList.add('btn-group', 'mb-2');

    const btn1 = document.createElement('button');
    btn1.textContent = 'Vai al Sito';
    btn1.classList.add('btn', 'btn-primary');
    btn1.onclick = () => window.open(art.url, '_blank');

    const btn2 = document.createElement('button');
    btn2.textContent = 'Espandi';
    btn2.classList.add('btn', 'btn-secondary');

    btnGroup.append(btn1, btn2);

    const snippet = document.createElement('p');
    snippet.textContent = (art.description || '').substring(0, 100) + '...';

    const fullP = document.createElement('p');
    fullP.style.display = 'none';
    fullP.textContent = art.description || 'Contenuto non disponibile.';

    btn2.onclick = () => {
      if (fullP.style.display === 'none') {
        fullP.style.display = 'block';
        snippet.style.display = 'none';
        btn2.textContent = 'Comprimi';
      } else {
        fullP.style.display = 'none';
        snippet.style.display = 'block';
        btn2.textContent = 'Espandi';
      }
    };

    div.append(title, btnGroup, snippet, fullP);
    container.append(div);
  });
}

document.addEventListener('DOMContentLoaded', loadNews);
