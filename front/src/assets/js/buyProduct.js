const buy = {
  init: async () => {
    document.getElementById("btn_buy").addEventListener("click", buy.validate);
  },

  validate: async () => {
    const nome = document.getElementsByName("nome")[0].value;

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
      buy.send();
    }
  },
  send: async () => {
    const response = await fetch("https://api.ricardosantana.xyz/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        product: {
          name: document.getElementsByName("name")[0].value,
          price: document.getElementsByName("price")[0].value,
          size: document.getElementsByName("size")[0].value,
          color: document.getElementsByName("color")[0].value,
        },
        adress: {
          street: document.getElementsByName("street")[0].value,
          number: document.getElementsByName("number")[0].value,
          city: document.getElementsByName("city")[0].value,
          state: document.getElementsByName("state")[0].value,
          postCode: document.getElementsByName("postCode")[0].value,
        },
        owner: {
          nome: document.getElementsByName("nome")[0].value,
          cpf: document.getElementsByName("cpf")[0].value,
          telefone: document.getElementsByName("telefone")[0].value,
        },
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
        title: "Pedido feito, agora é so pagar!",
      });
      window.location.assign("/payment");
    }
    console.log(response);
  },
};
window.onload = buy.init();
