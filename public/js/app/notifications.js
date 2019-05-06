//Make Connection

var socket = io.connect("localhost:3000");

showNotification = function({ title, body, url, tag }) {
  console.log({ title, body, url, tag });
  var notify = new Notify(title, {
    body,
    tag,
    // notifyShow: onShowNotification,
    // notifyClose: onCloseNotification,
    notifyClick: function() {
      window.location.replace(url);
    },
    // notifyError: onErrorNotification,
    timeout: 1000 * 60
  });

  if (Notify.needsPermission) {
    Notify.requestPermission(notify.show);
  } else {
    notify.show();

    $("#noti").append(`<li>
   <a href=${url} class="dropdown-item">
     <div>
       <i class="fa fa-inbox fa-fw"></i>${body}
       <span class="float-right text-muted small">${moment(Date.now()).fromNow()}</span>
     </div>
   </a>
 </li>
 <li class="dropdown-divider"></li>`);
    var n = $("#noti a div").length;
    $("#notificationnumber").html(n);
    toastr.success(title, body, {
      timeOut: 700000,
      extendedTimeOut: 100000,
      newestOnTop: true,
      positionClass: "toast-bottom-right",
      closeButton: true,
      showDuration: 400,
      hideDuration: 10000,
      onclick: function() {
        return (window.location.href = url);
      }
    });
  }
};

//Query Dom
socket.on("new_request", data => {
  showNotification(data);
});
//emit events
