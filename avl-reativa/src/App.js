/*
*   @author Douglas da Silva e Eduardo 
*   Trabalho Estruturas Avançadas de dados I - Unisinos 2019/02
*/

import React, { useState } from 'react' //useEffect
import logo from './logo.svg'

import ListaPessoas from './components/ListaPessoas/ListaPessoas'

import Pessoa from './classes/Pessoa'

import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'
import ArvoreAVL from './classes/ArvoreAVL'

function App() {

  const [file, setFile] = useState({})
  const [listaPessoas, setListaPessoas] = useState([])
  const [listaPessoasBusca, setListaPessoasBusca] = useState([])
  const [cpfBusca, setCpfBusca] = useState([])
  const [nomeBusca, setNomeBusca] = useState([])
  const [dataInicial, setDataInicial] = useState([])
  const [dataFinal, setDataFinal] = useState([])

  const [arvoreCPF] = useState(new ArvoreAVL((a, b) => {
    if (a.cpf > b.cpf) {
      return 1
    } else if (a.nome < b.nome) {
      return -1
    } else {
      return 0
    }
  }))

  const [arvoreDataDeNascimento] = useState(new ArvoreAVL((a, b) => {
    if (a.dataNascimento > b.dataNascimento) {
      return 1
    } else if (a.dataNascimento < b.dataNascimento) {
      return -1
    } else {
      return 0
    }
  }))

  const [arvoreNome] = useState(new ArvoreAVL((a, b) => {
    if (a.nome > b.nome) {
      return 1
    } else if (a.nome < b.nome) {
      return -1
    } else {
      return 0
    }
  }))

  const onFormSubmit = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    try {
      reader.readAsText(file)

      let dadosPessoa = []
      let pessoa = {}

      reader.onload = (content) => {

        let pessoas = content.target.result.split("\n").map((p, i) => {
          dadosPessoa = p.split(";")

          pessoa = new Pessoa(dadosPessoa[0].trim(), dadosPessoa[1].trim(), dadosPessoa[2].trim(), moment(dadosPessoa[3].trim(), "DD/MM/YYYY"), dadosPessoa[4].trim(), i)

          arvoreCPF.inserir({
            cpf: pessoa.cpf,
            id: i
          })

          arvoreDataDeNascimento.inserir({
            dataNascimento: pessoa.dataNascimento,
            id: i
          })

          arvoreNome.inserir({
            nome: pessoa.nome,
            id: i
          })

          return pessoa
        })

        console.log(arvoreDataDeNascimento)

        setListaPessoas(pessoas)
      }
    } catch (exc) {
      alert("Conteúdo inválido")
    }

  }

  const buscaPorCPF = () => {
    const no = arvoreCPF.busca({ cpf: cpfBusca })
    setListaPessoasBusca(listaPessoas.filter(p => no.elemento.id === p.id))
  }

  const buscaPorDataDeNascimento = () => {
    const listaIds = arvoreDataDeNascimento.buscaPorIntervaloData('dataNascimento', moment(dataInicial, 'DD/MM/YYYY'), moment(dataFinal, 'DD/MM/YYYY')).map(p => p.id)
    setListaPessoasBusca(listaPessoas.filter(p => listaIds.includes(p.id)))

  }

  const buscaPorNome = () => {
    const listaIds = arvoreNome.buscaStartsWith(nomeBusca, 'nome').map(p => p.id)
    setListaPessoasBusca(listaPessoas.filter(p => listaIds.includes(p.id)))
  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <form className="file-upload" onSubmit={onFormSubmit}>
          <h1>Envie o arquivo CSV</h1>
          <div className="mt-3 row">
            <div className="col-md-8">
              <input type="file" onChange={e => setFile(e.target.files[0])} />
            </div>
            <div className="col-md-4">
              <button className="btn btn-primary" type="submit" >Upload</button>
            </div>
          </div>
        </form>
        {listaPessoas.length > 0 &&
          <div>
            <div className="mt-3 row">
              <div className="col-md-8">
                <input onChange={e => setCpfBusca(e.target.value)} className="form-control" type="text" placeholder="Buscar por CPF" />
              </div>
              <div className="col-md-4">
                <button className="btn btn-primary" type="submit" onClick={buscaPorCPF} >Buscar por CPF</button>
              </div>
            </div>
            <div className="mt-3 row">
              <div className="col-md-8">
                <input onChange={e => setNomeBusca(e.target.value)} className="form-control" type="text" placeholder="Buscar por Nome" />
              </div>
              <div className="col-md-4">
                <button onClick={buscaPorNome} className="btn btn-primary" type="submit"  >Buscar por Nome</button>
              </div>
            </div>
            <div className="mt-3 row">
              <div className="col-md-4">
                <input onChange={e => setDataInicial(e.target.value)} className="form-control col-md-12" type="text" placeholder="Data de Nascimento Inicial" />
              </div>
              <div className="col-md-4">
                <input onChange={e => setDataFinal(e.target.value)} className="form-control col-md-12" type="text" placeholder="Data de Nascimento Final" />
              </div>
              <div className="col-md-4">
                <button className="btn btn-primary" type="submit" onClick={buscaPorDataDeNascimento}>Buscar por Data de Nascimento</button>
              </div>
            </div>
          </div>
        }

        <div>
          <ListaPessoas listaPessoas={listaPessoasBusca} />
        </div>

      </div>
    </div>
  )
}

export default App



