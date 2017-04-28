```html
<paper-datatable data="{{people}}">
  <paper-datatable-column property="firstName" header="First Name">
  </paper-datatable-column>
  <paper-datatable-column property="lastName" header="Last Name">
  </paper-datatable-column>
  <paper-datatable-column property="address" header="Address">
    <template>
      <p>[[value.street]], [[value.city]]</p>
    </template>
  </paper-datatable-column>
</paper-datatable>
```