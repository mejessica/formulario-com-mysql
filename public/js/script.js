document.addEventListener('DOMContentLoaded', () =>{
    const form = document.getElementById('form')
    const inputs = document.querySelectorAll('.obrigatorio')

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        checkInputs();
    });

 function checkInputs() {
        inputs.forEach(input => {
            const small = input.parentElement.querySelector('small');

            if (input.value.trim() === '') {
                setError(input, small, "campo obrigatório");
            } else {
                setSuccess(input, small);
            }
        });
    }

    function setError(input, small, message) {
         

        small.innerText = message;
        small.style.display = 'block';
        input.style.borderColor = 'red';
        small.style.color = 'red'
    }

    function setSuccess(input, small) {
        small.innerText = '';
        small.style.display = 'none';
        input.style.borderColor = 'green';
    }

});

