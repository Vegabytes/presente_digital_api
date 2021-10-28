import User from '../models/User'
import Role from '../models/Role'
import jwt from 'jsonwebtoken'
import config from '../config';

//Register
export const signup = async(req, res) => {

    try {
        const { username, email, password, roles } = req.body;
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password)
        });

        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map(role => role._id);
        } else {
            const userRole = await Role.findOne({ name: 'user' });
            newUser.roles = [userRole._id];
        }
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
            expiresIn: 86400
        });
        res.status(200).json({ token });
        //Generar un token
    } catch (err) {
        res.json(err);
    }

}

//Login
export const signin = async(req, res) => {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email: email }).populate('roles');
    if (!userFound) return res.status(204).json({ message: 'User not found' });
    console.log(userFound);

    const matchPassword = await User.comparePassword(password, userFound.password);
    if (!matchPassword) return res.status(204).json({ token: null, message: 'Invalid password' });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400
    });
    res.status(200).json({ userFound, token });
}