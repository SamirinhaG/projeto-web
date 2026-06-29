const btn = document.getElementById('btnLogin');

btn.addEventListener('click', async () => {
    const matricula = document.getElementById('matricula').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!matricula || !senha) {
        alert('Preencha matrícula e senha.');
        return;
    }

    btn.disabled = true;
    btn.textContent = 'Entrando...';

    try {
        const resposta = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ matricula, senha })
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            localStorage.setItem('alunoId', resultado.id);
            localStorage.setItem('alunoNome', resultado.nome);
            window.location.href = 'dashboard.html';
        } else {
            alert(resultado.error);
        }
    } catch (err) {
        alert('Não foi possível conectar ao servidor.');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Entrar';
    }
});