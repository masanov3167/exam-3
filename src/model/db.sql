-- 1) databaza yaratmiz
CREATE DATABASE masanov;

-- 2) databazaga kiramiz
\c masanov;

-- 3) courses nomli table ochamiz
DROP TABLE IF EXISTS courses;
CREATE TABLE courses (      
	id serial PRIMARY KEY, 
    name text not null, 
	price varchar(64)
);

-- 4) groups nomli table yaratamiz
DROP TABLE IF EXISTS groups;
CREATE TABLE groups (      
	id serial PRIMARY KEY, 
    name text not null,
	courseid int,
	foreign key (courseid) REFERENCES courses(id) on delete cascade
);

-- 5) users degan table yaratamiz
DROP TABLE IF EXISTS users;
CREATE TABLE users (      
	id serial PRIMARY KEY, 
    name text not null, 
	pass varchar(64),
	phone text,
    role text not null,
    groupid int,
	courseid int, 
	foreign key (groupid) REFERENCES groups(id) on delete cascade,
	foreign key (courseid) REFERENCES courses(id) on delete cascade  
);

-- 6) groups degan tablega yangi column qo'shamiz sababi tepada reference key bilan muammo bo'ldi
ALTER TABLE groups ADD COLUMN teacherid INT REFERENCES users(id) ON DELETE CASCADE;

-- 7) default admin yaratamiz
insert into users(name, pass, role) values('admin', 'admin1234','admin');

-- 8) homeworks degan table yaratmiz
DROP TABLE IF EXISTS homeworks;
CREATE TABLE homeworks (      
	id serial PRIMARY KEY, 
    title text not null, 
	body varchar(128),
	iattime timestamp default current_timestamp,
    students json default '[]',
    groupid int, 
	foreign key (groupid) REFERENCES groups(id) on delete cascade  
);