export interface Dimension {
  label: string,
  category: {
    index: {[id: string]: number},
    label: {[id: string]: string},
    unit?: {[id: string]: any}
  }
}

export interface JsonStat{
  dataset: {
    dimension: {
      [dim_id: string]: any // will be of type Dimension
      id: string[],
      size: number[],
      role: {
        metric: string[],
        time: string[]
      }
    },
    label: string,
    source: string,
    updated: string,
    values: any[]
  }
}