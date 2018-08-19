const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioPlayer extends cc.Component {
  @property(cc.AudioClip)
  music: cc.AudioClip = null;

  lastAudioID: number = -1;

  onLoad() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (e) => {
      if (e.keyCode == cc.KEY.up) {
        if (this.lastAudioID != -1)
          if (cc.audioEngine.getVolume(this.lastAudioID) < 1)
            cc.audioEngine.setVolume(this.lastAudioID, cc.audioEngine.getVolume(this.lastAudioID) + 0.1);
      }
      if (e.keyCode == cc.KEY.down) {
        if (this.lastAudioID != -1)
          if (cc.audioEngine.getVolume(this.lastAudioID) > 0)
            cc.audioEngine.setVolume(this.lastAudioID, cc.audioEngine.getVolume(this.lastAudioID) - 0.1);
      }

      if (e.keyCode == cc.KEY.space) {
        var audio = this.node.getComponent(cc.AudioSource);
        if (audio != undefined) {
          if (this.node.getComponent(cc.AudioSource).isPlaying == false) {
            console.log("Playingsound");
            audio.play();
          }
          else {
            console.log("Sound already playing");
          }
        }
        else
          console.log("Undefined audio");
      }
      if (e.keyCode == cc.KEY.shift) {
        // Ignore the error warning, the .d.ts definitions for play aren't accurate
        this.lastAudioID = cc.audioEngine.play(this.music, false, 1);
        // Register a function that will be called when this audio file is done playing
        cc.audioEngine.setFinishCallback(this.lastAudioID, () => {
          this.lastAudioID = -1;
        });
      }
    }, this);
  }
  update(dt) {
    if (this.lastAudioID != -1) {
      console.log(cc.audioEngine.getCurrentTime(this.lastAudioID));
    }
  }
}
