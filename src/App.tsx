import './App.css'

import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  Ref,
  forwardRef,
  useImperativeHandle
} from 'react'
import ReactDOM from 'react-dom'

import { NList, CanvasController, Wait } from './utils'
import { Show, SortFn } from './types'

const App = forwardRef(function App (
  {
    list,
    sortFn,
    width = 200,
    height = 200,
    autoPlay = false
  }: {
    list: Array<number>
    width?: number
    height?: number
    sortFn?: SortFn
    autoPlay?: boolean
  },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [sList, setSList] = useState(new NList(list))
  const [fWidth, setWidth] = React.useState(0)
  const [canvasController, setCanvasController] = useState(
    new CanvasController()
  )
  let color: string = '#000'
  let hilidhtColor: string = '#f00'
  let margin: number = 1.1
  let stageW: number = width
  let stageH: number = height
  let fieldWidth: number = 0
  let fieldHeight: number = 0
  let widthCoeff: number = 1
  const reset = () => {
    sList.shuffle()
    draw(context)
  }

  function draw (_context:CanvasRenderingContext2D | null) {
    if (_context == null) {
      return
    }
    // 画面をリセット
    _context.clearRect(0, 0, stageW, stageH)
    // context.lineWidth = 10;

    _context.strokeStyle = color
    fieldWidth = stageW
    fieldHeight = Math.min(stageW, stageH)
    widthCoeff = fieldWidth / (sList.getSize() * margin)
    sList.getList().forEach((n, i) => {
      if (_context == null) {
        return
      }
      _context.beginPath()

      _context.lineWidth =
        (fieldWidth / (sList.getSize() * 2)) * canvasController.zoom
      const fWidth = fieldWidth * canvasController.zoom
      const fHeight = fieldHeight * canvasController.zoom
      const MaxBarPos = Math.floor(fHeight / margin / sList.getMaxSize())
      let [x, y] = [
        Math.floor((fWidth / (sList.getSize() + 1)) * (i + 1)),
        (fHeight * margin - fHeight) / 2 + MaxBarPos * (sList.getMaxSize() - n)
      ]
      console.log(x, y, fHeight + (fHeight * margin - fHeight) / 2, y)
      // 線を描く
      if (context == null) {
        return
      }
      const Effect = sList.getEffect(i)

      if (Effect.check) {
        _context.lineWidth = 1
        _context.strokeStyle = hilidhtColor
        _context.fillStyle = hilidhtColor
        _context.beginPath()
        _context.moveTo(x, y - 5)
        _context.lineTo(x - 15, y - 20)
        _context.lineTo(x + 15, y - 20) //直線を追加して三角形にします。
        _context.closePath() //moveTo()で指定した始点に向けて線を引き、領域を閉じます。
        _context.fill()
        _context.stroke()
        _context.beginPath()
      }
      _context.strokeStyle = color
      if (Effect.hilight) {
        _context.strokeStyle = hilidhtColor
      }

      _context.lineWidth =
        (fieldWidth / (sList.getSize() * 2)) * canvasController.zoom
      _context.moveTo(x, y)
      _context.lineTo(x, fHeight - (fHeight * margin - fHeight) / 2)
      _context.stroke()
    })
  }

  const show: Show = async (n: number) => {
    await Wait(n)
    draw(context)
  }
  const sort = sortFn
    ? sortFn.bind({}, sList, show)
    : async (list: NList, show: Show) => {
        console.log('asd')
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
              // await Main.Show(100);
              ;[list.getList()[i], list.getList()[i + 1]] = [
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
  const callbackRef = useCallback((cRef: HTMLCanvasElement | null) => {
    if (cRef === null) {
      return
    }
    setContext(cRef.getContext('2d'))
  }, [])
  // useEffect(() => {
  //   initContext(canvasRef.current)
  // }, [])
  useEffect(() => {
    if (window.ResizeObserver) {
      const observer = new window.ResizeObserver(entries => {
        entries.forEach(el => {
          setWidth(el.contentRect.width)
        })
      })
      if (canvasRef.current) {
        observer.observe(canvasRef.current)
      }
      return () => {
        observer.disconnect()
      }
    }
  }, [])
  useEffect(() => {
    if (context !== null && autoPlay) {
      sort(sList, show)
    } else {
      draw(context)
    }
  }, [context])
  useImperativeHandle(
    ref,
    () => {
      return {
        Reset () {
          reset()
        },
        Start () {
          sort(sList, show)
        }
      }
    },
    []
  )

  return (
    <canvas
      ref={callbackRef}
      id='andy-sortui'
      className='andy-sortui'
      height={height}
      width={width}
    />
  )
})

export default App
