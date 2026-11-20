/**
 * ProyectRuby REST Client (hardened & testable in browser and Node)
 */
(function (root) {
  'use strict';

  function resolveApiBase(override) {
    var base = override;
    if (!base && typeof root !== 'undefined' && root.PROYECTRUBY_API_URL) {
      base = root.PROYECTRUBY_API_URL;
    }
    if (!base && typeof root !== 'undefined' && root.localStorage) {
      try {
        base = root.localStorage.getItem('api_url');
      } catch (e) {
        base = null;
      }
    }
    base = String(base || 'http://localhost:3000/').trim();
    return base.endsWith('/') ? base : base + '/';
  }

  function buildResourceUrl(base, resource, id) {
    var rootUrl = resolveApiBase(base);
    var cleanId = id == null ? '' : String(id).trim();
    if (!cleanId) {
      return rootUrl + resource + '.json';
    }
    return rootUrl + resource + '/' + encodeURIComponent(cleanId) + '.json';
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      resolveApiBase: resolveApiBase,
      buildResourceUrl: buildResourceUrl
    };
    return;
  }

  var $ = root.jQuery || root.$;

  function authHeaders() {
    var token = null;
    try {
      token = root.localStorage ? root.localStorage.getItem('authtoken') : null;
    } catch (e) {
      token = null;
    }
    return token ? { Authorization: token } : {};
  }

  function fnButtons() {
    if (!$) return;

    $('#user_login').off('click').on('click', function () {
      var formdata = $('#form_login').serialize();
      $.ajax({
        url: resolveApiBase() + 'login.json',
        method: 'POST',
        data: formdata,
        dataType: 'json',
        success: function (data) {
          $('#userlogin_result').val(JSON.stringify(data));
          if (data && data.auth_token && root.localStorage) {
            root.localStorage.setItem('authtoken', data.auth_token);
          }
        },
        error: function (jqXHR) {
          $('#userlogin_result').val(jqXHR.status + ' Error al iniciar sesión');
        }
      });
    });

    $('#user_logout').off('click').on('click', function () {
      $.ajax({
        url: resolveApiBase() + 'logout.json',
        method: 'GET',
        dataType: 'json',
        headers: authHeaders(),
        success: function (data) {
          if (root.localStorage) {
            root.localStorage.removeItem('authtoken');
          }
          $('#userlogin_result').val(JSON.stringify(data));
        },
        error: function (jqXHR) {
          $('#userlogin_result').val(jqXHR.status + ' Error al cerrar sesión');
        }
      });
    });

    $('#get_products').off('click').on('click', function () {
      var idEl = document.getElementById('formproductid');
      var id = idEl ? idEl.value.trim() : '';
      $.ajax({
        url: buildResourceUrl(null, 'products', id),
        method: 'GET',
        headers: authHeaders(),
        success: function (data) {
          $('#products_result').val(JSON.stringify(data));
          if (data && !Array.isArray(data)) {
            $('#edit_product_name').val(data.name || '');
            $('#edit_product_price').val(data.price != null ? data.price : '');
            $('#edit_product_state').val(data.state != null ? data.state : '');
          }
        },
        error: function (jqXHR) {
          $('#products_result').val(jqXHR.status + ' No se encontró el producto o ocurrió un error');
        }
      });
    });

    $('#new_product').off('click').on('click', function () {
      var formdata = $('#form_newproduct').serialize();
      $.ajax({
        url: buildResourceUrl(null, 'products', ''),
        method: 'POST',
        data: formdata,
        dataType: 'json',
        headers: authHeaders(),
        success: function (data) {
          $('#createproduct_result').val(JSON.stringify(data));
        },
        error: function (jqXHR) {
          $('#createproduct_result').val(jqXHR.status + ' No se pudo crear el producto');
        }
      });
    });

    $('#delete_product').off('click').on('click', function () {
      var id = ($('#delete_productid').val() || '').trim();
      if (!id) {
        $('#deleteproduct_result').val('Ingrese un identificador de producto válido.');
        return;
      }
      $.ajax({
        url: buildResourceUrl(null, 'products', id),
        method: 'DELETE',
        dataType: 'json',
        headers: authHeaders(),
        success: function (data) {
          $('#deleteproduct_result').val(JSON.stringify(data || { deleted: true }));
        },
        error: function (jqXHR) {
          $('#deleteproduct_result').val(jqXHR.status + ' No se pudo eliminar el producto');
        }
      });
    });

    $('#edit_product').off('click').on('click', function () {
      var idEl = document.getElementById('formproductid');
      var id = idEl ? idEl.value.trim() : '';
      if (!id) {
        $('#editproduct_result').val('Ingrese el ID del producto a editar.');
        return;
      }
      var formdata = $('#form_editproduct').serialize();
      $.ajax({
        url: buildResourceUrl(null, 'products', id),
        method: 'PUT',
        data: formdata,
        dataType: 'json',
        headers: authHeaders(),
        success: function (data) {
          $('#editproduct_result').val(JSON.stringify(data));
        },
        error: function (jqXHR) {
          $('#editproduct_result').val(jqXHR.status + ' No se pudo actualizar el producto');
        }
      });
    });

    $('#get_transactions').off('click').on('click', function () {
      var idEl = document.getElementById('formtransactionid');
      var id = idEl ? idEl.value.trim() : '';
      $.ajax({
        url: buildResourceUrl(null, 'transactions', id),
        method: 'GET',
        headers: authHeaders(),
        success: function (data) {
          $('#transactions_result').val(JSON.stringify(data));
        },
        error: function (jqXHR) {
          $('#transactions_result').val(jqXHR.status + ' No se encontró la transacción o ocurrió un error');
        }
      });
    });

    $('#new_transaction').off('click').on('click', function () {
      var formdata = $('#form_newtransaction').serialize();
      $.ajax({
        url: buildResourceUrl(null, 'transactions', ''),
        method: 'POST',
        data: formdata,
        dataType: 'json',
        headers: authHeaders(),
        success: function (data) {
          $('#createtransaction_result').val(JSON.stringify(data));
        },
        error: function (jqXHR) {
          $('#createtransaction_result').val(jqXHR.status + ' No se pudo crear la transacción');
        }
      });
    });
  }

  function cambiarPestanna(pestannas, pestanna) {
    if (!pestannas || !pestanna) return;
    var tabEl = document.getElementById(pestanna.id);
    var listEl = document.getElementById(pestannas.id);
    var panelEl = document.getElementById('c' + pestanna.id);
    var panelsContainer = document.getElementById('contenido' + pestannas.id);
    if (!tabEl || !listEl || !panelEl || !panelsContainer) return;

    var divs = panelsContainer.children;
    for (var i = 0; i < divs.length; i++) {
      divs[i].style.display = 'none';
    }
    var tabs = listEl.getElementsByTagName('li');
    for (var j = 0; j < tabs.length; j++) {
      tabs[j].style.background = '';
      tabs[j].style.paddingBottom = '';
    }
    panelEl.style.display = '';
    tabEl.style.background = 'dimgray';
    tabEl.style.paddingBottom = '2px';
  }

  root.fnButtons = fnButtons;
  root.cambiarPestanna = cambiarPestanna;
})(typeof window !== 'undefined' ? window : globalThis);
