const button = document.querySelector(".button")
    button.addEventListener("click", (e)=> {
         fetch('/payment/prepare', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                appointment:
                    {
                        appointmentid: document.querySelector("#appointmentId").value
                    },
    
                }),
        })

         fetch('/payment/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                appointment:
                    {
                        appointmentid: document.querySelector("#appointmentId").value
                    },
    
                }),
        })
        .then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
            
        })
        .then(({url}) => {
            window.location = url 
        })
        .catch(e => {
            console.error(e.error)
        })

    })