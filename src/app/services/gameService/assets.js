import PIXI from '../../../../node_modules/pixi.js/bin/pixi'

export default class Assets {
  constructor($q) {
    this.loader = new PIXI.loaders.Loader();
    this.assets = [];
  }

  add(elem) {
    return new Promise((resolve, reject) => {
      this.loader.add(elem);

      this.loader.on('complete', this.onComplete, this);
      this.loader.on('error', (error, resource) => reject(error), this);

      this.loader.load(() => resolve());
    });
  }

  get(name) {
    return this.assets[name];
  }

  onComplete(loader, resources) {
    this.assets = resources;
  }

}