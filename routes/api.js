const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.get('/:resource', (req, res, next) => {
	var resource = req.params.resource;
	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid resource...check your spelling'
		})
	}
	controller.get(req.query, false)
	.then((results) => {
		res.json({
	    confirmation: 'success',
	    results: results
	  })
	})
	.catch((err) => {
		res.json({
			confirmation: 'fail',
			message: err
		})
	})
})
router.get('/:resource/:id', (req, res, next) =>{
	var resource = req.params.resource
	var id = req.params.id
	var controller  = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid resource...check your spelling'
		})
	}
	controller.getById(id)
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
	var resource = req.params.resource
	var controller = controllers[resource]
	if (controller == null){
		res.json({
			confirmation:'fail',
			message:'Invalid resource...check your spelling'
		})
	}
	controller.post(req.body)
	.then((result) => {
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
	var resource = req.params.resource
	var id = req.params.id
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
  var controller = controllers[req.params.resource]
  controller.remove(id)
  .then((result) => {
    res.json({
      confirmation: "deleted",
      removedItem: result
    })
  })
})
module.exports = router
