async function fetchCharacters() {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    if (!response.ok) {
      throw new Error('Failed to fetch character data');
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}


function displayCharacters(characters) {
  const charactersList = document.getElementById('characters-list');
  
  
   if (!charactersList) {
     console.error("Characters list element not found");
     return;
   }

  charactersList.innerHTML = '';

  characters.forEach(character => {
    const characterElement = document.createElement('div');
    characterElement.innerHTML = `
    <img src="${character.image}" alt="${character.name}" class="character-image">
    <div class="character-details">
        <h2>${character.name}</h2>
        <p><strong>Status:</strong> ${character.status}</p>
        <p><strong>Species:</strong> ${character.species}</p>
        <p><strong>Gender:</strong> ${character.gender}</p>
        <p><strong>Location:</strong> ${character.location.name}</p>
    </div>
`;
    charactersList.appendChild(characterElement);
  });
}


function handleSearch() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const characterElements = document.querySelectorAll('#characters-list > div');

  characterElements.forEach(characterElement => {
    const characterName = characterElement.querySelector('h2').textContent.toLowerCase();
    if (characterName.includes(searchTerm)) {
      characterElement.style.display = 'block';
    } else {
      characterElement.style.display = 'none';
    }
  });
}


function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}


document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
document.getElementById('search-input').addEventListener('input', handleSearch);

window.addEventListener('load', async () => {
  const characterData = await fetchCharacters();
  if (characterData) {
    console.log(characterData);
    displayCharacters(characterData.results);
  }
})