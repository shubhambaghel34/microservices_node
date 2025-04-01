require("dotenv").config();
const express= require('express');
const app=express();
const PORT=4001;
app.use(express.json());
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const users=[];

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log("here in register from US-service")
  const hasedpassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hasedpassword });
  console.log(users)
  res.json({ message: "user register successfully" });
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log("user",username);
    console.log(users);
    const user = users.find(u => u.username === username);
    console.log("user",user);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  });

  app.get("/profile",(req,res)=>{
    const token= req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({message:"unauthorized"});
     try {
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        const user= users.find(u=>u.userName === decoded.userName);
        res.json(user);
     } catch (error) {
        res.status(401).json({message:"Invalid token"})
     }
  })


app.listen(PORT,()=>{
console.log(`user Service is listening at ${PORT}`)
})