import {login, register} from "../controllers/auth.controller";

const {Router} = require('express');
const router = Router();

router.post('/login', login)
router.post('/register', register)

export default router;