$(function () {

    // select the employees table from the page and
    // store it in a variable for later use.
    var $employees = $("#employees");
    var prayers;
    // make an ajax call to the employees WebAPI service
    // to retrieve a JSON response of all the employees
    $.ajax({

        // the url to the service
        url: "http://localhost/mvbcprayer/api/prayer",
        crossDomain: true,
        // the format that the data should be in when
        // it is returned
        contentType: "json",
        beforeSend: function () {
            $("#ajaxSpinnerImage").show();
        },
        // the function that executes when the server
        // responds to this ajax request successfully
        success: function (data) {
            localStorage.setItem("data", data);
            localStorage.setItem("data", JSON.stringify(data));
            // put the JSON response in the employees table
            // iterate over the data items returned from the server
            // the index variable is the position in the colleciton.
            // the item variable is the item itself        

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //  alert('Failure');
            //some stuff on failure
        },
        complete: function (data) {
            $employees.append("<tbody>");
            prayers = JSON.parse(localStorage.getItem("data"));
            var yn;
            var row
            $.each(prayers, function (index, item) {
                if (item.Answer == true) {
                    yn = "Yes";
                    row = "<tr class='success'>";
                    lable = "<span class='label label-success'>";
                }
                else {
                    yn = "No";
                    row = "<tr class='warning'>";
                    lable = "<span class='label label-danger'>";
                }
                // append the first and last name to the table
                $employees.append(row + "<td>" + item.ID + "</td>" +
                    "<td>" + item.Name + "</td>" +
                    "<td>" + item.Date + "</td>" +
                    "<td>" + item.Description + "</td>" +
                    "<td>" + lable + yn + "</span></td></tr>"
                    );

            });
            $employees.append("</tbody>");

        },

    }).always(function () {
        $("#ajaxSpinnerImage").hide();
    });

});