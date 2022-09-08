class Messages {
  constructor(db) {
    this.db = db;
  }

  create(author_id, author_login, author_lastname, author_firstname,content, date) {
      return new Promise((resolve, reject) => {
        this.db.messages.insert({
          author_id : author_id,
          author_login : author_login,
          author_lastname : author_lastname, 
          author_firstname : author_firstname ,
          content : content,
          date : date,
        },(err, new_mess) => {
          if(err) {
            console.log(err)
            //erreur
            reject(err);
          } else {
            resolve(new_mess)
          }
          })
      });
  }

  get_messages_by_id(author_id){
    return new Promise((resolve, reject) => {//recuperer les messages ecrits par 
      this.db.messages
      .find({author_id:author_id})
      .exec((err, docs)=>{
        if (err){
          reject(err)
        }
        else {
          console.log(docs)
          resolve(docs.sort((x,y)=>{
            if (x.date > y.date){
                return -1;
            }
            else{
                return 1;
            }}))
        }
      })
    });
  
  }
  get() {
    return new Promise((resolve, reject) => {//recuperer les messages ecrits par tous
      this.db.messages
      .find({})
      .exec((err, docs)=>{
        if (err){
          reject(err)
        }
        else {
          console.log(docs)
          resolve(docs.sort((x,y)=>{
            if (x.date > y.date){
                return -1;
            }
            else{
                return 1;
            }}))
        }
      })
    });
  }
  delete(id){
    console.log("iddd")
    console.log(id)
    return new Promise((resolve, reject) => {//supprimer le message
      this.db.messages.remove({_id: id}, (err, res) => {
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

  
  

exports.default = Messages;

