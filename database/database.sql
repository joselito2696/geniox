create database geniox;


create table categoria(
idCategoria serial primary key,
categoria varchar(100) not null,
estado int not null

);
create table marca(
idMarca serial primary key,
marca varchar(100) not null,
estado int not null

);
create table producto(
    idProd int not null primary key,
codProd varchar(100)not null primary key,
codBarra int not null,
descripcion varchar(255)not null,
precio decimal(10,6)not null,
estado int
idCategoria int not null,
idMarca int not null,
CONSTRAINT fk_categoria
      FOREIGN KEY(idCategoria)
	  REFERENCES categoria(idCategoria),
      CONSTRAINT fk_marca
      FOREIGN KEY(idMarca)
	  REFERENCES Marca(idMarca)
);


ALTER TABLE child_table
ADD CONSTRAINT constraint_fk
FOREIGN KEY (fk_columns)
REFERENCES parent_table(parent_key_columns)
ON DELETE CASCADE;
