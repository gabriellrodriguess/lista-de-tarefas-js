let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

function salvar() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

function renderizar() {
  let lista = document.getElementById("lista")
  lista.innerHTML = ""

  tarefas.forEach((tarefa, index) => {
    let li = document.createElement("li")
    li.innerText = tarefa.nome

    if (tarefa.feito) {
      li.classList.add("concluida")
    }

    li.onclick = () => {
      tarefas[index].feito = !tarefas[index].feito
      salvar()
      renderizar()
    }

    let btn = document.createElement("button")
    btn.innerText = "X"

    btn.onclick = (e) => {
      e.stopPropagation()
      tarefas.splice(index, 1)
      salvar()
      renderizar()
    }

    li.appendChild(btn)
    lista.appendChild(li)
  })
}

function adicionarTarefa() {
  let input = document.getElementById("inputTarefa")

  if (input.value === "") return

  tarefas.push({
    nome: input.value,
    feito: false
  })

  input.value = ""
  salvar()
  renderizar()
}

renderizar()
