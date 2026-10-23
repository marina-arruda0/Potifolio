
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona os elementos que serão usados no JavaScript.
    const botaoTema = document.getElementById("botao-tema");
    const botaoMenu = document.getElementById("botao-menu");
    const menu = document.getElementById("menu");
    const botaoVoltarTopo = document.getElementById("voltar-topo");
    const anoAtual = document.getElementById("ano-atual");
    const textoDigitado = document.getElementById("texto-digitado");

    // 1. Alternar entre tema claro e escuro.
    const temaSalvo = localStorage.getItem("tema-portfolio");

    if (temaSalvo === "escuro") {
        document.body.classList.add("tema-escuro");
    }

    atualizarIconeTema();

    botaoTema.addEventListener("click", () => {
        document.body.classList.toggle("tema-escuro");

        const tema = document.body.classList.contains("tema-escuro")
            ? "escuro"
            : "claro";

        localStorage.setItem("tema-portfolio", tema);
        atualizarIconeTema();
    });

    function atualizarIconeTema() {
        const temaEscuro = document.body.classList.contains("tema-escuro");

        botaoTema.innerHTML = temaEscuro
            ? '<i class="bi bi-sun"></i>'
            : '<i class="bi bi-moon-stars"></i>';

        botaoTema.setAttribute(
            "aria-label",
            temaEscuro ? "Ativar tema claro" : "Ativar tema escuro"
        );
    }

    // 2. Abrir e fechar o menu em telas pequenas.
    botaoMenu.addEventListener("click", () => {
        const aberto = menu.classList.toggle("menu-aberto");

        botaoMenu.setAttribute("aria-expanded", String(aberto));
        botaoMenu.setAttribute(
            "aria-label",
            aberto ? "Fechar menu" : "Abrir menu"
        );

        botaoMenu.innerHTML = aberto
            ? '<i class="bi bi-x-lg"></i>'
            : '<i class="bi bi-list"></i>';
    });

    // Fecha o menu depois que uma seção é escolhida.
    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("menu-aberto");
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu");
            botaoMenu.innerHTML = '<i class="bi bi-list"></i>';
        });
    });

    // 3. Efeito de máquina de escrever.
    const frases = [
        "Estudante de Desenvolvimento Full Stack",
        "Aprendendo Front-end",
        "Transformando ideias em projetos"
    ];

    const movimentoReduzido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!movimentoReduzido) {
        let indiceFrase = 0;
        let indiceLetra = frases[0].length;
        let apagando = false;

        function escrever() {
            const frase = frases[indiceFrase];

            indiceLetra += apagando ? -1 : 1;
            textoDigitado.textContent = frase.slice(0, indiceLetra);

            let intervalo = apagando ? 35 : 65;

            if (!apagando && indiceLetra === frase.length) {
                apagando = true;
                intervalo = 1400;
            } else if (apagando && indiceLetra === 0) {
                apagando = false;
                indiceFrase = (indiceFrase + 1) % frases.length;
                intervalo = 300;
            }

            setTimeout(escrever, intervalo);
        }

        setTimeout(() => {
            indiceLetra = 0;
            escrever();
        }, 1800);
    }

    // 4. Mostrar o botão de voltar ao topo durante a rolagem.
    window.addEventListener("scroll", () => {
        botaoVoltarTopo.classList.toggle(
            "visivel",
            window.scrollY > 400
        );
    }, { passive: true });

    botaoVoltarTopo.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: movimentoReduzido ? "auto" : "smooth"
        });
    });

    // 5. Animar os elementos quando aparecem na tela.
    const elementosAnimados = document.querySelectorAll(".animar");

    if ("IntersectionObserver" in window && !movimentoReduzido) {
        const observador = new IntersectionObserver((entradas, observadorAtual) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("apareceu");
                    observadorAtual.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.12 });

        elementosAnimados.forEach((elemento) => {
            observador.observe(elemento);
        });
    } else {
        elementosAnimados.forEach((elemento) => {
            elemento.classList.add("apareceu");
        });
    }

    // 6. Atualizar o ano do rodapé automaticamente.
    anoAtual.textContent = new Date().getFullYear();

    // 7. Avisar quando um link pessoal ainda não foi preenchido.
    document.querySelectorAll(".link-pendente").forEach((link) => {
        link.addEventListener("click", (evento) => {
            if (link.getAttribute("href") === "#") {
                evento.preventDefault();
                alert("Adicione seu link pessoal no arquivo index.html.");
            }
        });
    });
});
