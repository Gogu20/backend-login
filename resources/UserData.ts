
export class UserData { 
    private _email: string = "";
    private _password: string = "";
    public users: {email: string, password: string} [] = [];
    
    //Getters
    public get email() {
        return this._email;
    }
    public get password() {
        return this._password;
    }

    //setters
    public set email(email) {
        this._email = email;
    }
    public set password(password) {
        this._password = password;
    }
}
