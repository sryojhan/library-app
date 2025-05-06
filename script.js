

let allProjects = [];
let projectTable = document.querySelector('#project-table');


function Project(name, desc, technology, status){

    this.name = name;
    this.desc = desc;
    this.technology = technology;
    this.status = status;

    this.id = crypto.randomUUID();
    this.element = null;
}


function AddProjectToLibrary(name, desc, technology, status){

    const project = new Project(name, desc, technology, status);



    const tablerow = document.createElement('tr');

    const createTableData = (content, cssClass) => {
        
        let element = document.createElement('td');

        element.innerText = content;
        element.classList.add(cssClass);
        return element;
    };

    tablerow.append(createTableData(name), createTableData(desc), createTableData(technology), createTableData(status, 'status'));


    let actionCell = document.createElement('td');


    function addActionButton(icon, action){


        let button = document.createElement('i');

        button.classList.add('fa-solid');
        button.classList.add(icon);
    
        button.addEventListener('click', ()=>{
    
            action();
        });
        actionCell.append(button);
    
        return button;
    }

    addActionButton('fa-trash', ()=> deleteProject(project.id));
    addActionButton('fa-pause', () => completeProject(project.id));

    tablerow.append(actionCell);


    projectTable.append(tablerow);


    project.element = tablerow;
    allProjects.push(project);
}




document.querySelector('#create-project').addEventListener('submit', (event) =>{

    event.preventDefault();

    const formData = new FormData(event.target);


    const name = formData.get('name');
    const desc = formData.get('desc');
    const tech = formData.get('tech');
    const status = formData.get('status');

    AddProjectToLibrary(name, desc, tech, status);

    event.target.reset();
});

function findProject(id){

    return allProjects.find((element) => element.id === id);
}

function deleteProject(id){

    const elem = findProject(id);
    projectTable.removeChild(elem.element);
    allProjects.splice(allProjects.indexOf(elem), 1);
}

function completeProject(id){

    const elem = findProject(id);

    elem.status = 'Complete';

    elem.element.querySelector('.status').innerText = 'Complete';
}

function pauseProject(id){


}