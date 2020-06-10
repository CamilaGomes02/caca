import React from 'react'
import './ListaPessoas.css'

const ListaPessoas = props => {

    return (
        <div>
            {props.listaPessoas.length > 0 && 
                <table className="table table-dark">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">RG</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Data de Nascimento</th>
                        <th scope="col">Cidade de Nascimento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.listaPessoas.map((p, i) => {
                                return (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{p.rg}</td>
                                        <td>{p.cpf}</td>
                                        <td>{p.nome}</td>
                                        <td>{p.dataNascimento.format('DD/MM/YYYY')}</td>
                                        <td>{p.cidadeNascimento}</td>
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}

export default ListaPessoas
