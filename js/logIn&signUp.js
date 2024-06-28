let Signup_form_id_js = document.getElementById("Signup_form_id");

let Password_Singup = document.getElementById("Password_Singup");
let Passward_p_div_js = document.getElementById("Passward_p_div");
let characters_Passward_p_js = document.getElementById("characters_Passward_p");
let Capital_Passward_p_js = document.getElementById("Capital_Passward_p");
let Number_Passward_p_js = document.getElementById("Number_Passward_p");
let Special_Characters_p_js = document.getElementById("Special_Characters_p");
let Data_p_div_js = document.getElementById("Data_p_div");
let Email_p_div_js = document.getElementById("Email_p_div");

Password_Singup.addEventListener("input", function checkPassword() {
  let Verification_Password = Signup_form_id_js.Password_Singup.value;
  Passward_p_div_js.style.display = "inline";
  if (/[A-Za-z\d@$!%*?&]{8,}/.test(Verification_Password)) {
    characters_Passward_p_js.style.color = "green";
  } else {
    characters_Passward_p_js.style.color = "";
  }
  if (/[A-Z]/.test(Verification_Password)) {
    Capital_Passward_p_js.style.color = "green";
  } else {
    Capital_Passward_p_js.style.color = "";
  }
  if (/\d/.test(Verification_Password)) {
    Number_Passward_p_js.style.color = "green";
  } else {
    Number_Passward_p_js.style.color = "";
  }
  if (/(?=.*[@$!%*?&])/.test(Verification_Password)) {
    Special_Characters_p_js.style.color = "green";
  } else {
    Special_Characters_p_js.style.color = "";
  }
});

function formSingup(Sing_Up_Form) {
  Sing_Up_Form.preventDefault();
  let Signup_form_id_js = Sing_Up_Form.target;
  let First_Name_js = Signup_form_id_js.First_Name.value;
  let Last_Name_js = Signup_form_id_js.Last_Name.value;
  let Data_js = Signup_form_id_js.date.value;
  let Email_js = Signup_form_id_js.Email.value;
  let Password_Singup_js = Signup_form_id_js.Password_Singup.value;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email_js)) {
    Email_p_div_js.style.display = "none";
  } else {
    Email_p_div_js.style.display = "inline";
    return;
  }
  if (
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      Password_Singup_js
    )
  ) {
  } else {
    return;
  }
  // if (
  //   /^\d{4}-\d{2}-\d{2}$|^\d{2}-\d{2}-\d{4}$|^\d{2}\/\d{2}\/\d{4}$|^\d{4}\/\d{2}\/\d{2}$/.test(
  //     Data_js
  //   )
  // ) {
  //   Data_p_div_js.style.display = "none";
  // } else {
  //   Data_p_div_js.style.display = "inline";
  //   return;
  // }
  console.log(First_Name_js);
  console.log(Last_Name_js);
  console.log(Data_js);
  console.log(Email_js);
  console.log(Password_Singup_js);
}
Signup_form_id_js.addEventListener("submit", formSingup);
