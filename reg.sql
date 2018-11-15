create table waiter

(id serial not null primary key,
names text not null);

create table daysofweek

(id serial not null primary key,
weekday text UNIQUE);

create table chosendays

(id serial not null primary key,
 waiter_id int NOT NULL, 
 daysofweek_id int NOT NULL,
 foreign key (waiter_id) references waiter(id),
 foreign key (daysofweek_id) references daysofweek(id)
);

insert into daysofweek(weekday) values('Monday');
insert into daysofweek(weekday) values('Tuesday');
insert into daysofweek(weekday) values('Wednesday');
insert into daysofweek(weekday) values('Thursday');
insert into daysofweek(weekday) values('Friday');
insert into daysofweek(weekday) values('Saturday');
insert into daysofweek(weekday) values('Sunday');
