SELECT * FROM gateway.endpoints;

use gateway;

#Create Table 
CREATE TABLE endpoints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    baseurl VARCHAR(255) NOT NULL,
    method VARCHAR(255) NOT NULL
);

#To Delete table
drop table endpoints;

#To Insert Values into the table
insert  into endpoints(url,baseurl,method) values ("/api/data1","https://jsonplaceholder.typicode.com/users","GET"),
("/api/data2","https://jsonplaceholder.typicode.com/todos","GET"),
("/api/data3","https://jsonplaceholder.typicode.com/posts","GET");

#To delete all the values in the table
truncate endpoints;


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
ALTER TABLE endpoints
ADD method varchar(255);

#Update method based on ID
UPDATE endpoints
SET method = 'GET'
WHERE id = 1;

#Delete particular in row using ID
DELETE FROM endpoints WHERE id IN (6,7);
