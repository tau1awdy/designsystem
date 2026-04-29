export class ScrambleText {
  el: HTMLElement | null;
  chars: string;
  updateInterval: number;
  frame: number;
  queue: Array<{ from: string; to: string; start: number; end: number; char?: string }>;
  frameRequest: number;
  isHovering: boolean;
  originalText: string;
  onComplete: (() => void) | null;
  onUpdate: ((text: string) => void) | null;

  constructor(el: HTMLElement | null) {
    this.el = el;
    this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    this.updateInterval = 2;
    this.frame = 0;
    this.queue = [];
    this.frameRequest = 0;
    this.isHovering = false;
    this.originalText = "";
    this.onComplete = null;
    this.onUpdate = null;
    this.init();
  }

  setText(newText: string) {
    this.queue = [];
    const oldText = this.el?.innerText ?? "";
    const length = Math.max(oldText.length, newText.length);

    return new Promise<string>((resolve) => {
      this.onComplete = () => {
        resolve(this.originalText);
      };

      for (let i = 0; i < length; i++) {
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({
          from: oldText[i] || "",
          to: newText[i] || "",
          start,
          end,
        });
      }

      this.frame = 0;
      this.update();
    });
  }

  init() {
    this.originalText = this.el?.innerText ?? "";
    this.el?.addEventListener("mouseenter", () => {
      this.isHovering = true;
      this.setText(this.originalText);
    });
    this.el?.addEventListener("mouseleave", () => {
      this.isHovering = false;
      this.setText(this.originalText);
    });
  }

  update() {
    cancelAnimationFrame(this.frameRequest);
    this.frame++;

    let output = "";
    let complete = 0;

    for (let i = 0; i < this.queue.length; i++) {
      const entry = this.queue[i];

      if (this.frame >= entry.end) {
        complete++;
        output += entry.to;
      } else if (this.frame >= entry.start) {
        if (!entry.char || Math.random() < 0.28) {
          entry.char = this.chars[Math.floor(Math.random() * this.chars.length)];
        }
        output += entry.char || "";
      } else {
        output += entry.from;
      }
    }

    if (this.el) {
      this.el.innerText = output;
    }
    if (this.onUpdate) {
      this.onUpdate(output);
    }

    if (complete === this.queue.length) {
      this.onComplete?.();
    } else {
      this.frameRequest = requestAnimationFrame(this.update.bind(this));
    }
  }

  destroy() {
    cancelAnimationFrame(this.frameRequest);
    // Event listeners are not removed here since they were added with
    // anonymous functions in init(). In production, store references.
  }
}
