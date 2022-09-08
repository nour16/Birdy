class Users {
  constructor(db) {
    this.db = db;
  }

create(login_, password_, lastname_, firstname_) {
    return new Promise((resolve, reject) => {
      this.exists(login_).then(()=>{
        reject()
        return
      })
      .catch(() => {
      this.db.users.insert({
        login : login_,
        password : password_,
        lastname : lastname_,
        firstname : firstname_
      },(err, new_user) => {
        if(err) {
          //erreur
          reject(err);
        } else {
          resolve(new_user);
        }
        })
      });
      });
  }

  get(userid) {
    console.log("dans get")
    console.log(userid)
    return new Promise((resolve, reject) => {
	  	this.db.users.findOne({_id: userid}, function (err, docs){
		if (docs){
			resolve(docs)
		}
		else resolve()
		})
	});
  }

  get_by_login(userlogin) {
    return new Promise((resolve, reject) => {
	  	this.db.users.findOne({login: userlogin}, function (err, docs){
		if (docs){
			resolve(docs)
		}
		else resolve()
		})
	});
  }

  async exists(login) {
    return new Promise((resolve, reject) => {
        this.db.users.find({login:login},(err, li_db) => {
          if(err || li_db.length===0){
            reject(err);
          }
          else {
            resolve(li_db);
          }
        });
    });
  }

  checkpassword(login, password) {
    return new Promise((resolve, reject) => {
      this.db.users.findOne({login:login,password:password},(err, li_db) => {
        if(err || !li_db){
          reject(err);
        }
        else {
          resolve(li_db);
        }
    });
    });
  }
}
  

exports.default = Users;

