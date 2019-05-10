class Feedback {
  sendMail() {
    let description = $("#description").val();
    if (!description) {
      $("#msg").text("Please Enter Feedback");
      $("#msg").show();
    }
    if (description) {
      let data = { description };
      $.ajax({
        url: "/api/v1/user/sendFeedback",
        headers: { Authorization: "Bearer " + Cookies.get("token") },
        method: "POST",
        data
      })
        .done(d => {
          swal({
            title: "Done",
            text: "Feedback sent !!",
            buttons: true,
            timer: 3000
          }).then(() => {
            location.replace("/feedback ");
          });
        })
        .fail(e => {
          $("#msg").show();
          $("#msg").html(e.responseJSON.message);
        });
    }
  }
}
