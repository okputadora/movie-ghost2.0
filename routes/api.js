const express = require('express')
const router = express.Router()
const controllers = require('../controllers')


router.get('/:resource', (req, res, next) => {
  console.log("GETTING USER INFO")
	let  resource = req.params.resource;
	let  controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid resource...check your spelling'
		})
	}
  if (resource === 'user'){
    id = req.session.userId
    console.log("id: ",id)
    controller.getById(id)
    .then((result) => {
      res.json({
        confirmation: 'success',
        results: result
      })
    })
    .catch((err) => {
      console.log("ERROR")
      res.json({
        confirmation: 'fail',
        message: err
      })
    })
  }
})
router.get('/:resource/:field/:value', (req, res, next) =>{
	let resource = req.params.resource;
	let field = req.params.field;
	let value = req.params.value
	let params = {};
	params[field] = value;
	console.log(params)
	let controller  = controllers[resource];
	if (controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid resource...check your spelling'
		})
	}
	controller.getByParams(params)
	.then((result) => {
		res.json({
			confirmation: 'success',
			result: result
		})
	})
	.catch((err) => {
		res.json({
			confirmation: 'fail',
			message: err
		})
	})
})
router.post('/:resource', (req, res, next) => {
	let resource = req.params.resource;
	let controller = controllers[resource];
	if (controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid resource...check your spelling'
		})
	}
  console.log(req.body)
	controller.post(req.body)
	.then((result) => {
    req.session.userId = result.id
    console.log(result)
    console.log(req.session)
    console.log(req.session.userId)
		res.json({
			confirmation: 'success',
			result: result
		})
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})
	})
})
router.put('/:resource/:id', (req, res, next) => {
	let resource = req.params.resource
	let id = req.params.id
	controller.update(id, req.body)
	.then((redsult) => {
		res.json({
			confirmation: 'success',
			result: result
		})
	})
	.catch((err) => {
		res.json({
			confirmation: 'fail',
			message: err
		})
	})
})
router.delete('/:resource/:id', (req, res, next) => {
  let controller = controllers[req.params.resource]
  controller.remove(id)
  .then((result) => {
    res.json({
      confirmation: "deleted",
      removedItem: result
    })
  })
})
module.exports = router
