const key = 'cvLocalData';

export const getInititalCvData = () => {
    let data:any = localStorage.getItem(key);
    data = data ? JSON.parse(data) : null;
    if(!data) {
        data = {
            personal: {
                image: '',
                description: "An adept developer dedicated to creating cutting-edge JavaScript/TypeScript frameworks to deliver high-quality and innovative applications that meet today's dynamic technological landscape.",
                name: 'Rahul Negi', 
                email: 'rahul.negi065@gmail.com', 
                phone: '+91-8802628492', 
                github: 'github.com/RahulNegi065',
                city: 'New Delhi',
                country: 'India',
                interests: ["Reading","Movies","Sports","Gaming"],
                languages: ["english","hindi","german"],
            },
    
            professional: {
                degree: 'Masters in Computer Applications', 
                college: 'Manav Rachna University', 
                startingYear: '2019', 
                endingYear: '2022',
                role: 'Full Stack Developer',
                organization: 'Akhil Systems Pvt Ltd',
                experience: '2',
                courses: ["C++","Java","Python", "Javascript"],
                skills: ["React","Angular","Next","MongoDB","Firebase","Ionic"],
                tasks: [
                    "To create flow of applications & establishing their data structure to ensure optimal performance and scalability on Firestore",
                    "To create innovative, visually engaging, and fully responsive front-end designs for applications",
                    "To develop robust back-end logic for applications, ensuring seamless functionality and top- notch performance"
                ],
            },
    
            sections: [
                {
                    contentType: "keypoints",
                    fromDate: "2020-12-31T18:30:00.000Z",
                    keypoints: [
                        "A fully responsive web application built with React", 
                        "Using disease.sh API to track Covid-19 statistics in realtime", 
                        "Features like total cases, recoveries, deaths, and… cases make it one place to track all of Covid-19"
                    ],
                    subtitle: "Covid-19 Tracker",
                    title: "Personal Project",
                    toDate: "2021-12-31T18:30:00.000Z",
                },
                {
                    contentType: "text",
                    fromDate: "2020-12-31T18:30:00.000Z",
                    content: "Extensive research on the Internet of Things (IoT), and its inherent security challenges. Since IoT is widely considered one of the least secure technologies, there is a growing interest in exploring how it can be made more secure through integrating more robust technologies, such as Blockchain.",
                    subtitle: "IoT & Blockchain",
                    title: "Research",
                    toDate: "2021-12-31T18:30:00.000Z",
                }
            ]
        }
        localStorage.setItem(key, JSON.stringify(data));
    }
    return data;
};



// Personal Data___________________
export const setPersonalData = (personalData:any) => {
    let data:any = localStorage.getItem(key);
    data = data ? JSON.parse(data) : null;
    if(data && data.personal) data.personal = personalData;
    else data['personal'] = personalData;
    localStorage.setItem(key, JSON.stringify(data));
}


// Professional Data_______________

export const setProfessionalData = (profData:any) => {
    let data:any = localStorage.getItem(key);
    data = data ? JSON.parse(data) : null;
    if(data && data.professional) data.professional = profData;
    else data['professional'] = profData;
    localStorage.setItem(key, JSON.stringify(data));
}


// Custom Sections_________________

export const updatePrevSectionByIndex = (updatedSection:any, i:number) => {
    let data:any = localStorage.getItem(key);
    data = JSON.parse(data);
    data.sections[i] = updatedSection;
    localStorage.setItem(key, JSON.stringify(data));
}

export const deletePrevSectionByIndex = (i:number) => {
    let data:any = localStorage.getItem(key);
    data = JSON.parse(data);
    let updatedData = {...data};
    updatedData.sections.splice(i,1);
    localStorage.setItem(key, JSON.stringify(updatedData));
}

export const addNewSection = (newSection:any) => {
    let data:any = localStorage.getItem(key);
    data = data ? JSON.parse(data) : null;
    if(data && data.sections) data.sections.push(newSection);
    else data['sections'] = [newSection];
    localStorage.setItem(key, JSON.stringify(data));
}



// AUTH Service_______________

export const register = (username:string, password:string) => {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
}

export const login = (username:string, password:string) => {
    if(username === localStorage.getItem('username') && password===localStorage.getItem('password')) {
        localStorage.setItem('userStatus', 'loggedin');
        return true;
    } else {
        localStorage.setItem('userStatus', 'loggedout');
        return false;
    }
}

export const getUserStatus = () => {
    const status = localStorage.getItem('userStatus');
    if(status==='loggedin') return true;
    else return false;
}