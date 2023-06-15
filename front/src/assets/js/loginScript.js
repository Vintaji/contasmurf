const login = {
  init: async () => {
    document
      .getElementById("btn_login")
      .addEventListener("click", login.validate);
  },

  validate: async () => {
    const email = document.getElementsByName("email")[0].value;
    const password = document.getElementsByName("password")[0].value;

    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validate = true;
    let message = "";

    if (!regex.test(email)) {
      message = "Email inválido";
      validate = false;
    }
    if (password.length < 5) {
      message = "Senha deve ter mais de 5 caracteres";
      validate = false;
    }
    if (!validate) {
      alert(message);
    } else {
      login.send();
    }
  },

  send: async () => {
    const response = await fetch("localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: document.getElementsByName("email")[0].value,
        password: document.getElementsByName("password")[0].value,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      alert(data.message);
    } else {
      console.log(data.token);
      const token = `token = Bearer ${data.token}`;
      document.cookie = token;
      window.location.assign("/user");
    }
  },
};
window.onload = login.init();
