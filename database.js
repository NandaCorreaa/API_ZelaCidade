const sqlite3 = require('sqlite3');
const { open } = require('sqlite');


const criarBanco = async () => {
    const db = await open({
        filename: 'database.db',
        driver: sqlite3.Database
    });


    // ==========================================================
    // DIA 1: 16/03 - CRIAÇÃO E ENTRADA DE DADOS (C & R)
    // ==========================================================


    await db.exec(`
        CREATE TABLE IF NOT EXISTS incidentes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tipo_problema TEXT,             -- O que aconteceu (Buraco, Lixo, Luz)
            localizacao TEXT,               -- Onde aconteceu
            descricao TEXT,                 -- Detalhes extras
            prioridade TEXT,                -- Baixa, Média ou Alta
            nome_solicitante TEXT,          -- Quem avisou
            contato_solicitante TEXT,       -- Contato do solicitante
            data_registro TEXT,             -- Data que foi registrado o Problema
            hora_registro TEXT,             -- Horário que foi registrado o Problema
            status_resolucao TEXT DEFAULT 'Pendente', -- Se não avisarem o status, o banco define automaticamente como 'Pendente'
            imagem_problema TEXT            -- Imagem do problema
        )
        `)

    console.log('Banco de dados configurado: A tabela de registros urbanos está pronta!')


    // ==========================================================
    // VERIFICAÇÃO DE DUPLICIDADE (SEED DO BANCO)
    // ==========================================================

    // Consulta o banco para saber quantos registros já existem na tabela
    const checagem = await db.get('SELECT COUNT(*) AS total FROM incidentes');

    // Se o total for 0, significa que o banco ainda está vazio
    if (checagem.total === 0) {

        console.log('Banco vazio! Inserindo dados iniciais...');

        // INSERT com dados iniciais (Seed do banco)
        // Esses registros servem apenas como exemplos para o sistema começar funcionando
        // Os telefones abaixo são fictícios e utilizados apenas para testes

        await db.exec(`    

        INSERT INTO incidentes
        (tipo_problema, localizacao, descricao, prioridade, nome_solicitante, contato_solicitante, data_registro, hora_registro, imagem_problema)

        VALUES

        ('Iluminação pública', 'Rua das Flores', 'Poste de iluminação pública apagado há vários dias.', 'Média', 'Ana Clara', '(21) 90000-0001', '2026-03-16', '10:21', 'https://itaitinga.ce.gov.br/fotos/165/Img0_600x400.jpg'),

        ('Vazamento de água', 'Rua das Camélias, 52', 'Vazamento de água constante próximo ao bueiro.', 'Alta', 'Julia Martins', '(21) 90000-0002', '2026-03-16', '10:00', 'https://imagens.ebc.com.br/5VbdNmptS8wly0VwAu9HMcS04RM=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/2025/04/28/imagens_maria_julia_nascimento_1.jpeg?itok=sAo96JqF'),

        ('Árvore caída', 'Rua da VNW', 'Árvore caída bloqueando parcialmente a via.', 'Alta', 'Fernanda Kaka', '(21) 90000-0003', '2026-03-15', '07:00', 'https://s3.diario.one/linus/images/c27bd001-a082-44f9-85d8-0fdfdb456a4f.webp'),

        ('Acúmulo de lixo', 'Praça da Matriz, 456', 'Grande quantidade de lixo acumulado na área da praça.', 'Média', 'Felipe Dylon', '(21) 90000-0004', '2026-03-16', '10:22', 'https://s2-g1.glbimg.com/g6l58FrG-iMjLrilj8PCQhix9Gc=/0x0:1600x1066/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2023/b/1/pL0lXlRreslSm8OQDrzg/moradores-de-bairro-em-caucaia-reclamam-de-lixo-nas-ruas..jpeg'),

        ('Assalto', 'Rua 123, Bairro Vila da Penha, próximo ao Mercado Francisco, Rio de Janeiro', 'Relato de assalto cometido por dois homens em uma motocicleta. Foram levados carteira e bolsa.', 'Alta', 'João Silva', 'joao.silva@email.com', '2026-06-01', '18:30', 'https://img.irroba.com.br/fit-in/639x639/filters:fill(fff):quality(80)/universo/catalog/lancamentos-2024/bolsa-carteira-couro-legitimo-bubble-preta-e-chocolate-2-1.jpg'),

        ('Vazamento de água', 'Rua das Flores, 45', 'Possível vazamento na rede de infraestrutura urbana.', 'Média', 'João Batista', '(21) 90000-0005', '2026-03-17', '09:15', 'https://s2-g1.glbimg.com/vqegq0PwmIJTRfK5cd_-cNNRKpg=/0x0:1280x960/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/w/g/9uI0WxQPC2YCLSeWEkMA/vazamento-de-agua-foi-registrado-em-rua-do-batel-em-curitiba-na-manha-desta-segunda-feira-27-.jpg'),

        ('Buraco na rua', 'Rua Dev', 'Grande buraco formado após fortes chuvas, oferecendo risco para veículos e pedestres.', 'Alta', 'Lúcia Alcântara', '(21) 90000-0006', '2026-02-28', '11:00', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9g_bnV3kLqBH_rX9tKrtDLTph_uTS0O4NA&s'),

        ('Acúmulo de lixo', 'Avenida Ministro Amaral', 'Acúmulo de lixo em frente ao bueiro, dificultando o escoamento da água.', 'Alta', 'Ana Liz', '(21) 90000-0007', '2026-03-16', '10:24', 'https://www.pmerechim.rs.gov.br/noticia/21425/prefeitura-alerta-sobre-descarte-irregular-de-lixo-em-bueiros-e-refora-importncia-da-conscientizacao-da-populacao'),

        ('Buraco na rua', 'Rua Cecília, 23', 'Buraco presente há meses na via, dificultando a passagem de veículos.', 'Alta', 'Diego Pereira', '(21) 90000-0008', '2026-03-16', '10:25', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6c9ZTHxmUHTz32PXrDMeuGI0Y8w-WP-ka4g&s'),

        ('Alagamento', 'Rua Gifone, 325', 'Rua frequentemente alagada durante períodos de chuva intensa.', 'Média', 'Carlos Henrique', '(21) 90000-0009', '2026-03-16', '10:00', 'https://www.otempo.com.br/adobe/dynamicmedia/deliver/dm-aid--51c801d9-3137-49c9-9720-83fcc583e837/cidades-franco-1709440294.jpg?quality=90&preferwebp=true&width=1200')

    `)

    } else {

        // Se já existirem registros na tabela, o INSERT não será executado
        // Isso evita que os dados iniciais sejam duplicados ao reiniciar o servidor
        console.log(`Banco pronto com ${checagem.total} incidentes.`);

    }


    // SELECT (Read) - Consultas Estratégicas
    console.log("--- TODOS OS INCIDENTES ---");
    const todosIncidentes = await db.all('SELECT * FROM incidentes');
    console.log(todosIncidentes);


    // Exemplo de SELECT específico: O que é urgente?
    console.log("--- FILTRO: APENAS PRIORIDADE ALTA ---");
    const urgentes = await db.all('SELECT * FROM incidentes WHERE prioridade = "Alta"');
    console.log(urgentes);


    // Exemplo de SELECT específico: O que a Ana Clara reportou?
    console.log("--- FILTRO: CHAMADOS DA ANA CLARA ---");
    const chamadosAna = await db.all('SELECT * FROM incidentes WHERE nome_solicitante = "Ana Clara"');
    console.log(chamadosAna);


    // ==========================================================
    // DIA 2: 18/03 - MANUTENÇÃO E LIMPEZA (U & D)
    // ==========================================================


    // UPDATE - Atualização Única (pelo ID)
    await db.run(`UPDATE incidentes SET status_resolucao = 'Resolvido' WHERE id = 3`);
    console.log("O incidende do ID 3 foi consertado!");


    // UPDATE em Massa - Resolver tudo que for "Vazamento de água" de uma vez
    await db.run(`UPDATE incidentes SET status_resolucao = 'Em Análise' WHERE tipo_problema = 'Vazamento de água'`);
    console.log("Todos os problemas de Saneamento entraram 'Em Análise'.");


    // DELETE condicional - Remover tudo que tem o Status da Resolução 'Resolvido' (Limpeza de banco)
    await db.run(`DELETE FROM incidentes WHERE status_resolucao = 'Resolvido'`);
    console.log("Registros de status 'Resolvido' foram removidos.");


    // SELECT FINAL
    console.log("--- RELATÓRIO ATUALIZADO (FINAL) ---");
    const resultadoFinal = await db.all('SELECT * FROM incidentes');
    console.log(resultadoFinal);
}

criarBanco()

