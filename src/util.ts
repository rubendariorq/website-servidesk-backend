import bcrypt from "bcryptjs";

class Util{

    constructor(){}

    public async encryptPassword(password: string): Promise<string>{
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    public async validatePassword(password: string, passwordSaved: string): Promise<boolean>{
        return bcrypt.compare(password, passwordSaved);
    }
}

const util = new Util();
export default util;