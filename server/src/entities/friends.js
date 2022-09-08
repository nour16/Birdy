class Friends {
    constructor(db) {
      this.db = db;
    }
  
    create_friend(user_id, friend_login) {
        return new Promise((resolve, reject) => {
          this.db.friends.insert({
            user_id : user_id,
            friend_login : friend_login,
          },(err, new_friend) => {
            if(err) {
              console.log(err)
              //erreur
              reject(err);
            } else {
              resolve(new_friend)
            }
            })
        });
    }


    get_friends(user_id) {
        return new Promise((resolve, reject) => {//recuperer les amis d'un user
        this.db.friends
        .find(({user_id:user_id}),(err, amis)=>{
            if (err){
            reject(err)
            }
            else {
            resolve(amis)
            }
        })
        });
    }
    delete(login){
      console.log("logiiin")
      console.log(login)
      return new Promise((resolve, reject) => {//supprimer le message
        this.db.friends.remove({friend_login: login}, (err, res) => {
          if (err){
            console.log("errr delete")
            reject(false)
          }
          else {
            console.log("delete")
            resolve(true)
          }
        });
      })
    }

  }
exports.default = Friends;