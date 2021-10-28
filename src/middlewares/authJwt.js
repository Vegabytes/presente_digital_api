import jwt from "jsonwebtoken";
import config from '../config';
import Role from "../models/Role";
import User from "../models/User";
//authentication
export const verifyToken = async(req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        console.log(token);
        if (!token) return res.status(403).json({ message: 'No token provided' });

        const decoded = jwt.verify(token, config.SECRET);
        req.id = decoded.id;
        const user = await User.findById(req.id, { password: 0 });
        console.log(user);
        if (!user) return res.status(400).json({ message: 'No user found' });
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}



export const isModerator = async(req, res, next) => {
    const user = await User.findById(req.id);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
            next();
            return;
        }
    }
    return res.status(403).json({ message: 'Moderator rol required' });
}
export const isAdmin = async(req, res, next) => {
    const user = await User.findById(req.id);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
            next();
            return;
        }
    }
    return res.status(403).json({ message: 'Admin rol required' });
}