import { Router } from 'express';

const router = Router();

/*
PRODUCT
*/
router.get('/',(req,res) => {
    res.json({ message : "Hii"})
});
router.post('/',() => {});
router.get('/:id',() => {});
router.put('/:id',() => {});
router.delete('/:id',() => {});

export default router;
