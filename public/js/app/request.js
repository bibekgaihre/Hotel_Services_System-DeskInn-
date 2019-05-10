class Request {
  constructor(dTable) {
    this.dTable = dTable;
  }
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
  list() {
    this.dTable = $("#dashboard").DataTable({
      pageLength: 50,
      processing: true,
      pagination: true,
      bPagination: true,
      pagingType: "full_numbers",
      responsive: true,
      filter: true,
      sort: false,
      serverSide: true,
      searchDelay: 500,
      dom: "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-4'i><'col-sm-8'<'float-right p-2'p>>>",
      ajax: {
        url: "/api/v1/request",
        headers: { Authorization: "Bearer " + Cookies.get("token") },
        method: "GET",
        dataFilter: data => {
          let json = JSON.parse(data);
          json.recordsTotal = json.total;
          json.recordsFiltered = json.total;
          return JSON.stringify(json);
        },
        data: function(d) {
          return $.extend(
            {},
            {
              start: d.start,
              limit: d.length,
              search: d.search
            }
          );
        }
      },
      initComplete: (settings, json) => {
        setInterval(() => {
          this.dTable.ajax.reload();
        }, 5000);
      },
      columns: [
        {
          data: "room_no"
        },
        {
          data: "source"
        },
        {
          data: "request_type"
        },
        {
          data: null,
          render: d => {
            if (d.requested_time == null) {
              return "";
            } else if (d.requested_time) {
              return moment.utc(d.requested_time).format("lll");
              //  return moment(d.requested_time).format("lll");
            }
          }
        },
        {
          data: null,
          render: d => {
            return d.assigned_to || "";
          }
        },
        {
          data: "status"
        },
        {
          data: null,
          class: "text-center",
          render: (d, type, row, meta) => {
            if (d.status === "cancelled" || d.status === "completed") {
              return `<button type="button" class="btn btn-info" title="Detail" onclick="window.location.replace('/request/${
                d._id
              }')">Detail </button>`;
            } else {
              return `<button type="button" class="btn btn-info" title="Detail" onclick="window.location.replace('/request/${
                d._id
              }')">Detail </button>  &nbsp;<button type="button" class="btn btn-danger" id="cancelbutton" title="cancel" onclick="request.cancelRequest('${
                d._id
              }')">Cancel </button>  &nbsp;<button type="button" class="btn btn-success" id="completebutton" title="completed" onclick="request.completeRequest('${
                d._id
              }')">Completed </button>  `;
            }
          }
        }
      ]
    });
  }
  cancelRequest(id) {
    swal({
      title: "Are you sure?",
      text: "You are canceling a request",
      content: {
        element: "input",
        attributes: {
          placeholder: "Type description of cancelling this request"
        }
      },
      buttons: { cancel: true, confirm: "Confirm" },
      dangerMode: true,
      icon: "warning",
      closeOnClickOutside: false
    }).then(willCancel => {
      if (willCancel) {
        var note = willCancel;
        $.ajax({
          url: `/api/v1/request/${id}/status`,
          headers: { Authorization: "Bearer " + Cookies.get("token") },
          method: "PUT",
          data: { note, status: "cancelled" }
        }).done(d => {
          this.dTable.ajax.reload();
        });
      }
    });
  }
  completeRequest(id) {
    swal({
      title: "Are you sure?",
      text: "You are marking the task to completed",
      buttons: { cancel: true, confirm: "Confirm" },
      dangerMode: false,
      icon: "success",
      closeOnClickOutside: false
    }).then(willConfirm => {
      if (willConfirm) {
        $.ajax({
          url: `/api/v1/request/${id}/status`,
          headers: { Authorization: "Bearer " + Cookies.get("token") },
          method: "PUT",
          data: { status: "completed" }
        }).done(d => {
          this.dTable.ajax.reload();
        });
      }
    });
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
            buttons: false,
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
  enableEdit(editMode) {
    if (editMode) {
      $("#editable :input").prop("disabled", false);
      $("#btnUpdate").prop("disabled", false);
      $("#btnUpdate").show();
      $("#btnCancel").show();
      $("#btnEdit").hide();
    } else {
      $("#frmDetail :input").attr("disabled", true);
      $("#btnUpdate").hide();
      $("#btnCancel").hide();
      $("#btnEdit").show();
    }
  }
  getDetail(id) {
    $.ajax({
      url: `/api/v1/request/${id}`,
      headers: { Authorization: "Bearer " + Cookies.get("token") },
      method: "GET"
    }).done(data => {
      if (data.status === "completed" || data.status === "cancelled") {
        $("#btnEdit").hide();
      }
      if (data.requested_time === null) data.requested_time === "";
      else data.requested_time = moment.utc(data.requested_time).format("lll");
      if (data.request_type === "transport") {
        $("#destinationdetail").show();
        $("#destination").val(data.details);
      }
      $("#room_no").val(data.room_no);
      $("#source").val(data.source);
      $("#request_type").val(data.request_type);
      $("textarea#description").val(data.note);
      $("#requested_time").val(data.requested_time);
      $("#assigned_to").val(data.assigned_to);
      // $("#status").val(data.status);
      $(`#status option[value=${data.status}]`).prop("selected", true);
    });
  }
  update(id) {
    let requested_time = $("#requested_time").val();
    let room_no = $("#room_no").val();
    let source = $("#source").val();
    let request_type = $("#request_type").val();
    let description = $("textarea#description").val();
    let destination = $("#destination").val();
    let assigned_to = $("#assigned_to").val();
    let status = $("#status").val();
    if (!assigned_to) {
      $("#msg").text("Please select a person to assign the task");
      $("#msg").show();
    } else if (assigned_to && (status === "new" || status === "")) {
      $("#msg").text("Invalid Status");
      $("#msg").show();
    } else {
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
        url: "/api/v1/request/" + id,
        headers: { Authorization: "Bearer " + Cookies.get("token") },
        method: "PUT",
        data
      })
        .done(d => {
          this.enableEdit(false);
        })
        .fail(e => {
          $("#msg").show();
          $("#msg").html(e.responseJSON.message);
        });
    }
  }
}
