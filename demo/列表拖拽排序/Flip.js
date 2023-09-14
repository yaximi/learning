class Flip {
    constructor(targets, duration = 0.5) {
        this.targets = Array.from(targets);
        this.duration = duration;

        this.first = this.first.bind(this);
        this.last = this.last.bind(this);
        this.invert = this.invert.bind(this);
        this.play = this.play.bind(this);

        this.first();
    }

    first() {
        this.targets.forEach(target => {
            target._firstTop = target.getBoundingClientRect().top
        });
    }

    last() {
        this.targets.forEach(target => {
            target._lastTop = target.getBoundingClientRect().top
        });
    }

    invert() {
        this.targets.forEach(target => {
            const disY = target._firstTop - target._lastTop;
            target.style.transition = 'none';
            target.style.transform = `translateY(${disY}px)`;
        });
    }

    play() {
        this.last();
        this.invert();
        requestAnimationFrame(() => {
            this.targets.forEach(target => {
                target.style.transition = `transform ${this.duration}s`;
                target.style.removeProperty('transform');
            });
        });
    }
}
