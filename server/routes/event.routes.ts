import {Router} from "express";
import {deleteEvent, getEvents, newEvent, updateEvent} from "../controllers/event.controller";
import {authMiddleware} from "../middleware/auth.middleware";
const router = Router();

router.post('/', authMiddleware, newEvent);
router.get('/', authMiddleware, getEvents);
router.put('/:id', authMiddleware, updateEvent)
router.delete('/:id', authMiddleware, deleteEvent)


export default router;