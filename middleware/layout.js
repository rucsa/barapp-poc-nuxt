export default function (context) {
  console.log('from middleware')
  console.log(context)
  if (context.$auth.$state.user.accessLevel === 'ADMIN') {
    console.log('Middleware returned layout: admin')
    return 'admin'
  } else if (context.$auth.$state.user.accessLevel === 'STAFF') {
    console.log('Middleware returned layout: staff')
    return 'staff'
  } else {
    console.log('Middleware returned layout: member')
    return 'member'
  }
}
