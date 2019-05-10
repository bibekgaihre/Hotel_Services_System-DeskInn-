class Request {
  listnotification() {
    $.ajax({
      url: "/api/v1/notification",
      method: "GET",
      headers: { Authorization: "Bearer " + Cookies.get("token") }
    })
      .done(function(d) {
        for (let i = 0; i < d.length; i++) {
          $("#nots").append(
            `<div class="media tm-notification-item">
              <div class="media-body" style="cursor:pointer" >
                <p class="mb-2" style="color:#ffffff" >
                  <b>${d[i].info}</b> 
                  .
                </p>
                <span class="tm-small tm-text-color-secondary"></span>
              </div>
            </div>`
          );
        }
      })
      .fail(function(err) {
        alert(err.responseJSON.message);
      });
  }
  getGreetings() {
    var thehours = new Date().getHours();
    var themessage;
    var morning = "<b>Good morning Admin</b>";
    var afternoon = "<b>Good afternoon Admin</b>";
    var evening = "<b>Good evening Admin</b>";

    if (thehours >= 0 && thehours < 12) {
      themessage = morning;
    } else if (thehours >= 12 && thehours < 17) {
      themessage = afternoon;
    } else if (thehours >= 17 && thehours < 24) {
      themessage = evening;
    }

    $("#Greetings").append(themessage);
  }
  save() {
    let status;
    let requested_time = $("#requested_time").val();

    let requested_date = $("#requested_date").val();
    requested_time = requested_date + "" + requested_time;
    requested_time = moment(requested_time, "MM/DD/YYYY HH:mm").format();
    let room_no = $("#room_no").val();
    let source = $("#source").val();
    let request_type = $("#request_type").val();
    let description = $("textarea#description").val();
    let assigned_to = $("#assigned_to").val();
    let destination = $("#destination").val();
    if (!assigned_to) {
      status = "new";
    } else {
      status = "assigned";
    }
    if (request_type !== "food" && request_type !== "toiletries" && !$("#requested_time").val()) {
      $("#msg").text("Please select requested time");
      $("#msg").show();
    } else if (request_type === "transport" && !destination) {
      $("#msg").text("Please enter the destination");
      $("#msg").show();
    } else if ((request_type === "food" || request_type === "toiletries") && !description) {
      $("#msg").text(
        "Please Enter Description such as: Food menu or Toiletries Items according to request"
      );
      $("#msg").show();
    } else {
      if (request_type === "food" || request_type === "toiletries") {
        requested_time = null;
      }
      let data = {
        room_no,
        source,
        request_type,
        requested_time,
        status,
        note: description,
        assigned_to,
        details: destination
      };

      $.ajax({
        url: "/api/v1/request",
        headers: { Authorization: "Bearer " + Cookies.get("token") },
        method: "POST",
        data
      })
        .done(d => {
          swal({
            title: "Done",
            text: "Users Request Registered!",
            buttons: true,
            timer: 3000
          }).then(() => {
            location.replace("/ ");
          });
        })
        .fail(e => {
          $("#msg").show();
          $("#msg").html(e.responseJSON.message);
        });
    }
  }
}
