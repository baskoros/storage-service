create table clients (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, clientId VARCHAR 256 NOT NULL, clientSecret VARCHAR 256, token VARCHAR 256, UNIQUE (clientSecret));  
insert into clients (clientId, clientSecret) values ('aplikasiJaki', 'secretJaki');  
insert into clients (clientId, clientSecret) values ('aplikasiCRM', 'secretCRM');

create table file (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, nama_file VARCHAR 256 NOT NULL, filename VARCHAR 256 NOT NULL UNIQUE, path VARCHAR 256);   