import { docClient, tableName } from "../utils/awsConfigs";

export const handleSignUp = async(email:string, password:string, username:string) => {
    
    const data = {
        "PK": email,
        "SK": password,
        "username": username,
    }

    const transactionItem = {
        TableName: tableName,
        Item: data
    };

    var isSignUpSuccessful:boolean=true;
    docClient.put(transactionItem, function (err) {
        if (err) {
            console.log("Save Failed" + JSON.stringify(err, null, 2));
            isSignUpSuccessful=false
        } else {
            console.log("Saved Successfully");
            isSignUpSuccessful=true
        }
    });

    return{
        "status": isSignUpSuccessful ? 200 : 400,
        "message": isSignUpSuccessful ? "User Created Successfully" : "User Signup Failed"
    }


}