export default function (context) {
    try {
        const { user } = context.query
        fetch('http://localhost:3002/auth/login/verify', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: user })
        }).then(res => {
            // if (res.status === 200)
        }).catch(console.log)
        console.log('Verifyingg', user)

    } catch (error) {
        console.log('Eita')
    }
}