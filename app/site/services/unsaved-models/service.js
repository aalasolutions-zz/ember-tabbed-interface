import Ember from 'ember';

export default Ember.Service.extend({

  /**
   * Contains all dirty models
   */
  dirtyModels: Ember.A(),
  /**
   * Fetch a dirty model by its ID
   * @param id String Representation
   * @returns {*} Return model or false
   */
  fetch(id) {
    var dirtyModels = this.get('dirtyModels');
    let model = dirtyModels.findBy('id', id);
    if (model) {
      return model.model;
    } else {
      return false;
    }
  },
  /**
   * Add model to list, also check if the same id exists. If it exists it will overwrite it.
   * @param model Model to be cached
   * @param id ID of the model
   * @returns {*} Returns ID
   */
  addModel(model, id) {
    var dirtyModels = this.get('dirtyModels');

    if (!id) {
      id = new Date().toISOString();
    }

    var newModel = {id: id, model: model};

    this.destroyModel(id);

    dirtyModels.pushObject(newModel);

    return id;
  },
  /**
   * Remove a model from list only if it found
   * @param id String representation of model
   */
  destroyModel(id){
    var dirtyModels = this.get('dirtyModels');

    let dirtyModel = dirtyModels.findBy('id', id);
    if (dirtyModel) {
      dirtyModels.removeObject(dirtyModel);
    }
  }


});
