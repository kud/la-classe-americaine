/**
 * Sound (§5): opt-in, synthesised, ours. Zero audio files, zero licensing.
 * Never constructed before a user gesture: the switch's click creates the context.
 *
 * - projector whirr: band-passed noise with a 24 Hz flutter, about −30 dB, looping
 * - typewriter tick: a 12 ms high-passed noise burst
 * - stamp thud: a 70 Hz sine dropping to 40 Hz under a low-passed noise knock
 */
export class SoundEngine {
  private ctx: AudioContext;
  private master: GainNode;
  private noise: AudioBuffer;
  private whirr: { src: AudioBufferSourceNode; gain: GainNode; lfo: OscillatorNode } | null = null;

  constructor() {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new Ctor();
    this.master = this.ctx.createGain();
    this.master.gain.value = 1;
    this.master.connect(this.ctx.destination);
    const len = this.ctx.sampleRate * 2;
    this.noise = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  }

  resume() {
    return this.ctx.state === "suspended" ? this.ctx.resume() : Promise.resolve();
  }

  setWhirr(on: boolean) {
    if (on && !this.whirr) {
      const src = this.ctx.createBufferSource();
      src.buffer = this.noise;
      src.loop = true;
      const band = this.ctx.createBiquadFilter();
      band.type = "bandpass";
      band.frequency.value = 900;
      band.Q.value = 0.7;
      const gain = this.ctx.createGain();
      gain.gain.value = 0;
      // flutter: the shutter at 24 frames per second
      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 24;
      const depth = this.ctx.createGain();
      depth.gain.value = 0.008;
      lfo.connect(depth).connect(gain.gain);
      src.connect(band).connect(gain).connect(this.master);
      const t = this.ctx.currentTime;
      gain.gain.setTargetAtTime(0.03, t, 0.4); // ≈ −30 dB
      src.start();
      lfo.start();
      this.whirr = { src, gain, lfo };
    } else if (!on && this.whirr) {
      const { src, gain, lfo } = this.whirr;
      const t = this.ctx.currentTime;
      gain.gain.cancelScheduledValues(t);
      gain.gain.setTargetAtTime(0, t, 0.15);
      src.stop(t + 0.8);
      lfo.stop(t + 0.8);
      this.whirr = null;
    }
  }

  tick() {
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    const hp = this.ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 2800;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.012);
    src.connect(hp).connect(gain).connect(this.master);
    src.start(t, Math.random(), 0.02);
  }

  thud() {
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(70, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.12);
    const og = this.ctx.createGain();
    og.gain.setValueAtTime(0.5, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    osc.connect(og).connect(this.master);
    osc.start(t);
    osc.stop(t + 0.18);

    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    const lp = this.ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 600;
    const ng = this.ctx.createGain();
    ng.gain.setValueAtTime(0.25, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    src.connect(lp).connect(ng).connect(this.master);
    src.start(t, Math.random(), 0.08);
  }

  close() {
    this.setWhirr(false);
    void this.ctx.close();
  }
}
