//validator
import { ROLES } from '../models/Role'
import User from '../models/User';
export const checkRolesExist = (req, res, next) => {
    const { roles } = req.body;
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            if (!ROLES.includes(roles[i])) {
                return res.status(400).json({ message: `Role ${roles[i]} does not exists` });
            }
        }
    }
    next();
}

//Change 400 to 2014 status error to handle it in front with Axion. To do: Check try and catch
export const checkDuplicateUsernameOrEmail = async(req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(204).json({ message: 'User already exists' });
    const email = await User.findOne({ email: req.body.email });
    if (email) return res.status(204).json({ message: 'Email already exists' });
    next();
}