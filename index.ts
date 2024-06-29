#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";

class student {
  static counter = 10000;
  id: number;
  name: string;
  courses: string[];
  balance: number;

  constructor(name: string) {
    this.id = student.counter++;
    this.name = name;
    this.courses = [];
    this.balance = 100;
  }

  
  // enroll a student in a course
  enroll(course: string) {
    this.courses.push(course);
  }

  // view balance
  viewBalance() {
    console.log(chalk.green(`The balance of ${this.name} is ${this.balance}`));
  }

  // pay fees
  payFee(amount: number) {
    this.balance -= amount;
    console.log(chalk.green(`$${amount} fee has been paid successfully by ${this.name}`));
    console.log(chalk.red(`Remaining Balance: $${this.balance}`));
  }

  // status
  status() {
    console.log(`ID: ${chalk.yellow(this.id)}`);
    console.log(`Name: ${chalk.yellow(this.name)}`);
    console.log(`Courses: ${chalk.yellow(this.courses)}`);
    console.log(`Balance: ${chalk.yellow(this.balance)}`);
  }
}

// Manage students
class studentsManager {
  students: student[];

  constructor() {
    this.students = [];
  }

  // Method to add new student
  addStudent(name: string) {
    let students = new student(name);
    this.students.push(students);
    console.log(
      `Student: ${chalk.bold.blue(name)} added successfully. Student ID: ${chalk.yellow(students.id)}`
    );
  }

  // Method to enroll a student in a course
  enrollStudent(studentId: number, course: string) {
    let student = this.findStudent(studentId);
    if (student) {
      student.enroll(course);
      console.log(chalk.green(`${student.name} enrolled in ${course} successfully.`));
    }
  }

  // Method to view student balance
  viewStudentBalance(studentId: number) {
    let student = this.findStudent(studentId);
    if (student) {
      student.viewBalance();
    } else {
      console.log(chalk.bold.red(`Student not found. Please enter a correct student id.`));
    }
  }

  // Method to pay student fees
  payStudentFees(studentId: number, amount: number) {
    let student = this.findStudent(studentId);
    if (student) {
      student.payFee(amount);
    } else {
      console.log(chalk.bold.red(`Student not found. Please enter a correct student id.`));
    }
  }

  // Method to display student status
  showStatus(studentId: number) {
    let student = this.findStudent(studentId);
    if (student) {
      student.status();
    }
  }
  // Method to find student by id
  findStudent(studentId: number) {
    return this.students.find((std) => std.id === studentId);
  }
}

console.log(chalk.bold.yellow(`******************Student Management System******************`));

// Run the program
async function main() {
  let studentManager = new studentsManager();
  while (true) {
    let choice = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "Select an option:",
        choices: [
          "Add Student",
          "Enroll Student",
          "View Student Balance",
          "Pay Fees",
          "Show Status",
          "Exit",
        ],
      },
    ]);

    // Using switch case to handle user choice
    switch (choice.choice) {
      case "Add Student":
        let nameInput = await inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: "Enter a student name:",
          },
        ]);
        studentManager.addStudent(nameInput.name);
        break;

      case "Enroll Student":
        let courseInput = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: "Enter a student ID:",
          },
          {
            name: "course",
            type: "input",
            message: "Enter a course name:",
          },
        ]);
        studentManager.enrollStudent(courseInput.studentId, courseInput.course);
        break;

      case "View Student Balance":
        let balanceInput = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: "Enter a student ID:",
          },
        ]);
        studentManager.viewStudentBalance(balanceInput.studentId);
        break;

      case "Pay Fees":
        let feesInput = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: "Enter the Student ID:",
          },
          {
            name: "amount",
            type: "number",
            message: "Enter  the amount to pay:",
          },
        ]);

        studentManager.payStudentFees(feesInput.studentId, feesInput.amount);
        break;

      case "Show Status":
        let statusInput = await inquirer.prompt([
          {
            name: "studentId",
            type: "number",
            message: "Enter the student ID:",
          },
        ]);
        studentManager.showStatus(statusInput.studentId);
        break;

      case "Exit":
        console.log(chalk.bold.magenta(`Exiting...`));
        process.exit();
    }
  }
}

// call main function
main();