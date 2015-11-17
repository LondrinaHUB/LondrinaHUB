var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');


app.use(morgan('dev')); // log requests to the console

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; 

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/londrina_hub'); // connect to our database
var BusLine     = require('./app/models/mongo').BusLine;
var BusStop     = require('./app/models/mongo').BusStop;

var router = express.Router();

// middleware de requests
router.use(function(req, res, next) {
	//Faz log de cada Request
	console.log('Something is happening.');
	next();
});

// Rota default
router.get('/', function(req, res) {
	res.json({ message: 'Bem vindo' });	
});


//ROTAS DE LINHAS DE ONIBUS
router.route('/buslines')

.post(function(req,res) {
	var busline = new BusLine();
	busline.name = req.body.name;
	busline.code = req.body.code;
		//RECEBER OS ARRAYS MALDITOS

		busline.save(function(err) {
			if (err){
				res.send(err);
			}

			res.json({ message: 'Sucesso'});
		});
	})

.get(function(req,res) {
	BusLine.find(function(err, buslines){
		if (err)
			res.send(err);

		res.json(buslines);
	});
});

router.route('/buslines/:busline_id')

.get(function(req,res){
	BusLine.findById(req.params.busline_id, function(err,busline){
		if (err){
			res.send(err);
		}

		res.json(busline);
	});
})

.put(function(req,res) {
	BusLine.findById(req.params.busline_id, function(err, busline){
		if (err){
			res.send(err);
		}

		busline.name = req.body.name;
		busline.code = req.body.code;

		busline.save(function(err){
			if (err){
				res.send(err);
			}

			res.json({ message: 'Sucesso'});
		});
	});
})

.delete(function(req,res) {
	BusLine.remove({
		_id: req.params.busline_id
	}, function(err, busline) {
		if(err){
			res.send(err);
		}

		res.json({ message: 'Sucesso'});
	});
});

// FIM ROTAS LINHAS DE ONIBUS
//-----------------------------


// ROTAS DE PONTOS DE ONIBUS
router.route('/busstops')

.post(function(req,res) {
	var busstop = new BusStop();
	busstop.name = req.body.name;
	busstop.code = req.body.code;
		//RECEBER OS ARRAYS MALDITOS

		busstop.save(function(err) {
			if (err){
				res.send(err);
			}

			res.json({ message: 'Sucesso'});
		});
	})

.get(function(req,res) {
	BusStop.find(function(err, busstops){
		if (err){
			res.send(err);
		}

		res.json(busstops);
	});
});

router.route('/busstops/:busstop_id')

.get(function(req,res){
	BusStop.findById(req.params.busstop_id, function(err,busstop){
		if (err){
			res.send(err);
		}

		res.json(busstop);
	});
})

.put(function(req,res) {
	BusStop.findById(req.params.busstop_id, function(err, busstop){
		if (err){
			res.send(err);
		}

		busstop.name = req.body.name;
		busstop.code = req.body.code;

		busstop.save(function(err){
			if (err){
				res.send(err);
			}

			res.json({ message: 'Sucesso'});
		});
	});
})

.delete(function(req,res) {
	BusStop.remove({
		_id: req.params.busstop_id
	}, function(err, busstop) {
		if(err){
			res.send(err);
		}

		res.json({ message: 'Sucesso'});
	});
});

// FIM ROTAS DE PONTO DE ONIBUS
//----------------------------------------------------

//ROTA PARA RECUPERAR LINHAS PELO CODE DO PONTO
router.route('/busstop/getlines/:code')
.get(function(req,res){
	BusStop.findOne({ 'code' : req.params.code}, function (err,busstop) {
		if(err){
			res.send(err);
		}

		var lines = [];

		busstop.buslines.forEach(function(item){
			BusLine.findById(item.busline_id, function (err, busline){
				if (err){
					console.log(err);
				}

				lines.push(busline);
			}); 
		});
		setTimeout(function(){
			res.json({busstop, lines});
		});
	});
});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Running : ' + port);
