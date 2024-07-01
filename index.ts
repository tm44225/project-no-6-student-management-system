#! /usr/bin/env node 

import inquirer from "inquirer";

class student{
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string){
        this.id = student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }

    enroll_course(course: string){
        this.courses.push(course);
    }

    view_balance(){
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }

    pay_fees(amount: number){
        this.balance -= amount;
        console.log(`$${amount} fees paid successfully for ${this.name}`);
        console.log(`Remaining Balance : $${this.balance}`);
    }

    show_status(){
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance ${this.balance}`);
    }
}

class Student_Manager{
    students: student[]

    constructor(){
        this.students = [];
    }

    add_student(name:string){
        let Student = new student(name);
        this.students.push(Student);
        console.log(`student: ${name} added successfully. Student ID: ${Student.id}`)
    }

    enroll_student(student_id: number , course: string){
        let student = this.find_student(student_id);
        if(student){
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} successfully`)
        }

}

view_student_balance(student_id: number){
    let student = this.find_student(student_id);
    if(student){
        student.view_balance();
    }
    else{
        console.log("Student not found please enter a correct student ID")
    }
}

pay_student_fess(student_id: number , amount: number){
    let student = this.find_student(student_id);
    if(student){
        student.pay_fees(amount)
    }
    else{
        console.log("Student not found please enter a correct student ID")
    }
}

show_student_status(student_id: number){
    let student = this.find_student(student_id);
    if(student){
        student.show_status();
    }
}

find_student(student_id: number){
    return this.students.find(std => std.id === student_id);
}

}

async function main(){
    console.log("welcome to code with mahnoor javaid - student management system");
    console.log("-" .repeat(50));

    let student_manager = new Student_Manager();

    while(true){
        let choice = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                message: "select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]

            }
        ]);

    switch(choice.choices){
        case "Add Student":
        let name_input = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "Enter a student name",
            }
        ]);

        student_manager.add_student(name_input.name);
        break;

        case "Enroll Student":
            let enroll_input = await inquirer.prompt([
                {
                    name: "student_id",
                    type: "number",
                    message: "Enter a student ID", 
                },
                {
                    name: "course",
                    type: "input",
                    message: "Enter a courrse name"
                }
            ]);
            student_manager.enroll_student(enroll_input.student_id , enroll_input.course);
            break;

            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter student ID",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;

                case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay"
                    }
                ]);
                student_manager.pay_student_fess(fees_input.student_id , fees_input.amount);
                break;

                case "Show Status":
                    let status_input = await inquirer.prompt([
                        {
                            name: "student_id",
                            type: "number",
                            message: "Enter a student ID"
                        }
                    ]);
                    student_manager.show_student_status(status_input.student_id);
                    break;

                    case  "Exit":
                        console.log("Exiting...");
                        process.exit();
    }

    }

}

main();