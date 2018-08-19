const { ccclass, property } = cc._decorator;

@ccclass
export default class MouseScript extends cc.Component {
  onLoad() {
    this.node.on(cc.Node.EventType.MOUSE_DOWN, (e: cc.Event.EventMouse) => {
      console.log("Mouse down on top of selected node");
      e.bubbles = false; // Handled event don't let it propogate!
    });
    this.node.on(cc.Node.EventType.MOUSE_LEAVE, (e: cc.Event.EventMouse) => {
      console.log("Mouse no longer over " + e.currentTarget.name);
    });
    this.node.parent.on(cc.Node.EventType.MOUSE_DOWN, (e: cc.Event.EventMouse) => {
      console.log("Mouse button pressed on parent.  Button: " + e.getButton());
    });
  }
}
