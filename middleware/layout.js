export default function (context) {
  if (context.$auth.$state.user.accessLevel === 'ADMIN') {
    return 'admin'
  } else if (context.$auth.$state.user.accessLevel === 'STAFF') {
    return 'staff'
  } else if (context.$auth.$state.user.accessLevel === 'SERGEANT') {
    return 'sergeant'
  } else {
    return 'member'
  }
}
