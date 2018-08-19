const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  halfway() {
    console.log("Halfway through animation");
  }
  
  start() {
    this.getComponent(cc.Animation).play();
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (e) => {
      if (e.keyCode == cc.KEY.right) {
        if (this.getComponent(cc.Animation).getAnimationState("walk").isPaused) {
          this.getComponent(cc.Animation).getAnimationState("walk").play();
        }
        this.node.setPositionX(this.node.position.x + 3);
        // 画面右端に到達したら画面左端に戻る
        if (this.node.position.x > (this.node.parent.width / 2) + this.node.width / 2) {
          this.node.setPositionX(-(this.node.parent.width / 2) - this.node.width / 2);
        }
      }
    }, this);

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (e) => {
      this.getComponent(cc.Animation).getAnimationState("walk").pause();
    });
  }
}