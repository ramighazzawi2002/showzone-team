/*
<div class="containeraboutus">
        <section class="personal-information">
          <h1>Personal Information</h1>
          <div class="name">
            <label for="">Name</label>
            <input type="text" value="Tasneem Abuarqob" id="name" disabled />
            <button id="updateName">Update Name</button>
          </div>
          <div class="email">
            <label for="">Email</label>
            <input type="email" value="Test@gmail.com" id="email" disabled />
            <button id="updateEmail">Update Email</button>
          </div>
          <div class="name">
            <label for="">Password</label>
            <input type="password" value="********" id="password" disabled />
            <button id="updatePassword">Update Password</button>
          </div>
          <div>
            <button class="save-changes" id="saveChanges">Save Changes</button>
          </div>
        </section>
      </div>
      */

const nameInput = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const updateName = document.getElementById("updateName");
const updateEmail = document.getElementById("updateEmail");
const updatePassword = document.getElementById("updatePassword");
const saveChanges = document.getElementById("saveChanges");

updateName.addEventListener("click", () => {
  nameInput.disabled = false;
});

updateEmail.addEventListener("click", () => {
  email.disabled = false;
});

updatePassword.addEventListener("click", () => {
  password.disabled = false;
});

saveChanges.addEventListener("click", () => {
  nameInput.disabled = true;
  email.disabled = true;
  password.disabled = true;
});
