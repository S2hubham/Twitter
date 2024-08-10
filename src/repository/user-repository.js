import User from "../models/user.js";
import crudRepository from "./crud-repository.js";

class UserRepository extends crudRepository {

    constructor(){
        super(User);
    }

}

export default UserRepository;