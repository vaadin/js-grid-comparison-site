```html
<ag-grid style="height: 400px; display: block;" id="myGrid" class="ag-fresh"></ag-grid>
<script>
  agGrid.initialiseAgGridWithWebComponents();
  var columnDefs = [{
      headerName: "First Name",
      field: "firstName"
    },{
      headerName: "Last Name",
      field: "lastName"
    },{
      headerName: "Address",
      field: "address"
    }];
  var gridOptions = {
    columnDefs: columnDefs,
    rowData: peopleArray200.map(function (row) {
      return {
        firstName: row.firstName,
        lastName: row.lastName,
        address: row.address.street + ', ' + row.address.city
      }
    })
  };
  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.querySelector('#myGrid');
    grid.setGridOptions(gridOptions);
  });
</script>
```