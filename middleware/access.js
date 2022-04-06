export default function (context) {
  // Check user access level
  if (!['ADMIN', 'STAFF'].includes(context.$auth.$state.user.accessLevel)) {
    console.log(context.$auth.$state.user)
    context.redirect(`/welcome/${context.$auth.$state.user._id}`)
  }
}
