// 1. Recuperar la información del personaje "Ned Stark":

async function getNedStark() {
    try {
        const response = await fetch('https://thronesapi.com/api/v2/Characters/2');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching Ned Stark:', error);
    }
}

function getNedStark2() {
    fetch('https://thronesapi.com/api/v2/Characters/2')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error fetching Ned Stark:', error))
}

getNedStark2();

// 2. Recuperar todos los personajes disponibles:
async function getAllCharacters() {
    try {
        const response = await axios.get('https://thronesapi.com/api/v2/Characters');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching all characters:', error);
    }
}
// getAllCharacters();

// 3. Persistir los personajes en un archivo JSON:
const fs = require('fs');

async function saveCharactersToFile() {
    const characters = await getAllCharacters();
    fs.writeFileSync('characters.json', JSON.stringify(characters, null, 2));
    console.log('Characters saved to characters.json');
}

// saveCharactersToFile();

// 4. Leer el archivo y operar sobre los datos:
// a) Mostrar por consola los personajes de la familia Stark:
function showStarkCharacters() {
  const data = JSON.parse(fs.readFileSync('characters.json'));
  const starkFamily = data.filter(character => character.family === 'House Stark');
  console.log(starkFamily);
}

// showStarkCharacters();

// b) Agregar un nuevo personaje y sobrescribir el archivo:
function addCharacter(newCharacter) {
  const data = JSON.parse(fs.readFileSync('characters.json'));
  data.push(newCharacter);
  fs.writeFileSync('characters.json', JSON.stringify(data, null, 2));
  console.log('Character added and file updated.');
}

// addCharacter({
// id: 53,
      // firstName: 'Nuevo',
      // lastName: 'Personaje',
      // family: 'House Stark'
// });

// c) Eliminar personajes con ID mayor a 25:
function removeCharactersById() {
  let data = JSON.parse(fs.readFileSync('characters.json'));
  data = data.filter(character => character.id <= 25);
  fs.writeFileSync('characters.json', JSON.stringify(data, null, 2));
  console.log('Characters with ID > 25 removed.');
}

// removeCharactersById();