/* 
Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements:

Use at least one array.

Use at least two classes.

Your MENU should have the options to:
- create, 
- view, and 
- delete elements. 
*/

class Employee { //Definition of the class
    constructor(name, position) { //it takes in two parameters
        this.name = name;
        this.position = position;
    }

    describe() { //it returns as a description of the Emploees' name and position properties.
        return `${this.name} works as a ${this.position}.`;
    }
}

class Department { //Definition of the class
    constructor(name) { //it takes in one parameter
        this.name = name; 
        this.employees = []; //with the given name, it creates an empty employees array of the department
    }

    addEmployee(employee) { //method within department class. One parameter
        if (employee instanceof Employee) { //check the instance of the empolyee class
            this.employees.push(employee); //if the employee is added to the array of department
        } else { //if it's not: Error!
            throw new Error(`You can only add an instance of Employee. Argument is not an employee: ${employee}`);
        }
    }

    describe() { //describe within the department class(department & number of the employees from the array)
        return `${this.name} has ${this.employees.length} employees.`;
    }
}

class MainMenu { //Definition of the class
    constructor() { //with a constructor that starts an empty array (departments) 
        this.departments = []; 
        this.selectedDepartment = null; //setting the value to null
    }

    start() { //method within the mainmenu class
        let selection = this.showMainMenuOptions(); //runs a loop until 0;
        while (selection !== 0) {
            switch (selection) { //it'll depend on the user's selection 
                case '1':
                    this.createDepartment();
                    break;
                case '2':
                    this.viewDepartment();
                    break;
                case '3':
                    this.deleteDepartment();
                    break;
                case '4':
                    this.displayDepartment();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!'); //once the selection is invalid, the loop will exit, and this alert will come up.
    }
                            
    showMainMenuOptions() { //User can choose how to interact with the program
        return prompt(`
            0) Exit
            1) Create new department
            2) View department
            3) Delete department
            4) Display all departments
        `);
    }

    showDepartmentMenuOptions(departmentInfo) { //options to interact with a specific department
        return prompt(` 
        0) Go back;
        1) Create employee;
        2) Delete employee;
        ------------------------
        ${departmentInfo}
        `);
    }

    displayDepartments() { //method within the mainmenu
        let departmentString = ''; 
        for (let i = 0; i < this.departments.length; i++) { //iterates over the departments array
            departmentString += i + ') ' + this.departments[i].name + '\n'; //it adds the department's index, name, and a line break to the departmentstring during each iteration.
        }
        alert(departmentString);
    }

    displayDepartment() { 
        this.displayDepartments(); //it calls the displaydepartment method to show the list of the departments
    }

    createDepartment() { 
        let name = prompt('Enter name for new department: '); //user enters a name for a new department & assigns the input yo the name (variable)
        this.departments.push(new Department(name)); //creates a new department class using the name & adds it to the dep. array
    }

    viewDepartment() {
        let index = prompt('Enter the index of the department you wish to view: '); 
        if (index > -1 && index < this.departments.length) { //check the value of the index. It ensures the index entered is valid
            this.selectedDepartment = this.departments[index]; //index valid = assigns the department at specifc index in the departments array to the selecteddepartment property
            let description = 'Department Name: ' + this.selectedDepartment.name + '\n'; //creates a description string that includes the department name with a line break

            for (let i = 0; i < this.selectedDepartment.employees.length; i++) { //iterates over the employees of the selected department
                description += i + ') ' + this.selectedDepartment.employees[i].name + ' - ' + this.selectedDepartment.employees[i].position + '\n';
            } // concatenates index, name, position, and a line break to the "description" string.

                            //calls the method            //with the variable as an argument to show a menu for the selected dep.
            let selection = this.showDepartmentMenuOptions(description);
            switch (selection) { //it can ivokes either of them
                case '1':
                    this.createEmployee();
                    break;
                case '2':
                    this.deleteEmployee();
            } 
        }
    }

    deleteDepartment() { //if the index is valid (within the departments) it'll remove a department from teh array using the splice method
        let index = prompt('Enter the index of the department you wish to delete: ');
        if (index > -1 && index < this.departments.length) {
            this.departments.splice(index, 1);
        }
    }

    createEmployee() { //user can enter the name & position for new employee.
        let name = prompt('Enter name for new employee: ');
        let position = prompt('Enter position for new employee: ');
        this.selectedDepartment.employees.push(new Employee(name, position));
    }//it creates a new employee object with the given name & poisition. adds it to the selected dep. employees array

    deleteEmployee() {
        let index = prompt('Enter the index of the employee you wish to delete: ');
        if (index !== null && !isNaN(index)) { 
            index = parseInt(index);
            if (index > -1 && index < this.selectedDepartment.employees.length) {
                this.selectedDepartment.employees.splice(index, 1);
            } //index valid = checks if it's whithin the range of employees, and remove the employee from the selecteddepartment
        }
    }
}

let menu = new MainMenu(); //creates a new instance of mainmenu class, called menu
menu.start(); //starts the main menu 