function errorHandler(err, req, response, next) {
  if (err.name === "SequelizeValidationError") {
    let dataError = err.errors.map((el) => {
      return el.message;
    });
    response.status(400).json(dataError);
  } else if (err.name === "Data not found") {
    response.status(404).json({
      error: `Products Not Found`,
    });
  } else if (err.name === "Forbidden") {
    response.status(403).json({
      forbiden: "You are not authorized for this action",
    });
  } else if (err.name === "Not Found") {
    response.status(404).json({
      error: "Not Found",
    });
  } else if (err.name === "InvalidToken" || err.name === "JsonWebTokenError") {
    response.status(401).json("Invalid Token");
  } else if (err.name === "SequelizeUniqueConstraintError") {
    let dataError = err.errors.map((el) => {
      return el.message;
    });
    response.status(400).json(dataError);
  } else if (err.name === "Invalid Login") {
    response.status(401).json({
      error: "invalid email or password",
    });
  } else if (err.name === "required") {
    response.status(400).json({
      error: "Email or Password required!",
    });
  } else if (err.name === "SequelizeValidationError") {
    response.status(400).json({
      error: "Email or Password required!",
    });
  }else if(err.error==="Exist"){
    response.status(400).json({
      error:"Product Already on your wishlist"
    })
  }else if(err.nama==='ingredients'){
    response.status(400).json({error:'Ingredients is required'})
  } else {
    response.status(500).json({
      message: "Something Happened!,try Again later!",
    });
  }
}

module.exports= errorHandler;
