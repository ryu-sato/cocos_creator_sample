const { ccclass, property } = cc._decorator;

@ccclass
export default class KeyboardScript extends cc.Component {
  public keys: Map<number, boolean> = new Map();

  onKeyDown(e: cc.Event.EventCustom) {
    this.keys.set(e.keyCode, true);
    switch (e.keyCode) {
      case cc.KEY.right:
        if (this.keys.has(cc.KEY.shift))
          console.log("Right and shift pressed");
        else
          console.log("Right pressed");
        break;
    }
    console.log(this.keys.size);
  }

  onKeyUp(e: cc.Event.EventCustom) {
    this.keys.delete(e.keyCode);
  }

  onLoad() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,
      this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,
      this.onKeyUp, this);
  }
}