"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validacaoErro = exports.calcularReajuste = exports.buscarHistoricoPorAno = exports.buscarHistoricoPorId = exports.buscarHistorico = void 0;
const dados_1 = require("../dados/dados");
const buscarHistorico = () => {
    return dados_1.historicoInflacao;
};
exports.buscarHistorico = buscarHistorico;
const buscarHistoricoPorId = (id) => {
    const idHistorico = parseInt(id);
    const historico = dados_1.historicoInflacao.find(historico => historico.id === idHistorico);
    return historico;
};
exports.buscarHistoricoPorId = buscarHistoricoPorId;
const buscarHistoricoPorAno = (ano) => {
    const anoHistorico = parseInt(ano);
    const historico = dados_1.historicoInflacao.filter(historico => historico.ano === anoHistorico);
    return historico;
};
exports.buscarHistoricoPorAno = buscarHistoricoPorAno;
const calcularReajuste = (valor, dataInicialMes, dataInicialAno, dataFinalMes, dataFinalAno) => {
    const historicoFiltrado = dados_1.historicoInflacao.filter(historico => {
        if (dataInicialAno === dataFinalAno) {
            return historico.ano === dataInicialAno && historico.mes >= dataInicialMes && historico.mes <= dataFinalMes;
        }
        else {
            return ((historico.ano === dataInicialAno && historico.mes >= dataInicialMes) ||
                (historico.ano > dataInicialAno && historico.ano < dataFinalAno) ||
                (historico.ano === dataFinalAno && historico.mes <= dataFinalMes));
        }
    });
    let taxasMensais = 1;
    for (const elemento of historicoFiltrado) {
        taxasMensais *= (elemento.ipca / 100) + 1;
    }
    const resultado = valor * taxasMensais;
    return parseFloat(resultado.toFixed(2));
};
exports.calcularReajuste = calcularReajuste;
const validacaoErro = (valor, dataInicialMes, dataInicialAno, dataFinalMes, dataFinalAno) => {
    const anoLimiteFinal = dados_1.historicoInflacao[dados_1.historicoInflacao.length - 1].ano;
    const anoLimiteInicial = dados_1.historicoInflacao[0].ano;
    const mesLimiteFinal = dados_1.historicoInflacao[dados_1.historicoInflacao.length - 1].mes;
    if (isNaN(valor) ||
        isNaN(dataInicialMes) ||
        isNaN(dataInicialAno) ||
        isNaN(dataFinalMes) ||
        isNaN(dataFinalAno) ||
        dataInicialMes < 1 || dataInicialMes > 12 ||
        dataInicialAno < anoLimiteInicial || dataInicialAno > anoLimiteFinal ||
        dataFinalMes < 1 || dataFinalMes > 12 ||
        dataFinalAno < anoLimiteInicial || dataFinalAno > anoLimiteFinal ||
        (dataFinalAno === anoLimiteFinal && dataFinalMes > mesLimiteFinal) ||
        dataFinalAno < dataInicialAno ||
        (dataFinalAno == dataInicialAno && dataFinalMes < dataInicialMes)) {
        return true;
    }
    else {
        return false;
    }
};
exports.validacaoErro = validacaoErro;
