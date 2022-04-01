export default function (context) {
  if (context.$auth.$state.user.accessLevel === 'ADMIN') {
    console.log('Middleware returned layout: admin')
    return 'admin'
  } else if (context.$auth.$state.user.accessLevel === 'STAFF') {
    console.log('Middleware returned layout: staff')
    return 'staff'
  } else if (context.$auth.$state.user.accessLevel === 'SERGEANT') {
    console.log('Middleware returned layout: sergeant')
    return 'sergeant'
  } else {
    console.log('Middleware returned layout: member')
    return 'member'
  }
}
