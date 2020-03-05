const express=require('express')
const router=express.Router()
const {authenticateUser}=require('../app/middleware/authentication')
const {updateBook}=require('../app/middleware/update')
const bookController=require('../app/controller/bookController')
const userController=require('../app/controller/userController')
const borrwerController=require('../app/controller/borrowerController')
const transactionController=require('../app/controller/transactionController')
// const {sendSms}=require('../app/middleware/send_sms')

router.get('/books',authenticateUser,bookController.list)
router.get('/books/:id',authenticateUser,bookController.show)
router.post('/books',authenticateUser,bookController.create)
router.put('/books/:id',authenticateUser,bookController.update)
router.delete('/books/:id',authenticateUser,bookController.destroy)


router.get('/borrowers',authenticateUser,borrwerController.list)
router.get('/borrowers/:id',authenticateUser,borrwerController.show)
router.post('/borrowers',authenticateUser,borrwerController.create)
router.put('/borrowers/:id',authenticateUser,borrwerController.update)
router.delete('/borrowers/:id',authenticateUser,borrwerController.destroy)


router.get('/transactions',authenticateUser,transactionController.list)
router.get('/transactions/:id',authenticateUser,transactionController.show)
router.get('/transactions/borrower/:id',authenticateUser,transactionController.listBorrowerTransaction)
router.post('/transactions',authenticateUser,updateBook,transactionController.create)
router.put('/transactions/:id',authenticateUser,transactionController.update)
router.delete('/transactions/:id',authenticateUser,transactionController.destroy)


router.post('/users/register',userController.create)
router.post('/users/login',userController.loginCreate)
router.get('/users/account',authenticateUser,userController.account)
router.post('/users/update',authenticateUser,userController.update)
router.delete('/users/logout',authenticateUser,userController.logout)

module.exports=router