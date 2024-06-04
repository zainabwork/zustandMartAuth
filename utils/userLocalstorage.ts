interface User {
    email:string,
    password:string,
}

export const saveUser = (user:User) =>{
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users',JSON.stringify(users));
};

export const getUSer = (email:string,password:string):User |null =>{
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find((user:User)=> user.email ===email && user.password === password) || null;
};