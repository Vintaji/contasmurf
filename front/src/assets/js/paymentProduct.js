const pay = {
  init: async () => {
    document.getElementById("btn_pay").addEventListener("click", pay.validate);
  },

  validate: async () => {
    const nome = document.getElementsByName("holderName")[0].value;

    const regexName =
      /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/s;
    let validate = true;
    let message = "";

    if (!regexName.test(nome)) {
      message = "Escreva seu nome e sobrenome corretamente";
      validate = false;
    }
    if (!validate) {
      alert(message);
    } else {
      pay.send();
    }
  },
  send: async () => {
    const response = await fetch("https://api.ricardosantana.xyz/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        cardNumber: document.getElementsByName("cardNumber")[0].value,
        holderName: document.getElementsByName("holderName")[0].value,
        expirationMonth: document.getElementsByName("expirationMonth")[0].value,
        expirationYear: document.getElementsByName("expirationYear")[0].value,
        securityCode: document.getElementsByName("securityCode")[0].value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      alert(data.message);
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Compra feita com sucesso",
      });
      window.location.assign("/user");
    }
    console.log(response);
  },
};
window.onload = pay.init();
