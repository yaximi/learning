let uid = 0;

export class Dep {
    static target = null;

    constructor() {
        this.id = uid++;
        this.subs = [];
    }

    addSub(sub) {
        if (this.subs.some(item => item.id === sub.id)) return; // 防止重复添加
        this.subs.push(sub)
    }

    notify() {
        this.subs.forEach(sub => sub.update())
    }

    depend() {
        if (Dep.target) {
            this.addSub(Dep.target)
        }
    }
}
