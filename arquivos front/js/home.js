// O botão "Entrar" na sua home precisa de um ouvinte
document.querySelector('.btn-secondary').addEventListener('click', (e) => {
    // Se o seu login estiver em outra página:
    window.location.href = 'login.html'; 
});