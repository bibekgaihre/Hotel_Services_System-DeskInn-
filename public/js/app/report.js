class Report {
  listReport() {
    $.ajax({
      url: "/api/v1/request",
      method: "GET",
      headers: { Authorization: "Bearer " + Cookies.get("token") }
    })
      .done(function(d) {
        var options = {
          title: {
            text: `Total Number of Requests: ${d.total}`
          },
          data: [
            {
              // Change type to "doughnut", "line", "splineArea", etc.
              type: "column",
              dataPoints: [
                { label: "Cleaning", y: d.total_requests[6].count },
                { label: "Food", y: d.total_requests[5].count },
                { label: "Transport", y: d.total_requests[3].count },
                { label: "Baggage", y: d.total_requests[2].count },
                { label: "Toiletries", y: d.total_requests[4].count },
                { label: "Book a Table", y: d.total_requests[1].count },
                { label: "Book Spa", y: d.total_requests[0].count }
              ]
            }
          ]
        };
        $("#chartContainer").CanvasJSChart(options);
      })
      .fail(function(err) {
        alert(err.responseJSON.message);
      });
  }
}
