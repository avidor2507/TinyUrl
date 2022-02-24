(function () {
    const form = document.querySelector('.needs-validation');
    const copyButton = document.querySelector('#copy');
    const resaultInput = document.querySelector('#res');
    const input = document.querySelector('#url');
    const errorMessage = document.querySelector("#url-input-error");

    copyButton.addEventListener('click', e => {
        try {
            navigator.clipboard.writeText(resaultInput.value);
        } catch {

        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            //if not valid
            errorMessage.innerHTML = input.validationMessage;
            e.stopPropagation();
        } else {
            let data = { url: input.value }
            //if valid
            fetch('http://localhost:8080/short', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.ok) {
                    res.json().then(value => {
                        resaultInput.value = value;
                        copyButton.disabled = false;
                        input.setCustomValidity("");
                        errorMessage.innerHTML = "";
                    })
                }
                else {
                    res.json().then(value => {
                        input.setCustomValidity(value);
                        errorMessage.innerHTML = value;
                    })
                }
            }).catch(err => {
                input.setCustomValidity("Server connection error");
                errorMessage.innerHTML = "Server connection error";
                e.stopPropagation();
            });
        }

        form.classList.add('was-validated');
    }, false);
})();

