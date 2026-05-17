DROP DATABASE IF EXISTS uc_preciso;
CREATE DATABASE uc_preciso
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE uc_preciso;

CREATE TABLE instituicao (
  id   INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE municipio (
  id   INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE unidade_conservacao (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  nome           VARCHAR(255) NOT NULL,
  data_criacao   DATE NOT NULL,
  descricao      TEXT NOT NULL,
  imagem         VARCHAR(500) NOT NULL,
  instituicao_id INT NOT NULL,
  CONSTRAINT fk_uc_instituicao
    FOREIGN KEY (instituicao_id) REFERENCES instituicao(id)
) ENGINE=InnoDB;

CREATE TABLE unidade_municipio (
  unidade_id   INT NOT NULL,
  municipio_id INT NOT NULL,
  PRIMARY KEY (unidade_id, municipio_id),
  CONSTRAINT fk_um_unidade
    FOREIGN KEY (unidade_id)   REFERENCES unidade_conservacao(id) ON DELETE CASCADE,
  CONSTRAINT fk_um_municipio
    FOREIGN KEY (municipio_id) REFERENCES municipio(id)
) ENGINE=InnoDB;

CREATE TABLE comunicacao (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  titulo      VARCHAR(255) NOT NULL,
  descricao   TEXT NOT NULL,
  email       VARCHAR(255) NOT NULL,
  data_envio  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status      TINYINT NOT NULL DEFAULT 0,
  unidade_id  INT NOT NULL,
  CONSTRAINT fk_com_unidade
    FOREIGN KEY (unidade_id) REFERENCES unidade_conservacao(id),
  CONSTRAINT chk_status CHECK (status IN (0, 1))
) ENGINE=InnoDB;
