

export type ActionEdge = {
  id: string,
  source: string,
  target: string
}



export type ActionNode = {
  id: string,
  position: {
    x: number,
    y: number
  },
} & (
  {
    type:"whatsapp",
    data: {
      phoneNumber: {
        type:"value" | "nodeReference",
        value: string
      },
      message: {
        type:"value" | "nodeReference",
        value: string
      }
    }
  }
  |
  {
    type:"start"
    data:any
  }
)