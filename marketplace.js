// Dummy data for art pieces
const artData = [
  {
    id: 1,
    image_url: 'assets/paintings/starry-night.jpg',
    name: 'Starry Night',
    artist: 'Vincent van Gogh',
    price: 2000000,
    medium: 'Painting',
    theme: 'Post-Impressionism',
  },
  {
    id: 2,
    image_url: 'assets/paintings/mona-lisa.jpg',
    name: 'Mona Lisa',
    artist: 'Leonardo da Vinci',
    price: 5000000,
    medium: 'Painting',
    theme: 'Portrait',
  },
  {
    id: 3,
    image_url: 'assets/paintings/the-scream.jpg',
    name: 'The Scream',
    artist: 'Edvard Munch',
    price: 1800000,
    medium: 'Painting',
    theme: 'Expressionism',
  },
  {
    id: 4,
    image_url: 'assets/paintings/klimt-adele.jpg',
    name: 'Portrait of Adele Bloch-Bauer I',
    artist: 'Gustav Klimt',
    price: 1200000,
    medium: 'Painting',
    theme: 'Portrait',
  },
  {
    id: 5,
    image_url: 'assets/paintings/water-lilies.jpg',
    name: 'Water Lilies',
    artist: 'Claude Monet',
    price: 950000,
    medium: 'Painting',
    theme: 'Nature',
  },
  {
    id: 6,
    image_url: 'assets/paintings/seurat.jpg',
    name: 'A Sunday Afternoon',
    artist: 'Georges Seurat',
    price: 1100000,
    medium: 'Painting',
    theme: 'Pointillism',
  },
  {
    id: 7,
    image_url: 'assets/paintings/cezanne-apples.jpg',
    name: 'Still Life with Apples',
    artist: 'Paul Cézanne',
    price: 800000,
    medium: 'Painting',
    theme: 'Still Life',
  },
  {
    id: 8,
    image_url: 'assets/paintings/vermeer-pearl.jpg',
    name: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    price: 2100000,
    medium: 'Painting',
    theme: 'Portrait',
  },
  {
    id: 9,
    image_url: 'assets/paintings/dali-memory.jpg',
    name: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    price: 1700000,
    medium: 'Painting',
    theme: 'Surrealism',
  },
  {
    id: 10,
    image_url: 'assets/paintings/wheatfield-crows.jpg',
    name: 'Wheatfield with Crows',
    artist: 'Vincent van Gogh',
    price: 1300000,
    medium: 'Painting',
    theme: 'Landscape',
  },
];

let filteredArt = [...artData];
let filterTimeout;

function renderArtGrid(artArray) {
  const grid = document.getElementById('artGrid');
  grid.innerHTML = '';
  if (!artArray.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#8b5e3c;font-size:1.2rem;">No art found.</div>';
    return;
  }
  artArray.forEach(art => {
    const card = document.createElement('div');
    card.className = 'art-card';
    card.tabIndex = 0;
    card.innerHTML = `
      <img class="art-thumb" src="${art.image_url}" alt="${art.name}">
      <div class="art-info">
        <div class="art-title">${art.name}</div>
        <div class="art-artist">by ${art.artist}</div>
        <div class="art-medium">${art.medium}</div>
      </div>
      <button class="buy-now-btn">Buy now</button>
      <div class="art-price">${art.price.toLocaleString()} ₹</div>
    `;
    card.addEventListener('mouseenter', () => handleCardHover(card));
    card.addEventListener('mouseleave', () => handleCardUnhover(card));
    card.addEventListener('click', () => viewArtDetails(art.id));
    grid.appendChild(card);
  });
}

function handleCardHover(card) {
  card.classList.add('hovered');
  card.priceTimeout = setTimeout(() => {
    card.classList.add('price-reveal');
  }, 1000);
}
function handleCardUnhover(card) {
  card.classList.remove('hovered', 'price-reveal');
  if (card.priceTimeout) clearTimeout(card.priceTimeout);
}

function viewArtDetails(artId) {
  console.log('Viewing details for art ID:', artId);
}

function getFilterValues() {
  const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
  const maxPrice = parseInt(document.getElementById('maxPrice').value) || Infinity;
  const artistName = document.getElementById('artistName').value.trim().toLowerCase();
  const theme = document.getElementById('theme').value.trim().toLowerCase();
  const mediums = Array.from(document.querySelectorAll('input[name="medium"]:checked')).map(cb => cb.value);
  return { minPrice, maxPrice, artistName, theme, mediums };
}

function applyFilters() {
  const { minPrice, maxPrice, artistName, theme, mediums } = getFilterValues();
  filteredArt = artData.filter(art => {
    const priceMatch = art.price >= minPrice && art.price <= maxPrice;
    const artistMatch = !artistName || art.artist.toLowerCase().includes(artistName);
    const themeMatch = !theme || (art.theme && art.theme.toLowerCase().includes(theme));
    const mediumMatch = !mediums.length || mediums.includes(art.medium);
    return priceMatch && artistMatch && themeMatch && mediumMatch;
  });
  renderArtGrid(filteredArt);
}

function clearFilters() {
  document.getElementById('minPrice').value = '';
  document.getElementById('maxPrice').value = '';
  document.getElementById('artistName').value = '';
  document.getElementById('theme').value = '';
  document.querySelectorAll('input[name="medium"]').forEach(cb => cb.checked = false);
  filteredArt = [...artData];
  renderArtGrid(filteredArt);
}

document.getElementById('applyFilters').addEventListener('click', applyFilters);
document.getElementById('clearFilters').addEventListener('click', clearFilters);

document.querySelectorAll('.market-sidebar input').forEach(input => {
  input.addEventListener('input', () => {
    if (filterTimeout) clearTimeout(filterTimeout);
    filterTimeout = setTimeout(applyFilters, 400);
  });
});

document.getElementById('searchInput').addEventListener('input', function(e) {
  const q = e.target.value.trim().toLowerCase();
  if (!q) {
    renderArtGrid(filteredArt);
    return;
  }
  const searchResults = filteredArt.filter(art =>
    art.name.toLowerCase().includes(q) ||
    art.artist.toLowerCase().includes(q)
  );
  renderArtGrid(searchResults);
});

document.getElementById('sidebarToggle').addEventListener('click', function() {
  document.getElementById('sidebar').classList.toggle('open');
});

// Responsive: close sidebar on click outside (mobile)
document.addEventListener('click', function(e) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar.contains(e.target) && sidebar.classList.contains('open') && !e.target.matches('#sidebarToggle')) {
    sidebar.classList.remove('open');
  }
});

// Initial render
renderArtGrid(artData);
