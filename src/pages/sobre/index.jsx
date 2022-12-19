import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import './sobre.css'

export default function Sobre() {

    return (

        <div>
            <Header />
            <main>
                <div class="container py-4">
                   
                    <div class="p-5 mb-4 bg-light rounded-3">
                        <div class="container-fluid py-5">
                            <h1 class="display-5 fw-bold">Projeto Monitoramento e Conservação das Tartarugas Marinhas</h1>
                            <p class="col-md-12 fs-4">Com entendimento sobre as espécies de quelônios que residem na costa de Pernambuco podem ser encontrar quatro delas no município de Paulista. Em uma faixa de 14 km de costa, desde a praia de enseadinha (Janga/PE) até o pontal de Marinha Farinha, as quatro espécies encontradas são as: Tartaruga-cabeçuda, Tartaruga-verde, Tartaruga-de-pente e a Tartaruga-oliva.</p>
                            <a href="https://www.instagram.com/paulista.tartarugasmarinhas/" target="_blank" class="btn btn-primary btn-lg">Instagram do projeto</a>
                            
                        </div>
                    </div>

                    <div class="row align-items-md-stretch">
                        <div class="col-md-6">
                            <div class="h-100 p-5 bg-light border rounded-3">
                                <h2>Sobre o site</h2>
                                <p>Dada a importância dos dados do monitoramento para a análise dos quelônios e seus ninhos, 
                                    e com a criação de uma aplicação (web/mobile) facilitaria o mapeamento, e a demarcação dos ninhos em tempo real, 
                                    a aplicação tem como função principal o monitoramento dos ninhos baseado em sua localização, 
                                    para o auxílio das análises de campo do Núcleo de Sustentabilidade Urbana (NSU) realizadas ao longo da costa do litoral da cidade de Paulista (PE).</p>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="h-100 p-5 bg-light border rounded-3">
                                <h2>Importância do monitoramento</h2>
                                <p>As tartarugas representam um componente único na diversidade biológica, sendo consideradas organismos-chave nos ecossistemas aquáticos.</p>
                            </div>
                        </div>
                    </div>

                    <footer class="pt-3 mt-4 text-muted border-top">
                        &copy; IFPE - Campus Paulista 2022
                    </footer>

                </div>
            </main>
        </div>

    )
}
