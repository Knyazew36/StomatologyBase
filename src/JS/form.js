import $ from "jquery";
import axios from "axios";

export const myForm = () => {
  const form = $("#tg");
  const formText = $(".form__subtext");

  form.on("submit", function (e) {
    e.preventDefault();

    const name = $("#name").val();
    const phone = $("#phone");
    const city = $("input[name='radiobtn']:checked").val();
    const data = { city, name, phone: phone.val() };

    if (phone.val().length < 10) {
      phone
        .addClass("animate__animated animate__shakeX")
        .one("animationend", function () {
          phone.removeClass("animate__animated animate__shakeX");
          formText.text("Пожалуйста, введите номер телефона");
        });
      return;
    }

    // Отправляем данные на сервер с помощью Axios

    grecaptcha.ready(function () {
      grecaptcha
        .execute("6LeQS7gpAAAAAB4wPkTagcE1vJWPFCDvHz9bt5sS", {
          action: "submit",
        })
        .then(function (token) {
          axios
            .post("send-message.php", data)
            .then(function (response) {
              console.log("Данные успешно отправлены");
              formText.text("Ваша заявка направлена, ожидайте звонка!");
              formText.addClass("animate__animated animate__pulse");
              MicroModal.show("modal-1");
            })
            .catch(function (error) {
              console.error("Возникла ошибка:", error);
              formText.text(
                "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.",
              );
            });
        });
    });
  });
};
