module.exports = function() {
  return function oDataMiddleware(req, res, next) {
    switch(req.method) {
      case 'GET':
        handleGet(req, res);
        break;
      case 'POST':
        handlePost(req, res);
        break;
      case 'PUT':
        res.sendStatus(404);
        break;
      case 'DELETE':
        res.sendStatus(404);
        break;
      default:
        res.sendStatus(404);
        break;
    }

  };

  /**
   * handles the GET request to the OData server
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  function handleGet(req, res) {
    var ModelClass = getModelClass(req.app, req.params[1]);
    if(ModelClass) {
      ModelClass.find(function(err, data) {
        var result = {};
        result.value = data;
        res.send(result);
      });
    } else {
      res.sendStatus(404);
    }
  }

  /**
   * handles the POST request to the OData server.
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  function handlePost(req, res) {
    var ModelClass = getModelClass(req.app, req.params[1]);

    if(ModelClass) {
      ModelClass.create(req.body, function(err, obj) {
        if(err || obj === null) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    } else {
      res.sendStatus(404);
    }
  }


  /**
   * get the Model for a collectionName. The collectionName must be equal to
   * the pluralModelName of the Model.
   * @param  {[type]} app            [description]
   * @param  {[type]} collectionName [description]
   * @return {[type]}                [description]
   */
  function getModelClass(app, collectionName) {
    var ModelClass;
    var models = app.models();

    models.forEach(function(Model) {
      if(Model.pluralModelName === collectionName) {
        ModelClass = Model;
        return;
      }
    });
    return ModelClass;
  }

};
