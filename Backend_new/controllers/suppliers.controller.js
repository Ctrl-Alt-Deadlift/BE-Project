
const loginSupplier = async (req, res) => {
  res.status(200).json({ message: "Api working for login supplier" });
}

const registerSupplier = async (req, res) => {
  res.status(200).json({ message: "Api working for register supplier" });
}


const adminLogin = async (req, res) => {
  res.status(200).json({ message: "Api working for admin login" });
}


export { adminLogin, loginSupplier, registerSupplier };