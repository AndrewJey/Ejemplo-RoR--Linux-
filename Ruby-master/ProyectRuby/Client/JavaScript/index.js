/**
 * Created by ronald on 15/04/15.
 */
var url="http://localhost:3000/"

    function fnButtons() {
        $("#user_login").bind("click", function () {
            var formdata = $("#form_login").serialize();
            var tempurl = url;

            tempurl += "login.json";
            console.log(tempurl);
            $.ajax({
                url: tempurl,
                method: "POST",
                data: formdata,
                dataType: "json",
                success: function (data) {
                    $('#userlogin_result').val(JSON.stringify(data))
                    localStorage.setItem('authtoken',data.auth_token);
                },
                error:function( jqXHR, textStatus ) {
                    $('#userlogin_result').val(jqXHR.status+" Something went wrong");
                    console.log(textStatus);
                }
            });
        });

        $("#user_logout").bind("click", function () {
            var tempurl = url;
            tempurl += "logout.json";
            console.log(tempurl);
            $.ajax({
                url: tempurl,
                method: "GET",
                dataType: "json",
                headers: { Authorization: localStorage.getItem('authtoken')},
                success: function (data) {
                    $('#userlogin_result').val(JSON.stringify(data))

                },
                error:function( jqXHR, textStatus ) {
                    $('#userlogin_result').val(jqXHR.status+" Something went wrong");
                    console.log(textStatus);
                }
            });
        });

        $("#get_products").bind("click", function () {
            var id = document.getElementById('formproductid').value
            console.log("you press" + id);
            console.log();
            var tempurl = url;
            if (id == "") {
                tempurl += "products.json";
            }
            else {
                tempurl += "products/" + id + ".json";
            }
            $.ajax({
                url: tempurl,
                method: "GET",
                headers: { Authorization: localStorage.getItem('authtoken')},
                success: function (data) {
                    var requestdata = JSON.stringify(data);
                    $('#products_result').val(requestdata);
                    requestdata = JSON.parse(requestdata);
                    if (requestdata.length == undefined) {
                        $('#edit_product_name').val(requestdata.name);
                        $('#edit_product_price').val(requestdata.price);
                        $('#edit_product_state').val(requestdata.state);
                    }

                },
                error:function( jqXHR, textStatus ) {
                    $('#products_result').val(jqXHR.status+" The code you input doesnt exist or Something went wrong");
                    console.log(textStatus);
                }
            });
        });
        $("#new_product").bind("click", function () {
            var formdata = $("#form_newproduct").serialize();
            var tempurl = url;
            tempurl += "products.json";
            $.ajax({
                url: tempurl,
                method: "POST",
                data: formdata,
                dataType: "json",
                headers: { Authorization: localStorage.getItem('authtoken')},
                success: function (data) {
                    $('#createproduct_result').val(JSON.stringify(data))
                },
                error:function( jqXHR, textStatus ) {
                    $('#createproduct_result').val(jqXHR.status+" Something went wrong");
                    console.log(textStatus);
                }
            });
        });


        $("#delete_product").bind("click", function () {
            var id = document.getElementById('delete_productid').value
            var tempurl = url;
            tempurl += "products/"+id+".json";
            $.ajax({
                type: "POST",
                url: tempurl,
                dataType: "json",
                headers: { Authorization: localStorage.getItem('authtoken')},
                success: function (data) {
                    $('#deleteproduct_result').val(JSON.stringify(data))
                },
                error:function( jqXHR, textStatus ) {
                    $('#deleteproduct_result').val(jqXHR.status+" Something went wrong");
                    console.log(textStatus);
                }
            });
        });

        $("#edit_product").bind("click", function () {
            var id = document.getElementById('formproductid').value
            var formdata = $("#form_editproduct").serialize();
            var tempurl = url;
            tempurl += "products/"+id+".json";
            $.ajax({
                url: tempurl,
                method: "PUT",
                data: formdata,
                dataType: "json",
                headers: { Authorization: localStorage.getItem('authtoken')},
                success: function (data) {
                    $('#editproduct_result').val(JSON.stringify(data))
                },
                error:function( jqXHR, textStatus ) {
                    $('#editproduct_result').val(jqXHR.status+" Something went wrong");
                    console.log(textStatus);
                }
            });
        });
        $("#get_transactions").bind("click", function () {
            var id = document.getElementById('formtransactionid').value
            console.log("you press" + id);
            console.log();
            var tempurl = url;
            if (id == "") {
                tempurl += "transactions.json";
            }
            else {
                tempurl += "transactions/" + id + ".json";
            }
            $.ajax({
                url: tempurl,
                method: "GET",
                headers: { Authorization: localStorage.getItem('authtoken')},
                success: function (data) {
                    var requestdata = JSON.stringify(data);
                    $('#transactions_result').val(requestdata);
                },
                error:function( jqXHR, textStatus ) {
                    $('#transactions_result').val(jqXHR.status+" The code you input doesnt exist or Something went wrong");
                    console.log(textStatus);
                }
            });
        });

        $("#new_transaction").bind("click", function () {
            var formdata = $("#form_newtransaction").serialize();
            var tempurl = url;
            tempurl += "transactions.json";
            $.ajax({
                url: tempurl,
                method: "POST",
                data: formdata,
                dataType: "json",
                headers: { Authorization: localStorage.getItem('authtoken')},
                success: function (data) {
                    $('#createtransaction_result').val(JSON.stringify(data))
                },
                error:function( jqXHR, textStatus ) {
                    $('#createtransaction_result').val(jqXHR.status+" Something went wrong");
                    console.log(textStatus);
                }
            });
        });
    }




    function cambiarPestanna(pestannas, pestanna) {

        // Obtiene los elementos con los identificadores pasados.
        pestanna = document.getElementById(pestanna.id);
        listaPestannas = document.getElementById(pestannas.id);

        // Obtiene las divisiones que tienen el contenido de las pestañas.
        cpestanna = document.getElementById('c' + pestanna.id);
        listacPestannas = document.getElementById('contenido' + pestannas.id);

        i = 0;
        // Recorre la lista ocultando todas las pestañas y restaurando el fondo
        // y el padding de las pestañas.
        while (typeof listacPestannas.getElementsByTagName('div')[i] != 'undefined') {
            $(document).ready(function () {
                $(listacPestannas.getElementsByTagName('div')[i]).css('display', 'none');
                $(listaPestannas.getElementsByTagName('li')[i]).css('background', '');
                $(listaPestannas.getElementsByTagName('li')[i]).css('padding-bottom', '');
            });
            i += 1;
        }
        $(document).ready(function () {
            // Muestra el contenido de la pestaña pasada como parametro a la funcion,
            // cambia el color de la pestaña y aumenta el padding para que tape el
            // borde superior del contenido que esta juesto debajo y se vea de este
            // modo que esta seleccionada.
            $(cpestanna).css('display', '');
            $(pestanna).css('background', 'dimgray');
            $(pestanna).css('padding-bottom', '2px');
        });
    }

