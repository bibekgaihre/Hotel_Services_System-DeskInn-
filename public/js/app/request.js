class Request {
  listnotification() {
    $.ajax({
      url: "/api/v1/notification",
      method: "GET",
      headers: { Authorization: "Bearer " + Cookies.get("token") }
    })
      .done(function(d) {
        for (let i = 0; i < d.length; i++) {
          console.log(d[i].url);
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
}
