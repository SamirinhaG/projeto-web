const btn = document.getElementById('btnCadastrar');

btn.addEventListener('click', async () => {
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();
    const necessidade = document.getElementById('necessidade').value.trim();

    if (!nome || !telefone) {
        alert('Por favor, preencha nome e telefone.');
        return;
    }

    btn.disabled = true;
    btn.textContent = 'Enviando...';

    try {
        const resposta = await fetch('/api/pacientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, telefone, email, necessidade })
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            alert('Cadastro realizado com sucesso! Em breve entraremos em contato.');
            document.getElementById('nome').value = '';
            document.getElementById('telefone').value = '';
            document.getElementById('email').value = '';
            document.getElementById('necessidade').value = '';
        } else {
            alert('Erro: ' + resultado.error);
        }
    } catch (err) {
        alert('Não foi possível conectar ao servidor. Verifique se ele está rodando.');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Solicitar Atendimento';
    }
});