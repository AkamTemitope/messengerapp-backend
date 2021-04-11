import User from "../../dataSchema/userSchema.js"

export const userExists = (req, res) => {
    const email = req.query.e
    User.exists({ email }, (err, result) => {
        if (err) {
            res.status(500).send(err)
            console.log("Error at userExists")
        }
        else {
            res.status(200).send(result)
        }
    })
}

export const getAllUser = (req, res) => {
    User.find((err, data) => {
        if (err) {
            res.status(500).send(err)
            console.log("Error getting users")
        }
        else {
            res.status(201).send(data)
            console.log("getAllUser, all good")

        }
    })
}

export const getUserById = (req, res) => {
    const id = req.params.id

    User.findById({ _id: id },(err, data) => {

        if (err) {
            res.status(500).send(err)
            console.log("Error getting user by id")
        }
        else {
            res.status(201).send(data)
            console.log("getUserById, all good")

        }
    })
}

export const getUserByEmail = (req, res) => {
    const email = req.query.e

    User.exists({ email }, (err, result) => {
        if (err) {
            res.status(500).send(err)
            console.log("Error")
        }
        else {
            if (!result){
                res.status(500).send(null)
                console.log("getUserByEmail, user doesn't exit")
            }
            else {
                User.find({ email: email },(err, data) => {
            
                    if (err) {
                        res.status(500).send(err)
                        console.log("Error getting user by email")
                    }
                    else {
                        res.status(201).send(data)
                        console.log("getUserByEmail, all good")
            
                    }
                })

            }
        }
    })
}

export const newUser = (req, res) => {
    const email =  req.body.email

    User.exists({ email }, (err, result) => {
        if (err) {
            res.status(500).send(err)
            console.log("Error occured ")
        }
        else {
            if (!result) {
                User.create(req.body, (err, data) => {
                    if (err) {
                        res.status(500).send(err)
                        console.log("Error posting data")
                    }
                    else {
                        res.status(201).send(data)
                        console.log("User created")
                    }
                })
            }
            else {
                User.find( { email }, (err, data) => {
                    if (err) {
                        res.status(500).send(err)
                        console.log("Error getting data")
                    }
                    else {
                        res.status(201).send(data)
                        console.log("User found")
                    }
                })
            }
        }
    })

    
}


export const updateName = ( req, res) => {
    const id  = req.params.id
    const username = req.body.username
    User.findByIdAndUpdate(id, { username: username },
        (err, data) => {
            if (err) {
                res.status(500).send(err)
                console.log("Error Updating Name")
            }
            else {
                res.status(201).send(data)
                console.log("All good, user name updated")
    
            }
        })

}

export const updatePhoto = ( req, res) => {
    const id = req.params
    const photo = req.body.photoUrl

    User.findByIdAndUpdate({ _id: id }, { $set: { photoUrl: photo } },
        (err, data) => {
            if (err) {
                res.status(500).send(err)
                console.log("Error Updating PhotoUrl")
            }
            else {
                res.status(201).send(data)
                console.log("All good, photo updated")
    
            }
        })
    
}

