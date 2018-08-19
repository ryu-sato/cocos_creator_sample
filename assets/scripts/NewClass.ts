const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  halfway() {
    console.log("Halfway through animation");
  }
  
  start() {
    this.getComponent(cc.Animation).play();
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (e) => {
      if (e.keyCode == cc.KEY.p) {
        if (this.getComponent(cc.Animation).getAnimationState("walk").isPaused) {
          this.getComponent(cc.Animation).getAnimationState("walk").play();
        }
        else {
          this.getComponent(cc.Animation).getAnimationState("walk").pause();
        }
      }
    }, this);
  }
}