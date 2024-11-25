-- Create the Student table
 CREATE TABLE Student (
 StudentID INT PRIMARY KEY AUTO_INCREMENT,
 Name VARCHAR(100) NOT NULL,
 Email VARCHAR(100) NOT NULL UNIQUE,
 Password VARCHAR(255) NOT NULL,
 Gender ENUM('Male', 'Female', 'Other') NOT NULL,
 PageBalance INT NOT NULL DEFAULT 0 CHECK (PageBalance >= 0),
 RegistrationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
 Last_access_date DATETIME DEFAULT CURRENT_TIMESTAMP
 );

CREATE TABLE SPSO (
 SPSOID INT PRIMARY KEY AUTO_INCREMENT,
 Name VARCHAR(100) NOT NULL,
 Email VARCHAR(100) NOT NULL UNIQUE,
 Username VARCHAR(50) NOT NULL UNIQUE,
 Password VARCHAR(255) NOT NULL,
 DateOfBirth DATE
 );
INSERT INTO Student (Name, Email, Password, Gender, PageBalance, RegistrationDate, Last_access_date)
VALUES 
('Doan Anh Quang', 'quang@hcmut.edu.vn', 'password123', 'Male', 20, '2024-10-15 14:20:00', '2024-11-20 10:45:00'),
('Vu Khanh Linh', 'linh@hcmut.edu.vn', 'pass456', 'Female', 15, '2024-11-01 09:30:00', '2024-11-23 15:00:00'),
('Huynh Kim Quy', 'quy.kim@hcmut.edu.vn', 'mypassword789', 'Other', 10, '2024-10-25 08:15:00', '2024-11-18 12:50:00'),
('Nguyen Anh Phuong', 'some.21@hcmut.edu.vn', 'password321', 'Female', 3, '2024-11-10 18:00:00', '2024-11-25 08:10:00'),
('Tran Duc Hieu', 'hieu0102@hcmut.edu.vn', 'password555', 'Male', 0, '2024-10-20 12:00:00', '2024-11-15 19:30:00');
INSERT INTO SPSO (Name, Email, Username, Password, DateOfBirth)
VALUES 
('Cao Ngoc Lam', 'lamcao@hcmut.edu.vn', 'LamCao', 'password1234', '2004-04-15'),
('Nguyen Linh', 'Ll@hcmut.edu.vn', 'SS', 'password456', '2000-09-30');

