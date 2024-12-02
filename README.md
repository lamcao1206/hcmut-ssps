# HCMUT Student Smart Printing Service (HCMUT_SSPS)

## Project Background

### Project Origin

This is a capstone project developed by students at Ho Chi Minh University of Technology (HCMUT) to create a comprehensive student printing service system.

### Purpose

To provide an efficient, user-friendly digital printing solution that addresses the document printing needs of university students while managing printing resources effectively.

### Contributors

- Cao Ngọc Lâm - 2252419
- Đặng Minh Khang - 2252287
- Đặng Ngọc Phú - 2252617
- Đoàn Anh Quang - 2252666

## System Description

### Core Functionality

The HCMUT_SSPS is a web and mobile application designed to:

- Enable students to print documents across campus
- Manage printing resources
- Track printing activities
- Provide flexible printing options

### System Components

- Document Upload Module
- Printer Selection System
- Printing Configuration Interface
- Page Balance Management
- Printing History Tracking
- Administrative Configuration Panel

## Detailed System Specifications

### Printer Management

- Each printer has unique attributes:
  - Printer ID
  - Brand/Manufacturer
  - Printer Model
  - Description
  - Location (Campus, Building, Room)

### Printing Constraints

- Permitted file types configured by Student Printing Service Officer (SPSO)
- Printing limited by user's page balance
- Semester-based page allocation system

### Page Allocation Rules

- Default semester allocation of A4 pages
- Conversion rate: 1 A3 page = 2 A4 pages
- Option to purchase additional pages via online payment (BKPay)

## Project Development Methodology

### Development Stages

1. **Requirement Elicitation**

   - Domain context analysis
   - Stakeholder needs identification
   - Requirements specification

2. **System Modeling**

   - Use case diagrams
   - Activity diagrams
   - Sequence diagrams
   - Class diagrams

3. **Architecture Design**

   - Layered system architecture
   - Component diagram design
   - UI/UX strategy development

4. **Implementation Sprints**
   - MVP1: Initial user interface
   - Usability testing
   - MVP2: Refined implementation

### Technical Approach

- Iterative development
- User-centered design
- Continuous feedback integration
- Agile methodology

## System Architecture and Design

### 1. Layered Architecture

![Layered Architecture](./docs/images/BoxlineDiagram.png)

The system follows a 5-layer architecture pattern:

- **Presentation Layer**: Handles user interfaces for both Students and SPSO
- **Business Layer**: Contains controllers for different functionalities (Authentication, SPSO, Student, Printer, Report, Order, Payment)
- **Service Layer**: Implements core business logic and services
- **Persistence Layer**: Manages data models and object-relational mapping
- **Database Layer**: Stores all system data in dedicated tables

### 2. Component Interaction Diagram

![Component Interaction](./docs/images/Component.png)

### 3. System Deployment Architecture

![Deployment Architecture](./docs/images/Deployment-Diagram.png)

## Usability Testing Strategy

### Testing Methodology

- Remote unmoderated testing
- Qualitative and quantitative evaluation
- Participant-driven refinement

### Testing Objectives

- Identify user experience challenges
- Validate interface intuitiveness
- Ensure system meets user expectations
- Continuous improvement of MVP

## Getting Started

### Prerequisites

- **Node.js**: You need to have Node.js installed on your machine. You can download it from nodejs.org.
- **npm**: npm is included with Node.js. You can verify the installation by running `npm -v` in your terminal.
- **Python**: Some dependencies might require Python. You can download it from python.org.

### Installation Steps

Due to the time limit, we only implement the client side by React and making a pseudo-server to interacting with client through API by `json-server` - an package for creating a full fake REST APIs.

#### 1. Clone the repository

```zsh
git clone https://github.com/lamcao1206/hcmut-ssps.git
cd hcmut-ssps
cd client
```

#### 2. Install dependencies

```zsh
npm install
```

#### 3. Run the application

Start two terminal instance in the client folder of **hcmut_ssps**

**First Terminal: Start the JPON Server**

```zsh
npm run server
```

This command will start an pseudo-server for serving request from client and take the `db.json` as its database.

**Second Terminal: Start the React Application**

```zsh
npm run dev
```

This command will start the ReactJS development server, allowing you to interact with the application in your browser. The ReactJS application will run on [http://localhost:5173](http://localhost:5173), while the JSON server will run on [http://localhost:3000](http://localhost:3000).

In the student side, we create two accounts for login:
| Email | Password |
|----------------------|----------|
|quang.doan0801@hcmut.edu.vn | 123456 |
| phu.dangngoc@hcmut.edu.vn | 123456 |

In the SPSO side, we create two accounts:
| Email | Password |
|----------------------|----------|
|lam.cao1206 | 123456 |
| khang.dangminh26 | 123456 |

You are ready to explore our demo applications.

## Drawbacks:

- The implementation for Back-end still missings.
- The report site for SPSO hasn't been implemented.
- The payment site hasn't been intergrated with BKPay.
- The Authentication site hasn't been intergrated with HCMUT SSO.
