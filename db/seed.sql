USE uc_preciso;

INSERT INTO instituicao (id, nome) VALUES
  (1, 'IMA - Instituto do Meio Ambiente de Santa Catarina'),
  (2, 'ICMBio - Instituto Chico Mendes de Conservação da Biodiversidade');

INSERT INTO municipio (id, nome) VALUES
  (1,  'São Francisco do Sul'),
  (2,  'Bom Jardim da Serra'),
  (3,  'Lauro Müller'),
  (4,  'Orleans'),
  (5,  'Siderópolis'),
  (6,  'Treviso'),
  (7,  'Urussanga'),
  (8,  'Botuverá'),
  (9,  'Vidal Ramos'),
  (10, 'Major Gercino'),
  (11, 'Concórdia'),
  (12, 'São Domingos'),
  (13, 'Galvão'),
  (14, 'Campos Novos'),
  (15, 'Florianópolis'),
  (16, 'Doutor Pedrinho'),
  (17, 'Itaiópolis'),
  (18, 'Papanduva'),
  (19, 'Palhoça'),
  (20, 'Águas Mornas'),
  (21, 'Santo Amaro da Imperatriz'),
  (22, 'São Bonifácio'),
  (23, 'São Martinho'),
  (24, 'Imaruí'),
  (25, 'Paulo Lopes'),
  (26, 'Garopaba'),
  (27, 'Grão-Pará');

INSERT INTO unidade_conservacao
  (id, nome, data_criacao, descricao, imagem, instituicao_id) VALUES

  (1, 'Parque Estadual Acaraí', '2005-09-05',
   'Localizado em São Francisco do Sul, no litoral norte catarinense, protege cerca de 6.667 hectares de restinga, manguezais, dunas e remanescentes de Mata Atlântica costeira. Abriga importantes sítios arqueológicos sambaquis.',
   'https://www.ima.sc.gov.br/images/artigos_menus/ucs/acarai.png',
   1),

  (2, 'Reserva Biológica Estadual do Aguaí', '1983-09-06',
   'Reserva integral no sul catarinense, com cerca de 7.672 hectares de Floresta Ombrófila Densa Montana e Altomontana. Protege nascentes de rios da bacia do Tubarão.',
   'https://www.ima.sc.gov.br/images/artigos_menus/ucs/aguai.png',
   1),

  (3, 'Reserva Biológica Estadual da Canela Preta', '1980-07-10',
   'Reserva de 1.844 hectares de Mata Atlântica no Vale do Itajaí, criada para proteger a canela-preta (Ocotea catharinensis) e outras espécies ameaçadas.',
   'https://www.ima.sc.gov.br/images/artigos_menus/ucs/canela-preta.png',
   1),

  (4, 'Parque Estadual Fritz Plaumann', '2003-01-08',
   'Criado em Concórdia, no oeste catarinense, protege 741 hectares de Floresta Estacional Decidual. Recebeu este nome em homenagem ao entomólogo Fritz Plaumann.',
   'https://www.ima.sc.gov.br/images/artigos_menus/ucs/fritz-plaumann.png',
   1),

  (5, 'Parque Estadual das Araucárias', '2003-09-23',
   'Protege 612 hectares de Floresta Ombrófila Mista (Mata de Araucárias) entre São Domingos e Galvão, no oeste catarinense.',
   'https://www.ima.sc.gov.br/images/artigos_menus/ucs/araucarias.png',
   1),

  (6, 'Parque Estadual Rio Canoas', '2004-10-26',
   'Localizado em Campos Novos, no planalto serrano, abrange 1.133 hectares de Mata de Araucárias e campos nativos às margens do Rio Canoas.',
   'https://www.ima.sc.gov.br/images/artigos_menus/ucs/rio-canoas.png',
   1),

  (7, 'Parque Estadual do Rio Vermelho', '2007-06-04',
   'Em Florianópolis, abrange 1.532 hectares de restinga, dunas e lagoas no leste da Ilha de Santa Catarina. Antiga Estação Florestal do Rio Vermelho, transformada em parque estadual.',
   'https://www.ima.sc.gov.br/images/artigos_menus/ucs/rio-vermelho.png',
   1),

  (8, 'Reserva Biológica Estadual do Sassafrás', '1977-07-29',
   'Reserva integral de 5.196 hectares no planalto norte catarinense, protege importantes remanescentes de Floresta Ombrófila Mista e o sassafrás (Ocotea odorifera).',
   'https://www.ima.sc.gov.br/images/artigos_menus/ucs/sassafras.png',
   1),

  (9, 'Parque Estadual da Serra do Tabuleiro', '1975-11-01',
   'Maior unidade de conservação estadual de Santa Catarina, com cerca de 84.130 hectares. Cobre cinco dos seis ecossistemas catarinenses e abrange nove municípios entre o litoral e a serra.',
   'https://www.ima.sc.gov.br/images/artigos_menus/ucs/serra-do-tabuleiro.png',
   1),

  (10, 'Parque Estadual da Serra Furada', '1980-06-20',
   'Protege 1.329 hectares de Mata Atlântica entre Grão-Pará e Orleans, no sul catarinense. Famoso pela formação rochosa que dá nome ao parque.',
   'https://www.ima.sc.gov.br/images/artigos_menus/ucs/serra-furada.png',
   1);

INSERT INTO unidade_municipio (unidade_id, municipio_id) VALUES
  -- 1 Acaraí
  (1, 1),
  -- 2 Aguaí
  (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7),
  -- 3 Canela Preta
  (3, 8), (3, 9), (3, 10),
  -- 4 Fritz Plaumann
  (4, 11),
  -- 5 Araucárias
  (5, 12), (5, 13),
  -- 6 Rio Canoas
  (6, 14),
  -- 7 Rio Vermelho
  (7, 15),
  -- 8 Sassafrás
  (8, 16), (8, 17), (8, 18),
  -- 9 Serra do Tabuleiro
  (9, 15), (9, 19), (9, 20), (9, 21), (9, 22), (9, 23), (9, 24), (9, 25), (9, 26),
  -- 10 Serra Furada
  (10, 27), (10, 4);

INSERT INTO comunicacao (titulo, descricao, email, status, unidade_id) VALUES
  ('Acúmulo de lixo na praia do Forte',
   'Identifiquei grande volume de lixo plástico na faixa de restinga próxima à praia do Forte, dentro do Parque Estadual Acaraí. Sugiro mutirão de limpeza.',
   'visitante1@example.com', 0, 1),

  ('Trilha do mirante interditada sem aviso',
   'Cheguei ao Parque Estadual das Araucárias e a trilha do mirante estava fechada sem nenhuma sinalização prévia. Seria importante avisar no site.',
   'visitante2@example.com', 1, 5),

  ('Dunas do Rio Vermelho com veículos',
   'Vi quadriciclos circulando sobre as dunas do Parque Estadual do Rio Vermelho no fim de semana — atividade proibida em UC.',
   'denuncia@example.com', 0, 7),

  ('Pedido de visita guiada – escola pública',
   'Sou professora da rede estadual e gostaria de agendar visita guiada com 30 alunos ao Parque Estadual Fritz Plaumann em outubro.',
   'professora.bio@escola.sc.gov.br', 1, 4);
