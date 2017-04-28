```html
<table id="data-table">
    <thead>
      <tr>
        <td>First Name</td>
        <td>Last Name</td>
        <td>Address</td>
      </tr>
    </thead>
  </table>
  <script>
    $(document).ready(function () {
      $('#data-table').DataTable({
        data: peopleArray200,
        scroller: true,
        scrollY: 200,
        keys: true,
        columns: [{
            data: 'firstName'
          },
          {
            data: 'lastName'
          },
          {
            data: 'address',
            render: function (data, type, row) {
              return data.street + ', ' + data.city;
            }
          }
        ]
      });
    });
  </script>
  ```