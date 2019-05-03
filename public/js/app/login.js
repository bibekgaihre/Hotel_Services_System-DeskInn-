class Login {
  constructor() {}
  process_login(form) {
    let username = $("input[name='username']").val();
    let password = $("input[name='password']").val();
    console.log(username);
    console.log(password);

    $.ajax({
      url: "/login_process",
      method: "POST",
      data: { username, password }
    })
      .done(function(data) {})
      .fail(function(err) {
        $("#msg").html(err.responseJSON.message);
        $("#msg").show();
      });
    return false;
  }
}
