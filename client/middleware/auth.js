export default async function auth({ store, redirect }) {
    try {
        const tokens = await localStorage.getItem('xTokens')
        const { refresh_token } = JSON.parse(tokens)
        if (!store.state.auth && !refresh_token) return redirect('/login')


        const answer = await fetch('http://localhost:3002/auth/login/check', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-refresh': refresh_token
            }
        })

        if (answer.status === 200) {
            store.commit('SET_AUTH', true, { root: true })
            return
        }

        throw new Error()
    } catch (err) {
        store.commit('SET_AUTH', false, { root: true })
        return redirect('/login')
    }
}