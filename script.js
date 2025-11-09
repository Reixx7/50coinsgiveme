
let kartochki = document.querySelector('.kartochki');
let addBtn = document.querySelector('.plus');
const API = "https://690ce089a6d92d83e84fc6da.mockapi.io/api/users";


function generator() {
  kartochki.innerHTML = "";
  fetch(API)
    .then(res => res.json())
    .then(users => {
      users.forEach(user => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <div class="str1">
            <button class="edit"  onclick="editUser(user)">🖊</button>
            <button class="delete" onclick="deleteUser(user.id)">🗑</button>
          </div>
          <img src="${user.image}" alt="">
          <h1>${user.name}</h1>
          <h3>Age: ${user.age}</h3>
        `;
        // Кнопка Удалить
        card.querySelector('.delete').onclick = () => deleteUser(user.id);

        // Кнопка Изменить
        card.querySelector('.edit').onclick = () => editUser(user);

        kartochki.appendChild(card);
      });
    });
}

generator();

function deleteUser(id) {
  fetch(`${API}/${id}`, {
    method: "DELETE"
  })
    .then(() => generator());
}


function editUser(user) {
  let newName = prompt("Новое имя:", user.name);
  let newAge = prompt("Новый возраст:", user.age);
  let newImage = prompt("Новая картинка:", user.image);

  const updatedUser = {
    name: newName,
    age: newAge,
    image: newImage
  };

  fetch(`${API}/${user.id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(updatedUser)
  })
    .then(() => generator());
}


addBtn.onclick = () => {
  let name = prompt("Имя:");
  let age = prompt("Возраст:");
  let image = prompt("Ссылка на картинку:");

  let newUser = { name, age, image };

  fetch(API, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newUser)
  })
    .then(() => generator());
};
