let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

function renderizarTarefas() {
  const lista = document.getElementById("lista")
  lista.innerHTML = ""

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li")

    const span = document.createElement("span")
    span.textContent = tarefa.nome

    if (tarefa.feita) {
      span.classList.add("concluida")
    }

    span.onclick = function () {
      tarefas[index].feita = !tarefas[index].feita
      salvarTarefas()
      renderizarTarefas()
    }

    const botaoExcluir = document.createElement("button")
    botaoExcluir.textContent = "Excluir"

    botaoExcluir.onclick = function () {
      tarefas.splice(index, 1)
      salvarTarefas()
      renderizarTarefas()
    }

    li.appendChild(span)
    li.appendChild(botaoExcluir)
    lista.appendChild(li)
  })
}

function adicionarTarefa() {
  const input = document.getElementById("inputTarefa")
  const texto = input.value.trim()

  if (texto === "") {
    return
  }

  tarefas.push({
    nome: texto,
    feita: false
  })

  input.value = ""
  salvarTarefas()
  renderizarTarefas()
}

renderizarTarefas()
