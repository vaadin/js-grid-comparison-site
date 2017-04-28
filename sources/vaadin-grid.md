```html
<vaadin-grid items="[[people]]">
  <vaadin-grid-column>
    <template class="header">First Name</template>
    <template>[[item.firstName]]</template>
  </vaadin-grid-column>
  <vaadin-grid-column>
    <template class="header">Last Name</template>
    <template>[[item.lastName]]</template>
  </vaadin-grid-column>
  <vaadin-grid-column>
    <template class="header">Address</template>
    <template>
      <p>[[item.address.street]], [[item.address.city]]</p>
    </template>
  </vaadin-grid-column>
</vaadin-grid>
```