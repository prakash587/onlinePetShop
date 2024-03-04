const isAdmin = (req, res, next) => {
    if (req.auth_user.role === "admin") {
      next();
    } else {
      next({
        result:null,
        status: false,
        message: "Access denied",
      });
    }
  };
  const isUser = (req, res, next) => {
    if (req.auth_user.role === "user") {
      next();
    } else {
      next({
        result:null,
        status: false,
        message: "Access denied",
      });
    }
  };

  const isDoctor = (req,res,next)=>{
    if(req.auth_user ==='doctor'){
      next();

    }else{
      next({
        result:null,
        status:false,
        message:"access denied"
      })
    }

  }

  
module.exports = { isAdmin,isUser ,isDoctor};