class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        }

        const recintosViaveis = [];
        const { tamanho, biomas, carnivoro } = this.animais[animal];

        for (const recinto of this.recintos) {
            const { numero, bioma, tamanhoTotal, animais } = recinto;
            let espacoOcupado = animais.reduce((acc, { especie, quantidade }) => acc + this.animais[especie].tamanho * quantidade, 0);
            let espacoExtra = (animais.length > 0 && animais[0].especie !== animal) ? 1 : 0;

            if (biomas.includes(bioma) && (espacoOcupado + tamanho * quantidade + espacoExtra <= tamanhoTotal)) {
                if (animais.length === 0 || (animais.length === 1 && animais[0].especie === animal) || (animal === 'HIPOPOTAMO' && bioma === 'savana e rio')) {
                    if (animal === 'MACACO' && animais.length === 0 && quantidade === 1) {
                        continue; // Macaco não se sente confortável sozinho
                    }
                    if (carnivoro && animais.length > 0 && animais[0].especie !== animal) {
                        continue; // Carnívoros só podem habitar com a própria espécie
                    }
                    recintosViaveis.push(`Recinto ${numero} (espaço livre: ${tamanhoTotal - espacoOcupado - tamanho * quantidade - espacoExtra} total: ${tamanhoTotal})`);
                }
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis: recintosViaveis.sort((a, b) => parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1])) };
    }
}

export { RecintosZoo as RecintosZoo };