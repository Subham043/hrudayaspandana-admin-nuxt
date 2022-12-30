export default function({ redirect,  store }) {
    const role = store.state.auth.user.role
    if (role!=="ADMIN" && role!=="Admin" && role!=="admin") {
        return redirect('/')
    }
}