class Login {
  constructor() {}
  process_login(form) {
    let email = $("input[name='email']").val();
    let password = $("input[name='password']").val();
    console.log(email);
    console.log(password);

    $.ajax({
      url: "/api/v1/user/login",
      method: "POST",
      data: { email, password }
    })
      .done(function(data) {
        window.location.replace("/");
      })
      .fail(function(err) {
        $("#msg").html(err.responseJSON.message);
        $("#msg").show();
      });
    return false;
  }
}
