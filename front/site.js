/* eslint-env jquery */

$('#table').bootstrapTable({
  columns: [{
    field: 'name',
    title: 'Service Provider',
    sortable: true
  }, {
    field: 'email',
    title: 'Abuse email',
    sortable: true,
    formatter: 'createLink'
  }, {
    field: 'form',
    title: 'Abuse form',
    sortable: true,
    formatter: 'createLink'
  }, {
    field: 'policy',
    title: 'Spam policy',
    sortable: true,
    formatter: 'createLink'
  }],
  url: 'esp-abuse.json',
  dataField: 'providers',
  search: true,
  searchAlign: 'left',
  searchAccentNeutralise: true,
  showSearchButton: false,
  showSearchClearButton: true,
  searchHighlight: true,
  searchOnEnterKey: false,
  width: 560,
  pagination: true,
  theadClasses: 'thead-light',
  exportTypes: ['json', 'xml', 'csv', 'txt', 'sql'],
  showExport: true,
  serverSort: false
})

function createLink (value, row, index, field) { // eslint-disable-line no-unused-vars
  if (value == null) return '-'

  if (field === 'email') {
    return [
      `<a class="link" href="mailto:${value}" title="${field}">`,
      `${value}`,
      '</a>'
    ].join('')
  } else {
    return [
      `<a class="link" href="${value}" title="${field}">`,
      '<i class="fa fa-link"></i>',
      '</a>'
    ].join('')
  }
}
