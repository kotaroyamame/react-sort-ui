# react-sort-ui

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Quickstart

In the project directory, you can run:

### `npm i @iid/react-sort-ui`

```
import { ReactSortUI, SortFn, NList } from '@iid/react-sort-ui'

<ReactSortUI list={[3,4,2,1]}

```

### Props


#### list

type Array<number>

#### autoPlay

type boolean

#### width

type number

default 200

#### height

type number

default 200

#### sortFn

type SortFn = (l: NList, f: Show) => void;

The Show function pauses the sorting and updates the canvas.
Put it in any position you like in any sort function!

```
const show: Show = async (n: number) => {
    await Wait(n)
    draw(context)
}
```

NList

```
class NList {

  constructor(list: Array<number>) 
  getList(): Array<number> {
  setList(list: Array<number>) {
  getEffect(n: number) 
  getSize(): number 
  getMaxSize(): number 
  getHilightPos() 
//Change the color of the bar in the index of the set
  setHilightPos(m: Set<number>) 
  getSerchPos() 
//Arrow above the bar in the index of the set
  setSerchPos(n: Set<number>) 
  shuffle() {
}

```


### For example.

```
import { ReactSortUI, SortFn} from '@iid/react-sort-ui'

...

const sort = async (list: NList, show: Show) => {
  let isSwap = true
  let last = list.getSize() - 1
  while (isSwap) {
    isSwap = false
    for (let i = 0; i < last; i++) {
      const m = new Set<number>()
      m.add(i)
      m.add(i + 1)
      sList.setSerchPos(m)
      await show(100)
      if (list.getList()[i] > list.getList()[i + 1]) {
        const s = new Set<number>()
        s.add(i)
        s.add(i + 1)
        sList.setHilightPos(s)
        [list.getList()[i], list.getList()[i + 1]] = [
          list.getList()[i + 1],
          list.getList()[i]
        ]
        await show(100)
        isSwap = true
      } else {
        await show(100)
      }
    }
    last--
  }
}
const sortRef: any = useRef()

return (<>
<ReactSortUI
  list={[5,4,3,2,1]}
  ref={sortRef}
  autoPlay={autoPlay}
  width={width}
  height={height}
  sortFn={sortFn}
/>

<Button onClick={() => sortRef.current.Start()}>
  Start
</Button>
<Button onClick={() => sortRef.current.Reset()}>
  Reset
</Button>

</>)
```