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
 -- Create the Printer table
CREATE TABLE Printer (
	PrinterID INT PRIMARY KEY AUTO_INCREMENT,
	Brand VARCHAR(50) NOT NULL,
	Model VARCHAR(50) NOT NULL,
	Status ENUM('Active', 'Inactive') NOT NULL,
	CampusName VARCHAR(100),
	Building VARCHAR(100),
	RoomNumber VARCHAR(50),	Description VARCHAR(255)
);
CREATE TABLE Manage (
	PrinterID INT NOT NULL,
	SPSOID INT NOT NULL,
	AssignedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (PrinterID, SPSOID),
	FOREIGN KEY (PrinterID) REFERENCES Printer(PrinterID) ON DELETE CASCADE,
	FOREIGN KEY (SPSOID) REFERENCES SPSO(SPSOID) ON DELETE CASCADE
);
CREATE TABLE Document (
	DocumentID INT PRIMARY KEY AUTO_INCREMENT,
	Filename VARCHAR(255) NOT NULL,
	FileSize INT NOT NULL CHECK (FileSize > 0),
	FileType VARCHAR(50) NOT NULL,
	PageNumber INT NOT NULL CHECK (PageNumber > 0)
);

CREATE TABLE PrintOrder (
    PrintOrderID INT PRIMARY KEY AUTO_INCREMENT,
    StudentID INT NOT NULL,
    DocumentID INT NOT NULL UNIQUE,
    PrinterID INT,
    numCopies INT NOT NULL CHECK (numCopies > 0),
    StartDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    EndDateTime DATETIME,
    PageStart INT NOT NULL CHECK (PageStart > 0),
    PageEnd INT NOT NULL,
    Status ENUM('Pending', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Pending',
    PageSize ENUM('A4', 'A3') NOT NULL,
    Orientation ENUM('Portrait', 'Landscape') NOT NULL,
    SidedType ENUM('Single-sided', 'Double-sided') NOT NULL,
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID) ON DELETE CASCADE,
    FOREIGN KEY (DocumentID) REFERENCES Document(DocumentID) ON DELETE CASCADE,
    FOREIGN KEY (PrinterID) REFERENCES Printer(PrinterID) ON DELETE SET NULL,
    CHECK (PageEnd > PageStart)
);

CREATE TABLE Payment (
	PaymentID INT PRIMARY KEY AUTO_INCREMENT,
	StudentID INT NOT NULL,
	Amount DECIMAL(10,2) NOT NULL CHECK (Amount > 0),
	PaymentDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
	PaymentMethod VARCHAR(50) NOT NULL,
	PagesPurchased INT NOT NULL CHECK (PagesPurchased > 0),
	TransactionStatus ENUM('Successful', 'Failed') NOT NULL,
	FOREIGN KEY (StudentID) REFERENCES Student(StudentID) ON DELETE CASCADE
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


INSERT INTO Printer (Brand, Name, Model, Status, CampusName, Building, RoomNumber, Description)
VALUES
('HP', 'Máy in 1','LaserJet Pro M404dn', 'Active', 'CS1', 'C6', '101', 'High-speed black and white printer'),
('Canon', 'Máy in 1','imageCLASS MF743Cdw', 'Active', 'CS2', 'H6', '203', 'Color laser printer with multifunction capability'),
('Epson', 'Máy in 1','WorkForce Pro WF-7840', 'Inactive', 'CS2', 'B4', '302', 'Large-format color inkjet printer'),
('Brother', 'Máy in 1','HL-L3270CDW', 'Active', 'CS1', 'C4', '305', 'Reliable color laser printer for office use'),
('Lexmark', 'Máy in 1','MB3442i', 'Active', 'CS2', 'B1', 'B^', 'Compact multifunction printer with wireless connectivity'),
('Samsung', 'Máy in 1','Xpress M2020W', 'Inactive', 'CS1', 'A5', '101', 'Compact monochrome laser printer with wireless printing');

INSERT INTO Manage (PrinterID, SPSOID, AssignedDate)
VALUES
(1, 1, '2024-11-20 08:00:00'),
(2, 1, '2024-11-20 08:05:00'),
(3, 1, '2024-11-20 08:10:00'),
(4, 2, '2024-11-20 08:15:00'),
(5, 2, '2024-11-20 08:20:00'),
(6, 2, '2024-11-20 08:25:00');

INSERT INTO Document (Filename, FileSize, FileType, PageNumber)
VALUES
( 'Introduction_to_SQL.pdf', 2048, 'pdf', 25),
('Machine_Learning_Report.docx', 3072, 'docx', 15),
( 'Database_Project.pptx', 5120, 'pptx', 30),
( 'Chemistry_Lab_Report.pdf', 1024, 'pdf', 10),
( 'History_Essay.doc', 2048, 'doc', 12),
( 'Physics_Assignment1.pdf', 1536, 'pdf', 8),
( 'Software_Design_Document.docx', 4096, 'docx', 20),
( 'Financial_Analysis.xlsx', 2560, 'xlsx', 18),
( 'Art_Portfolio.pdf', 8192, 'pdf', 40),
( 'Resume.docx', 512, 'docx', 2);
INSERT INTO PrintOrder (StudentID, DocumentID, PrinterID, numCopies, StartDateTime, EndDateTime, PageStart, PageEnd, PageSize, Orientation, SidedType, Status)
VALUES
(1, 1, 1, 1, '2024-11-20 09:00:00', '2024-11-20 09:05:00', 1, 25, 'A4', 'Portrait', 'Single-sided', 'Completed'),
(2, 2, 2, 2, '2024-11-20 09:10:00', '2024-11-20 09:20:00', 1, 15, 'A4', 'Portrait', 'Double-sided', 'Completed'),
(3, 3, 3, 1, '2024-11-20 09:15:00', NULL, 1, 30, 'A4', 'Landscape', 'Single-sided', 'Pending'),
(4, 4, 4, 1, '2024-11-20 09:20:00', '2024-11-20 09:25:00', 1, 10, 'A4', 'Portrait', 'Single-sided', 'Completed'),
(5, 5, 5, 3, '2024-11-20 09:25:00', '2024-11-20 09:40:00', 1, 12, 'A4', 'Portrait', 'Double-sided', 'Completed'),
(1, 6, 1, 2, '2024-11-20 09:30:00', NULL, 1, 8, 'A4', 'Portrait', 'Single-sided', 'Pending'),
(2, 7, 2, 1, '2024-11-20 09:35:00', '2024-11-20 09:45:00', 1, 20, 'A4', 'Portrait', 'Double-sided', 'Completed'),
(3, 8, 3, 1, '2024-11-20 09:40:00', NULL, 1, 18, 'A4', 'Landscape', 'Double-sided', 'Pending'),
(4, 9, 4, 1, '2024-11-20 09:45:00', '2024-11-20 10:05:00', 1, 40, 'A3', 'Portrait', 'Single-sided', 'Completed'),
(5, 10, 5, 1, '2024-11-20 09:50:00', '2024-11-20 09:52:00', 1, 2, 'A4', 'Portrait', 'Single-sided', 'Completed');


INSERT INTO Payment (StudentID, Amount, PaymentMethod, PagesPurchased, TransactionStatus, PaymentDateTime)
VALUES
(1, 5000, 'Momo', 10,  'Successful', '2024-11-20 10:00:00'),
(2, 3000, 'BKPay', 5, 'Successful', '2024-11-20 10:05:00'),
(3, 8000, 'VNPay', 15, 'Successful', '2024-11-20 10:10:00');

