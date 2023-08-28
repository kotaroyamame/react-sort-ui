export class NList {
  private hilightPos: Set<number> = new Set();
  private serchPos: Set<number> = new Set();
  private list: Array<number> = [];
  constructor(list: Array<number>) {
    this.list = list;
  }
  public getList(): Array<number> {
    return this.list;
  }
  public setList(list: Array<number>) {
    this.list = list;
  }
  public getEffect(n: number) {
    return { hilight: this.hilightPos.has(n), check: this.serchPos.has(n) };
  }
  public getSize(): number {
    return this.list.length;
  }
  public getMaxSize(): number {
    const m = (n: number, l: number[]): number => l.length < 1 ? n : Math.max(n, m(l[0], l.slice(1)))
    return ((l) => m(0, l))(this.list);
  }
  public getHilightPos() {
    return this.hilightPos;
  }
  public setHilightPos(m: Set<number>) {
    this.hilightPos = m;
  }
  public getSerchPos() {
    return this.serchPos;
  }
  public setSerchPos(n: Set<number>) {
    this.serchPos = n;
  }
  public shuffle() {
    for (let i = 0; i < this.list.length; i++) {
      const rand = Math.floor(Math.random() * this.list.length);
      console.log(rand);
      [this.list[i], this.list[rand]] = [this.list[rand], this.list[i]]
    }
    console.log(this.list);
  }
}

export class CanvasController {
  is_down = false;
  startX = 0;
  startY = 0;
  endX = 0;
  endY = 0;
  x = 0;
  y = 0;
  zoomMax = 2;
  zoomMin = 0.1;
  zoom: number = 1;
  endZoom: number = 1;
  // mousedown(e: MouseEvent) {
  //   console.log(e);

  //   this.startX = e.offsetX;
  //   this.startY = e.offsetY;
  //   this.is_down = true;
  // }
  // mouseup(e: MouseEvent) {
  //   console.log(e);
  //   this.is_down = false;
  //   this.endX = this.x;
  //   this.endY = this.y;
  //   this.endZoom = this.zoom;
  // }
  // mousemove(e: MouseEvent) {

  //   if (this.is_down) {
  //     if (e.altKey) {
  //       if (this.zoom > this.zoomMax && (e.offsetY - this.startY) < 0) {
  //         this.zoom += (e.offsetY - this.startY) * 0.0001;
  //       } else if (this.zoom < this.zoomMin && (e.offsetY - this.startY) > 0) {
  //         this.zoom += (e.offsetY - this.startY) * 0.0001;
  //       } else if (this.zoom < this.zoomMax && this.zoom > this.zoomMin) {
  //         this.zoom += (e.offsetY - this.startY) * 0.0001;
  //       }
  //     } else {
  //       this.x = e.offsetX - this.startX + this.endX;
  //       this.y = e.offsetY - this.startY + this.endY;
  //     }

  //   }
  // }
}
export async function Wait(x: number = 1000) {
  await new Promise(r => { setTimeout(() => r(true), x) });
}