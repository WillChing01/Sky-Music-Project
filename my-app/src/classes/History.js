const mod = (n, m) => {
    return ((n % m) + m) % m;
};

/**
 * Ring-buffer-stack for track history
 */

export default class History {
    constructor(limit = 50) {
        this.length = limit + 1;
        this.tracks = new Array(this.length);
        this.tracks.fill(undefined);
        Object.seal(this.tracks);

        this.current = 0;
        this.top = 0;
        this.tracks[this.top] = null;
    }

    // pop() {
    //     const isEmpty = this.tracks[this.top] === null;
    //     if (isEmpty) return null;

    //     const track = this.tracks[this.top];
    //     this.top = mod(this.top - 1, this.length);
    //     return track;
    // }

    get() {
        const isEmpty = this.tracks[this.current] === null;
        if (isEmpty) return null;
        const track = this.tracks[this.current];
        this.current = mod(this.current - 1, this.length);
        return track;
    }

    push(track) {
        const newTop = mod(this.top + 1, this.length);
        const isFull = this.tracks[newTop] === null;
        if (isFull) {
            const newEnd = mod(newTop + 1, this.length);
            this.tracks[newEnd] = null;
        }
        this.top = newTop;
        this.current = newTop;
        this.tracks[this.top] = track;
    }

    pushAll(...tracks) {
        tracks.forEach((track) => this.push(track));
    }
}